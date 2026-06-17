import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  DraftingCompass,
  Eye,
  Gem,
  Handshake,
  HardHat,
  HeartHandshake,
  Medal,
  Pickaxe,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  titleKey: string;
  title: string;
  summary: string;
  description: string;
  scope: string[];
  scopeKeys: string[];
  icon: LucideIcon;
  image: string;
};

export type ProjectCategory =
  | "In Progress"
  | "Hospitality"
  | "Residential"
  | "Commercial"
  | "Institutional";

export type Project = {
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  status: "Completed" | "In Progress";
  details: string;
  role: string;
  image: string;
  galleryImages: string[];
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export const brand = {
  name: "Omega",
  fullName: "Omega Contracting & Trading",
  tagline: "Contracting and Trading",
  website: "www.omega-tc.com",
  email: "info@omega-tc.com",
  established: "2003",
  phone: "+2 03-4690058",
  mobile: "+2 010 69 771 773",
  chairman: "Eng. Sayed El-Feshawy",
};

export const offices = [
  {
    city: "Alexandria Office",
    address:
      "399 El-Geish Road, San Stefano Grand Plaza, Tower 2, 4th Floor, Alexandria, Egypt",
    phone: "+2 03-4690058",
    mobile: "+2 010 69 772 771",
  },
  {
    city: "Cairo Office",
    address:
      "A424 North 90th Street, Fifth Settlement, Office 409, 4th Floor, Cairo Business Plaza, New Cairo",
    phone: "+2 03-4690058",
    mobile: "+2 010 69 771 773",
  },
];

export const images = {
  hero: "/images/obsidier/obsidiertowers.jpg",
  about:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85",
  skyline:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2200&q=85",
  towers:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=85",
  team:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=85",
  blueprint:
    "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1600&q=85",
  interior:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  mep:
    "https://images.unsplash.com/photo-1581092919535-7146ff1a590b?auto=format&fit=crop&w=1600&q=85",
  business:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
  contact:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85",
};

export const heroSlides = [
  images.hero,
  "/images/obsidier/towers.jpg",
  images.skyline,
];

export const stats = [
  { value: 20, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Luxury Clients" },
  { value: 100, suffix: "%", label: "Quality Commitment" },
];

export const services: Service[] = [
  {
    titleKey: "generalContracting",
    title: "General Contracting & Construction",
    summary:
      "Turnkey construction for residential, commercial, and hospitality projects.",
    description:
      "Turnkey construction covering civil, architectural, and MEP works with strict adherence to safety, quality, and deadlines.",
    scope: [
      "Residential, Commercial & Hospitality Projects",
      "Civil & Structural Works",
      "Architectural Finishing",
      "MEP Integration",
      "Safety & Quality Compliance",
    ],
    scopeKeys: [
      "generalContractingScope1",
      "generalContractingScope2",
      "generalContractingScope3",
      "generalContractingScope4",
      "generalContractingScope5",
    ],
    icon: HardHat,
    image: images.about,
  },
  {
    titleKey: "designEngineering",
    title: "Design & Engineering",
    summary:
      "Integrated architectural, structural, and MEP design with BIM coordination.",
    description:
      "Integrated design, BIM coordination, 3D visualization, and value engineering for buildable, cost-efficient solutions.",
    scope: [
      "BIM Coordination",
      "3D Visualization",
      "Structural Design",
      "Value Engineering",
    ],
    scopeKeys: [
      "designEngineeringScope1",
      "designEngineeringScope2",
      "designEngineeringScope3",
      "designEngineeringScope4",
    ],
    icon: DraftingCompass,
    image: images.blueprint,
  },
  {
    titleKey: "interiorFitOut",
    title: "Interior Fit-Out & Finishing",
    summary: "Luxury interior finishing for villas, hotels, and offices.",
    description:
      "High-end finishing that combines craftsmanship, design precision, and durable functionality across premium environments.",
    scope: ["Villas", "Hotels", "Corporate Offices", "Royal Suites", "Ballrooms"],
    scopeKeys: [
      "interiorFitOutScope1",
      "interiorFitOutScope2",
      "interiorFitOutScope3",
      "interiorFitOutScope4",
      "interiorFitOutScope5",
    ],
    icon: Gem,
    image: images.interior,
  },
  {
    titleKey: "projectManagement",
    title: "Project Management & Supervision",
    summary: "Comprehensive oversight from planning to delivery.",
    description:
      "Planning, scheduling, coordination, quality control, and risk management throughout every project stage.",
    scope: ["Scheduling", "Quality Control", "Risk Management", "Coordination"],
    scopeKeys: [
      "projectManagementScope1",
      "projectManagementScope2",
      "projectManagementScope3",
      "projectManagementScope4",
    ],
    icon: ClipboardCheck,
    image: images.business,
  },
  {
    titleKey: "mep",
    title: "Electromechanical (MEP) Services",
    summary: "HVAC, plumbing, electrical, and fire-fighting systems.",
    description:
      "Design and installation of tested, commissioned, and optimized building systems for demanding projects.",
    scope: ["HVAC", "Plumbing", "Electrical", "Fire Fighting", "Smart Systems"],
    scopeKeys: [
      "mepScope1",
      "mepScope2",
      "mepScope3",
      "mepScope4",
      "mepScope5",
    ],
    icon: Zap,
    image: images.mep,
  },
  {
    titleKey: "designBuild",
    title: "Design-Build Solutions",
    summary: "Single-point responsibility for design and construction.",
    description:
      "Integrated design and execution for faster delivery, tighter coordination, and clearer cost control.",
    scope: ["Design Leadership", "Build Coordination", "Cost Control", "Fast Delivery"],
    scopeKeys: [
      "designBuildScope1",
      "designBuildScope2",
      "designBuildScope3",
      "designBuildScope4",
    ],
    icon: Building2,
    image: images.skyline,
  },
  {
    titleKey: "renovation",
    title: "Renovation & Maintenance",
    summary: "Refurbishment and modernization of existing structures.",
    description:
      "Modernization, preventive maintenance, system upgrades, and renovation works for operational assets.",
    scope: ["Refurbishment", "Modernization", "Maintenance", "System Upgrades"],
    scopeKeys: [
      "renovationScope1",
      "renovationScope2",
      "renovationScope3",
      "renovationScope4",
    ],
    icon: Wrench,
    image: images.towers,
  },
  {
    titleKey: "clientSupport",
    title: "Client & Consultant Support",
    summary: "Technical studies, procurement follow-up, and handover support.",
    description:
      "Technical documentation, variation analysis, as-built records, procurement follow-up, and final handover.",
    scope: ["Technical Studies", "As-Built Documentation", "Procurement", "Training"],
    scopeKeys: [
      "clientSupportScope1",
      "clientSupportScope2",
      "clientSupportScope3",
      "clientSupportScope4",
    ],
    icon: Handshake,
    image: images.contact,
  },
];

export const timeline = [
  ["2003", "Company founded through the merger of specialized firms"],
  ["2005", "First luxury hospitality project"],
  ["2010", "Four Seasons Alexandria partnership"],
  ["2015", "Expansion to Cairo market"],
  ["2020", "International standards certification"],
  ["2025", "Obsidier Towers in the New Administrative Capital"],
];

export const pillars = [
  {
    title: "Vision",
    icon: Eye,
    text: "To remain a benchmark of efficiency and ethical professionalism, earning the privilege of being the first choice for clients seeking quality, trust, and innovation.",
  },
  {
    title: "Goal",
    icon: Target,
    text: "To become one of the leading contracting companies in Egypt and the region, recognized for excellence in delivery and integrity in every endeavor.",
  },
  {
    title: "Mission",
    icon: Rocket,
    text: "To continuously elevate the sophistication and quality of our work, exceeding client expectations and setting new standards in contracting.",
  },
];

export const values = [
  ["Integrity", "Transparency, fairness, and respect in all our dealings", ShieldCheck],
  ["Commitment", "Time, energy, and expertise to honor every promise", BadgeCheck],
  ["Excellence", "Perfection through innovation and attention to detail", Medal],
  ["Customer Satisfaction", "Meeting and exceeding client expectations", Sparkles],
  ["Loyalty", "Long-term relationships based on mutual respect", HeartHandshake],
  ["Quality Assurance", "Rigorous systems and audits to ensure quality foundations", ClipboardCheck],
] as const;

export const projects: Project[] = [
  {
    slug: "obsidier-towers",
    name: "Obsidier Towers",
    location: "New Administrative Capital",
    category: "In Progress",
    status: "In Progress",
    details: "110m height, 25 floors, mixed-use, 13,500m2 land area.",
    role: "Main Contractor",
    image: images.hero,
    galleryImages: [images.hero, "/images/obsidier/towers.jpg"],
  },
  {
    slug: "four-seasons-beach-cabanas-alex",
    name: "Four Seasons Beach Cabanas - Alex",
    location: "Alexandria",
    category: "Hospitality",
    status: "Completed",
    details: "Private beach villas, royal suites, and luxury cabanas.",
    role: "Main & Sub-Contractor",
    image: "/images/obsidier/towers.jpg",
    galleryImages: ["/images/obsidier/towers.jpg", images.interior, images.towers],
  },
  {
    slug: "hilton-corniche-alex",
    name: "Hilton Corniche - Alex",
    location: "Alexandria",
    category: "Hospitality",
    status: "Completed",
    details: "Full renovation, ballroom, conference halls, restaurants, and royal suites.",
    role: "Main Contractor",
    image: images.interior,
    galleryImages: [images.interior, images.business, images.contact],
  },
  {
    slug: "four-seasons-nile-plaza-cairo",
    name: "Four Seasons Nile Plaza - Cairo",
    location: "Cairo",
    category: "Hospitality",
    status: "Completed",
    details: "Royal suites, ballroom, and luxury finishes.",
    role: "Sub-Contractor",
    image: images.contact,
    galleryImages: [images.contact, images.interior, images.business],
  },
  {
    slug: "four-seasons-sharm-el-sheikh",
    name: "Four Seasons Hotel & Resort - Sharm El-Sheikh",
    location: "Sharm El-Sheikh",
    category: "Hospitality",
    status: "Completed",
    details: "Main restaurant, dive center, and 11 housekeeping buildings.",
    role: "Main Contractor",
    image: images.skyline,
    galleryImages: [images.skyline, images.towers, images.about],
  },
  {
    slug: "four-seasons-hotel-resort-alex",
    name: "Four Seasons Hotel & Resort - Alex",
    location: "Alexandria",
    category: "Hospitality",
    status: "Completed",
    details: "157 residential units, hotel interiors, ballroom, and health club.",
    role: "Main & Sub-Contractor",
    image: images.interior,
    galleryImages: [images.interior, images.about, images.business],
  },
  {
    slug: "four-seasons-villas-alex",
    name: "Four Seasons Villas - Alex",
    location: "Alexandria",
    category: "Hospitality",
    status: "Completed",
    details: "Structural, architectural, electromechanical, and high-end finishing.",
    role: "Main Contractor",
    image: images.about,
    galleryImages: [images.about, images.towers, images.interior],
  },
  {
    slug: "kempinski-hotel-cairo",
    name: "Kempinski Hotel",
    location: "Cairo",
    category: "Hospitality",
    status: "Completed",
    details: "Architectural and electromechanical works.",
    role: "Sub-Contractor",
    image: images.mep,
    galleryImages: [images.mep, images.blueprint, images.interior],
  },
  {
    slug: "careem-hq-alex",
    name: "Careem HQ",
    location: "Alexandria",
    category: "Commercial",
    status: "Completed",
    details: "Corporate office fit-out.",
    role: "Contractor",
    image: images.business,
    galleryImages: [images.business, images.contact, images.interior],
  },
  {
    slug: "allianz-misr-hq-alex",
    name: "Allianz Misr HQ",
    location: "Alexandria",
    category: "Commercial",
    status: "Completed",
    details: "Full office fit-out.",
    role: "Contractor",
    image: images.business,
    galleryImages: [images.business, images.interior, images.contact],
  },
  {
    slug: "san-stefano-complex-alex",
    name: "San Stefano Complex",
    location: "Alexandria",
    category: "Commercial",
    status: "Completed",
    details: "Residential, mall, and health club works.",
    role: "Contractor",
    image: images.skyline,
    galleryImages: [images.skyline, images.about, images.towers],
  },
  {
    slug: "cairo-university-media-studio",
    name: "Cairo University Faculty of Media Studio",
    location: "Cairo",
    category: "Institutional",
    status: "Completed",
    details: "Media studio delivery and fit-out.",
    role: "Contractor",
    image: images.blueprint,
    galleryImages: [images.blueprint, images.business, images.mep],
  },
  {
    slug: "mak-paradise-villas",
    name: "MAK Paradise Villas",
    location: "King Mariout, Alexandria",
    category: "Residential",
    status: "Completed",
    details: "Private residential villas.",
    role: "Contractor",
    image: images.towers,
    galleryImages: [images.towers, images.about, images.interior],
  },
];

export const clients = [
  "Four Seasons",
  "Hilton",
  "Kempinski",
  "TMG",
  "AXA",
  "Allianz",
  "Careem",
  "Accor Hotels",
  "Radisson",
  "St Regis",
  "San Stefano",
  "Steigenberger",
  "JAZ Hotel Group",
  "Bank Audi",
  "VSE Aviation",
  "School of Research Science",
];

export const preferredPartners = [
  "Sigma Consultants & Contractors",
  "ACC (Talaat Mostafa Group)",
  "Square Engineering Firm",
  "DEPA Hotel Interiors",
  "Richmond Group Egypt",
  "Vibrant",
  "First Group",
  "Alexandria Modern Architecture Company",
  "Alicon",
  "City Light Company",
  "Themar Real Estate",
  "El-Memary Group",
  "EGEC",
  "Arabian Construction Company",
];

export const privateProjects = [
  "Villa of Mr. Abdalla Elraghey - Madinaty, New Cairo",
  "Seven VIP Villas - Madinaty, New Cairo",
  "Villa of Mr. Farouk El-Feshawy - Al-Dokki, Cairo & Al-Agamy, Alexandria",
  "Villa of Dr. Hanaa Abdel Rahman Albaidany - North Coast & Nile Plaza",
  "Gardinya Wedding Hall - El-Sadat City, Menoufiya",
  "Villa of Mr. Ahmad El-Kady - El-Shorouk City",
  "Villa of Eng. Ayman Ananny - 6th of October",
  "Villa of Mr. Amr Ismaiel - Al-Rehab City",
  "Villa of Sheikh Aboud El-Amoudy - Madinaty",
  "Villa of Mr. Kariem El-Masry - Al-Solimania, Cairo",
  "Villa of Mr. Ahmed Hazem Amen - 6th of October City",
];

export const processSteps = [
  ["Consultation", "Understanding your vision and requirements", ClipboardCheck],
  ["Design", "Engineering and architectural planning", DraftingCompass],
  ["Construction", "Precision execution on site", Pickaxe],
  ["Quality Check", "Rigorous standards compliance", ShieldCheck],
  ["Handover", "Delivery with full documentation", Medal],
] as const;

export const businessPoints = [
  "Full management of project documentation",
  "Development of detailed work schedules",
  "Compliance with international quality standards",
  "Continuous coordination between all stakeholders",
  "Competitive costs and timely completion",
];

export const projectTypes = [
  "General Contracting",
  "Design & Engineering",
  "Interior Fit-Out",
  "MEP Services",
  "Project Management",
  "Renovation",
  "Other",
];

export const seoDescription =
  "Omega Contracting and Trading is Egypt's premier construction company since 2003, delivering luxury hospitality, commercial, and residential projects.";
