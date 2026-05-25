"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  CollegeCard,
  InstituteCard,
} from "@/components/seat-matrix/CollegeCard";

import { SeatAnalytics } from "@/components/seat-matrix/SeatAnalytics";

import { SeatFilters } from "@/components/seat-matrix/SeatFilters";

import { transformData } from "@/lib/transformData";

const getInstituteType = (
  name: string
): "IIT" | "NIT" | "IIIT" | "GFTI" => {

  const clean =
    name.replace(/\s+/g, " ");

  if (
    clean.includes(
      "Indian Institute of Technology"
    )
  ) {
    return "IIT";
  }

  if (
    clean.includes(
      "National Institute of Technology"
    )
  ) {
    return "NIT";
  }

  if (
    clean.includes(
      "Indian Institute of Information Technology"
    )
  ) {
    return "IIIT";
  }

  return "GFTI";
};










export default function SeatMatrixPage() {

  const [institutes, setInstitutes] = useState<
    InstituteCard[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [page, setPage] = useState(1);

  const [selectedType, setSelectedType] =
    useState<
      "IIT" | "NIT" | "IIIT" | "GFTI" | "ALL"
    >("ALL");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [year, setYear] =
    useState("2023");

  const [category, setCategory] =
    useState("OPEN");

  const [gender, setGender] =
    useState("Gender-Neutral");
  const [pwd, setPwd] =
    useState("No");

  useEffect(() => {

    const fetchSeatData = async () => {

      try {

        setLoading(true);

        const params =
          new URLSearchParams({
            year,
            seatType: category,
            gender,
            isPwd: pwd,
          });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/seat-records?${params}`
        );

        const data = await response.json();

        const transformed =
          transformData(data).map(
            (inst: InstituteCard) => ({
              ...inst,
              type: getInstituteType(
                inst.name
              ),
            })
          );

        setInstitutes(transformed);

      } catch (error) {

        console.error(
          "Seat Matrix Error:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchSeatData();

  }, [page, year, category, gender, pwd]);

  const filteredInstitutes =
    institutes.filter((inst) => {

      const matchesType =
        selectedType === "ALL" ||
        inst.type === selectedType;

      const query =
        searchQuery
          .toLowerCase()
          .trim()
          .replace(/\s+/g, " ");

      const instituteName =
        inst.name
          .toLowerCase()
          .replace(/\s+/g, " ");

      const matchesInstitute =
        instituteName.includes(query);

      const matchesProgram =
        inst.programs.some((p) =>
          p.program
            .toLowerCase()
            .replace(/\s+/g, " ")
            .includes(query)
        );

      const matchesSearch =
        matchesInstitute ||
        matchesProgram;

      return (
        matchesType &&
        matchesSearch
      );
    });

  return (
    <div className="bg-[#F9F9F9] min-h-screen flex">

      <main className="flex-1 flex flex-col w-full">

        {/* HEADER */}
        <header className="sticky top-0 z-10 bg-[#F9F9F9] border-b-2 border-[#0A0A0A] px-8 py-6 flex justify-between">

          <div>

            <h2 className="font-bold text-4xl">
              Seat Matrix & Ranks
            </h2>

            <p className="text-[#878787]">
              Real JoSAA seat data
            </p>

          </div>

        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">

          <div className="max-w-7xl mx-auto space-y-8 pb-32">

            <SeatAnalytics
              institutes={
                filteredInstitutes
              }
            />

            <SeatFilters
              year={year}
              setYear={setYear}
              category={category}
              setCategory={setCategory}
              gender={gender}
              setGender={setGender}
              pwd={pwd}
              setPwd={setPwd}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {/* LOADING */}
            {loading && (
              <div className="text-center py-20 font-bold text-2xl">
                Loading...
              </div>
            )}

            {/* DATA */}
            {!loading && (
              <div className="space-y-8">

                {filteredInstitutes.length >
                  0 ? (

                  filteredInstitutes.map(
                    (
                      institute,
                      index
                    ) => (
                      <CollegeCard
                        key={index}
                        institute={
                          institute
                        }
                      />
                    )
                  )

                ) : (

                  <div className="text-center py-20 font-bold text-2xl">
                    No institutes found
                  </div>

                )}

              </div>
            )}

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-4 pt-10">

              <button
                onClick={() =>
                  setPage((p) =>
                    Math.max(1, p - 1)
                  )
                }
                className="px-5 py-2 border-2 border-[#0A0A0A] bg-white font-bold rounded"
              >
                Prev
              </button>

              <span className="font-bold">
                Page {page}
              </span>

              <button
                onClick={() =>
                  setPage((p) => p + 1)
                }
                className="px-5 py-2 border-2 border-[#0A0A0A] bg-white font-bold rounded"
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}