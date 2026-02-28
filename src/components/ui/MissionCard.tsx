"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { Mission } from "@/lib/types";
import { trackEvent } from "@/lib/telemetry";

interface MissionCardProps {
  mission: Mission;
  onClose: () => void;
}

export default function MissionCard({ mission, onClose }: MissionCardProps) {
  useEffect(() => {
    trackEvent("mission_open", { missionId: mission.id, source: "modal" });
  }, [mission.id]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Mission: ${mission.title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="hud-panel"
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <div>
              <div className="hud-label" style={{ marginBottom: "0.4rem" }}>
                {mission.period} · {mission.company}
              </div>
              <h2
                className="hud-title"
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.5rem)",
                  color: mission.color,
                  textShadow: `0 0 16px ${mission.color}88`,
                  marginBottom: "0.4rem",
                }}
              >
                {mission.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "var(--color-steel-light)",
                  fontStyle: "italic",
                }}
              >
                {mission.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close mission details"
              style={{
                background: "transparent",
                border: "1px solid var(--color-cyan-dim)",
                color: "var(--color-steel)",
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                width: "36px",
                height: "36px",
                borderRadius: "var(--radius)",
                cursor: "pointer",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              marginTop: "1rem",
              height: "1px",
              background: `linear-gradient(90deg, ${mission.color}66, transparent)`,
            }}
          />
        </div>

        {/* Impact metrics */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="hud-label" style={{ marginBottom: "0.75rem" }}>
            Impact Metrics
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "0.75rem",
            }}
          >
            {mission.impactMetrics.map((metric, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${mission.color}44`,
                  borderRadius: "var(--radius)",
                  padding: "0.75rem 1rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
                    color: mission.color,
                    textShadow: `0 0 10px ${mission.color}66`,
                    fontWeight: 700,
                  }}
                >
                  {metric.value}
                  <span style={{ fontSize: "0.7em", opacity: 0.8 }}>
                    {metric.suffix}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--color-steel)",
                    marginTop: "0.25rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div className="hud-label" style={{ marginBottom: "0.5rem" }}>
            Challenge
          </div>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "var(--color-steel-light)",
            }}
          >
            {mission.challenge}
          </p>
        </div>

        {/* Solution */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="hud-label" style={{ marginBottom: "0.5rem" }}>
            Solution Deployed
          </div>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "var(--color-steel-light)",
            }}
          >
            {mission.solution}
          </p>
        </div>

        {/* Tech stack */}
        <div>
          <div className="hud-label" style={{ marginBottom: "0.6rem" }}>
            Tech Stack
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {mission.techStack.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
