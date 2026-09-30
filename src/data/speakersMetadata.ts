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
    "id": "abdullah-amer",
    "name": "Abdullah Amer",
    "role": "Founder • Business Systems • Operations & Leadership",
    "avatar": "/assets/avatars/abdullah-amer.jpeg",
    "questionCount": 10,
    "originalIndex": 0
  },
  {
    "id": "ahmed-fathy",
    "name": "Ahmed Fathy",
    "role": "Founder • Complex-Market Venture • Sustainability & Logistics",
    "avatar": "/assets/avatars/ahmed-fathy.jpeg",
    "questionCount": 10,
    "originalIndex": 1
  },
  {
    "id": "amany-helmy",
    "name": "Amany Helmy",
    "role": "Founder & CEO • People Growth Strategist • HR Entrepreneur",
    "avatar": "/assets/avatars/amany-helmy.jpeg",
    "questionCount": 10,
    "originalIndex": 2
  },
  {
    "id": "amr-abdel-karim",
    "name": "Amr Abdel Karim",
    "role": "Founder & Managing Partner • Strategic Executive • Commercial Transformation",
    "avatar": "/assets/avatars/amr-abdel-karim.png",
    "questionCount": 10,
    "originalIndex": 3
  },
  {
    "id": "aya-hamza",
    "name": "Aya Hamza",
    "role": "HR Professional • Professional Coach • Trainer",
    "avatar": "/assets/avatars/aya-hamza.png",
    "questionCount": 10,
    "originalIndex": 4
  },
  {
    "id": "ayman-el-sherbiny",
    "name": "Ayman El-Sherbiny",
    "role": "LinkedIn Creator • Personal-Branding Consultant • Career-Development Entrepreneur",
    "avatar": "/assets/avatars/ayman-el-sherbiny.jpeg",
    "questionCount": 10,
    "originalIndex": 5
  },
  {
    "id": "heba-soliman",
    "name": "Heba Soliman",
    "role": "Founder • Fashion Entrepreneurship • Wholesale Clothing",
    "avatar": "/assets/avatars/heba-soliman.jpeg",
    "questionCount": 10,
    "originalIndex": 6
  },
  {
    "id": "khaled-helmy",
    "name": "Khaled Helmy",
    "role": "Innovator / Creator • Supply Chain & S&OP • Dual Career",
    "avatar": "/assets/avatars/khaled-helmy.jpeg",
    "questionCount": 10,
    "originalIndex": 7
  },
  {
    "id": "manar-barr",
    "name": "Manar Barr",
    "role": "Founder • Etiquette & Executive Presence • Service Business",
    "avatar": "/assets/avatars/manar-barr.png",
    "questionCount": 10,
    "originalIndex": 8
  },
  {
    "id": "medhat-yassin",
    "name": "Medhat Yassin",
    "role": "Founder • Commercial Strategy • Business Transformation",
    "avatar": "/assets/avatars/medhat-yassin.jpeg",
    "questionCount": 10,
    "originalIndex": 9
  },
  {
    "id": "moataz-mousa",
    "name": "Moataz Mousa",
    "role": "Innovator / Founder • Learning & Development • Education",
    "avatar": "/assets/avatars/moataz-mousa.jpeg",
    "questionCount": 10,
    "originalIndex": 10
  },
  {
    "id": "mohamed-al-sheikh",
    "name": "Mohamed Al Sheikh",
    "role": "Mindset Coach • Community Builder • Personal Branding Mentor",
    "avatar": "/assets/avatars/mohamed-al-sheikh.png",
    "questionCount": 10,
    "originalIndex": 11
  },
  {
    "id": "mohamed-el-demerdash",
    "name": "Mohamed El-Demerdash",
    "role": "Founder • Logistics & E-commerce Infrastructure • Long-Term Business Building",
    "avatar": "/assets/avatars/mohamed-el-demerdash.jpeg",
    "questionCount": 10,
    "originalIndex": 12
  },
  {
    "id": "mohamed-hossam",
    "name": "Mohamed Hossam",
    "role": "Creator • Digital Strategy • Growth & Marketing",
    "avatar": "/assets/avatars/mohamed-hossam.jpeg",
    "questionCount": 10,
    "originalIndex": 13
  },
  {
    "id": "mostafa-gabr",
    "name": "Mostafa Gabr",
    "role": "Founder • Productivity & Management Systems",
    "avatar": "/assets/avatars/mostafa-gabr.jpeg",
    "questionCount": 10,
    "originalIndex": 14
  },
  {
    "id": "omer-dagher",
    "name": "Omer Dagher",
    "role": "Creator • Mobile Video Production • Training",
    "avatar": "/assets/avatars/omer-dagher.jpeg",
    "questionCount": 10,
    "originalIndex": 15
  },
  {
    "id": "salah-abo-el-magd",
    "name": "Salah Abo El-Magd",
    "role": "CEO • Entrepreneur • International Sales Trainer • Leadership Coach",
    "avatar": "/assets/avatars/salah-abo-el-magd.jpeg",
    "questionCount": 10,
    "originalIndex": 16
  },
  {
    "id": "sherine-helmy",
    "name": "Sherine Helmy",
    "role": "Chairman & CEO • Pharmaceutical Manufacturing • Business Leadership",
    "avatar": "/assets/avatars/sherine-helmy.png",
    "questionCount": 10,
    "originalIndex": 17
  }
];
