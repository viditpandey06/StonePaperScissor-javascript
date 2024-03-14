let userMove = "";
let computerMove = "";
let result = "";
let game = JSON.parse(localStorage.getItem("game")) || {
  wins: 0,
  looses: 0,
  ties: 0,
};

let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
renderGameSummary();
renderGameHistory();

function captureUserMove(move) {
  userMove = move;
}
function generateComputerMove() {
  const randNum = Math.random();
  if (randNum < 1 / 3) {
    computerMove = "Rock";
  } else if (randNum < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }
}
function evaluateMoves() {
  if (userMove === computerMove) {
    // (R,R) , (P,P) ,(S,S)
    result = "Tie";
  } else if (
    (userMove === "Rock" && computerMove === "Scissors") ||
    (userMove === "Paper" && computerMove === "Rock") ||
    (userMove === "Scissors" && computerMove === "Paper")
  ) {
    // (R,S) , (P,R) ,(S,P)
    result = "Win";
  } else {
    // (S,R) , (R,P) ,(P,S)
    result = "Loose";
  }
}

function updateGameScore() {
  if (result === "Win") {
    game.wins++;
  } else if (result === "Tie") {
    game.ties++;
  } else {
    game.looses++;
  }
  const gameHistoryItem = {
    userMove: userMove,
    computerMove: computerMove,
    result: result,
  };
  gameHistory.push(gameHistoryItem);

  localStorage.setItem("game", JSON.stringify(game));
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}

function renderGameSummary() {
  const gamesPlayed = game.wins + game.looses + game.ties;
  console.log(`gamesPlayed: ${gamesPlayed}`);
  document.getElementById("wins").innerHTML = game.wins;
  document.querySelector("#looses").innerHTML = game.looses;
  document.querySelector("#ties").innerHTML = game.ties;
  document.querySelector("#gamesPlayed").innerHTML = gamesPlayed;
  console.log(game);
}

function renderGameHistory() {
  let finalGameHistoryHTML = ` <tr>
  <th>#</th>
  <th>User Move</th>
  <th>Computer Move</th>
  <th>Result</th>
</tr>`;
  console.log(
    `userMove: ${userMove} computerMove ${computerMove}result: ${result}`
  );
  console.log(gameHistory);
  for (let i = 0; i < gameHistory.length; i++) {
    finalGameHistoryHTML += `
  <tr>
          <td>${i + 1}</td>
          <td>${gameHistory[i].userMove}</td>
          <td>${gameHistory[i].computerMove}</td>
          <td>${gameHistory[i].result}</td>
        </tr>
  `;
  }

  document.querySelector("#gameHistory").innerHTML = finalGameHistoryHTML;
}

function resetScores() {
  game = {
    wins: 0,
    looses: 0,
    ties: 0,
  };

  gameHistory = [];
}
