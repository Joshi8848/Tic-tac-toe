"use strict";

const tiles = document.querySelectorAll(".tile");
const message = document.querySelector(".game-message");
const restart = document.querySelector(".reset-button");
const winLines = document.querySelectorAll("hr");
let events = ["", "", "", "", "", "", "", "", ""];
let active = true;
let currentPlayer = "X";

const winMessage = () => `Player ${currentPlayer} has won.`;
const drawMessage = () => `Game ended in a draw.`;
const currentPlayerTurn = () => `It's ${currentPlayer} turn.`;

message.innerHTML = currentPlayerTurn();

tiles.forEach((tile, index) => {
  tile.addEventListener("click", handleCellClick);
});

restart.addEventListener("click", resetButton);

function handleCellClick(event) {
  // We get the current clicked element and store it into a variable.
  const clickedCell = event.target;

  // We will grab the 'data-key' attribute

  const clickedCellIndex = clickedCell.getAttribute("data-key");

  // We need to check whether the cell has already been occupied or if the game is paused

  if (events[clickedCellIndex] !== "" || !active) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  gameLogic();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  // Updating the value of currently clicked cell and events array
  clickedCell.innerHTML = currentPlayer;
  if (currentPlayer === "X") {
    clickedCell.style.color = "#EF5B0C";
  } else {
    clickedCell.style.color = "#FFF80A";
  }
  events[clickedCellIndex] = currentPlayer;
}

function switchPlayer() {
  // Switching player if 'X' is current player switch to O and vice versa;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.innerHTML = currentPlayerTurn();
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function gameLogic() {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const winningLines = document.querySelector(`hr[data-value="${i}"]`);
    console.log(winningLines);
    const win = winConditions[i];
    let a = events[win[0]];
    let b = events[win[1]];
    let c = events[win[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      winningLines.style.display = "block";
      winningLines.classList.add("grow");
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    message.innerHTML = winMessage();
    message.style.color = "green";
    active = false;
    return;
  }

  // We will check if there are any values in our game state that are still not populated with a player sign

  let roundDraw = !events.includes("");
  if (roundDraw) {
    message.innerHTML = drawMessage();
    message.style.color = "black";
    active = false;
    return;
  }

  // If we get here and no one won the game then we change the player

  switchPlayer();
}

function resetButton() {
  active = true;
  currentPlayer = "X";
  message.innerHTML = currentPlayerTurn();
  events = ["", "", "", "", "", "", "", "", ""];
  winLines.forEach((win) => {
    win.style.display = "none";
    win.classList.remove = "grow";
  });

  tiles.forEach((tile) => (tile.innerHTML = ""));
}

// function randomBot() {
//   const randomNo = Math.trunc(Math.random() * 9);
// }

// tiles.forEach(function (tile, index) {
//   tile.addEventListener("click", function (e) {
//     // tile.textContent = "X";

//     if (tile.textContent === "" && !gameOver()) {
//       if (play === true) {
//         tile.textContent = "X";
//         play = false;
//       } else if (play === false && !gameOver()) {
//         tile.innerHTML = "O";
//         play = true;
//       }
//     }
//     gameOver();
//   });
// });

// function gameOver() {
//   if (
//     (tiles[0].textContent === "X" &&
//       tiles[1].textContent === "X" &&
//       tiles[2].textContent === "X") ||
//     (tiles[0].textContent === "X" &&
//       tiles[3].textContent === "X" &&
//       tiles[6].textContent === "X") ||
//     (tiles[0].textContent === "X" &&
//       tiles[4].textContent === "X" &&
//       tiles[8].textContent === "X") ||
//     (tiles[1].textContent === "X" &&
//       tiles[4].textContent === "X" &&
//       tiles[7].textContent === "X") ||
//     (tiles[2].textContent === "X" &&
//       tiles[5].textContent === "X" &&
//       tiles[8].textContent === "X") ||
//     (tiles[2].textContent === "X" &&
//       tiles[4].textContent === "X" &&
//       tiles[6].textContent === "X") ||
//     (tiles[3].textContent === "X" &&
//       tiles[4].textContent === "X" &&
//       tiles[5].textContent === "X") ||
//     (tiles[6].textContent === "X" &&
//       tiles[7].textContent === "X" &&
//       tiles[8].textContent === "X")
//   ) {
//     over.textContent = "Player 1 wins";
//     return true;
//   } else if (
//     (tiles[0].textContent === "O" &&
//       tiles[1].textContent === "O" &&
//       tiles[2].textContent === "O") ||
//     (tiles[0].textContent === "O" &&
//       tiles[3].textContent === "O" &&
//       tiles[6].textContent === "O") ||
//     (tiles[0].textContent === "O" &&
//       tiles[4].textContent === "O" &&
//       tiles[8].textContent === "O") ||
//     (tiles[1].textContent === "O" &&
//       tiles[4].textContent === "O" &&
//       tiles[7].textContent === "O") ||
//     (tiles[2].textContent === "O" &&
//       tiles[5].textContent === "O" &&
//       tiles[8].textContent === "O") ||
//     (tiles[2].textContent === "O" &&
//       tiles[4].textContent === "O" &&
//       tiles[6].textContent === "O") ||
//     (tiles[3].textContent === "O" &&
//       tiles[4].textContent === "O" &&
//       tiles[5].textContent === "O") ||
//     (tiles[6].textContent === "O" &&
//       tiles[7].textContent === "O" &&
//       tiles[8].textContent === "O")
//   ) {
//     over.textContent = "Player 2 wins";
//     return true;
//   }
// }
