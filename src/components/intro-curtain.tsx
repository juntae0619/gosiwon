"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const INTRO_KEY = "hosilgo-intro-seen";

export function IntroCurtain({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<"doors" | "logo" | "done">("doors");

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      onComplete();
      return;
    }
    setShow(true);
    sessionStorage.setItem(INTRO_KEY, "1");

    const t1 = setTimeout(() => setPhase("logo"), 900);
    const t2 = setTimeout(() => setPhase("done"), 1800);
    const t3 = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[#1A1614]" />

          {/* Left door */}
          <motion.div
            className="absolute inset-y-0 left-0 z-10 w-1/2 origin-left bg-gradient-to-br from-[#3d2f28] to-[#1A1614]"
            initial={{ x: 0 }}
            animate={phase !== "doors" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="absolute right-8 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#D4A24C]/80 shadow-[0_0_20px_#D4A24C]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </motion.div>

          {/* Right door */}
          <motion.div
            className="absolute inset-y-0 right-0 z-10 w-1/2 origin-right bg-gradient-to-bl from-[#3d2f28] to-[#1A1614]"
            initial={{ x: 0 }}
            animate={phase !== "doors" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Light burst */}
          <motion.div
            className="absolute inset-0 z-[5]"
            style={{
              background:
                "radial-gradient(circle at center, #F7F3ED 0%, rgba(247,243,237,0.4) 40%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              phase !== "doors"
                ? { opacity: 1, scale: 1.5 }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.8 }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === "logo" || phase === "done"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
          >
            <p className="font-serif text-sm tracking-[0.35em] text-[#D4A24C] uppercase">
              room by room
            </p>
            <h1 className="mt-2 font-serif text-5xl font-bold text-[#FFFCF7] md:text-6xl">
              호실고
            </h1>
            <p className="mt-3 text-sm text-[#E8E0D4]/80">
              호실 단위로 고르는 숙소 예약
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
