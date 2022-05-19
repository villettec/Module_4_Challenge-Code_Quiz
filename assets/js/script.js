// Universal variables first
var startContainer = document.querySelector(".start-container");
var timer = document.querySelector(".timer");
var startButton = document.querySelector(".start-btn");
var questionContainer= document.querySelector(".question-container");
var questionText = document.querySelector(".question-text");
var answerList = document.querySelector(".answer-list");
var nextButton = document.querySelector(".multiple-choice-button");
var endContainer = document.querySelector(".end-container");

questionContainer.style.display="none";

startButton.addEventListener("click", function(){
    questionContainer.style.display="block";
    startContainer.style.display="none";
    startGame();
});

var timeLeft = 75;
function setTimer() {
    timeLeft--;
    timer.textContent=("Timer: " + timeLeft);
    if (timeLeft === 0) {
        clearInterval(quizTime);
    }
}

var quizTime;
function startGame() {
    quizTime = setInterval(setTimer, 1000);
}

var questions = [
    { 
        text: "What type of variable can hold more than one value?",
        options: ["array", "JavaScript", "event bubbling"],
        correct: "array",
    },
    {
        text: "3+1",
        options: ["3", "4", "5"],
        correct: "4",
    },
    {
        text: "2+1",
        options: ["3", "4", "5"],
        correct: "3",
    },
    {
        text: "2+5",
        options: ["6", "7", "5"],
        correct: "7",
    },
    {
        text: "1+1",
        options: ["3", "2", "5"],
        correct: "2",
    },
]

// for loop for next button to cycle through questions 
var questionIndex = 0;
function displayQuestion() {
    // questions comes from line 33
    for(var i=0; i<questions.length; i++) {
        // console.log(questions[i].text)
        var question = questions[i].text;
        var answersList = questions[i].options;
        // var from up top
        questionText.textContent = question;
    }
    answersList.forEach(function(answer) {
        console.log(answer)
    });
}

displayQuestion();