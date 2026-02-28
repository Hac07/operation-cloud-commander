"use client";

import type { PortfolioData } from "@/lib/types";
import { trackEvent } from "@/lib/telemetry";

interface CommandBarProps {
  data: PortfolioData;
}

const ICONS: Record<string, string> = {
  email: "✉",
  linkedin: "in",
  resume: "↓",
  phone: "☎",
};

export default function CommandBar({ data }: CommandBarProps) {
  const primary = data.contact.find((c) => c.type === "email");
  const secondaries = data.contact.filter((c) => c.type !== "email");

  const handleClick = (
    type: string,
    trackingEvent: string,
    missionId?: string
  ) => {
    trackEvent(
      trackingEvent as
        | "cta_click"
        | "resume_download"
        | "contact_click"
        | "audio_toggle"
        | "mission_open",
      { source: "command_bar", missionId }
    );
  };

  return (
    <nav
      aria-label="Command Bar – Quick Actions"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "var(--bar-height)",
        background: "rgba(3, 7, 30, 0.96)",
        borderTop: "1px solid var(--color-cyan-dim)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "0 1rem",
        zIndex: 500,
        flexWrap: "wrap",
      }}
    >
      {/* Status indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          marginRight: "0.5rem",
        }}
      >
        <div className="status-dot" />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--color-cyan)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Open to roles
        </span>
      </div>

      {/* Primary CTA */}
      {primary && (
        <a
          href={primary.href}
          className="btn-primary"
          onClick={() => handleClick(primary.type, primary.trackingEvent)}
          aria-label={primary.label}
        >
          <span>{ICONS[primary.type]}</span>
          <span>{primary.label}</span>
        </a>
      )}

      {/* Secondary CTAs */}
      {secondaries.map((channel) => (
        <a
          key={channel.type}
          href={channel.href}
          className="btn-secondary"
          target={channel.type === "linkedin" ? "_blank" : undefined}
          rel={channel.type === "linkedin" ? "noopener noreferrer" : undefined}
          download={channel.type === "resume" ? true : undefined}
          onClick={() => handleClick(channel.type, channel.trackingEvent)}
          aria-label={channel.label}
        >
          <span>{ICONS[channel.type]}</span>
          <span>{channel.label}</span>
        </a>
      ))}
    </nav>
  );
}
