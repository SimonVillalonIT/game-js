export const SPRITE_URLS = {
  walk: [
    "/walk/1.png",
    "/walk/2.png",
    "/walk/3.png",
    "/walk/4.png",
    "/walk/5.png",
    "/walk/6.png",
  ],
  run: [
    "/run/1.png",
    "/run/2.png",
    "/run/3.png",
    "/run/4.png",
    "/run/5.png",
    "/run/6.png",
    "/run/7.png",
    "/run/8.png",
  ],
  idle: [
    "/idle/1.png",
    "/idle/2.png",
    "/idle/3.png",
    "/idle/4.png",
    "/idle/5.png",
    "/idle/6.png",
  ],
  jump: [
    "/jump/1.png",
    "/jump/2.png",
    "/jump/3.png",
    "/jump/4.png",
    "/jump/5.png",
    "/jump/6.png",
    "/jump/7.png",
    "/jump/8.png",
  ],
  attack: ["/attack/1.png", "/attack/2.png", "/attack/3.png", "/attack/4.png"],
  attack2: ["/attack2/1.png", "/attack2/2.png", "/attack2/3.png"],
  dead: ["/dead/1.png", "/dead/2.png", "/dead/3.png"],
};

export const GROUND_ENEMY_URLS = {
  idle: [
    "/GroundEnemy/idle/1.png",
    "/GroundEnemy/idle/2.png",
    "/GroundEnemy/idle/3.png",
    "/GroundEnemy/idle/5.png",
    "/GroundEnemy/idle/6.png",
    "/GroundEnemy/idle/7.png",
    "/GroundEnemy/idle/8.png",
  ],
  dead: [
    "/GroundEnemy/dead/1.png",
    "/GroundEnemy/dead/2.png",
    "/GroundEnemy/dead/3.png",
    "/GroundEnemy/dead/4.png",
    "/GroundEnemy/dead/5.png",
  ],
};

export const FLYING_ENEMIES_URLS = {
  idle: [
    "/FlyingEnemy/idle/1.png",
    "/FlyingEnemy/idle/2.png",
    "/FlyingEnemy/idle/3.png",
    "/FlyingEnemy/idle/5.png",
    "/FlyingEnemy/idle/6.png",
    "/FlyingEnemy/idle/7.png",
  ],
  dead: [
    "/FlyingEnemy/dead/1.png",
    "/FlyingEnemy/dead/2.png",
    "/FlyingEnemy/dead/3.png",
    "/FlyingEnemy/dead/4.png",
  ],
};

export const HEART_URLS = [
  "/heart/1.png",
  "/heart/2.png",
  "/heart/3.png",
  "/heart/5.png",
];

export const KEYS_URLS = [
  { img: "/keys/Up.svg", p: "Jump" },
  { img: "/keys/Left.svg", p: "Go left" },
  { img: "/keys/Right.svg", p: "Go right" },
  { img: "/keys/Down.svg", p: "Go down" },
  { img: "/keys/Space.svg", p: "Attack" },
  { img: "/keys/Esc.svg", p: "Pause" },
];

export const GAME_STATES = {
  notStarted: 0,
  playing: 1,
  stopped: 2,
  gameOver: 3,
};
