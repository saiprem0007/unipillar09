'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    EXAM_TYPES,
    CATEGORIES,
    GENDERS,
    HOME_STATES,
    BRANCH_OPTIONS,
    COLLEGE_TYPES,
    COLLEGES_BY_TYPE,
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

export default function PredictorForm({ onSubmit }: PredictorFormProps) {
    const [formData, setFormData] = useState<PredictorFormData>({
        examType: 'JEE Main',
        rank: '',
        category: 'OPEN',
        gender: 'Gender-Neutral',
        homeState: 'Telangana',
        branch: 'Computer Science and Engineering',
        collegeType: '',
        preferredCollege: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'collegeType') {
            setFormData(prev => ({ ...prev, collegeType: value as CollegeType, preferredCollege: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const collegeList =
        formData.collegeType && formData.collegeType in COLLEGES_BY_TYPE
            ? COLLEGES_BY_TYPE[formData.collegeType as CollegeType]
            : [];
    const filteredCollegeTypes =
        formData.examType === 'JEE Advanced'
            ? ['IITs']
            : ['NITs', 'IIITs', 'GFTIs'];

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

                        {/* Branch */}
                        <div className="space-y-2">
                            <label className="font-medium uppercase tracking-[1px] text-[12px] text-[#878787] block">
                                Preferred Branch
                            </label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 font-medium text-sm rounded-[2px] focus:outline-none focus:ring-0"
                            >
                                {BRANCH_OPTIONS.map(branch => (
                                    <option key={branch} value={branch}>{branch}</option>
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


                            {/* Step 2: College Name */}
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