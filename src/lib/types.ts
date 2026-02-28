export interface HeroStat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
  suffix?: string;
}

export interface Mission {
  id: string;
  title: string;
  tagline: string;
  challenge: string;
  solution: string;
  impactMetrics: ImpactMetric[];
  techStack: string[];
  period: string;
  company: string;
  position: [number, number, number]; // 3D coordinates for hub
  color: string;
}

export interface SkillCluster {
  category: string;
  skills: string[];
}

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  summary: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface ContactChannel {
  type: "email" | "phone" | "linkedin" | "resume";
  label: string;
  href: string;
  trackingEvent: string;
}

export interface OpenToRole {
  title: string;
  type: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    summary: string;
  };
  heroStats: HeroStat[];
  skills: SkillCluster[];
  timeline: TimelineEntry[];
  missions: Mission[];
  education: Education[];
  certifications: Certification[];
  openToRoles: OpenToRole[];
  contact: ContactChannel[];
}

export interface TelemetryEvent {
  name:
    | "mission_open"
    | "cta_click"
    | "resume_download"
    | "contact_click"
    | "audio_toggle";
  missionId?: string;
  source: string;
  timestamp: string;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
