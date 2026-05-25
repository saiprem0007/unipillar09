"use client";

import { ProgramRow } from "./CollegeCard";

interface SeatTableProps {
  programs: ProgramRow[];
}

export function SeatTable({
  programs,
}: SeatTableProps) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left border-collapse">

        <thead>
          <tr className="border-b border-[#0A0A0A]/10">

            <th className="py-3 font-display font-bold text-sm text-[#878787] uppercase">
              Program
            </th>

            <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">
              Quota
            </th>

            <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">
              Category
            </th>

            <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">
              Gender
            </th>

            <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">
              Opening
            </th>

            <th className="py-3 px-2 font-display font-bold text-sm text-[#878787] uppercase text-center">
              Closing
            </th>

          </tr>
        </thead>

        <tbody className="divide-y divide-[#0A0A0A]/5">

          {programs.map((prog, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50/50"
            >

              <td className="py-4 font-bold text-sm text-[#0A0A0A]">
                {prog.program}
              </td>

              <td className="py-4 px-2 font-medium text-xs text-center">
                {prog.quota}
              </td>

              <td className="py-4 px-2 font-medium text-xs text-center">
                {prog.category}
              </td>

              <td className="py-4 px-2 font-medium text-xs text-center whitespace-nowrap">
                {prog.gender}
              </td>

              <td className="py-4 px-2 font-display font-bold text-sm text-center">
                {prog.opening}
              </td>

              <td className="py-4 px-2 font-display font-bold text-sm text-[#059669] text-center">
                {prog.closing}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}