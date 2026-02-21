"use client";

/**
 * Custom hook to handle the VertexWeb brand click sound.
 * Note: Place 'click.mp3' in your /public/sounds/ folder.
 */
export const useClickSound = () => {
  const playClick = () => {
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.4;

    // play() returns a promise; we catch to avoid console errors
    // if the user hasn't interacted with the DOM yet.
    audio.play().catch(() => {});
  };

  return { playClick };
};