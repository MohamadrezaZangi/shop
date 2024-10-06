const playButton = document.querySelector("#playButton");
const playSetting = document.querySelector("#playSetting");
const playSettingh1 = document.querySelector("#playSetting h1");
const question = document.querySelector("#question");
const questionTitle = document.querySelector("#questionTitle");
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const answer1Lable = document.querySelector("#answer1Lable");
const answer2Lable = document.querySelector("#answer2Lable");
const answer3Lable = document.querySelector("#answer3Lable");
const answer4Lable = document.querySelector("#answer4Lable");
const essy = document.querySelector("#essy");
const Medium = document.querySelector("#Medium");
const Hard = document.querySelector("#Hard");
const nextButton = document.querySelector("#nextButton");
let allquestions = {};
let Difficulty;
let questionCount = 0;
let trueRadio = 0;
let score = 0;
playButton.addEventListener("click", () => {
  if (essy.checked === true) Difficulty = "easy";
  if (Medium.checked === true) Difficulty = "medium";
  if (Hard.checked === true) Difficulty = "hard";

  fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=${Difficulty}&type=multiple`)
    .then((res) => res.json())
    .then((json) => {
      allquestions = JSON.parse(JSON.stringify(json));
      console.log(allquestions);
      playSetting.style.display = "none";
      question.style.display = "block";
      questionShow(questionCount);
      score = 0;
    });
});

nextButton.addEventListener("click", () => {
  if (answer1.checked === true && trueRadio === 0) score += 10;
  if (
    answer1.checked === false &&
    answer2.checked === false &&
    answer3.checked === false &&
    answer4.checked === false
  );
  else {
    questionCount++;
    if (questionCount >= 10) {
      playSetting.style.display = "block";
      question.style.display = "none";
      questionCount = 0;
      playSettingh1.innerText = `High Score : ${score}`;
    } else questionShow(questionCount);
  }
});

function questionShow(count) {
  const randomNumber = Math.floor(Math.random() * 4);
  questionTitle.innerHTML = allquestions.results[count].question;
  trueRadio = randomNumber;
  if (randomNumber === 0) {
    answer1Lable.innerText = allquestions.results[count].correct_answer;
    answer2Lable.innerHTML = allquestions.results[count].incorrect_answers[0];
    answer3Lable.innerHTML = allquestions.results[count].incorrect_answers[1];
    answer4Lable.innerHTML = allquestions.results[count].incorrect_answers[2];
  } else if (randomNumber === 1) {
    answer1Lable.innerHTML = allquestions.results[count].incorrect_answers[0];
    answer2Lable.innerText = allquestions.results[count].correct_answer;
    answer3Lable.innerHTML = allquestions.results[count].incorrect_answers[1];
    answer4Lable.innerHTML = allquestions.results[count].incorrect_answers[2];
  } else if (randomNumber === 2) {
    answer1Lable.innerHTML = allquestions.results[count].incorrect_answers[0];
    answer2Lable.innerHTML = allquestions.results[count].incorrect_answers[1];
    answer3Lable.innerText = allquestions.results[count].correct_answer;
    answer4Lable.innerHTML = allquestions.results[count].incorrect_answers[2];
  } else if (randomNumber === 3) {
    answer1Lable.innerHTML = allquestions.results[count].incorrect_answers[0];
    answer2Lable.innerHTML = allquestions.results[count].incorrect_answers[1];
    answer3Lable.innerHTML = allquestions.results[count].incorrect_answers[2];
    answer4Lable.innerText = allquestions.results[count].correct_answer;
  }
  answer1.checked = false;
  answer2.checked = false;
  answer3.checked = false;
  answer4.checked = false;
}
