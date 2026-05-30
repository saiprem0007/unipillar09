// src/components/preferences/branchStreams.ts
//
// Centralised stream → branch mapping derived from the JoSAA 2026 dataset.
// Every branch name here is an exact string present in the cutoff CSV.
//
// Two arrays per stream:
//   • `all`   – every branch in the dataset that belongs to this stream
//   • `top10` – the highest-priority 10 (sent to backend when stream mode is used)
//
// Rule: if `all` has ≤ 10 members, `top10 === all`.
// Rule: if `all` has > 10 members, `top10` is a hand-ranked subset keeping the
//        most broadly-offered / most-searched branches first.

export interface StreamDefinition {
  label: string;          // display name in the dropdown
  all: string[];          // every matching branch from the dataset
  top10: string[];        // ≤ 10 branches actually stored / sent to backend
}

export type StreamKey =
  | 'CSE'
  | 'AI_DS'
  | 'ECE'
  | 'EE'
  | 'MECH'
  | 'CIVIL'
  | 'CHEM'
  | 'META'
  | 'AERO'
  | 'BIO'
  | 'MATH'
  | 'PROD'
  | 'ENGG_PHY'
  | 'MINING'
  | 'OTHER';

export const STREAMS: Record<StreamKey, StreamDefinition> = {

  // ── Computer Science & Engineering ────────────────────────────────────────
  CSE: {
    label: 'Computer Science & Engineering',
    all: [
      'Computer Science And Engineering',
      'Computer Engineering',
      'Computer Science',
      'Computer Science And Artificial Intelligence',
      'Computer Science And Business',
      'Computer Science And Engineering Ai And Ml',
      'Computer Science And Engineering Artificial Intelligence',
      'Computer Science And Engineering Artificial Intelligence And Data Science',
      'Computer Science And Engineering Artificial Intelligence And Machine Learning',
      'Computer Science And Engineering Artificial Lntelligence And Machine Learning',
      'Computer Science And Engineering Cyber Physical System',
      'Computer Science And Engineering Cyber Security',
      'Computer Science And Engineering Data Science',
      'Computer Science And Engineering Data Science And Analytics',
      'Computer Science And Engineering Human Computer Lnteraction And Gaming Technology',
      'Computer Science And Engineering Internet Of Things, Cyber Security Including Block Chain Technology',
      'Computer Science And Engineering With Major In Artificial Intelligence',
      'Computer Science And Engineering With Minor In Ai And Ml',
      'Computer Science And Engineering With Specialization In Artificial Intelligence And Data Science',
      'Computer Science And Engineering With Specialization In Cyber Security',
      'Computer Science And Engineering With Specialization In Data Science',
      'Computer Science And Engineering With Specialization In Quantum Technologies',
      'Computer Science And Engineering With Specialization Of Data Science And Artificial Intelligence',
      'Information Technology',
      'Information Technology-Business Informatics',
      'Integrated B. Tech.It And M. Tech It',
      'Integrated B. Tech.It And Mba',
      'Computational Engineering',
      'Computational Mathematics',
    ],
    top10: [
      'Computer Science And Engineering',
      'Computer Engineering',
      'Information Technology',
      'Computer Science And Engineering With Specialization In Artificial Intelligence And Data Science',
      'Computer Science And Engineering Cyber Security',
      'Computer Science And Engineering Data Science',
      'Computer Science And Engineering Artificial Intelligence And Machine Learning',
      'Computer Science And Artificial Intelligence',
      'Computer Science And Business',
      'Computational Engineering',
    ],
  },

  // ── Artificial Intelligence & Data Science ────────────────────────────────
  AI_DS: {
    label: 'Artificial Intelligence & Data Science',
    all: [
      'Artificial Intelligence',
      'Artificial Intelligence And Data Analytics',
      'Artificial Intelligence And Data Engineering',
      'Artificial Intelligence And Data Science',
      'Artificial Intelligence And Data Science Transportation And Logistics',
      'Artificial Intelligence And Machine Learning',
      'Data Science And Artificial Intelligence',
      'Data Science And Engineering',
      'Computational And Data Science',
      'Statistics And Data Science',
      'Mathematics And Data Science',
      'Quantitative Economics And Data Science',
    ],
    top10: [
      'Artificial Intelligence',
      'Artificial Intelligence And Data Science',
      'Artificial Intelligence And Machine Learning',
      'Data Science And Artificial Intelligence',
      'Data Science And Engineering',
      'Artificial Intelligence And Data Analytics',
      'Artificial Intelligence And Data Engineering',
      'Computational And Data Science',
      'Statistics And Data Science',
      'Mathematics And Data Science',
    ],
  },

  // ── Electronics & Communication Engineering ───────────────────────────────
  ECE: {
    label: 'Electronics & Communication Engineering',
    all: [
      'Electronics And Communication Engineering',
      'Electronic Engineering',
      'Electronics Engineering',
      'Electronics And Instrumentation Engineering',
      'Electronics And Telecommunication Engineering',
      'Electronics And Electrical Communication Engineering',
      'Electronics And Electrical Engineering',
      'Electronics And Vlsi Engineering',
      'Electronics Engineering Vlsi Design And Technology',
      'Electronics And Communication Engineering Avionics',
      'Electronics And Communication Engineering Internet Of Things',
      'Electronics And Communication Engineering Rail Engineering',
      'Electronics And Communication Engineering Vlsi Design',
      'Electronics And Communication Engineering Vlsi Design And Technology',
      'Electronics And Communication Engineering With Minor In Wearable Electronics',
      'Electronics And Communication Engineering With Specialization In Design And Manufacturing',
      'Electronics And Communication Engineering With Specialization In Microelectronics And Vlsi System Design',
      'Electronics And Communication Engineering With Specialization In Vlsi And Embedded Systems',
      'Electronics And Communication Engineering With Specialization Of Embedded Systems And Internet Of Things',
      'Microelectronics And Vlsi',
      'Microelectronics And Vlsi Engineering',
      'Vlsi Design And Technology',
      'Integrated Circuit Design And Technology',
      'Electrical Engineering Ic Design And Technology',
      'Electrical Engineering Integrated Circuit Design And Technology',
      'Instrumentation And Biomedical Engineering',
      'Instrumentation And Control Engineering',
      'Instrumentation Engineering',
    ],
    top10: [
      'Electronics And Communication Engineering',
      'Electronics Engineering',
      'Electronics And Instrumentation Engineering',
      'Electronics And Vlsi Engineering',
      'Vlsi Design And Technology',
      'Electronics And Telecommunication Engineering',
      'Microelectronics And Vlsi',
      'Electronics And Communication Engineering With Specialization In Vlsi And Embedded Systems',
      'Instrumentation And Control Engineering',
      'Instrumentation Engineering',
    ],
  },

  // ── Electrical Engineering ────────────────────────────────────────────────
  EE: {
    label: 'Electrical Engineering',
    all: [
      'Electrical Engineering',
      'Electrical And Electronics Engineering',
      'Electronics And Electrical Engineering',
      'Elctrical Engineering',                          // typo variant in dataset
      'Electrical Engineering Power And Automation',
      'Electrical Engineering Rail Engineering',
      'Electrical Engineering With Specialization In Power System Engineering',
      'Energy Engineering',
      'Energy And Electrical Vehicle Engineering',
      'Sustainable Energy Technologies',
      'Industrial Internet Of Things',
    ],
    top10: [
      'Electrical Engineering',
      'Electrical And Electronics Engineering',
      'Electronics And Electrical Engineering',
      'Electrical Engineering Power And Automation',
      'Energy Engineering',
      'Electrical Engineering With Specialization In Power System Engineering',
      'Energy And Electrical Vehicle Engineering',
      'Sustainable Energy Technologies',
      'Electrical Engineering Rail Engineering',
      'Industrial Internet Of Things',
    ],
  },

  // ── Mechanical Engineering ────────────────────────────────────────────────
  MECH: {
    label: 'Mechanical Engineering',
    all: [
      'Mechanical Engineering',
      'Mechanical Engineering Rail Engineering',
      'Mechanical Engineering With Specialization In Design And Manufacturing',
      'Mechanical Engineering With Specialization In Manufacturing And Industrial Engineering',
      'Mechatronics And Automation Engineering',
      'Mechatronics Engineering',
      'Robotics And Ai',
      'Robotics And Automation',
      'Smart Manufacturing',
      'Manufacturing Science And Engineering',
      'Engineering Design',
      'Industrial Design',
    ],
    top10: [
      'Mechanical Engineering',
      'Mechatronics Engineering',
      'Mechatronics And Automation Engineering',
      'Robotics And Automation',
      'Robotics And Ai',
      'Smart Manufacturing',
      'Manufacturing Science And Engineering',
      'Mechanical Engineering With Specialization In Design And Manufacturing',
      'Engineering Design',
      'Industrial Design',
    ],
  },

  // ── Civil Engineering ─────────────────────────────────────────────────────
  CIVIL: {
    label: 'Civil Engineering',
    all: [
      'Civil Engineering',
      'Civil And Environmental Engineering',
      'Civil And Infrastructure Engineering',
      'Civil Engineering Rail Engineering',
      'Civil Engineering With Specialization In Construction Technology And Management',
      'Environmental Engineering',
      'Environmental Science And Engineering',
    ],
    top10: [
      'Civil Engineering',
      'Civil And Infrastructure Engineering',
      'Civil And Environmental Engineering',
      'Environmental Engineering',
      'Environmental Science And Engineering',
      'Civil Engineering With Specialization In Construction Technology And Management',
      'Civil Engineering Rail Engineering',
    ],
  },

  // ── Chemical Engineering ──────────────────────────────────────────────────
  CHEM: {
    label: 'Chemical Engineering',
    all: [
      'Chemical Engineering',
      'Chemical And Biochemical Engineering',
      'Chemical Science',
      'Chemical Science And Technology',
      'Chemical Sciences',
      'Chemical Technology',
      'Chemistry',
      'Chemistry With Specialization',
      'Industrial Chemistry',
      'Petroleum Engineering',
      'Pharmaceutical Engineering And Technology',
      'Biochemical Engineering',
      'Biotechnology And Biochemical Engineering',
    ],
    top10: [
      'Chemical Engineering',
      'Chemical And Biochemical Engineering',
      'Chemical Science And Technology',
      'Chemistry',
      'Petroleum Engineering',
      'Pharmaceutical Engineering And Technology',
      'Chemical Sciences',
      'Industrial Chemistry',
      'Biochemical Engineering',
      'Chemical Technology',
    ],
  },

  // ── Metallurgy & Materials ────────────────────────────────────────────────
  META: {
    label: 'Metallurgy & Materials Engineering',
    all: [
      'Metallurgical And Materials Engineering',
      'Metallurgical Engineering',
      'Metallurgical Engineering And Materials Science',
      'Metallurgy And Materials Engineering',
      'Materials Engineering',
      'Materials Science And Engineering',
      'Materials Science And Metallurgical Engineering',
      'Materials Science And Technology',
      'Material Science And Engineering',
      'Mineral And Metallurgical Engineering',
      'Ceramic Engineering',
    ],
    top10: [
      'Metallurgical And Materials Engineering',
      'Metallurgical Engineering',
      'Materials Science And Engineering',
      'Materials Engineering',
      'Metallurgy And Materials Engineering',
      'Metallurgical Engineering And Materials Science',
      'Materials Science And Metallurgical Engineering',
      'Ceramic Engineering',
      'Mineral And Metallurgical Engineering',
      'Materials Science And Technology',
    ],
  },

  // ── Aerospace Engineering ─────────────────────────────────────────────────
  AERO: {
    label: 'Aerospace & Aeronautical Engineering',
    all: [
      'Aerospace Engineering',
      'Aeronautical Engineering',
      'Aviation Engineering',
      'Space Science And Engineering',
      'Engineering Physics',                // IITs cluster it near Aero/Physics
    ],
    top10: [
      'Aerospace Engineering',
      'Aeronautical Engineering',
      'Aviation Engineering',
      'Space Science And Engineering',
      'Engineering Physics',
    ],
  },

  // ── Biotechnology & Biomedical ────────────────────────────────────────────
  BIO: {
    label: 'Biotechnology & Biomedical Engineering',
    all: [
      'Biotechnology',
      'Bio Technology',
      'Biotechnology And Biochemical Engineering',
      'Biotechnology And Bioinformatics',
      'Biomedical Engineering',
      'Bio Medical Engineering',
      'Bioengineering',
      'Bio Engineering',
      'Biological Engineering',
      'Biological Science',
      'Biological Sciences And Bioengineering',
      'Biosciences And Bioengineering',
      'Life Science',
      'Pharmaceutical Engineering And Technology',
    ],
    top10: [
      'Biotechnology',
      'Biomedical Engineering',
      'Bio Technology',
      'Bio Engineering',
      'Bioengineering',
      'Biological Sciences And Bioengineering',
      'Biosciences And Bioengineering',
      'Biotechnology And Bioinformatics',
      'Life Science',
      'Pharmaceutical Engineering And Technology',
    ],
  },

  // ── Mathematics & Computing ───────────────────────────────────────────────
  MATH: {
    label: 'Mathematics & Computing',
    all: [
      'Mathematics And Computing',
      'Mathematics And Computing Technology',
      'Mathematics And Data Science',
      'Mathematics And Scientific Computing',
      'Mathematics',
      'Computational Mathematics',
      'Computational Engineering And Mechanics',
      'Engineering And Computational Mechanics',
      'Physics And Computational Engineering',
      'Statistics And Data Science',
    ],
    top10: [
      'Mathematics And Computing',
      'Mathematics',
      'Mathematics And Scientific Computing',
      'Mathematics And Data Science',
      'Statistics And Data Science',
      'Computational Mathematics',
      'Mathematics And Computing Technology',
      'Computational Engineering And Mechanics',
      'Engineering And Computational Mechanics',
      'Physics And Computational Engineering',
    ],
  },

  // ── Production & Industrial Engineering ───────────────────────────────────
  PROD: {
    label: 'Production & Industrial Engineering',
    all: [
      'Production Engineering',
      'Production And Industrial Engineering',
      'Industrial And Production Engineering',
      'Industrial And Systems Engineering',
      'Industrial Engineering And Operations Research',
      'Manufacturing Science And Engineering',
      'Mechanical Engineering With Specialization In Manufacturing And Industrial Engineering',
    ],
    top10: [
      'Production Engineering',
      'Production And Industrial Engineering',
      'Industrial And Production Engineering',
      'Manufacturing Science And Engineering',
      'Industrial Engineering And Operations Research',
      'Industrial And Systems Engineering',
      'Mechanical Engineering With Specialization In Manufacturing And Industrial Engineering',
    ],
  },

  // ── Engineering Physics ───────────────────────────────────────────────────
  ENGG_PHY: {
    label: 'Engineering Physics & Sciences',
    all: [
      'Engineering Physics',
      'Engineering Science',
      'Physics',
      'Physical Science',
      'Physics With Specialization',
      'Physics And Computational Engineering',
      'Earth Sciences',
      'Applied Geology',
      'Applied Geophysics',
      'Exploration Geophysics',
      'Geological Technology',
      'Geophysical Technology',
    ],
    top10: [
      'Engineering Physics',
      'Physics',
      'Engineering Science',
      'Physical Science',
      'Earth Sciences',
      'Applied Geology',
      'Applied Geophysics',
      'Geological Technology',
      'Geophysical Technology',
      'Exploration Geophysics',
    ],
  },

  // ── Mining Engineering ────────────────────────────────────────────────────
  MINING: {
    label: 'Mining Engineering',
    all: [
      'Mining Engineering',
      'Mining Machinery Engineering',
      'Mineral And Metallurgical Engineering',
      'Petroleum Engineering',
    ],
    top10: [
      'Mining Engineering',
      'Mining Machinery Engineering',
      'Mineral And Metallurgical Engineering',
      'Petroleum Engineering',
    ],
  },

  // ── Other / Miscellaneous ─────────────────────────────────────────────────
  OTHER: {
    label: 'Other / Specialised',
    all: [
      'Agricultural And Food Engineering',
      'Agricultural Engineering',
      'Animation And Vfx',
      'Architecture',
      'Bachelor Of Design',
      'Carpet And Textile Technology',
      'Dairy Engineering',
      'Design',
      'Design Engineering',
      'Digital Agriculture',
      'Economics',
      'Fashion And Apparel Engineering',
      'Food Engineering And Technology',
      'Food Process Engineering',
      'Food Technology',
      'Food Technology And Management',
      'General Engineering',
      'Handloom And Textile Technology',
      'Interdisciplinary Sciences',
      'Naval Architecture And Ocean Engineering',
      'Ocean Engineering',
      'Printing And Packaging Technology',
      'Textile Technology',
    ],
    top10: [
      'Architecture',
      'Design',
      'Design Engineering',
      'Agricultural And Food Engineering',
      'Food Technology',
      'Food Engineering And Technology',
      'Textile Technology',
      'Bachelor Of Design',
      'Digital Agriculture',
      'Economics',
    ],
  },
};

// Ordered list for rendering the dropdown — most common streams first
export const STREAM_ORDER: StreamKey[] = [
  'CSE',
  'AI_DS',
  'ECE',
  'EE',
  'MECH',
  'CIVIL',
  'CHEM',
  'META',
  'AERO',
  'BIO',
  'MATH',
  'PROD',
  'ENGG_PHY',
  'MINING',
  'OTHER',
];

// ── Helper ────────────────────────────────────────────────────────────────────
// Returns the ≤10 branches to store/send for a given stream key.
export function getBranchesForStream(key: StreamKey): string[] {
  return STREAMS[key].top10;
}