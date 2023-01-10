import Button from "./utils/Button";
import Base from "./Base";

export default class MainMenu extends Base {
  constructor() {
    super("MainMenu");
    this.singlePlayer;
    this.twoPlayer;
    this.freeplayButton;
  }
  preload() {
    this.load.image("background", "bg.jpeg");
    this.load.image("meteor", "meteor.png");
    this.load.image("laser", "laser.png");
    this.load.image("rocket", "rocket.png");
    this.load.atlas("rocketsprite", "rocket-sprite.png", "rocket-sprite.json");
    this.load.image("meteor", "meteor.png");

    this.load.audio("menuMusic", "menuMusic.mp3");
    this.load.audio("buttonClick", "buttonClick.mp3");
  }

  create() {
    this.pointer = this.input.activePointer;
    this.menuMusic = this.sound.add("menuMusic", { volume: 0.01, loop: true });
    this.buttonClick = this.sound.add("buttonClick", {
      volume: 0.22,
      loop: false,
    });
    this.sound.stopByKey("thruster");
    this.sound.stopByKey("menuMusic");
    this.sound.stopByKey("gameMusic");
    this.menuMusic.play();
    // window.localStorage.setItem("mute", false);
    let localMute = window.localStorage.getItem("mute") || false;
    if (localMute === "false") {
      this.sound.mute = false;
    } else {
      this.sound.mute = true;
    }

    this.screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    const bg = this.add
      .image(screenCenterX, screenCenterY, "background")
      .setOrigin(0.5)
      .setScale(1);
    this.rocket1 = this.addRocket("rocket", screenCenterX, screenCenterY + 20);
    // this.rocket2 = this.addRocket("rocket", screenCenterX, screenCenterY + 20);
    this.rocket1.setImmovable = true;
    this.createAnimations();

    this.gameStartMessage = this.add
      .text(screenCenterX, screenCenterY - 330, "", {})
      .setFont(" Verdana, Audiowide")
      .setFontSize(60)
      .setOrigin(0.5, 0.5)
      .setResolution(8);
    // this.gameStartMessage.setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.title = this.add
      .text(screenCenterX, screenCenterY - 180, "Galaxy Quest", {})
      .setFont(" Verdana, Audiowide")
      .setFontSize(30)
      .setScale(4)
      .setResolution(19)
      .setOrigin(0.5, 0.5)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff);

    this.clicked = false;
    this.singlePlayer = new Button(
      screenCenterX - 300,
      screenCenterY + 100,
      "Single Player",
      this,
      () => {
        this.buttonClick.play();
        // this.gameStartMessage.setText("Enjoy the game!").setScale(1);
        // setTimeout(
        //   function () {
        //     if (this.clicked != true) {
        //       this.clicked = true;
        //       this.scene.start("SinglePlayer");
        //     }
        //   }.bind(this),
        //   1000
        // );
        this.scene.start("SinglePlayer");
      },
      3
    );
    this.twoPlayer = new Button(
      screenCenterX + 300,
      screenCenterY + 100,
      "Two Player",
      this,
      () => {
        this.buttonClick.play();
        setTimeout(
          function () {
            // this.scene.start("SinglePlayer");
          }.bind(this),
          1200
        );
      },
      3
    );
    this.freeplayButton = new Button(
      screenCenterX,
      screenCenterY + 300,
      "Freeplay",
      this,
      () => {
        this.buttonClick.play();
        this.scene.start("Freeplay");
      },
      3
    );

    this.betterWithText = this.add
      .text(screenCenterX, screenCenterY - 70, "Better with controller!", {})
      .setFont(" Verdana, Audiowide")
      .setFontSize(25)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff)
      .setResolution(8)
      .setOrigin(0.5, 0.5);

    this.topText = this.add
      .text(screenCenterX, screenCenterY - 460, "", {})
      .setFont(" Verdana, Audiowide")
      .setFontSize(30)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff)
      .setResolution(8)
      .setOrigin(0.5, 0.5);
    const audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") {
      this.topText.setText("Click the screen for Audio!");
      this.input.on(
        "pointerdown",
        function (pointer) {
          this.topText.setText("");
          // ...
        }.bind(this)
      );
    }

    this.text = this.add.text(
      screenCenterX - 310,
      screenCenterY + 140,
      "X on controller"
    );
    this.text
      .setFont(" Verdana, Audiowide")
      .setFontSize(20)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff)
      .setResolution(8)
      .setOrigin(0.5, 0.5);

    this.square = this.add
      .text(screenCenterX - 80, screenCenterY + 335, "□ ")
      .setFont(" Verdana, Audiowide")
      .setFontSize(35)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff)
      .setResolution(8)
      .setOrigin(0.5, 0.5);

    this.freeplayControls = this.add
      .text(screenCenterX, screenCenterY + 335, " on controller")
      .setFont(" Verdana, Audiowide")
      .setFontSize(20)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff)
      .setResolution(8)
      .setOrigin(0.5, 0.5);

    // remove after finishing single and two player modes
    this.text = this.add.text(
      screenCenterX + 300,
      screenCenterY + 140,
      "Coming soon. . ."
    );
    this.text
      .setFont(" Verdana, Audiowide")
      .setFontSize(20)
      .setTint(0xff0fff, 0x9effff, 0xff0fff, 0x9effff)
      .setResolution(8)
      .setOrigin(0.5, 0.5);

    this.input.gamepad.on(
      "down",
      function (pad, button, index) {
        this.gamepad = pad;
        this.buttonClick.play();
        this.betterWithText.setText("");
      }.bind(this),
      this
    );

    this.rocket1.turnTimer = 0;
    this.rocket1.speedDemo = this.rngBase(10, 200);

    if (this.rngBase(1, 10) % 2 === 0) {
      this.rocket1.direction = "left";
      this.rocket1.right = "small";
      this.rocket1.left = "big";
    } else {
      this.rocket1.direction = "right";
      this.rocket1.right = "big";
      this.rocket1.left = "small";
    }
  }
  update() {
    this.flyInfinityLoop(this.rocket1);
    // this.flyInfinityLoop(this.rocket2);

    if (this.gamepad) {
      if (this.gamepad.A) {
        this.buttonClick.play();
        this.scene.stop("MainMenu");
        this.scene.start("SinglePlayer");
      }
      if (this.gamepad.X) {
        this.buttonClick.play();
        this.scene.stop("MainMenu");
        this.scene.start("Freeplay");
      }
    }
  }
}
