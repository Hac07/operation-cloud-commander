"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioData, Mission } from "@/lib/types";
import MissionCard from "./MissionCard";
import CommandBar from "./CommandBar";
import { trackEvent } from "@/lib/telemetry";

interface Fallback2DHubProps {
  data: PortfolioData;
}

export default function Fallback2DHub({ data }: Fallback2DHubProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const handleMissionClick = (mission: Mission) => {
    setSelectedMission(mission);
    trackEvent("mission_open", { missionId: mission.id, source: "fallback_2d" });
    history.pushState(null, "", `#${mission.id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        backgroundImage:
          "linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        overflowY: "auto",
        paddingBottom: "80px",
      }}
      id="main-content"
    >
      {/* Header */}
      <header
        style={{
          padding: "2rem 1.5rem 1rem",
          borderBottom: "1px solid var(--color-cyan-dim)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-steel)",
            letterSpacing: "0.15em",
            marginBottom: "0.5rem",
          }}
        >
          OPERATION CLOUD COMMANDER
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.4rem, 5vw, 2.5rem)",
            fontWeight: 900,
            color: "var(--color-cyan)",
            textShadow: "0 0 24px rgba(0,245,212,0.4)",
            marginBottom: "0.5rem",
          }}
        >
          {data.profile.name}
        </h1>
        <div
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "1rem",
            color: "var(--color-steel-light)",
            marginBottom: "0.3rem",
          }}
        >
          {data.profile.title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-steel)",
          }}
        >
          {data.profile.location} · {data.profile.email} · {data.profile.phone}
        </div>
      </header>

      <main style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
        {/* Hero stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          {data.heroStats.map((stat) => (
            <div
              key={stat.id}
              className="hud-panel"
              style={{ padding: "1rem", textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "var(--color-cyan)",
                }}
              >
                {stat.value}
                {stat.suffix}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--color-steel)",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Missions */}
        <h2
          className="hud-label"
          style={{ marginBottom: "1rem", fontSize: "0.75rem" }}
        >
          Mission Index
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          {data.missions.map((mission) => (
            <motion.button
              key={mission.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMissionClick(mission)}
              aria-label={`Open mission: ${mission.title}`}
              className="hud-panel"
              style={{
                padding: "1.25rem",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                border: `1px solid ${mission.color}44`,
                background: "var(--color-bg-panel)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "flex-start",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: mission.color,
                    boxShadow: `0 0 8px ${mission.color}`,
                    flexShrink: 0,
                    marginTop: "3px",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      color: mission.color,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {mission.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: "var(--color-steel)",
                    }}
                  >
                    {mission.period} · {mission.company}
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.8rem",
                  color: "var(--color-steel-light)",
                  lineHeight: 1.5,
                }}
              >
                {mission.tagline}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Skills */}
        <h2
          className="hud-label"
          style={{ marginBottom: "1rem", fontSize: "0.75rem" }}
        >
          Capabilities
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {data.skills.map((cluster, i) => (
            <div key={i} className="hud-panel" style={{ padding: "0.75rem 1rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--color-cyan)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                {cluster.category}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {cluster.skills.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mission modal */}
      <AnimatePresence>
        {selectedMission && (
          <MissionCard
            mission={selectedMission}
            onClose={() => {
              setSelectedMission(null);
              history.pushState(null, "", " ");
            }}
          />
        )}
      </AnimatePresence>

      <CommandBar data={data} />
    </div>
  );
}
