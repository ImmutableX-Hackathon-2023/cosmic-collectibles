/*
  This file holds all base assets and functions
  so that other files can extend this class and access/override them.
*/

import Button from "./utils/Button";
export default class Base extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  getMetaData() {
    //testing
    return {
      name: "supernova",
      image: "thunderbird",
      speed: 8,
      health: 3,
      fuel: 4,
      rating: 2,
      id: "00f4cea2-aa41-11ed-afa1-0242ac120002",
    };
  }

  createKeys() {
    //keys player 1
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    this.cursors = this.input.keyboard.createCursorKeys();
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    // this.pointer = this.input.activePointer;
  }

  createAnimations() {
    // create animations player 1
    this.anims.create({
      key: "default",
      frames: this.anims.generateFrameNames("rocketsprite", {
        prefix: "firing",
        end: 0,
        zeroPad: 3,
      }),
      repeat: -1,
    });

    this.anims.create({
      key: "firing",
      frames: this.anims.generateFrameNames("rocketsprite", {
        prefix: "firing",
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      repeat: 0,
    });
  }

  // returns random int between inputs(min,max)
  rngBase(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // spins each sprite inside a group based on their current speed
  spinGroup(spriteGroup) {
    spriteGroup.getChildren().forEach((sprite) => {
      let spriteSpeed = sprite.body.velocity.x + sprite.body.velocity.y;
      if (sprite.body.speed > 200) {
        sprite.rotation += 0.0004 * spriteSpeed;
        sprite.body.speed = this.rngBase(0, 200);
      } else if (sprite.body.speed === 0) {
        sprite.body.velocity.x = this.rngBase(20, 100);
        sprite.body.velocity.y = this.rngBase(20, 100);
        let spriteSpeed = sprite.body.velocity.x + sprite.body.velocity.y;
        sprite.rotation += 0.0004 * spriteSpeed;
        sprite.body.speed = this.rngBase(0, 200);
        sprite.rotation -= 0.0004 * spriteSpeed;
      } else {
        sprite.rotation -= 0.0004 * spriteSpeed;
      }
    });
  }

  // adds rocket to game env using given sprite and coords
  addRocket(sprite, x, y) {
    this.retrievedRocket = this.getMetaData();
    let rocket = this.physics.add.sprite(x, y, sprite).setScale(0.35);
    this.healthRatio = this.retrievedRocket.health / 10;
    rocket.Health = 100000 * (this.healthRatio + 0.9);
    this.fuelRatio = this.retrievedRocket.fuel / 10;
    rocket.Fuel = 100000 * (this.fuelRatio + 0.9);
    rocket.score = 0;
    rocket.rotateValue = 0;
    rocket.checkWorldBounds = true;
    rocket.highScore = window.localStorage.getItem("highScore") || 0;
    rocket.highscoretext = `High Score: ${parseInt(rocket.highScore).toFixed(
      0
    )}`;
    rocket.teleporttext = `Teleport is recharging: ${(
      rocket.teleportTimer / 0.6
    ).toFixed(0)}%`;
    return rocket;
  }

  // physics for all rockets declared once here
  fireLaser(rocket, sprite) {
    // let laser = rocket.lasers.create(rocket.x, rocket.y, sprite);
    let laser = this.physics.add.sprite(rocket.x, rocket.y, sprite);
    rocket.lasers.add(laser);
    rocket.Fuel -= 10;
    this.fireBooster(rocket, 0);
    laser.depth = 0;
    laser.rotation = rocket.rotation + Math.PI / 2;
    laser.setScale(0.01);
    laser.setCollideWorldBounds(false);
    laser.setVelocityX(
      1000 * Math.sin(rocket.rotation) + rocket.body.velocity.x
    );
    laser.setVelocityY(
      -1000 * Math.cos(rocket.rotation) + rocket.body.velocity.y
    );
    this.laserSound.play();
  }

  // fire booster for a specific rocket, strength can be specified, default is 1
  fireBooster(rocket, strength = 1, demo = false) {
    if (demo == true) {
      rocket.anims.play("firing", true);
      let x = 2 * Math.sin(rocket.rotation);
      let y = -1 * 2 * Math.cos(rocket.rotation);
      rocket.setVelocityX(x * strength * 2);
      rocket.setVelocityY(y * strength * 2);
    } else {
      if (rocket.firing === false) {
        rocket.firing = true;
        rocket.thruster.play();
      }
      if (this.rocket1.gameMode !== "Freeplay") {
        if (strength > 3) {
          rocket.Fuel -= 22 * strength;
          rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
        } else {
          rocket.Fuel -= 14.7 * strength;
          rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
          rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
        }
        if (rocket.Fuel < 0) {
          rocket.Fuel = 0;
          rocket.fuelText.setText(`Fuel: 0.00%`);
          rocket.fuelText.setFill("#FF0000");
        } else if (rocket.Fuel < 30000) {
          rocket.fuelText.setFill("#FF0000");
        } else if (rocket.Fuel < 50000) {
          rocket.fuelText.setFill("#FFA500");
        } else if (rocket.Fuel < 80000) {
          rocket.fuelText.setFill("#FFFF00");
        } else if (rocket.Fuel > 80000) {
          rocket.fuelText.setFill("#00FF00");
        }
      }
      rocket.anims.play("firing", true);
      let x = 2 * Math.sin(rocket.rotation);
      let y = -1 * 2 * Math.cos(rocket.rotation);
      this.speedRatio = 0.4444 * this.retrievedRocket.speed;
      this.speedRatio += 0.55555;
      rocket.setVelocityX(
        rocket.body.velocity.x + x * strength * this.speedRatio
      );
      rocket.setVelocityY(
        rocket.body.velocity.y + y * strength * this.speedRatio
      );
    }
  }

  // steer right
  turnRight(rocket, strength = 0.7, demo = false) {
    if (demo == true) {
      rocket.rotation += 0.1 * strength;
      rocket.rotateValue = 0;
    } else {
      if (this.rocket1.gameMode !== "Freeplay") {
        rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
        if (rocket.Fuel < 0) {
          rocket.Fuel = 0;
          rocket.fuelText.setText(`Fuel: 0.00%`);
          rocket.fuelText.setFill("#FF0000");
        } else if (rocket.Fuel < 30000) {
          rocket.fuelText.setFill("#FF0000");
        } else if (rocket.Fuel < 50000) {
          rocket.fuelText.setFill("#FFA500");
        } else if (rocket.Fuel < 80000) {
          rocket.fuelText.setFill("#FFFF00");
        }
        rocket.rotation += 0.1 * strength;
        rocket.rotateValue = 0;
      }
    }
  }

  // steer left
  turnLeft(rocket, strength = 0.7, demo = false) {
    if (demo == true) {
      rocket.rotation -= 0.1 * strength;
      rocket.rotateValue = 0;
    } else {
      if (this.rocket1.gameMode !== "Freeplay") {
        rocket.fuelText.setText(`Fuel: ${(rocket.Fuel / 1000).toFixed(2)}%`);
        if (rocket.Fuel < 0) {
          rocket.Fuel = 0;
          rocket.fuelText.setText(`Fuel: 0.00%`);
          rocket.fuelText.setFill("#FF0000");
        } else if (rocket.Fuel < 30000) {
          rocket.fuelText.setFill("#FF0000");
        } else if (rocket.Fuel < 50000) {
          rocket.fuelText.setFill("#FFA500");
        } else if (rocket.Fuel < 80000) {
          rocket.fuelText.setFill("#FFFF00");
        }
      }
      rocket.rotation -= 0.1 * strength;
      rocket.rotateValue = 0;
    }
  }

  // play default animation
  default(rocket) {
    rocket.anims.play("default", true);
    rocket.firing = false;
    this.rocket1.thruster.stop();
  }

  // - spins rocket periodically if its been hit and is floating
  // - updates the score and teleport availability
  updateRocket(rocket) {
    rocket.rotation += rocket.rotateValue;
    if (rocket.teleportTimer < 65) {
      rocket.teleportTimer += 0.1;
    }
    if (Math.round(rocket.teleportTimer) === 60) {
      this.teleportReady.play();
    }
    rocket.score += 0.0008;
    if (this.rocket1.gameMode !== "Freeplay") {
      rocket.highscoretext = `High Score: ${parseInt(rocket.highScore).toFixed(
        0
      )}`;
      if (rocket.score.toFixed(0) > parseInt(rocket.highScore).toFixed(0) - 1) {
        // window.localStorage.setItem("highScore", rocket.score);
        rocket.highscoretext = `New High Score: ${parseInt(
          rocket.highScore
        ).toFixed(0)}`;
        rocket.highScore = rocket.score;
      }
      if (rocket.score < 0) {
        rocket.score = 0;
      }
      rocket.highScoreText.setText(rocket.highscoretext);
    }
    rocket.scoreText.setText(`Score: ${rocket.score.toFixed(0)}`);
    if (rocket.teleportTimer < 60) {
      rocket.teleportText.setFill(" #FF0000");
      rocket.teleportmessage = `Teleport is recharging: ${(
        rocket.teleportTimer / 0.6
      ).toFixed(0)}%`;
      rocket.teleportText.setText(rocket.teleportmessage);
    } else {
      rocket.teleportmessage = `Teleport: Available`;
      rocket.teleportText.setText(rocket.teleportmessage);
      rocket.teleportText.setFill(" #00FF00");
    }
  }

  // handles all controller inputs using a specified gamepad and rocket (can be used to expand to two player)
  // allows for multiple rockets and controllers
  updateGamePadControls(rocket, gamepad) {
    // steer left
    if (gamepad.left) {
      this.turnLeft(rocket);
    }

    // steer right
    if (gamepad.right) {
      this.turnRight(rocket);
    }

    // steer rocket
    if (gamepad.leftStick) {
      if (gamepad.leftStick.angle() != 0) {
        rocket.rotateValue = 0;
        rocket.rotation = gamepad.leftStick.angle() + Math.PI / 2;
      }
    }

    // reload game
    if (gamepad.B) {
      // location.reload();
      this.scene.restart();
    }

    // shoot laser
    if (gamepad.A && this.time.now > rocket.laserTimer) {
      rocket.laserTimer = this.time.now;
      this.fireLaser(rocket, "laser", this.time.now);
      if (rocket.gameMode === "Freeplay") {
        rocket.laserTimer += 70;
      } else {
        rocket.laserTimer += 200;
      }
    }

    // teleport
    if (gamepad.X) {
      if (rocket.teleportTimer.toFixed(0) > 60) {
        this.teleportSound.play();
        rocket.setPosition(this.rngBase(0, 1500), this.rngBase(0, 1500));
        rocket.teleportTimer = 0;
      }
    }

    // start button
    if (gamepad.buttons[9].pressed) {
      if (this.rocket1.gameMode === "SinglePlayer") {
        this.startPause("SinglePlayer");
      } else if (this.rocket1.gameMode === "Freeplay") {
        this.startPause("Freeplay");
      }
    }

    // mute toggle
    if (gamepad.R1) {
      if (this.time.now > this.muteTimer) {
        this.muteTimer = this.time.now;
        this.muteTimer = this.time.now + 250;
        if (this.sound.mute === true) {
          window.localStorage.setItem("mute", false);
          this.sound.mute = false;
          rocket.muteToggle.setText(`Unmuted`);
        } else {
          window.localStorage.setItem("mute", true);
          this.sound.mute = true;
          rocket.muteToggle.setText(`Muted`);
        }
      }
    }

    //thrust
    if (gamepad.R2 > 0 || gamepad.Y) {
      if (gamepad.Y) {
        this.fireBooster(rocket, 7.5);
      } else if (gamepad.R2 > 0) {
        this.fireBooster(rocket, 1.5 * gamepad.R2);
      }
    } else {
      this.default(rocket);
    }
  }

  // create sprites in random locations within a group
  createObjectRandomLocation(object, key, q, scale) {
    for (let i = 0; i < q; i++) {
      // object.create(this.rngBase(-1500, 1500), this.rngBase(-1500, 1500), key);
      let obj = this.physics.add.sprite(
        this.rngBase(-1500, 1500),
        this.rngBase(-1500, 1500),
        key
      );
      if (key === "star") {
        this.stars.add(obj);
        obj.rotation = this.rngBase(-100, 100);
        obj.setScale(0.1);
        obj.body.setMaxVelocity(200);
        obj.body
          .setVelocity(this.rngBase(-120, 120), this.rngBase(-120, 120))
          .setSize(500, 500)
          .setBounce(1);
        obj.body.isCircle = true;
        this.physics.add.collider(
          obj,
          this.stars,
          () => null, //function
          null,
          this
        );
        this.physics.add.overlap(obj, this.rocket1, () => {
          if (this.started) {
            this.starGrab.play();
            if (this.rocket1.gameMode !== "Freeplay") {
              this.rocket1.Fuel += 20000;
              this.rocket1.score +=
                (obj.body.speed + this.rocket1.body.speed) / 2;
              this.rocket1.highScore =
                window.localStorage.getItem("highScore") || 0;
              if (this.rocket1.Fuel < 0) {
                this.rocket1.Fuel = 0;
                this.rocket1.fuelText.setText(`Fuel: 0.00%`);
                this.rocket1.fuelText.setFill("#FF0000");
              } else if (this.rocket1.Fuel > 100000) {
                this.rocket1.Fuel = 100000;
              } else if (this.rocket1.Fuel < 30000) {
                this.rocket1.fuelText.setFill("#FF0000");
              } else if (this.rocket1.Fuel < 50000) {
                this.rocket1.fuelText.setFill("#FFA500");
              } else if (this.rocket1.Fuel < 80000) {
                this.rocket1.fuelText.setFill("#FFFF00");
              }
              this.rocket1.fuelText.setText(
                `Fuel: ${(this.rocket1.Fuel / 1000).toFixed(2)}%`
              );
            } else {
              this.rocket1.score +=
                (obj.body.speed + this.rocket1.body.speed) / 2;
            }
            obj.destroy();
            this.starQuant -= 1;
            this.starsText.setText(`Stars Left: ${this.starQuant}`);
          }
        });
      } else {
        this.meteors.add(obj);
        obj
          .setBounce(this.rngBase(6, 10) * 0.1)
          .setScale(this.rngBase(4, 13) * 0.1);
        obj.rotation = this.rngBase(1, 100);
        obj.body
          .setVelocity(this.rngBase(-120, 120), this.rngBase(-120, 120))
          .setMaxSpeed(1000)
          .setSize(50, 50);
        this.physics.add.collider(
          this.meteors,
          this.meteors,
          () => null,
          null,
          this
        );
        this.physics.add.collider(
          this.rocket1,
          obj,
          () => {
            if (this.started) {
              if (this.rocket1.gameMode !== "Freeplay") {
                if (this.rocket1.body.speed > 100) {
                  this.rocketHit.play();
                  this.rocket1.Health -=
                    Math.abs(
                      obj.scale * this.rocket1.body.speed * obj.body.speed
                    ) * 0.6;
                } else {
                  this.rocket1.Health -=
                    Math.abs(
                      obj.scale * this.rocket1.body.speed * obj.body.speed
                    ) * 4.4;
                }
                this.rocket1.rotateValue += this.rngBase(-5, 5) * 0.007;
                this.rocket1.score -= 200;
                this.rocket1.highScore =
                  window.localStorage.getItem("highScore") || 0;
                this.cameras.main.shake(
                  this.rocket1.body.speed * obj.body.speed * obj.scale * 0.02,
                  0.01
                );
                this.rocket1.healthText.setText(
                  `Health: ${(this.rocket1.Health / 1000).toFixed(2)}%`
                );
                if (this.rocket1.Health < 0) {
                  this.rocket1.Health = 0;
                  this.rocket1.healthText.setText(`Health: 0.00%`);
                  this.rocket1.healthText.setFill("#FF0000");
                } else if (this.rocket1.Health < 30000) {
                  this.rocket1.healthText.setFill("#FF0000");
                } else if (
                  this.rocket1.Health > 50000 &&
                  this.rocket1.Health < 80000
                ) {
                  this.rocket1.healthText.setFill("#FFA500");
                } else if (
                  this.rocket1.Health < 50000 &&
                  this.rocket1.Health > 30000
                ) {
                  this.rocket1.healthText.setFill("#FFFF00");
                } else {
                  this.rocket1.healthText.setFill("#00FF00");
                }
              } else {
                this.cameras.main.shake(130, 0.01);
              }
            }
          },
          null,
          this
        );
        this.physics.add.overlap(obj, this.rocket1.lasers, (meteor, laser) => {
          this.cameras.main.shake(obj.scale * 70, 0.01);
          this.meteorExplodes.play();
          this.rocket1.score += 200;
          this.rocket1.highScore =
            window.localStorage.getItem("highScore") || 0;
          this.createObjectRandomLocation(this.meteors, "meteor", 1, 1400, 10);
          meteor.destroy();
          laser.destroy();
        });
      }
    }
  }

  startGameOver(sceneName, finalScore, event) {
    let message;
    if (event === "Health") {
      message = "Your ship took too much damage!";
    } else if (event === "Fuel") {
      message = "You're stranded in space without any fuel!";
    } else if (event === "Stars") {
      message =
        "Your planet will survive the energy crisis \n     because you collected all the stars!";
    }
    this.scene.pause(sceneName);
    this.sound.stopByKey("thruster");
    this.gameOver.play();
    this.scene.run("GameOver", {
      sceneName: sceneName,
      finalScore: `Final Score: ${parseInt(finalScore).toFixed(0)}`,
      message: message,
      event: event,
    });
  }

  addPauseButton(scene) {
    this.asd = new Button(
      100,
      100,
      "| |",
      this,
      () => {
        if (scene === "SinglePlayer") {
          this.startPause("SinglePlayer");
        } else if (scene === "Freeplay") {
          this.startPause("Freeplay");
        }
      },
      2
    );
  }

  startPause(sceneName) {
    this.scene.pause(sceneName);
    this.sound.pauseAll();
    this.sound.stopByKey("thruster");
    this.scene.launch("Pause", {
      sceneName: sceneName,
    });
  }

  // just for fun
  flyInfinityLoop(rocket) {
    this.fireBooster(rocket, rocket.speedDemo, true);
    if (rocket.direction === "left") {
      if (rocket.left === "small") {
        this.turnLeft(rocket, rocket.speedDemo / this.rngBase(100, 300), true);
      } else {
        this.turnLeft(rocket, rocket.speedDemo / this.rngBase(600, 700), true);
      }
    } else {
      if (rocket.right === "small") {
        this.turnRight(rocket, rocket.speedDemo / this.rngBase(100, 300), true);
      } else {
        this.turnRight(rocket, rocket.speedDemo / this.rngBase(600, 700), true);
      }
    }

    rocket.collided = rocket.body.checkWorldBounds();
    if (rocket.collided === true) {
      rocket.body.rotation = 0;
      rocket.x = this.screenCenterX;
      rocket.y = this.screenCenterY + 20;
    }

    if (
      rocket.body.rotation < 2.9 &&
      rocket.body.rotation > -2.9 &&
      this.time.now > rocket.turnTimer
    ) {
      rocket.turnTimer = this.time.now;
      if (rocket.direction === "right") {
        rocket.speedDemo = this.rngBase(10, 200);
        rocket.direction = "left";
        if (this.right === "small") {
          this.right = "big";
        } else {
          this.right = "small";
        }
      } else {
        rocket.speedDemo = this.rngBase(10, 200);
        rocket.direction = "right";
        if (rocket.left === "small") {
          rocket.left = "big";
        } else {
          rocket.left = "small";
        }
      }
      rocket.turnTimer += 100;
    }
  }
}
