"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeOverlayProps {
  onClose?: () => void;
}

export default function WelcomeOverlay({ onClose }: WelcomeOverlayProps) {
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return !localStorage.getItem("welcomeSeen");
    } catch {
      return true;
    }
  });

  const close = () => {
    setVisible(false);
    try {
      localStorage.setItem("welcomeSeen", "1");
    } catch {}
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(3,7,30,0.85)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: "var(--color-bg)",
              border: "1px solid var(--color-cyan-dim)",
              borderRadius: "var(--radius)",
              maxWidth: "480px",
              width: "100%",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-cyan)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Welcome to the Mission Hub
            </h2>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-steel)",
                fontSize: "0.85rem",
                marginBottom: "1rem",
                lineHeight: 1.4,
              }}
            >
              Explore the 3D nodes to view mission details, scroll the side
              panels for timeline and impact, and toggle audio with the button
              in the top‑right. You can close the overlay anytime by clicking
              the button below or pressing <kbd>Esc</kbd>.
            </p>
            <button
              onClick={close}
              style={{
                fontFamily: "var(--font-mono)",
                background: "var(--color-cyan)",
                color: "var(--color-bg)",
                border: "none",
                borderRadius: "var(--radius)",
                padding: "0.6rem 1.2rem",
                cursor: "pointer",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
              }}
            >
              Got it, thanks!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
