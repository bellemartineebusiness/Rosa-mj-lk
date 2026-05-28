"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  text: string[];
  speed?: number;
  deleteSpeed?: number;
  waitTime?: number;
  cursorChar?: string;
  cursorClassName?: string;
}

export function Typewriter({
  text,
  speed = 60,
  deleteSpeed = 35,
  waitTime = 1800,
  cursorChar = "|",
  cursorClassName = "",
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = text[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), waitTime);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % text.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, text, speed, deleteSpeed, waitTime]);

  return (
    <>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={cursorClassName}
      >
        {cursorChar}
      </motion.span>
    </>
  );
}
