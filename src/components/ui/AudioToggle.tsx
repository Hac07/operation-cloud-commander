"use client";

import { useState, useRef } from "react";
import { trackEvent } from "@/lib/telemetry";

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const ctor = window.AudioContext || window.webkitAudioContext;
    if (!ctor) return; // very old browsers
    const ctx = new ctor();
    const gain = ctx.createGain();
    gain.gain.value = 0; // start muted
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 110; // low hum
    osc.connect(gain);
    osc.start();

    audioCtxRef.current = ctx;
    gainRef.current = gain;
    oscRef.current = osc;
  };

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    trackEvent("audio_toggle", { source: "audio_toggle_button" });

    initAudio();
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(
        next ? 0.03 : 0,
        audioCtxRef.current.currentTime,
        0.1
      );
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Disable ambient audio" : "Enable ambient audio"}
      aria-pressed={enabled}
      title={enabled ? "Audio: ON" : "Audio: OFF"}
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
