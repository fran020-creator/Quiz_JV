const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "Qual linguagem de programação é conhecida por ser 'write once, run anywhere'?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: true },
      { text: "C++", correct: false },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "O que significa a sigla 'HTML'?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "High Tech Modern Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlink and Text Markup Language", correct: false },
    ],
  },
  {
    question: "Qual é o paradigma de programação que JavaScript suporta?",
    answers: [
      { text: "Apenas Orientado a Objetos", correct: false },
      { text: "Apenas Funcional", correct: false },
      { text: "Apenas Procedural", correct: false },
      { text: "Multiparadigma (OO, Funcional, Procedural)", correct: true },
    ],
  },
  {
    question: "O que é um 'bug' em programação?",
    answers: [
      { text: "Um recurso não documentado", correct: false },
      { text: "Um erro ou falha no código", correct: true },
      { text: "Uma variável não declarada", correct: false },
      { text: "Um comentário no código", correct: false },
    ],
  },
  {
    question: "Qual estrutura de dados segue o princípio LIFO (Last In, First Out)?",
    answers: [
      { text: "Fila (Queue)", correct: false },
      { text: "Lista (List)", correct: false },
      { text: "Pilha (Stack)", correct: true },
      { text: "Árvore (Tree)", correct: false },
    ],
  },
  {
    question: "O que significa 'API' em programação?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "Advanced Programming Integration", correct: false },
      { text: "Automated Program Interface", correct: false },
      { text: "Application Process Integration", correct: false },
    ],
  },
  {
    question: "Qual é a complexidade de tempo do algoritmo de busca binária?",
    answers: [
      { text: "O(n)", correct: false },
      { text: "O(log n)", correct: true },
      { text: "O(n²)", correct: false },
      { text: "O(1)", correct: false },
    ],
  },
  {
    question: "O que é 'Git'?",
    answers: [
      { text: "Uma linguagem de programação", correct: false },
      { text: "Um sistema de controle de versão", correct: true },
      { text: "Um framework web", correct: false },
      { text: "Um banco de dados", correct: false },
    ],
  },
  {
    question: "Qual método é usado para adicionar um elemento ao final de um array em JavaScript?",
    answers: [
      { text: "push()", correct: true },
      { text: "add()", correct: false },
      { text: "append()", correct: false },
      { text: "insert()", correct: false },
    ],
  },
  {
    question: "O que é 'recursão' em programação?",
    answers: [
      { text: "Uma função que chama a si mesma", correct: true },
      { text: "Um loop infinito", correct: false },
      { text: "Uma variável global", correct: false },
      { text: "Um tipo de dado", correct: false },
    ],
  },
];


//quix state vars

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;   

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showWQuestion();
  
}

function showWQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
})
}

function selectAnswer(e) {
  if (answersDisabled) return;
  answersDisabled = true;
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if(button === selectedButton) {
      button.classList.add("wrong");
    }

  
});
if (isCorrect) {
  score++;
  scoreSpan.textContent = score;
}
setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showWQuestion();
    } else {
        showResult();
    }
},1000);
}


function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    const scorePercent = (score / quizQuestions.length) * 100;
    if (scorePercent === 100) {
        resultMessage.textContent = "Perfect score! 🎉";
    } else if (scorePercent >= 80) {
        resultMessage.textContent = "Great job! 👍";
    } else if (scorePercent >= 50) {
        resultMessage.textContent = "Good effort! 🙂";
    } else {
        resultMessage.textContent = "Better luck next time! 🙁";
    }
}


function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
  
}