'use client';

import React from 'react';

import ResultsColumn from './ResultsColumn';

interface ResultsPanelProps {
  results: any;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export default function ResultsPanel({
  results,
  loading,
  error,
  onRetry,
}: ResultsPanelProps) {

  const hasNoResults =
    !loading &&
    !error &&
    !results;

  return (
    <div className="flex-1 h-full bg-white flex flex-col overflow-hidden relative">

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-10 space-y-12">

        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading && (
          <div className="flex items-center justify-center py-24">

            <div className="text-center space-y-5">

              <div className="animate-spin w-14 h-14 border-4 border-[#0A0A0A] border-t-transparent rounded-full mx-auto"></div>

              <div>
                <p className="font-display font-black text-xl">
                  Analyzing Admission Odds...
                </p>

                <p className="text-sm text-[#878787] mt-2">
                  AI is processing colleges,
                  cutoffs and probabilities.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ========================= */}
        {/* ERROR */}
        {/* ========================= */}

        {!loading && error && (
          <div className="border-2 border-red-500 bg-red-50 rounded-xl p-8 text-center space-y-5">

            <div className="text-red-600 text-5xl">
              ⚠
            </div>

            <div>
              <h2 className="font-display font-black text-2xl">
                Prediction Failed
              </h2>

              <p className="text-sm text-red-700 mt-2">
                {error}
              </p>
            </div>

            <button
              onClick={onRetry}
              className="bg-[#0A0A0A] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90"
            >
              Retry
            </button>

          </div>
        )}

        {/* ========================= */}
        {/* EMPTY STATE */}
        {/* ========================= */}

        {hasNoResults && (
          <div className="flex items-center justify-center h-full py-32">

            <div className="text-center max-w-lg space-y-5">

              <div>
                <h2 className="font-display font-black text-3xl">
                  Admission Predictor
                </h2>

                <p className="text-[#878787] mt-3">
                  Enter your rank, category,
                  branch and target institute
                  to generate AI-powered
                  admission predictions.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ========================= */}
        {/* RESULTS */}
        {/* ========================= */}

        {!loading && !error && results && (
          <>
            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <h2 className="font-display font-black text-xs text-[#878787] uppercase tracking-[0.2em]">
                  Targeted Match Details
                </h2>

                <div className="h-px flex-1 bg-[#0A0A0A]/10"></div>

              </div>

              {results?.targeted_match?.length > 0 ? (

                results.targeted_match.map(
                  (item: any, i: number) => (

                    <div
                      key={i}
                      className="bg-[#F9F9F9]/50 rounded-lg border-2 border-[#0A0A0A] p-5 border-l-8 border-l-[#059669] flex items-center justify-between shadow-[3px_3px_0px_#0A0A0A]"
                    >

                      <div>

                        <h3 className="font-display font-bold text-xl">
                          {item.Institute}
                        </h3>

                        <p className="text-xs text-[#878787] uppercase">
                          {item.Branch}
                        </p>

                      </div>

                      <div className="bg-[#0A0A0A] text-white px-5 py-3 rounded-[2px]">

                        <span className="block font-display font-black text-xl">
                          {item["Admit_Odds_Display"]}
                        </span>

                      </div>

                    </div>
                  )
                )

              ) : (

                <div className="text-[#878787] text-sm border-2 border-dashed border-[#D1D5DB] rounded-lg p-8 text-center">

                  No targeted match found.

                </div>

              )}

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">

              <ResultsColumn
                title="Branch-Based Results"
                type="branch"
                data={
                  results?.branch_based_results
                }
              />

              <ResultsColumn
                title="College-Based Results"
                type="college"
                data={
                  results?.institute_based_results
                }
              />

            </div>
          </>
        )}

      </div>
    </div>
  );
}