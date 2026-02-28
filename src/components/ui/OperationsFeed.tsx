"use client";

import { motion } from "framer-motion";
import type { PortfolioData } from "@/lib/types";

interface OperationsFeedProps {
  data: PortfolioData;
}

export default function OperationsFeed({ data }: OperationsFeedProps) {
  return (
    <aside
      aria-label="Operations Feed – Professional Timeline"
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
          margin: "0.75rem 0 0.75rem 0.75rem",
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
          <span className="hud-label">Operations Feed</span>
        </div>

        <div style={{ overflowY: "auto", flex: 1, padding: "1rem" }}>
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--color-cyan)",
                textShadow: "0 0 12px rgba(0,245,212,0.4)",
                marginBottom: "0.2rem",
              }}
            >
              {data.profile.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.85rem",
                color: "var(--color-steel-light)",
                marginBottom: "0.5rem",
              }}
            >
              {data.profile.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--color-steel)",
                marginBottom: "0.75rem",
              }}
            >
              📍 {data.profile.location}
            </div>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.8rem",
                lineHeight: 1.6,
                color: "var(--color-steel-light)",
              }}
            >
              {data.profile.summary}
            </p>
          </motion.div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--color-cyan-dim)",
              marginBottom: "1.25rem",
            }}
          />

          {/* Timeline */}
          <div className="hud-label" style={{ marginBottom: "1rem" }}>
            Deployment History
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {data.timeline.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                style={{ display: "flex", gap: "0.75rem", paddingBottom: "1.25rem" }}
              >
                {/* Timeline connector */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "var(--color-cyan)",
                      border: "2px solid var(--color-bg)",
                      boxShadow: "0 0 8px var(--color-cyan)",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  />
                  {i < data.timeline.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        flex: 1,
                        minHeight: "20px",
                        background: "var(--color-cyan-dim)",
                        marginTop: "4px",
                      }}
                    />
                  )}
                </div>

                {/* Entry content */}
                <div style={{ flex: 1 }}>
                  <div
                    className="hud-label"
                    style={{ fontSize: "0.6rem", marginBottom: "0.2rem" }}
                  >
                    {entry.period}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--color-white)",
                      marginBottom: "0.1rem",
                    }}
                  >
                    {entry.role}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      color: "var(--color-cyan)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {entry.company}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "0.78rem",
                      lineHeight: 1.5,
                      color: "var(--color-steel)",
                    }}
                  >
                    {entry.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div
            style={{
              height: "1px",
              background: "var(--color-cyan-dim)",
              marginBottom: "1.25rem",
            }}
          />
          <div className="hud-label" style={{ marginBottom: "0.75rem" }}>
            Education
          </div>
          {data.education.map((edu, i) => (
            <div
              key={i}
              style={{
                marginBottom: "0.75rem",
                fontFamily: "var(--font-ui)",
                fontSize: "0.82rem",
              }}
            >
              <div style={{ color: "var(--color-white)", fontWeight: 600 }}>
                {edu.degree}
              </div>
              <div style={{ color: "var(--color-steel)", fontSize: "0.75rem" }}>
                {edu.institution} · {edu.year}
              </div>
            </div>
          ))}

          {/* Certifications */}
          <div
            style={{
              height: "1px",
              background: "var(--color-cyan-dim)",
              margin: "1rem 0",
            }}
          />
          <div className="hud-label" style={{ marginBottom: "0.75rem" }}>
            Certifications
          </div>
          {data.certifications.map((cert, i) => (
            <div
              key={i}
              style={{
                marginBottom: "0.6rem",
                fontFamily: "var(--font-ui)",
                fontSize: "0.8rem",
                display: "flex",
                gap: "0.4rem",
              }}
            >
              <span style={{ color: "var(--color-cyan)", marginTop: "1px" }}>▸</span>
              <div>
                <div style={{ color: "var(--color-white)", fontWeight: 600 }}>
                  {cert.name}
                </div>
                <div
                  style={{
                    color: "var(--color-steel)",
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {cert.issuer} · {cert.year}
                </div>
              </div>
            </div>
          ))}

          {/* Open to roles */}
          <div
            style={{
              height: "1px",
              background: "var(--color-cyan-dim)",
              margin: "1rem 0",
            }}
          />
          <div className="hud-label" style={{ marginBottom: "0.75rem" }}>
            Open To
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {data.openToRoles.map((role, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.8rem",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--color-cyan)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "var(--color-white)" }}>{role.title}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--color-cyan)",
                    background: "rgba(0,245,212,0.08)",
                    padding: "0.1rem 0.4rem",
                    borderRadius: "2px",
                    marginLeft: "auto",
                  }}
                >
                  {role.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
