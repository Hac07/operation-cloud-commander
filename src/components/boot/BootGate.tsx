"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootGateProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "INITIALIZING OPERATION CLOUD COMMANDER...",
  "LOADING MISSION DATABASE............... OK",
  "ESTABLISHING SECURE CHANNEL............ OK",
  "MOUNTING AWS TELEMETRY GRID............ OK",
  "VERIFYING OPERATOR CREDENTIALS......... OK",
  "CLOUD INFRASTRUCTURE SCAN COMPLETE..... OK",
  "5 MISSIONS LOADED. STANDBY.",
];

export default function BootGate({ onComplete }: BootGateProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const skip = useCallback(() => {
    setSkipped(true);
    setTimeout(onComplete, 300);
  }, [onComplete]);

  useEffect(() => {
    if (skipped) return;

    const timeout = setTimeout(() => {
      if (visibleLines < BOOT_LINES.length) {
        setVisibleLines((v) => v + 1);
      } else {
        setDone(true);
      }
    }, visibleLines === 0 ? 400 : 340);

    return () => clearTimeout(timeout);
  }, [visibleLines, skipped]);

  useEffect(() => {
    if (!done || skipped) return;
    const t = setTimeout(onComplete, 800);
    return () => clearTimeout(t);
  }, [done, skipped, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") skip();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [skip]);

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--color-bg)",
            zIndex: 9000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          aria-label="Boot sequence loading"
          role="status"
          aria-live="polite"
        >
          {/* Radar circle */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "1px solid rgba(0,245,212,0.08)",
              boxShadow: "0 0 60px rgba(0,245,212,0.05)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px solid rgba(0,245,212,0.06)",
              pointerEvents: "none",
            }}
          />

          {/* Center logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
                fontWeight: 900,
                color: "var(--color-cyan)",
                textShadow: "0 0 30px var(--color-cyan), 0 0 60px rgba(0,245,212,0.3)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              OPERATION
            </div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(0.8rem, 2.5vw, 1.1rem)",
                fontWeight: 700,
                color: "var(--color-steel)",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
              }}
            >
              CLOUD COMMANDER
            </div>
          </motion.div>

          {/* Terminal lines */}
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              lineHeight: 2,
              color: "var(--color-steel-light)",
            }}
          >
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <span style={{ color: "var(--color-cyan)", opacity: 0.6 }}>{">"}</span>
                <span>{line}</span>
              </motion.div>
            ))}
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: "1rem",
                  color: "var(--color-cyan)",
                  animation: "blink 1s ease infinite",
                  fontWeight: 500,
                }}
              >
                ▶ PRESS ENTER TO DEPLOY
              </motion.div>
            )}
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: "4rem",
              width: "100%",
              maxWidth: "560px",
              padding: "0 1rem",
            }}
          >
            <div
              style={{
                height: "2px",
                background: "rgba(0,245,212,0.15)",
                borderRadius: "1px",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{
                  width: `${(visibleLines / BOOT_LINES.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "var(--color-cyan)",
                  boxShadow: "0 0 8px var(--color-cyan)",
                }}
              />
            </div>
          </div>

          {/* Skip button */}
          <button
            onClick={skip}
            aria-label="Skip boot sequence"
            style={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
              background: "transparent",
              border: "1px solid var(--color-cyan-dim)",
              color: "var(--color-steel)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              padding: "0.4rem 0.8rem",
              cursor: "pointer",
              borderRadius: "var(--radius)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = "var(--color-cyan)";
              (e.target as HTMLButtonElement).style.borderColor = "var(--color-cyan)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color = "var(--color-steel)";
              (e.target as HTMLButtonElement).style.borderColor = "var(--color-cyan-dim)";
            }}
          >
            [ESC] SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
