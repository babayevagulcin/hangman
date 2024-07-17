const movies = [
  { name: "inception", image: "/img/inception.jpg" },
  { name: "avatar", image: "./img/avatar.jpg" },
  { name: "titanic", image: "./img/titanic.jpg" },
];

let selectedMovie;
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 5;

function init() {
  if (localStorage.getItem("gameState")) {
    loadGameState();
  } else {
    resetGame();
  }
  displayMovieImage();
  displayWord();
  document.addEventListener("keydown", handleKeyPress);
}

function selectRandomMovie() {
  const randomIndex = Math.floor(Math.random() * movies.length);
  selectedMovie = movies[randomIndex];
}

function displayMovieImage() {
  const movieImage = document.getElementById("movie-image");
  movieImage.src = selectedMovie.image;
}

function displayWord() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = selectedMovie.name
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function handleKeyPress(event) {
  const letter = event.key.toLowerCase();
  if (letter >= "a" && letter <= "z" && !guessedLetters.includes(letter)) {
    handleGuess(letter);
  }
}

function handleGuess(letter) {
  guessedLetters.push(letter);
  if (selectedMovie.name.includes(letter)) {
    displayWord();
    checkWin();
  } else {
    mistakes++;
    checkLoss();
  }
  saveGameState();
}

function checkWin() {
  const wordContainer = document.getElementById("word-container");
  if (!wordContainer.innerHTML.includes("_")) {
    alert("Təbriklər siz doğru cavab verdiniz!");
    resetGame();
  }
}

function checkLoss() {
  if (mistakes >= maxMistakes) {
    alert(`Yanlış cavab verdiniz! Düzgün cavab: ${selectedMovie.name}`);
    resetGame();
  }
}

function resetGame() {
  selectRandomMovie();
  guessedLetters = [];
  mistakes = 0;
  displayMovieImage();
  displayWord();
  saveGameState();
}

function saveGameState() {
  const gameState = {
    selectedMovie,
    guessedLetters,
    mistakes,
  };
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

function loadGameState() {
  const gameState = JSON.parse(localStorage.getItem("gameState"));
  selectedMovie = gameState.selectedMovie;
  guessedLetters = gameState.guessedLetters;
  mistakes = gameState.mistakes;
}

init();
