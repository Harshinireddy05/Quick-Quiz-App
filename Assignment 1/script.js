let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let currentQuestionIndex = 0;
let score = 0;
let availableQuestions = [...questions];

const questionText = document.querySelector(".container h2");
const options = Array.from(document.getElementsByClassName("option"));
const questionNumberText = document.querySelector(".question-number");
const scoreText = document.querySelector(".score-number");
const progressBar = document.getElementById("progress-bar");
const totalQuestions = questions.length;

const loadNewQuestion = () => {
    if (availableQuestions.length === 0) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("final.html");
    }

    currentQuestionIndex++;
    questionNumberText.innerText = `${currentQuestionIndex}/${totalQuestions}`;
    updateProgressBar(); // Update the progress bar here

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionText.innerText = currentQuestion.question;

    options.forEach((option, index) => {
        const optionNumber = index + 1;
        option.innerText = currentQuestion[`choice${optionNumber}`];
        option.dataset["number"] = optionNumber;
    });

    availableQuestions.splice(questionIndex, 1);
};

const updateProgressBar = () => {
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
};

options.forEach((option) => {
    option.addEventListener("click", (e) => {
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset["number"];

        if (selectedAnswer == currentQuestion.answer) {
            score += 10;
            selectedOption.style.backgroundColor = "#72d673";
        } else {
            selectedOption.style.backgroundColor = "#f7655f";
        }

        scoreText.innerText = score;

        setTimeout(() => {
            selectedOption.style.backgroundColor = "";
            loadNewQuestion();
        }, 1000);
    });
});

loadNewQuestion();
