import {
  InstituteCard,
} from "@/components/seat-matrix/CollegeCard";

export function transformData(
  data: any[]
): InstituteCard[] {

  const grouped: Record<
    string,
    InstituteCard
  > = {}

  data.forEach((item) => {

    if (!grouped[item.institute]) {

      grouped[item.institute] = {
        name: item.institute,

        type: "GFTI",

        location: "India",

        programs: [],
      }
    }

    grouped[item.institute].programs.push({
      id: item.id,
      year: item.year,
      institute: item.institute,
      program: item.program,
      quota: item.quota,
      category: item.seatType,
      gender: item.gender,
      opening: item.openingRank,
      closing: item.closingRank,
    })
  })

  return Object.values(grouped)
}