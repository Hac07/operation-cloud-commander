"use client";

import { useState, useRef, useEffect } from "react";
import { trackEvent } from "@/lib/telemetry";

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/ambient-loop.mp3");
    audio.loop = true;
    audio.volume = 0.18;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setHasAudio(true), {
      once: true,
    });
    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    trackEvent("audio_toggle", { source: "audio_toggle_button" });

    if (!audioRef.current) return;
    if (next) {
      audioRef.current.play().catch(() => {
        // Auto-play blocked — silently ignore
        setEnabled(false);
      });
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Disable ambient audio" : "Enable ambient audio"}
      aria-pressed={enabled}
      title={
        hasAudio
          ? enabled
            ? "Audio: ON"
            : "Audio: OFF"
          : "Audio file not found"
      }
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        background: "rgba(3, 7, 30, 0.85)",
        border: `1px solid ${enabled ? "var(--color-cyan)" : "var(--color-cyan-dim)"}`,
        borderRadius: "var(--radius)",
        color: enabled ? "var(--color-cyan)" : "var(--color-steel)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
        padding: "0.4rem 0.75rem",
        cursor: "pointer",
        zIndex: 600,
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        transition: "all 0.15s ease",
        backdropFilter: "blur(8px)",
      }}
    >
      <span style={{ fontSize: "0.9rem" }}>{enabled ? "🔊" : "🔇"}</span>
      <span>{enabled ? "AUDIO ON" : "AUDIO OFF"}</span>
    </button>
  );
}
