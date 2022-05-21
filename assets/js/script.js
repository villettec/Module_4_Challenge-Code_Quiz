// Universal variables first
var startContainer = document.querySelector(".start-container");
var timer = document.querySelector(".timer");
var startButton = document.querySelector(".start-btn");
var questionContainer= document.querySelector(".question-container");
var questionText = document.querySelector(".question-text");
var answerList = document.querySelector(".answer-list");
var multipleChoiceButton = document.querySelector(".multiple-choice-button");
var endContainer = document.querySelector(".end-container");

// Initially hide the other two containers. aka "pseudo pages"
questionContainer.style.display="none";
endContainer.style.display="none";

// Upon hitting start button, we will display the question container and hide the original start container
// And then call the function start game
startButton.addEventListener("click", function() {
    displayNextQuestion(questionIndex, displayResult);
    questionContainer.style.display="block";
    startContainer.style.display="none";
    startTimer(); //this function below starts the timer
});

// We need to set this variable in the global scope, not inside the function because the value will change from nothing to the setInterval javascript function and later be used in the howTimerWorks function to be cleared when it reaches zero and not got below
// We have to set a variable for the interval so we can clear the interval, aka stop it from running, in the below function
var quiztime;
// Start the timer in upper right corner after hitting start
function startTimer() {
    // Every 1000 milliseconds, aka second, we are going to call the function howTimerWorks and in that function is where the time goes down. SetInterval is saying (function, how often).
    quiztime = setInterval(howTimerWorks, 1000);
}

// How the timer functions
var timeLeft = 5;
function howTimerWorks() {
    timeLeft--; //subtracts time
    timer.textContent=("Timer: " + timeLeft); // the text of the timer class will change to also counting down
    if (timeLeft <= 0) {
        // clearInterval so it doesn't go into negatives. aka stop the interval in the function below from continuing to run after 0.
        clearInterval(quiztime);
        timer.textContent=("Timer: 0, You ran out of time!");
    }
}


var questionsList = [
    { 
        text: "What type of variable can hold more than one value?",
        multipleChoices: ["array", "JavaScript", "event bubbling", "query selector"],
        correct: "array",
    },
    {
        text: "What type of listener would one use to enable a function on click?",
        multipleChoices: ["downturn", "event", "command", "upstream"],
        correct: "event",
    },
    {
        text: "What's inside the parenthesis of a function?",
        multipleChoices: ["placeholder", "variable", "parameter", "concat"],
        correct: "parameter",
    },
    {
        text: "What number does an array index start at?",
        multipleChoices: ["1", "100", "0", "5"],
        correct: "0",
    },
    {
        text: "Where does one place the link to the JavaScript's script.js file in the HTML document?",
        multipleChoices: ["outside the <html>", "in the <DOCTYPE>", "at the top <head>", "at the bottom of <body>"],
        correct: "at the bottom of <body>",
    },
]

// for loop to create and cycle through questions and answers 
var questionIndex = 0;
function displayQuestion(indexplaceholder) {
    // var answerList is the ul class of the multiple choice buttons. set initially to nothing. we will fill this text with the array information
    answerList.innerText="";
    // var questions comes from the universally scoped variable above which holds the array, and that is used in the .length
    for(var i=0; i < questionsList.length; i++) {
        // console.log(questions[i].text) shows you the text of that question for say interval 1. console.log(questions[2].text) would show me question 3's text. Just the value of text, not options etc. Or I could do console.log(questions[i].options)
        var aSingleQuestion = questionsList[indexplaceholder].text;
        var multipleChoiceArray = questionsList[indexplaceholder].multipleChoices;
        // var from up top
        questionText.textContent = aSingleQuestion;
    }
    createAnswers(multipleChoiceArray);
}


//multipleChoiceArray is the collection of multiple choice possibilities 
// we made up the word answerPlaceholder to use 
var score = 0;
var displayResult = document.querySelector(".result");
function createAnswers(multipleChoiceArray) {
    for (var i = 0; i < multipleChoiceArray.length; i++) {
        // for each item in the multiple choice array we want to apply the function addingAnswerButton
        addingAnswerButtons(multipleChoiceArray[i]);     
    }
}

function addingAnswerButtons(answerPlaceholder)  {
        // console.log(answerPlaceholder)
        var answerButton = document.createElement("button");
        // we place answerPlaceholder after, because currently the textContent is nothing. if we put answerPlaceholder first, it would be said to nothing.
        answerButton.textContent = answerPlaceholder;
        answerButton.classList.add("multiple-choice-btn");
        answerList.appendChild(answerButton);
        answerButton.addEventListener("click", function () {
            checkAnswer(answerButton.textContent);
            // wait a sec so user can see checkAnswer result
            setTimeout(function () {
                moveToNextQuestion();
            }, 1000);
        });
    };


function checkAnswer(answerplaceholder) {
    if(questionsList[questionIndex].correct===answerplaceholder) {
        console.log(true);
        displayResult.textContent = "Correct! You gained 5 seconds";
        score++;
        timeLeft+=5;
    } else {
        console.log(false);
        displayResult.textContent = "Incorrect! You lost 5 seconds!"
        timeLeft-=5;
    }
}

function moveToNextQuestion() {
    questionIndex++;
    console.log(questionIndex);
    console.log(questionsList.length);
    if (questionIndex === questionsList.length) {
        endPage();
    } else {
        displayNextQuestion(questionIndex, displayResult);
    }

}

function displayNextQuestion (questionplaceholder, statusplaceholder) {
    // When we display the next question, make the status nothing
    displayQuestion (questionplaceholder);
    statusplaceholder.textContent="";
}

function endPage() {
    questionContainer.style.display="none";
    displayResult.style.display="none";
    endContainer.style.display="block";
    var endResult = document.createElement("h2");
    endResult.classList.add("end-result");
    endContainer.appendChild(endResult);
    if (score > 2) {
        endResult.textContent = "Your score is " + score + " correct out of " + questionsList.length + "! You passed!"
    }
    else  {
        endResult.textContent = "Your score is only " + score + " correct out of " + questionsList.length + "! You failed."
    }
}

