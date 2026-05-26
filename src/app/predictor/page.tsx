'use client';

import React from 'react';

import PredictorForm, {
  PredictorFormData,
} from '@/components/predictor/PredictorForm';

import ResultsPanel from '@/components/predictor/ResultsPanel';

export default function PredictorPage() {

  const [results, setResults] =
    React.useState<any>(null);

  const [loading, setLoading] =
    React.useState(false);

  const [error, setError] =
    React.useState('');

  const [lastPayload, setLastPayload] =
    React.useState<PredictorFormData | null>(null);

  const handleFormSubmit = async (
    formData: PredictorFormData
  ) => {

    try {

      setLoading(true);

      setError('');

      setResults(null);

      setLastPayload(formData);

      const response = await fetch(
        'http://localhost:3001/predictor/analyze',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            rank: Number(formData.rank),

            category: formData.category,

            gender: formData.gender,

            homeState: formData.homeState,

            examType: formData.examType,

            branch: formData.branch,

            college: formData.preferredCollege,

            instituteType:
              formData.collegeType,
          }),
        }
      );

      if (!response.ok) {

        throw new Error(
          `HTTP Error ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        'Predictor Response:',
        data
      );

      setResults(data.data);

    } catch (err: any) {

      console.error(err);

      setError(
        err?.message ||
        'Prediction failed'
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>

      <div className="flex w-full h-screen bg-[#F9F9F9] text-[#0A0A0A] overflow-hidden">

        <PredictorForm
          onSubmit={handleFormSubmit}
        />

        <ResultsPanel
          results={results}
          loading={loading}
          error={error}
          onRetry={() => {
            if (lastPayload) {
              handleFormSubmit(lastPayload);
            }
          }}
        />

      </div>
    </>
  );
}