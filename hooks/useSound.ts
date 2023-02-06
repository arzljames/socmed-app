import React from "react";

const useSound = (sound: string) => {
  if (sound) {
    let audio: HTMLAudioElement = new Audio(sound);
    audio.play();
  }
};

export default useSound;
