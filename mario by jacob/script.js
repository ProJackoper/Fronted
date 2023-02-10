let area = document.querySelector(".area");
let block = `<div class="block-body"><div class="block"></div></div>`;
let playerLocation = 1211;
let stringPlayerLocation = playerLocation.toString();
let playerLocationHeight = stringPlayerLocation[0] + stringPlayerLocation[1];
playerLocationHeight = parseInt(playerLocationHeight);
let playerLocationWidth = stringPlayerLocation[2] + stringPlayerLocation[3];
playerLocationWidth = parseInt(playerLocationWidth);
let areaHeight = 50;
let areaWidth = 80;
let underPlayer = document.querySelector(`.block-${playerLocation - 100}`);

render(areaHeight, areaWidth);
player(playerLocation)

for (i = 0; i < areaWidth; i++) {
  document.querySelector(`.block-${1111 + i}`).classList.add("ground");
}

setInterval(() => {
  underPlayer = document.querySelector(`.block-${playerLocation - 100}`);
  let groundCheck = underPlayer.classList.contains("ground");
  if(groundCheck != true){
    player(playerLocation - 100)
  }
}, 500)

function createAreaLines(i) {
  area.innerHTML += `<div class="area-line area-line-` + i + `"></div>`;
}

function render(height, width) {
  for (let i = height + 10; i >= 11; i--) {
    createAreaLines(i);
    for (let j = 11; j <= width + 10; j++) {
      let position = "";
      position += i.toString(10) + j.toString(10);
      document.querySelector(`.area-line-${i}`).innerHTML += `<a class="groundChanger-${position}"><div class="block block-${position}"></div></a>`;
    }
  }
}

for (let i = areaHeight + 10; i >= 11; i--) {
  for (let j = 11; j <= areaWidth + 10; j++) {
    let position = "";
    position += i.toString(10) + j.toString(10);
    document.querySelector(`.groundChanger-${position}`).addEventListener("click", () => {
      document.querySelector(`.block-${position}`).classList.toggle("ground")
    })
  }
}

function player(location) {
  document.querySelector(`.block-${playerLocation}`).classList.remove("player");
  document.querySelector(`.block-${location}`).classList.add("player");
  playerLocation = location;
  stringPlayerLocation = playerLocation.toString();
  playerLocationHeight = stringPlayerLocation[0] + stringPlayerLocation[1];
  playerLocationHeight = parseInt(playerLocationHeight);
  playerLocationWidth = stringPlayerLocation[2] + stringPlayerLocation[3];
  playerLocationWidth = parseInt(playerLocationWidth);
}

document.addEventListener("keydown", (event) => {
  underPlayer = document.querySelector(`.block-${playerLocation - 100}`);
  let groundCheck = underPlayer.classList.contains("ground");

  let name = event.key;
  if (name == "w" && playerLocationHeight < areaHeight + 10) {
    player(playerLocation + 100);
  }
  if (name == "d" && playerLocationWidth < areaWidth + 10) {
    player(playerLocation + 1);
  }
  if (name == "s" && playerLocationHeight > 11 && groundCheck != true) {
    player(playerLocation - 100);
  }
  if (name == "a" && playerLocationWidth > 11) {
    player(playerLocation - 1);
  }
});
