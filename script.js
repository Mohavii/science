const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const textInputElement = document.getElementById('textInput');
const submitButton = document.getElementById('submitButton');
const resultText = document.getElementById('result');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerText = document.getElementById('timerText');
const loaderContainer = document.getElementById('loaderContainer');
const loadingText = document.getElementById('loadingText');
const nicknameInput = document.getElementById('nicknameInput');
const submitNicknameButton = document.getElementById('submitNickname');
const leaderboardList = document.getElementById('leaderboardList');

const quizData = [
    {
        question: "ما هو الاختلاف بين النسغ الخام و النسغ الجاهز؟",
        type: "multiple-choice",
        answers: ["النشأ", "كمية الماء", "كمية الأملاح", "لا فرق بينهما"],
        correctAnswer: "النشأ"
    },
    {
        question: "ما اسم المكون الذي يتميز باللون الأخضر المساهم في عملية التركيب الضوئي؟",
        type: "text-input",
        correctAnswer: "اليخضور"
    },
    {
        question: "What is the capital of France?",
        type: "multiple-choice",
        answers: ["Paris", "Berlin", "London", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the capital of France?",
        type: "multiple-choice",
        answers: ["Paris", "Berlin", "London", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the capital of France?",
        type: "multiple-choice",
        answers: ["Paris", "Berlin", "London", "Rome"],
        correctAnswer: "Paris"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let timer;
let score = 0;
let remainingTime;

function loadQuestion() {
    clearInterval(timer);
    timerText.textContent = '10';
    scoreDisplay.textContent = score;

    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    textInputElement.value = "";
    textInputElement.style.display = "none";
    submitButton.style.display = "none";
    resultText.textContent = "";

    if (currentQuestion.type === "multiple-choice") {
        currentQuestion.answers.forEach(answer => {
            const optionButton = document.createElement('button');
            optionButton.classList.add('option');
            optionButton.textContent = answer;
            optionButton.addEventListener('click', () => {
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

function startTimer() {
    let startTime = Date.now();
    remainingTime = 10;
    timer = setInterval(() => {
        let elapsedTime = (Date.now() - startTime) / 1000;
        remainingTime = 10 - elapsedTime;
        if (remainingTime <= 0) {
            clearInterval(timer);
            showResult('انتهى الوقت', false);
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

function checkAnswer(answer) {
    clearInterval(timer);
    loaderContainer.style.display = 'flex';
    loadingText.textContent = '\n';
    const currentQuestion = quizData[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer; // Define correctAnswer here
    setTimeout(() => {
        if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
            score += Math.round(remainingTime * 100);
            scoreDisplay.textContent = score;
            showResult('الجواب صحيح', true);
        } else {
            showResult(`الجواب خاطئ. الإجابة الصحيحة هي: ${correctAnswer}`, false);
        }
    }, 2000);
}   

function showResult(message, isCorrect) {
    loaderContainer.style.display = 'none';
    resultText.textContent = message;
    resultText.classList.remove('correct-answer');
    if (isCorrect) {
        resultText.classList.add('correct-answer');
    } else {
        resultText.classList.remove('correct-answer');
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

function saveScoreAndRedirect() {
    // Save score to dashboard.json
    const scoreData = { score: score };
    const jsonData = JSON.stringify(scoreData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Redirect to dashboard.html
    window.location.href = 'dashboard.html';
}

submitButton.addEventListener('click', () => {
    clearInterval(timer);
    const userInput = textInputElement.value;
    checkAnswer(userInput);
});

submitNicknameButton.addEventListener('click', () => {
    startGame();
});

function startGame() {
    const nickname = nicknameInput.value.trim();
    if (nickname !== '') {
        nicknameInput.style.display = 'none';
        submitNicknameButton.style.display = 'none';
        loadQuestion();
    } else {
        alert('Please enter your nickname to start the game.');
    }
}

window.onload = () => {
    nicknameInput.style.display = 'block';
    submitNicknameButton.style.display = 'block';
    localStorage.clear();
};
