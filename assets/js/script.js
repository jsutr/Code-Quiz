//DOM
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var answersEl = document.querySelector("#answers");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#review");

//Quiz Variables
var timerId;
var time = questionsEl.length * 20;
var questionIndex = 0;

function startQuiz() {
    var startScreenEl = document.getElementById("start-prompt");
    startScreenEl.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
}

function getQuestion () {

    var currentQuestion = questions[questionIndex];

    var titleEl = document.getElementById("question");
    titleEl.textContent = currentQuestion.title;

    answersEl.innerHTML = "";

    currentQuestion.choices.forEach(function(answers, i) {
        var answersNode = document.createElement("button");
        answersNode.setAttribute("class", "answers");
        answersNode.setAttribute("value", answers);

        answersNode.textContent = i + 1 + ", " + answers;

        answersNode.onclick = questionClick;

        answersEl.appendChild(answersNode);
    });
}

function questionClick() {
    if (this.value !== questions[questionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        feedbackEl.textContent = "Incorrect.";
        feedbackEl.style.color = "red";
        feedbackEl.style.fontSize = "400%";
   
    }   else {
        feedbackEl.textContent = "Correct.";
        feedbackEl.style.color = "green";
        feedbackEl.style.fontSize = "400%";
    }

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    questionIndex++;
  
    if (questionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
  
    var endScreenEl = document.getElementById("end-quiz");
    endScreenEl.removeAttribute("class");
  
    var finalScoreEl = document.getElementById("score");
    finalScoreEl.textContent = time;
  
    questionsEl.setAttribute("class", "hide");
  }
  
  function clockTick() {
    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
      quizEnd();
    }
  }
  
  function saveHighscore() {
    
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
    
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
     
      var newScore = {
        score: time,
        initials: initials
      };
  
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      window.location.href = "score.html";
    }
  }
  
  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  // initial submission
  submitBtn.onclick = saveHighscore;
  
  // begin quiz
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;
  