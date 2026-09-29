// Lightweight speaker metadata for initial gallery load
// Contains only: id, name, role, avatar, question count, original index
// Full interview questions are lazy-loaded on demand

export interface SpeakerMetadata {
  id: string;
  name: string;
  role: string;
  avatar: string;
  questionCount: number;
  originalIndex: number;
}

export const SPEAKERS_METADATA: SpeakerMetadata[] = [
  {
    id: "abdullah-amer",
    name: "Abdullah Amer",
    role: "Founder • Business Systems • Operations & Leadership",
    avatar: "/assets/avatars/abdullah-amer.svg",
    questionCount: 10,
    originalIndex: 0
  },
  {
    id: "ahmed-fathy",
    name: "Ahmed Fathy",
    role: "Founder • Complex-Market Venture • Sustainability & Logistics",
    avatar: "/assets/avatars/ahmed-fathy.svg",
    questionCount: 10,
    originalIndex: 1
  },
  {
    id: "amany-helmy",
    name: "Amany Helmy",
    role: "Founder & CEO • People Growth Strategist • HR Entrepreneur",
    avatar: "/assets/avatars/amany-helmy.svg",
    questionCount: 10,
    originalIndex: 2
  },
  {
    id: "amr-abdel-karim",
    name: "Amr Abdel Karim",
    role: "Founder & Managing Partner • Strategic Executive • Commercial Transformation",
    avatar: "/assets/avatars/amr-abdel-karim.svg",
    questionCount: 10,
    originalIndex: 3
  },
  {
    id: "aya-hamza",
    name: "Aya Hamza",
    role: "HR Professional • Professional Coach • Trainer",
    avatar: "/assets/avatars/aya-hamza.svg",
    questionCount: 10,
    originalIndex: 4
  },
  {
    id: "ayman-el-sherbiny",
    name: "Ayman El-Sherbiny",
    role: "LinkedIn Creator • Personal-Branding Consultant • Career-Development Entrepreneur",
    avatar: "/assets/avatars/ayman-el-sherbiny.svg",
    questionCount: 10,
    originalIndex: 5
  },
  {
    id: "heba-soliman",
    name: "Heba Soliman",
    role: "Founder • Fashion Entrepreneurship • Wholesale Clothing",
    avatar: "/assets/avatars/heba-soliman.svg",
    questionCount: 10,
    originalIndex: 6
  },
  {
    id: "khaled-helmy",
    name: "Khaled Helmy",
    role: "Innovator / Creator • Supply Chain & S&OP • Dual Career",
    avatar: "/assets/avatars/khaled-helmy.svg",
    questionCount: 10,
    originalIndex: 7
  },
  {
    id: "manar-barr",
    name: "Manar Barr",
    role: "Founder • Etiquette & Executive Presence • Service Business",
    avatar: "/assets/avatars/manar-barr.svg",
    questionCount: 10,
    originalIndex: 8
  },
  {
    id: "marwan-alghalibi",
    name: "Marwan Al-Ghalibi",
    role: "Founder • Sustainability & Social Impact • Renewable Energy",
    avatar: "/assets/avatars/marwan-alghalibi.svg",
    questionCount: 10,
    originalIndex: 9
  },
  {
    id: "mina-louis",
    name: "Mina Louis",
    role: "Founder & CEO • EdTech • Learning Technologies",
    avatar: "/assets/avatars/mina-louis.svg",
    questionCount: 10,
    originalIndex: 10
  },
  {
    id: "nadia-ismail",
    name: "Nadia Ismail",
    role: "Founder • Digital Transformation • Enterprise Solutions",
    avatar: "/assets/avatars/nadia-ismail.svg",
    questionCount: 10,
    originalIndex: 11
  },
  {
    id: "omar-waly",
    name: "Omar Waly",
    role: "Founder • Fintech • Digital Payments & Financial Services",
    avatar: "/assets/avatars/omar-waly.svg",
    questionCount: 10,
    originalIndex: 12
  },
  {
    id: "ramy-el-saadany",
    name: "Ramy El-Saadany",
    role: "Founder • E-Commerce • Digital Retail & Consumer Tech",
    avatar: "/assets/avatars/ramy-el-saadany.svg",
    questionCount: 10,
    originalIndex: 13
  },
  {
    id: "sarah-hassan",
    name: "Sarah Hassan",
    role: "Founder • Healthcare Technology • Digital Health Innovation",
    avatar: "/assets/avatars/sarah-hassan.svg",
    questionCount: 10,
    originalIndex: 14
  },
  {
    id: "tamer-abdel-maksoud",
    name: "Tamer Abdel Maksoud",
    role: "Founder & CEO • B2B SaaS • Enterprise Software",
    avatar: "/assets/avatars/tamer-abdel-maksoud.svg",
    questionCount: 10,
    originalIndex: 15
  },
  {
    id: "yasmine-el-sherif",
    name: "Yasmine El-Sherif",
    role: "Founder • Creative Services • Digital Marketing & Branding",
    avatar: "/assets/avatars/yasmine-el-sherif.svg",
    questionCount: 10,
    originalIndex: 16
  },
  {
    id: "zahra-khan",
    name: "Zahra Khan",
    role: "Founder • Hospitality • Tourism & Travel Tech",
    avatar: "/assets/avatars/zahra-khan.svg",
    questionCount: 10,
    originalIndex: 17
  }
];
