const quizData = [
  {
    question: "How old is Rupak?",
    a: "20",
    b: "29",
    c: "22",
    d: "24",
    correct: "c",
  },
  {
    question: "What is the most used programming language in 2020?",
    a: "Java",
    b: "C++",
    c: "JavaScript",
    d: "Python",
    correct: "c",
  },
  {
    question: "What does HTML stands for?",
    a: "Head Mark Up Language",
    b: "High Mark up Language",
    c: "Hyper Mark Up Language",
    d: "HyperText Markup Language",
    correct: "d",
  },
  {
    question: "What does IPL stands for?",
    a: "Indian Player League",
    b: "Indian Premire League",
    c: "Indian Super League",
    d: "Indian Sub League",
    correct: "b",
  },
];

const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");

let currentQuiz = 0;
let score = 0;
const loadQuiz = () => {
  deselecteAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerHTML = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
};

const getSelected = () => {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
};

const deselecteAnswers = () => {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
};

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.classList.add("result");
      quiz.innerHTML = `
                        <h2>You answered correctly at ${score}/${quizData.length} questions.</h2> 
                        <button class="load" onclick="location.reload()">Reload</button>
      `;
    }
  }
});

loadQuiz();
