'use client';

import React from 'react';

export interface ResultItem {
  name: string;
  detail: string;
  cutoff?: string;
  chance: string;
}

interface ProbabilitySectionProps {
  title: string;
  color: string;
  items: ResultItem[];
  type: 'branch' | 'college';
  badgeStyle?: string;
  textColor?: string;
  opacity?: string;
}

export default function ProbabilitySection({
  title,
  color,
  items,
  type,
  badgeStyle = 'bg-[#059669]/10',
  textColor = 'text-[#059669]',
  opacity = '',
}: ProbabilitySectionProps) {
  return (
    <div className={`space-y-4 ${opacity}`}>
      <div className="flex items-center gap-3 border-b-2 border-[#0A0A0A] pb-2">
        <span className={`flex h-3 w-3 rounded-full ${color}`}></span>
        <h3 className="font-display font-bold text-sm uppercase tracking-widest">{title}</h3>
      </div>

      <div className="space-y-1">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 py-3 px-2 border-b border-[#0A0A0A]/10 hover:bg-[#F9F9F9]/50 transition-colors"
          >
            <div className="flex-1">
              <h4 className="font-display font-bold text-sm">{item.name}</h4>
              <p className="text-[10px] text-[#878787] uppercase">{item.detail}</p>
            </div>

            {type === 'branch' && item.cutoff && (
              <div className="text-right">
                <span className="block text-[9px] font-bold text-[#878787]">CUTOFF</span>
                <span className="font-display font-bold text-sm">{item.cutoff}</span>
              </div>
            )}

            <div className={`px-3 py-1.5 rounded-[2px] ${badgeStyle}`}>
              <span className={`font-display font-black text-sm ${textColor}`}>
                {item.chance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}