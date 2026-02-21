"use client";

export const useTypewriterSound = () => {
  const playType = () => {
    const audio = new Audio('/sounds/type.mp3');
    audio.volume = 0.3; // Keep it subtle so it's not annoying
    audio.play().catch(() => {});
  };

  return { playType };
};