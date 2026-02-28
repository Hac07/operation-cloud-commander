import { z } from "zod";
import type { PortfolioData } from "./types";
import rawData from "@/data/portfolio.json";

const ImpactMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  suffix: z.string().optional(),
});

const MissionSchema = z.object({
  id: z.string(),
  title: z.string(),
  tagline: z.string(),
  challenge: z.string(),
  solution: z.string(),
  impactMetrics: z.array(ImpactMetricSchema),
  techStack: z.array(z.string()),
  period: z.string(),
  company: z.string(),
  position: z.tuple([z.number(), z.number(), z.number()]),
  color: z.string(),
});

const PortfolioSchema = z.object({
  profile: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    phone: z.string(),
    email: z.string(),
    linkedin: z.string(),
    summary: z.string(),
  }),
  heroStats: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
      suffix: z.string().optional(),
    })
  ),
  skills: z.array(
    z.object({
      category: z.string(),
      skills: z.array(z.string()),
    })
  ),
  timeline: z.array(
    z.object({
      period: z.string(),
      role: z.string(),
      company: z.string(),
      summary: z.string(),
    })
  ),
  missions: z.array(MissionSchema),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      year: z.string(),
    })
  ),
  certifications: z.array(
    z.object({
      name: z.string(),
      issuer: z.string(),
      year: z.string(),
    })
  ),
  openToRoles: z.array(
    z.object({
      title: z.string(),
      type: z.string(),
    })
  ),
  contact: z.array(
    z.object({
      type: z.enum(["email", "phone", "linkedin", "resume"]),
      label: z.string(),
      href: z.string(),
      trackingEvent: z.string(),
    })
  ),
});

function loadPortfolioData(): PortfolioData {
  const result = PortfolioSchema.safeParse(rawData);
  if (!result.success) {
    console.error("Portfolio data validation failed:", result.error);
    // Return raw data cast as PortfolioData as fallback
    return rawData as unknown as PortfolioData;
  }
  return result.data as PortfolioData;
}

export const portfolioData: PortfolioData = loadPortfolioData();
