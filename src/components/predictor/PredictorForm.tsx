'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    EXAM_TYPES,
    CATEGORIES,
    GENDERS,
    HOME_STATES,
    BRANCH_OPTIONS,
    COLLEGE_TYPES,
    COLLEGES_BY_TYPE,
    BRANCHES_BY_COLLEGE,   // ← NEW: college-level branch map
    CollegeType,
} from '@/components/predictor/constants';

export interface PredictorFormData {
    examType: string;
    rank: string;
    category: string;
    gender: string;
    homeState: string;
    branch: string;
    collegeType: CollegeType | '';
    preferredCollege: string;
}

interface PredictorFormProps {
    onSubmit: (data: PredictorFormData) => void;
}

// ─── Validation ──────────────────────────────────────────────────────────────
// Returns the first missing-field message, or null when everything is filled.
function validateForm(data: PredictorFormData): string | null {
    if (!data.examType)         return 'Please select your exam.';
    if (!data.rank.trim())      return 'Please enter your rank.';
    if (isNaN(Number(data.rank)) || Number(data.rank) <= 0)
                                return 'Please enter a valid rank (positive number).';
    if (!data.category)         return 'Please select your category.';
    if (!data.gender)           return 'Please select your gender.';
    if (!data.homeState)        return 'Please select your home state.';
    if (!data.collegeType)      return 'Please select an institute type.';
    if (!data.preferredCollege) return 'Please select a preferred institute.';
    if (!data.branch)           return 'Please select a preferred branch.';
    return null;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function PredictorForm({ onSubmit }: PredictorFormProps) {
    const [formData, setFormData] = useState<PredictorFormData>({
        examType: 'JEE Main',
        rank: '',
        category: 'OPEN',
        gender: 'Gender-Neutral',
        homeState: 'Telangana',
        branch: '',               // blank until a college is chosen
        collegeType: '',
        preferredCollege: '',
    });

    // ── Toast state ──────────────────────────────────────────────────────────
    // Holds an error message to show inline; cleared on next valid submission.
    const [validationError, setValidationError] = useState<string | null>(null);

    // ── Derived: branches available for the selected college ─────────────────
    // Falls back to the full global list when no college is selected yet, so
    // the dropdown is never unexpectedly empty.
    const availableBranches: string[] = useMemo(() => {
        if (!formData.preferredCollege) return BRANCH_OPTIONS;
        return BRANCHES_BY_COLLEGE[formData.preferredCollege] ?? BRANCH_OPTIONS;
    }, [formData.preferredCollege]);

    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'collegeType') {
            // Changing the institute type resets both college and branch so the
            // dependent dropdowns never show stale values.
            setFormData(prev => ({
                ...prev,
                collegeType: value as CollegeType,
                preferredCollege: '',
                branch: '',
            }));
        } else if (name === 'preferredCollege') {
            // Changing the college resets the branch because the branch list
            // for the new college is completely different.
            const newBranches = BRANCHES_BY_COLLEGE[value] ?? [];
            setFormData(prev => ({
                ...prev,
                preferredCollege: value,
                branch: newBranches.length > 0 ? newBranches[0] : '',
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear any existing validation error as soon as the user touches a field.
        if (validationError) setValidationError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const error = validateForm(formData);
        if (error) {
            setValidationError(error);
            return;          // ← stop: do NOT call onSubmit / fire any API
        }
        setValidationError(null);
        onSubmit(formData);
    };

    // ── Derived: college list for the chosen institute type ───────────────────
    const collegeList =
        formData.collegeType && formData.collegeType in COLLEGES_BY_TYPE
            ? COLLEGES_BY_TYPE[formData.collegeType as CollegeType]
            : [];

    const filteredCollegeTypes =
        formData.examType === 'JEE Advanced'
            ? ['IITs']
            : ['NITs', 'IIITs', 'GFTIs'];

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="w-full lg:w-[400px] xl:w-[450px] h-full flex flex-col bg-white border-r-2 border-[#0A0A0A] z-20 relative overflow-y-auto scrollbar-hide">

            {/* Back Button */}
            <div className="shrink-0 pt-8 px-8 lg:px-12 pb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#878787] hover:text-[#0A0A0A] transition-colors group"
                >
                    <span className="material-symbols-outlined text-2xl group-hover:-translate-x-1 transition-transform">
                        arrow_back
                    </span>
                    <span className="font-medium uppercase tracking-[1px] text-[13px]">Dashboard</span>
                </Link>
            </div>

            {/* Form Content */}
            <div className="flex-1 px-8 lg:px-12 pb-10">
                <div className="max-w-md mx-auto w-full space-y-8">

                    {/* Header */}
                    <div className="space-y-3">
                        <h1 className="font-display font-bold text-5xl tracking-tight leading-tight">
                            JoSAA<br />Predictor
                        </h1>
                        <p className="text-[#878787] text-base">
                            Enter your rank and details to see your admission odds.
                        </p>
                    </div>

                    {/* ── Validation error banner ───────────────────────────── */}
                    {/* Shown only when the user clicks submit with a missing field */}
                    {validationError && (
                        <div className="flex items-start gap-3 bg-red-50 border-2 border-red-400 rounded-[2px] px-4 py-3">
                            <span className="material-symbols-outlined text-red-500 text-lg mt-0.5 shrink-0">
                                error
                            </span>
                            <p className="text-red-700 text-sm font-medium leading-snug">
                                {validationError}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Exam Type */}
                        <div className="space-y-2">
                            <label className="font-medium uppercase tracking-[1px] text-[12px] text-[#878787] block">
                                Exam Type
                            </label>
                            <select
                                name="examType"
                                value={formData.examType}
                                onChange={handleChange}
                                className="w-full bg-white border-2 border-[#0A0A0A] font-medium text-sm rounded-[2px] focus:ring-0 focus:border-[#0A0A0A] px-3 py-2"
                            >
                                {EXAM_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Rank Input */}
                        <div className="space-y-2">
                            <label htmlFor="rank" className="font-medium uppercase tracking-[1px] text-[12px] text-[#878787] block">
                                Category Rank
                            </label>
                            <input
                                type="text"
                                id="rank"
                                name="rank"
                                value={formData.rank}
                                onChange={handleChange}
                                placeholder="e.g. 1200"
                                className="w-full bg-[#F9F9F9] font-display font-bold text-5xl leading-none text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 pb-2 px-4 pt-4 border-0 border-b-2 border-[#878787] focus:ring-0 focus:border-[#0A0A0A] focus:border-b-4 transition-all"
                            />
                        </div>

                        {/* Category and Gender */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-medium uppercase tracking-[1px] text-[11px] text-[#878787] block">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-[#0A0A0A] font-medium text-sm rounded-[2px] focus:ring-0 focus:border-[#0A0A0A] px-3 py-2"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="font-medium uppercase tracking-[1px] text-[11px] text-[#878787] block">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-[#0A0A0A] font-medium text-sm rounded-[2px] focus:ring-0 focus:border-[#0A0A0A] px-3 py-2"
                                >
                                    {GENDERS.map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Home State */}
                        <div className="space-y-2">
                            <label className="font-medium uppercase tracking-[1px] text-[12px] text-[#878787] block">
                                Home State
                            </label>
                            <select
                                name="homeState"
                                value={formData.homeState}
                                onChange={handleChange}
                                className="w-full bg-white border-2 border-[#0A0A0A] font-medium text-sm rounded-[2px] focus:ring-0 focus:border-[#0A0A0A] px-3 py-2"
                            >
                                {HOME_STATES.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        {/* Preferred College — two-step dropdown */}
                        <div className="space-y-3">
                            <label className="font-medium uppercase tracking-[1px] text-[12px] text-[#878787] block">
                                Preferred College
                            </label>

                            {/* Step 1: College Type */}
                            <select
                                name="collegeType"
                                value={formData.collegeType}
                                onChange={handleChange}
                                className="w-full bg-white border-2 border-[#0A0A0A] font-medium text-sm rounded-[2px] focus:ring-0 focus:border-[#0A0A0A] px-3 py-2"
                            >
                                <option value="">— Select Institute Type —</option>
                                {filteredCollegeTypes.map(ct => (
                                    <option key={ct} value={ct}>{ct}</option>
                                ))}
                            </select>

                            {/* Step 2: College Name (shown only after type is chosen) */}
                            {formData.collegeType && (
                                <select
                                    name="preferredCollege"
                                    value={formData.preferredCollege}
                                    onChange={handleChange}
                                    className="w-full bg-white border-2 border-[#0A0A0A] font-medium text-sm rounded-[2px] focus:ring-0 focus:border-[#0A0A0A] px-3 py-2"
                                >
                                    <option value="">— Select College —</option>
                                    {collegeList.map(college => (
                                        <option key={college} value={college}>
                                            {college}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Preferred Branch ─────────────────────────────────────────────
                             When a college is selected: shows only that college's branches
                             (sourced from BRANCHES_BY_COLLEGE).
                             When no college is selected yet: shows the full global list
                             with a hint label so the user knows to pick a college first. */}
                        <div className="space-y-2">
                            <label className="font-medium uppercase tracking-[1px] text-[12px] text-[#878787] block">
                                Preferred Branch
                                {formData.preferredCollege && (
                                    <span className="ml-2 normal-case tracking-normal text-[11px] text-[#059669] font-normal">
                                        ({availableBranches.length} available at this college)
                                    </span>
                                )}
                            </label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 font-medium text-sm rounded-[2px] focus:outline-none focus:ring-0"
                            >
                                {/* Placeholder shown when branch is empty */}
                                {!formData.branch && (
                                    <option value="" disabled>
                                        {formData.preferredCollege
                                            ? '— Select Branch —'
                                            : '— Select a college first —'}
                                    </option>
                                )}
                                {availableBranches.map(branch => (
                                    <option key={branch} value={branch}>{branch}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-4 bg-[#059669] text-white font-display font-semibold text-[15px] rounded-[2px] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[4px_4px_0px_#0A0A0A] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all uppercase tracking-wide"
                        >
                            Analyze Admission Odds
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}