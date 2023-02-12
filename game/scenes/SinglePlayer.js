import Base from "./Base";
import Button from "./utils/Button";

// returns random int between inputs(min,max)
function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class SinglePlayer extends Base {
  constructor() {
    super("SinglePlayer");
    this.retrievedRocket = this.getMetaData();
  }

  // preload assets
  preload() {
    this.load.audio("lasersound", "laser.mp3");
    this.load.audio("teleportsound", "teleport.mp3");
    this.load.audio("teleportReady", "teleportReady.mp3");
    this.load.audio("starGrab", "starGrab.wav");
    this.load.audio("rocketHit", "rocketHit.mp3");
    this.load.audio("meteorExplodes", "meteorExplodes.mp3");
    this.load.audio("gameOver", "gameOver.mp3");
    this.load.audio("gameMusic", "gameMusic.mp3");
    this.load.audio("thruster", "thruster.mp3");

    this.load.image("meteor", "meteor.png");
    this.load.image("star", "star.png");
    this.load.image("laser", "laser.png");
    this.load.image("rocket", "rocket.png");
    this.load.atlas(
      "rocketsprite",
      `rockets/${JSON.parse(this.retrievedRocket).name}.png`,
      "sprites.json"
    );
  }

  // game environment setup
  create() {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    // game started value
    this.started = false;
    // background
    this.bg = this.add
      .image(screenCenterX, screenCenterY, "background")
      .setOrigin(0.5)
      .setScale(1);
    this.hsv = Phaser.Display.Color.HSVColorWheel();

    // this.bg.setTint(this.hsv[200].color);

    // create animations player 1
    this.createAnimations();
    this.createKeys();

    // player 1 rocket and stats

    //oiip need to change
    this.rocket1 = this.addRocket("rocket", screenCenterX, screenCenterY);

    this.rocket1.body.setSize(90, 170);
    this.rocket1.setImmovable(true);
    this.rocket1.gameMode = "SinglePlayer";
    this.starQuant = this.rngBase(10, 25);
    // this.starQuant = 1;

    this.rocket1.firing = false;

    //adding laser sound
    this.laserSound = this.sound.add("lasersound", {
      volume: 0.01,
      loop: false,
    });
    this.rocket1.thruster = this.sound.add("thruster", {
      volume: 0.5,
      loop: true,
    });
    this.teleportSound = this.sound.add("teleportsound", {
      volume: 0.3,
      loop: false,
    });
    this.teleportReady = this.sound.add("teleportReady", {
      volume: 0.3,
      loop: false,
    });
    this.starGrab = this.sound.add("starGrab", { volume: 0.4, loop: false });
    this.rocketHit = this.sound.add("rocketHit", { volume: 0.5, loop: false });
    this.meteorExplodes = this.sound.add("meteorExplodes", {
      volume: 0.199,
      loop: false,
    });
    this.gameOver = this.sound.add("gameOver", { volume: 3, loop: false });
    this.gameMusic = this.sound.add("gameMusic", { volume: 0.09, loop: true });
    this.sound.volume = 0.4;
    this.sound.stopByKey("menuMusic");
    this.sound.stopByKey("thruster");

    let playing = false;

    for (let i = 0; i < this.sound.sounds.length; i++) {
      if (this.sound.sounds[i].key === "gameMusic") {
        if (this.sound.sounds[i].isPlaying === true) {
          playing = true;
        }
      }
    }
    if (playing !== true) {
      this.gameMusic.play();
    }

    // this.sound.mute = false;
    let localMute = window.localStorage.getItem("mute");
    if (localMute === "false") {
      this.sound.mute = false;
    } else {
      this.sound.mute = true;
    }
    this.muteTimer = 0;
    var muteDisplay = this.sound.mute ? "Unmuted" : "Muted";

    this.emergencyText = this.add
      .text(screenCenterX, screenCenterY - 70, "", {})
      .setFont(" Verdana, Audiowide")
      .setFontSize(30)
      .setResolution(8)
      .setOrigin(0.5, 0.5);

    this.startText = this.add.text(
      screenCenterX - 430,
      screenCenterY - 140,
      "Press any key on controller or keyboard to begin...",
      { font: "30px Audiowide" }
    );
    // this.startText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.helpText = this.add.text(
      screenCenterX - 400,
      screenCenterY - 80,
      "Collect all the stars to save your home planet!",
      { font: "30px Audiowide" }
    );
    // .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.addPauseButton("SinglePlayer");

    let stats1X = 1890;
    let stats1Y = 180;

    let stats2X = 1890;
    let stats2Y = -220;

    this.rocket1.highScoreText = this.add
      .text(stats1X + 0, stats1Y + 50, ``, {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.rocket1.highScoreText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.controls = this.add
      .text(stats1X + 0, stats1Y, ``, {
        // fill: " #00FF00",
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.controls.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.starsText = this.add
      .text(stats1X + 0, stats1Y + 100, ``, {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.starsText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.rocket1.muteToggle = this.add
      .text(stats1X + 0, stats1Y + 150, ``, {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.rocket1.muteToggle.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.rocket1.scoreText = this.add
      .text(stats1X + 0, stats1Y + 200, "", {
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);
    this.rocket1.scoreText.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.rocket1.fuelText = this.add
      .text(stats2X + 0, stats2Y + 350, "", {
        font: "20px Audiowide",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.rocket1.healthText = this.add
      .text(stats2X + 0, stats2Y + 300, "", {
        font: "20px Audiowide",
        fill: " #00FF00",
      })
      .setOrigin(1, 0);

    this.rocket1.teleportText = this.add
      .text(stats2X + 0, stats2Y + 250, ``, {
        // fill: " #00FF00",
        fill: " #00FF00",
        font: "20px Audiowide",
      })
      .setOrigin(1, 0);

    // after input from controller or keyboard, starts displaying & tracking game stats
    this.input.keyboard.on(
      "keydown",
      function (keyboard, button, index) {
        this.controls.setText("Using: Keyboard");
        this.rocket1.rotateValue /= 2;
        this.rocket1.rotateValue /= 2;
        this.started = true;

        this.startText.setText("");
        this.helpText.setText("");
        if (this.sound.mute === true) {
          this.rocket1.muteToggle.setText(`Muted`);
        } else {
          this.rocket1.muteToggle.setText(`Unmuted`);
        }
        this.rocket1.healthText.setText(
          `Health: ${(this.rocket1.Health / 1000).toFixed(2)}%`
        );
        this.rocket1.fuelText.setText(
          `Fuel: ${(this.rocket1.Fuel / 1000).toFixed(2)}%`
        );
        this.rocket1.scoreText.setText(
          `Score: ${this.rocket1.score.toFixed(0)}`
        );
        this.starsText.setText(`Stars Left: ${this.starQuant}`);
        this.rocket1.highScoreText.setText(this.rocket1.highscoretext);
        this.rocket1.teleportText.setText(this.rocket1.teleportmessage);
        this.rocket1.setImmovable(false);
      },
      this
    );

    this.input.gamepad.on(
      "down",
      function (pad, button, index) {
        this.controls.setText("Using: Controller");
        this.gamepad = pad;
        this.rocket1.rotateValue /= 2;
        this.started = true;

        this.startText.setText("");
        this.helpText.setText("");
        if (this.sound.mute === true) {
          this.rocket1.muteToggle.setText(`Muted`);
        } else {
          this.rocket1.muteToggle.setText(`Unmuted`);
        }
        this.rocket1.healthText.setText(
          `Health: ${(this.rocket1.Health / 1000).toFixed(2)}%`
        );
        this.rocket1.fuelText.setText(
          `Fuel: ${(this.rocket1.Fuel / 1000).toFixed(2)}%`
        );
        this.rocket1.scoreText.setText(
          `Score: ${this.rocket1.score.toFixed(0)}`
        );
        this.starsText.setText(`Stars Left: ${this.starQuant}`);
        this.rocket1.highScoreText.setText(this.rocket1.highscoretext);
        this.rocket1.teleportText.setText(this.rocket1.teleportmessage);
        this.rocket1.setImmovable(false);
      },
      this
    );

    //creating environment
    this.meteors = this.physics.add.group();
    this.stars = this.physics.add.group();

    this.rocket1.lasers = this.physics.add.group();
    this.rocket1.laserTimer = 0;
    this.rocket1.teleportTimer = 61;
    this.rocket1.depth = 10;

    this.createObjectRandomLocation(this.meteors, "meteor", 40, 1400, 10);
    this.createObjectRandomLocation(
      this.stars,
      "star",
      this.starQuant,
      1500,
      0
    );
  }

  // executed periodically while game is running
  update() {
    // allow objects to wrap around map
    this.physics.world.wrap(this.rocket1, 40);
    this.physics.world.wrap(this.meteors, 200);
    this.physics.world.wrap(this.stars, 150);

    // spins sprites in a group based on their individual speed
    this.spinGroup(this.meteors);
    this.spinGroup(this.stars);

    // game over logic
    if (this.started) {
      this.updateRocket(this.rocket1);
      if (this.rocket1.Fuel < 25000) {
        this.emergencyText.setText("Low Fuel Warning!");
      } else {
        this.emergencyText.setText("");
      }
      if (this.rocket1.Health < 10000 || this.rocket1.Fuel < 25000) {
        this.meteors.setTint(this.hsv[10].color);
        this.bg.setTint(this.hsv[10].color);
      } else {
        this.bg.setTint();
        this.meteors.setTint();
        this.stars.setTint();
        this.rocket1.setTint();
      }
      if (this.rocket1.Health === 0) {
        if (
          this.rocket1.score.toFixed(0) >
          parseInt(this.rocket1.highScore).toFixed(0)
        ) {
          window.localStorage.setItem("highScore", this.rocket1.score);
        }

        this.emergencyText.setText("");
        this.startGameOver("SinglePlayer", this.rocket1.score, "Health");
      }
      if (this.rocket1.Fuel === 0) {
        if (
          this.rocket1.score.toFixed(0) >
          parseInt(this.rocket1.highScore).toFixed(0) - 1
        ) {
          window.localStorage.setItem("highScore", this.rocket1.score);
        }
        this.emergencyText.setText("");
        this.startGameOver("SinglePlayer", this.rocket1.score, "Fuel");
      }
      if (this.starQuant === 0) {
        if (
          this.rocket1.score.toFixed(0) >
          parseInt(this.rocket1.highScore).toFixed(0) - 1
        ) {
          window.localStorage.setItem("highScore", this.rocket1.score);
        }
        // this.emergencyText.setText("");
        // let asd = 200;
        // this.bg.setTint(this.hsv[asd].color);
        // this.meteors.setTint(this.hsv[asd].color);
        // this.startGameOver("SinglePlayer", this.rocket1.score, "Stars");
        window.location.href = "/galaxy-quest/upgrade";
      }
    }

    // gamepad controls handler
    if (this.gamepad) {
      this.updateGamePadControls(this.rocket1, this.gamepad);
      // keyboard controls handler
    } else {
      // steer right
      if (this.cursors.right.isDown || this.dKey.isDown) {
        this.turnRight(this.rocket1, 0.7);
      }

      // steer left
      if (this.cursors.left.isDown || this.aKey.isDown) {
        this.turnLeft(this.rocket1, 0.7);
      }

      // shoot laser
      if (
        // (this.spaceKey.isDown || this.pointer.isDown) &&
        this.spaceKey.isDown &&
        this.time.now > this.rocket1.laserTimer
      ) {
        this.rocket1.laserTimer = this.time.now;
        this.fireLaser(this.rocket1, "laser", this.time.now);
        this.rocket1.laserTimer += 200;
      }

      // restart game
      if (this.rKey.isDown) {
        this.scene.restart();
      }

      //fire booster
      if (this.shiftKey.isDown || this.cursors.up.isDown || this.wKey.isDown) {
        if (this.shiftKey.isDown) {
          this.fireBooster(this.rocket1, 3);
        } else if (this.cursors.up.isDown || this.wKey.isDown) {
          this.fireBooster(this.rocket1, 1.4);
        }
        // default animation
      } else {
        this.default(this.rocket1);
      }
      // teleport
      if (this.eKey.isDown) {
        if (this.rocket1.teleportTimer.toFixed(0) > 60) {
          this.teleportSound.play();
          this.rocket1.setPosition(rng(0, 1500), rng(0, 1500));
          this.rocket1.teleportTimer = 0;
        }
      }
      // toggle mute
      if (this.mKey.isDown) {
        if (this.time.now > this.muteTimer) {
          this.muteTimer = this.time.now;
          this.muteTimer = this.time.now + 250;
          if (this.sound.mute === true) {
            window.localStorage.setItem("mute", false);
            this.sound.mute = false;
            this.rocket1.muteToggle.setText(`Unmuted`);
          } else {
            window.localStorage.setItem("mute", true);
            this.sound.mute = true;
            this.rocket1.muteToggle.setText(`Muted`);
          }
        }
      }
    }
  }
}
