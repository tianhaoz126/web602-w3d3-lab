const pacMen = []; // This array holds all the pacmen

// Array of PacMan images
const pacImages = [
  './images/PacMan1.png',
  './images/PacMan2.png',
  './images/PacMan3.png',
  './images/PacMan4.png',
];

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  let velocity = setToRandom(10); // Gives a random velocity
  let position = setToRandom(200); // Gives a random position within 200 pixels
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  // Randomly select one of the PacMan images
  newimg.src = pacImages[Math.floor(Math.random() * pacImages.length)];
  newimg.width = 100;

  // Set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // Add new Child image to game
  game.appendChild(newimg);

  // Return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // Detect collision with all walls and make pacman bounce
  if (item.position.x + item.velocity.x < 0 || item.position.x + item.velocity.x + item.newimg.width > game.offsetWidth) {
    item.velocity.x = -item.velocity.x; // Reverse direction on x-axis
  }
  if (item.position.y + item.velocity.y < 0 || item.position.y + item.velocity.y + item.newimg.height > game.offsetHeight) {
    item.velocity.y = -item.velocity.y; // Reverse direction on y-axis
  }
}

function makeOne() {
  pacMen.push(makePac()); // Add a new PacMan
}

// Don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
