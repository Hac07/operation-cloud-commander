"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { PortfolioData } from "@/lib/types";

interface ImpactLedgerProps {
  data: PortfolioData;
  onMissionSelect: (missionId: string) => void;
}

function AnimatedCounter({
  value,
  duration = 1.8,
}: {
  value: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
    const suffix = value.match(/[^0-9.]*$/)?.[0] ?? "";
    const steps = 40;
    const interval = (duration * 1000) / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numeric;
      const formatted = numeric % 1 === 0 ? Math.round(current).toString() : current.toFixed(2);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{display}</span>;
}

export default function ImpactLedger({
  data,
  onMissionSelect,
}: ImpactLedgerProps) {
  return (
    <aside
      aria-label="Impact Ledger and Skills"
      style={{
        width: "var(--panel-width)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        className="hud-panel"
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          margin: "0.75rem 0.75rem 0.75rem 0",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--color-cyan-dim)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: 0,
          }}
        >
          <div className="status-dot" />
          <span className="hud-label">Impact Ledger</span>
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: "1rem" }}>
          {/* Hero stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            {data.heroStats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid var(--color-cyan-dim)",
                  borderRadius: "var(--radius)",
                  padding: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--color-cyan)",
                    textShadow: "0 0 12px rgba(0,245,212,0.5)",
                  }}
                >
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix && (
                    <span style={{ fontSize: "0.65em", opacity: 0.7 }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    color: "var(--color-steel)",
                    marginTop: "0.2rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Missions quick access */}
          <div className="hud-label" style={{ marginBottom: "0.75rem" }}>
            Mission Index
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              marginBottom: "1.5rem",
            }}
          >
            {data.missions.map((mission) => (
              <button
                key={mission.id}
                onClick={() => onMissionSelect(mission.id)}
                aria-label={`Open mission: ${mission.title}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "rgba(0,0,0,0.2)",
                  border: `1px solid ${mission.color}33`,
                  borderRadius: "var(--radius)",
                  padding: "0.5rem 0.75rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = mission.color;
                  (e.currentTarget as HTMLButtonElement).style.background = `${mission.color}11`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${mission.color}33`;
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.2)";
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: mission.color,
                    boxShadow: `0 0 6px ${mission.color}`,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--color-white)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
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
                    {mission.period}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Skills */}
          <div
            style={{
              height: "1px",
              background: "var(--color-cyan-dim)",
              marginBottom: "1.25rem",
            }}
          />
          <div className="hud-label" style={{ marginBottom: "0.75rem" }}>
            Capabilities
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.skills.map((cluster, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--color-cyan)",
                    letterSpacing: "0.1em",
                    marginBottom: "0.4rem",
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
