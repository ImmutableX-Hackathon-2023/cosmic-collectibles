import Phaser, { Game } from "phaser";

import Freeplay from "./scenes/Freeplay";
import GameOver from "./scenes/GameOver";
import MainMenu from "./scenes/MainMenu";
import Pause from "./scenes/Pause";
import SinglePlayer from "./scenes/SinglePlayer";
import {get_wallet_address} from "../src/components/Login2";

// const get_wallet_address= require('../src/components/Login2')

export default function main() {
  const width = 1920;
  const height = 1070;

  if (window.localStorage.getItem("mute") === null) {
    window.localStorage.setItem("mute", false);
  }

  const wallet_address = get_wallet_address();
  window.localStorage.setItem('wallet_address', wallet_address);

  var config = {
    type: Phaser.AUTO,
    canvasStyle: "border-radius: 45px; padding:10px 5px 10px 5px",
    transparent: true,
    input: {
      gamepad: true,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0, x: 0 },
        // debug: true,
      },
    },

    scene: [MainMenu, SinglePlayer, Freeplay, Pause, GameOver],
    // scene: [MainMenu, GameOver, FreePlay, SinglePlayer, TwoPlayer],
    scale: {
      mode: Phaser.Scale.FIT,
      // parent: "root",
      parent: "game-display",
      // autoCenter: Phaser.Scale.CENTER_BOTH,
      width: width,
      height: height,
    },
  };
  document.fonts.load('1rem "Audiowide"').then(() => {
    document.getElementById("loading").innerHTML = "";
    document.getElementById("game-display").innerHTML = "";
    const game = new Phaser.Game(config);
    // if (document.getElementById("game-display").childNodes.length === 1) {}
  });
}
