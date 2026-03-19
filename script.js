const quizQuestions = [
  {
    question: "Which keyword is used to define a function in Python?",
    answers: ["func", "define", "def", "function"],
    correct: "def"
  },
  {
    question: "Which data type is written with square brackets?",
    answers: ["Tuple", "List", "Set", "Dictionary"],
    correct: "List"
  },
  {
    question: "What is the correct file extension for Python files?",
    answers: [".pt", ".pyt", ".py", ".python"],
    correct: ".py"
  },
  {
    question: "Which function is used to display output in Python?",
    answers: ["echo()", "display()", "write()", "print()"],
    correct: "print()"
  },
  {
    question: "What will `len(\"Python\")` return?",
    answers: ["5", "6", "7", "Error"],
    correct: "6"
  },
  {
    question: "Which symbol is used for comments in Python?",
    answers: ["//", "#", "/*", "--"],
    correct: "#"
  },
  {
    question: "Which loop is used to iterate over a sequence in Python?",
    answers: ["repeat", "for", "loop", "foreach"],
    correct: "for"
  },
  {
    question: "What is the result of `10 // 3` in Python?",
    answers: ["3.33", "3", "4", "1"],
    correct: "3"
  },
  {
    question: "Which keyword is used for a conditional statement?",
    answers: ["when", "if", "check", "then"],
    correct: "if"
  },
  {
    question: "Which of these stores key-value pairs in Python?",
    answers: ["List", "Tuple", "Dictionary", "String"],
    correct: "Dictionary"
  }
];

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const questionCounter = document.getElementById("question-counter");
const scoreCounter = document.getElementById("score-counter");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;
  startBtn.classList.add("hidden");
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  scoreCounter.textContent = "Score: 0";
  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  hasAnswered = false;
  nextBtn.disabled = true;
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  questionText.textContent = currentQuestion.question;
  answerList.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(button, answer));
    answerList.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedAnswer) {
  if (hasAnswered) {
    return;
  }

  hasAnswered = true;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const buttons = answerList.querySelectorAll(".answer-btn");

  buttons.forEach((button) => {
    button.disabled = true;

    if (button.textContent === currentQuestion.correct) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === currentQuestion.correct) {
    score += 1;
    scoreCounter.textContent = `Score: ${score}`;
  } else {
    selectedButton.classList.add("wrong");
  }

  nextBtn.disabled = false;
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  resultTitle.textContent = `You scored ${score} out of ${quizQuestions.length}`;

  if (score === quizQuestions.length) {
    resultText.textContent = "Perfect score. Your Python basics are very strong.";
  } else if (score >= 7) {
    resultText.textContent = "Nice work. You have a solid understanding of Python fundamentals.";
  } else if (score >= 4) {
    resultText.textContent = "Good start. A little more practice will make you even stronger.";
  } else {
    resultText.textContent = "Keep going. Review the basics and try the quiz again.";
  }
}

function goToNextQuestion() {
  currentQuestionIndex += 1;

  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion();
    return;
  }

  showResult();
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);
restartBtn.addEventListener("click", startQuiz);
