const quizQuestions = [
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["func", "define", "def", "function"],
    answer: "def",
    explanation: "In Python, functions are declared with the `def` keyword followed by the function name and parentheses."
  },
  {
    question: "What is the correct file extension for a Python file?",
    options: [".pt", ".python", ".py", ".pyt"],
    answer: ".py",
    explanation: "Python source files use the `.py` extension, which allows the interpreter and editors to recognize them."
  },
  {
    question: "Which data type is used to store True or False values?",
    options: ["bool", "str", "int", "list"],
    answer: "bool",
    explanation: "The `bool` data type stores logical values, which can only be `True` or `False`."
  },
  {
    question: "What will len('Python') return?",
    options: ["5", "6", "7", "Error"],
    answer: "6",
    explanation: "The word `Python` contains six characters, so `len('Python')` returns 6."
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/*", "--"],
    answer: "#",
    explanation: "Single-line comments in Python start with the `#` symbol."
  },
  {
    question: "Which of these creates a list in Python?",
    options: ["{1, 2, 3}", "(1, 2, 3)", "[1, 2, 3]", "<1, 2, 3>"],
    answer: "[1, 2, 3]",
    explanation: "Lists in Python are written using square brackets, for example `[1, 2, 3]`."
  },
  {
    question: "What is the output of 3 ** 2 in Python?",
    options: ["6", "9", "8", "5"],
    answer: "9",
    explanation: "The `**` operator means exponentiation, so `3 ** 2` means 3 raised to the power 2, which equals 9."
  },
  {
    question: "Which loop is used to iterate over a sequence in Python?",
    options: ["repeat loop", "for loop", "do-while loop", "foreach block"],
    answer: "for loop",
    explanation: "A `for` loop is the standard way to iterate through sequences like lists, strings, tuples, and ranges."
  },
  {
    question: "What does input() return in Python?",
    options: ["An integer", "A boolean", "A string", "A list"],
    answer: "A string",
    explanation: "The `input()` function always returns text as a string unless it is converted to another type manually."
  },
  {
    question: "Which function is used to display output on the screen?",
    options: ["echo()", "display()", "print()", "show()"],
    answer: "print()",
    explanation: "The `print()` function is used in Python to send output to the screen or console."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;
let answerHistory = [];

function getPerformanceLabel(finalScore) {
  if (finalScore === quizQuestions.length) {
    return "Outstanding";
  }

  if (finalScore >= 8) {
    return "Great";
  }

  if (finalScore >= 6) {
    return "Good";
  }

  if (finalScore >= 4) {
    return "Nice Try";
  }

  return "Keep Practicing";
}

function getResultMessage(finalScore) {
  const percentage = Math.round((finalScore / quizQuestions.length) * 100);

  if (finalScore === quizQuestions.length) {
    return `You scored ${percentage} out of 100 and answered every Python question correctly.`;
  }

  if (finalScore >= 7) {
    return `You scored ${percentage} out of 100 and showed a strong understanding of Python basics.`;
  }

  if (finalScore >= 4) {
    return `You scored ${percentage} out of 100 and built a solid start in Python concepts.`;
  }

  return `You scored ${percentage} out of 100. Review the explanations below and try again with more confidence.`;
}

function updateMeta(progressText, scoreText, progressBar) {
  progressText.textContent = `Question ${currentQuestionIndex + 1} / ${quizQuestions.length}`;
  scoreText.textContent = `Score ${score}`;
  progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
}

function setStatus(statusElement, message, isError = false) {
  statusElement.textContent = message;
  statusElement.classList.toggle("error", isError);
}

function renderExplanation(explanationElement, isCorrect, selectedOption, currentQuestion) {
  explanationElement.className = `answer-explanation ${isCorrect ? "correct" : "wrong"}`;
  explanationElement.innerHTML = `
    <h4>${isCorrect ? "Correct Answer Selected" : "Incorrect Answer Selected"}</h4>
    <p><strong>Your answer:</strong> ${selectedOption}</p>
    <p><strong>Correct answer:</strong> ${currentQuestion.answer}</p>
    <p><strong>Why:</strong> ${currentQuestion.explanation}</p>
  `;
}

function renderQuestion(elements) {
  const { questionTitle, optionsList, progressText, scoreText, progressBar, quizStatus, nextBtn, explanationElement } = elements;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  hasAnswered = false;
  questionTitle.textContent = currentQuestion.question;
  optionsList.innerHTML = "";
  explanationElement.innerHTML = "";
  explanationElement.className = "answer-explanation hidden";
  nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question";
  updateMeta(progressText, scoreText, progressBar);
  setStatus(quizStatus, "Select one option to see instant feedback.");

  currentQuestion.options.forEach((option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option-btn";
    optionButton.textContent = option;

    optionButton.addEventListener("click", () => {
      if (hasAnswered) {
        return;
      }

      hasAnswered = true;
      const isCorrect = option === currentQuestion.answer;
      const optionButtons = optionsList.querySelectorAll(".option-btn");

      optionButtons.forEach((button) => {
        button.disabled = true;

        if (button.textContent === currentQuestion.answer) {
          button.classList.add("correct");
        } else if (button.textContent === option) {
          button.classList.add("wrong");
        } else {
          button.classList.add("dimmed");
        }
      });

      if (isCorrect) {
        score += 1;
        setStatus(quizStatus, "Correct. The answer is highlighted in green.");
      } else {
        setStatus(quizStatus, "Incorrect. Your choice is red and the correct answer is green.", true);
      }

      answerHistory[currentQuestionIndex] = {
        question: currentQuestion.question,
        selected: option,
        correctAnswer: currentQuestion.answer,
        explanation: currentQuestion.explanation,
        isCorrect
      };

      renderExplanation(explanationElement, isCorrect, option, currentQuestion);
      updateMeta(progressText, scoreText, progressBar);
    });

    optionsList.appendChild(optionButton);
  });
}

function renderAnswerReport(reportList) {
  reportList.innerHTML = "";

  answerHistory.forEach((entry, index) => {
    const item = document.createElement("article");
    item.className = `report-item ${entry.isCorrect ? "correct" : "wrong"}`;

    item.innerHTML = `
      <div class="answer-head">
        <div>
          <h4>Q${index + 1}. ${entry.question}</h4>
          <p class="answer-meta"><strong>Your answer:</strong> ${entry.selected}</p>
          <p class="answer-meta"><strong>Correct answer:</strong> ${entry.correctAnswer}</p>
        </div>
        <span class="answer-badge ${entry.isCorrect ? "correct" : "wrong"}">${entry.isCorrect ? "Right" : "Wrong"}</span>
      </div>
      <div class="answer-body">
        <p><strong>Explanation:</strong> ${entry.explanation}</p>
      </div>
    `;

    reportList.appendChild(item);
  });
}

function openResultModal(elements) {
  elements.resultModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeResultModal(elements) {
  elements.resultModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function showFinalResult(elements) {
  const percentage = Math.round((score / quizQuestions.length) * 100);

  elements.resultScoreValue.textContent = percentage;
  elements.resultTitle.textContent = getPerformanceLabel(score);
  elements.resultMessage.textContent = getResultMessage(score);
  renderAnswerReport(elements.answerReportList);
  openResultModal(elements);
  setStatus(elements.quizStatus, "Quiz completed. Your detailed score board is open.");
}

function restartQuiz(elements) {
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;
  answerHistory = [];

  closeResultModal(elements);
  renderQuestion(elements);
}

function initQuiz() {
  const elements = {
    startBtn: document.getElementById("start-quiz-btn"),
    questionTitle: document.getElementById("question-title"),
    optionsList: document.getElementById("options-list"),
    explanationElement: document.getElementById("answer-explanation"),
    nextBtn: document.getElementById("next-btn"),
    restartBtn: document.getElementById("restart-btn"),
    quizStatus: document.getElementById("quiz-status"),
    progressText: document.getElementById("progress-text"),
    scoreText: document.getElementById("score-text"),
    progressBar: document.getElementById("progress-bar"),
    resultModal: document.getElementById("result-modal"),
    resultScoreValue: document.getElementById("result-score-value"),
    resultTitle: document.getElementById("result-title"),
    resultMessage: document.getElementById("result-message"),
    answerReportList: document.getElementById("answer-report-list"),
    closeModalBtn: document.getElementById("close-modal-btn"),
    restartFromModalBtn: document.getElementById("restart-from-modal-btn")
  };

  if (Object.values(elements).some((element) => !element)) {
    return;
  }

  renderQuestion(elements);

  elements.startBtn.addEventListener("click", () => {
    document.querySelector(".quiz-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  elements.nextBtn.addEventListener("click", () => {
    if (!hasAnswered) {
      setStatus(elements.quizStatus, "Please select an answer first.", true);
      return;
    }

    if (currentQuestionIndex === quizQuestions.length - 1) {
      showFinalResult(elements);
      return;
    }

    currentQuestionIndex += 1;
    renderQuestion(elements);
  });

  elements.restartBtn.addEventListener("click", () => {
    restartQuiz(elements);
  });

  elements.restartFromModalBtn.addEventListener("click", () => {
    restartQuiz(elements);
  });

  elements.closeModalBtn.addEventListener("click", () => {
    closeResultModal(elements);
  });

  elements.resultModal.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
      closeResultModal(elements);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.resultModal.classList.contains("hidden")) {
      closeResultModal(elements);
    }
  });
}

document.addEventListener("DOMContentLoaded", initQuiz);
