// Define elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const textInputElement = document.getElementById("textInput");
const submitButton = document.getElementById("submitButton");
const resultText = document.getElementById("result");
const scoreDisplay = document.getElementById("scoreDisplay");
const timerText = document.getElementById("timerText");
const loaderContainer = document.getElementById("loaderContainer");
const loadingText = document.getElementById("loadingText");
const nicknameInput = document.getElementById("nicknameInput");
const submitNicknameButton = document.getElementById("submitNickname");

// Quiz data
const quizData = [
  {
    question: "ما هو الاختلاف بين النسغ الخام و النسغ الجاهز؟",
    type: "multiple-choice",
    answers: ["النشأ", "كمية الماء", "كمية الأملاح", "لا فرق بينهما"],
    correctAnswer: "النشأ",
  },
  {
  question: "ما اسم المكون الذي يتميز باللون الأخضر المساهم في عملية التركيب الضوئي؟",
  type: "text-input",
  correctAnswer: "اليخضور"
},
{
  question: "أتمم الفراغ بما يناسب : ماء + أملاح معدنية + ............. + يخضور + ضوء = أكسجين + نشأ",
  type: "text-input",
  correctAnswer: "ثاني اكسيد الكربون"
},
{
  question: "ينقل الأنبوب الطلعي",
  type: "multiple-choice",
  answers: ["الماء", "الأمشاش الأنثوية", "حبات الطلع", "الأمشاش الذكرية"],
  correctAnswer: "الأمشاش الذكرية"
},
{
  question: "أتمم الفراغ بما يناسب : الانتاش هو تحول البذرة من حالة ....... الى حالة نشاط بتوفر الظروف الملائمة",
  type: "text-input",
  correctAnswer: "سبات"
},
{
  question: "اختر الدخيل من هذه المجموعة",
  type: "multiple-choice",
  answers: ["الإفتسال", "الترقيد", "الساق البصلية", "التطعيم"],
  correctAnswer: "الساق البصلية"
},
{
  question: "اختر الدخيل من هذه المجموعة",
  type: "multiple-choice",
  answers: ["الرّي", "الإضاءة", "الحرث", "الأدوية"],
  correctAnswer: "الإضاءة"
},
{
  question: "النمو عند النبات الأخضر هو نمو :",
  type: "multiple-choice",
  answers: ["يتم بواسطة البراعم القمية فقط", "يتم بواسطة الساق", "متقطع", "متواصل"],
  correctAnswer: "متواصل"
},
{
  question: "ماهي نتيجة صنع المادة العضوية بالتركيب الضوئي؟",
  type: "text-input",
  correctAnswer: "زيادة في الكتلة"
},
{
  question: "يتوقف النمو عند النباتات الحولية في فترة من فترات حياتها",
  type: "true-false",
  correctAnswer: "true"
},
{
  question: "البرعم القمي هو العضو المسؤول عن الزيادة في العرض",
  type: "true-false",
  correctAnswer: "false"
},

];

// Variables
let currentQuestionIndex = 0;
let timer;
let score = 0;
let remainingTime;

// Function to load question
function loadQuestion() {
  clearInterval(timer);
  timerText.textContent = "15";
  scoreDisplay.textContent = score;

  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  textInputElement.value = "";
  textInputElement.style.display = "none";
  submitButton.style.display = "none";
  resultText.textContent = "";
  
  if (currentQuestion.type === "true-false") {
  const trueButton = document.createElement("button");
  trueButton.classList.add("option");
  trueButton.textContent = "صواب"; // Change text for true button
  trueButton.addEventListener("click", () => {
    checkAnswer(true); // Pass true as the answer for true button
  });
  optionsElement.appendChild(trueButton);

  const falseButton = document.createElement("button");
  falseButton.classList.add("option");
  falseButton.textContent = "خطأ"; // Change text for false button
  falseButton.addEventListener("click", () => {
    checkAnswer(false); // Pass false as the answer for false button
  });
  optionsElement.appendChild(falseButton);
}


  if (currentQuestion.type === "multiple-choice") {
    currentQuestion.answers.forEach((answer) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option");
      optionButton.textContent = answer;
      optionButton.addEventListener("click", () => {
        checkAnswer(answer);
      });
      optionsElement.appendChild(optionButton);
    });
  } else if (currentQuestion.type === "text-input") {
    textInputElement.style.display = "block";
    submitButton.style.display = "block";
  }

  startTimer();
}

// Function to start timer
function startTimer() {
  let startTime = Date.now();
  remainingTime = 15;
  timer = setInterval(() => {
    let elapsedTime = (Date.now() - startTime) / 1000;
    remainingTime = 15 - elapsedTime;
    if (remainingTime <= 0) {
      clearInterval(timer);
      showResult("انتهى الوقت", false);
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        setTimeout(loadQuestion, 2000);
      } else {
        saveScoreAndRedirect();
      }
    } else {
      timerText.textContent = remainingTime.toFixed(1);
    }
  }, 100);
}

// Function to check answer
function checkAnswer(answer) {
  clearInterval(timer);
  loaderContainer.style.display = "flex";
  loadingText.textContent = "\n";
  const currentQuestion = quizData[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer; // Define correctAnswer here
  setTimeout(() => {
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      score += Math.round(remainingTime * 66);
      scoreDisplay.textContent = score;
      showResult("الجواب صحيح", true);
    } else {
      showResult(`الجواب خاطئ. الإجابة الصحيحة هي: ${correctAnswer}`, false);
    }
  }, 3000);
}

// Function to show result
function showResult(message, isCorrect) {
  loaderContainer.style.display = "none";
  resultText.textContent = message;
  resultText.classList.remove("correct-answer");
  if (isCorrect) {
    resultText.classList.add("correct-answer");
  } else {
    resultText.classList.remove("correct-answer");
  }
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      saveScoreAndRedirect();
    }
  }, 2000);
}

// Function to save score and redirect to dashboard
function saveScoreAndRedirect() {
  // Get nickname from local storage
  const nickname = localStorage.getItem("nickname");
  if (!nickname) {
    alert("Nickname not found. Please provide a nickname.");
    return;
  }

  // Create data object with nickname and score
  const data = {
    nickname: nickname,
    score: score,
  };

  // Send data to server-side script to save to JSON file
  fetch("https://pacific-aboard-stock.glitch.me/save-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Redirect to dashboard.html on successful save
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Error saving score:", error);
      // Handle error
    });
}

// Event listener for submit button
submitButton.addEventListener("click", () => {
  clearInterval(timer);
  const userInput = textInputElement.value;
  checkAnswer(userInput);
});

// Event listener for submit nickname button
submitNicknameButton.addEventListener("click", () => {
  startGame();
});

// Function to start the game
function startGame() {
  const nickname = nicknameInput.value.trim();
  if (nickname !== "") {
    nicknameInput.style.display = "none";
    submitNicknameButton.style.display = "none";
    localStorage.setItem("nickname", nickname); // Save nickname to local storage
    loadQuestion();
  } else {
    alert("Please enter your nickname to start the game.");
  }
}

// On page load
window.onload = () => {
  nicknameInput.style.display = "block";
  submitNicknameButton.style.display = "block";
  localStorage.clear(); // Clear local storage
};
function switchToPage(pageURL) {
  window.location.href = pageURL;
}
