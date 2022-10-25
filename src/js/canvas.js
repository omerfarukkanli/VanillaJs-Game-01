import platform from "../img/platform.png";
import hills from "../img/hills.png";
import background from "../img/background.png";
import smallplatform from "../img/platformSmallTall.png";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

let scrollOfSet = 0;
const gravity = 1.5;

class Player {
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.speed = 10;
    this.width = 30;
    this.height = 30;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  genericObjects.forEach((genericObjects) => {
    genericObjects.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400)
    player.velocity.x = player.speed;
  else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOfSet === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOfSet += 5;
      console.log(scrollOfSet);
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((genericObjects) => {
        genericObjects.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOfSet > 0) {
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObjects) => {
        genericObjects.position.x -= player.speed * 0.66;
      });
    }
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  if (scrollOfSet > 100000) {
    Omar();
  }
  if (player.position.y > canvas.height) {
    Omar();
  }
}

function CreateImage(ImgSrc) {
  const image = new Image();
  image.src = ImgSrc;
  return image;
}

function Omar() {
  smalltallplatform = CreateImage(smallplatform);
  platformImage = CreateImage(platform);
  player = new Player();
  platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        smalltallplatform.width,
      y: 270,
      image: smalltallplatform,
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width - 3,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 300,
      image: platformImage,
    }),

    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 600 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 6 + 800,
      y: 150,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 7 + 800,
      y: 250,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 8 + 800,
      y: 300,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 9 + 800,
      y: 500,
      image: platformImage,
    }),
  ];
  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: CreateImage(background) }),
    new GenericObject({ x: -1, y: -1, image: CreateImage(hills) }),
  ];
  scrollOfSet = 0;
}

let smalltallplatform = CreateImage(smallplatform);
let platformImage = CreateImage(platform);
let player = new Player();
let platforms = [];
let genericObjects = [
  new GenericObject({ x: -1, y: -1, image: CreateImage(background) }),
  new GenericObject({ x: -1, y: -1, image: CreateImage(hills) }),
];

const keys = { right: { pressed: false }, left: { pressed: false } };

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      player.velocity.y -= 30;
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      keys.right.pressed = false;
      break;
    case 87:
      break;
  }
});
Omar();
animate();
