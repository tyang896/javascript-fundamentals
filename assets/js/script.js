var body = document.body;
var h2El = document.createElement("h2");
var instructions = document.createElement("p");
var contentContainer = document.createElement("div");
var startbtn = document.createElement("button");
var scoreRanking = document.createElement("ol");
var finalScore = document.createElement("p");
var brEl = document.createElement("br");
var pResult = document.createElement("p");

var btn1 = document.createElement("button");//Choice 1
var btn2 = document.createElement("button");//Choice 2
var btn3 = document.createElement("button");//Choice 3
var btn4 = document.createElement("button");//Choice 4

var submitBtn  = document.createElement("button");
var clearBtn = document.createElement("button");
var backBtn = document.createElement("button");
var userInput = document.createElement("input");//creates an element for users to enter their intials at the end of the game

var timeRemaining = document.querySelector(".countdownTimer");
var viewHighscores = document.querySelector("a");
var timeDisplay = document.querySelector(".timer");
var highscoreLink = document.querySelector(".score-link");

//holds an array of all the highscores
var scoreBoard = [];
//An array of <li> elements
var liArray = [];
var btnList = [btn1,btn2,btn3,btn4];

h2El.textContent = "Coding Quiz Challenge";
instructions.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
startbtn.textContent = "Start Quiz";
submitBtn.textContent = "Submit";
backBtn.textContent = "Go Back";
clearBtn.textContent = "Clear Highscores";

body.children[0].children[2].appendChild(h2El);
body.children[0].children[2].appendChild(instructions);
body.children[0].children[2].appendChild(startbtn);

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        option1: "1. strings",
        option2: "2. booleans",
        option3: "3. alerts",
        option4: "4. numbers",
        answer: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        option1: "1. numbers and strings",
        option2: "2. other arrays",
        option3: "3. booleans",
        option4: "4. all of the above",
        answer: "4"
    },
    {
        question: "What file extension do javascript files use?",
        option1: "1. .js",
        option2: "2. .html ",
        option3: "3. .png ",
        option4: "4. .css",
        answer: "1",
    },
    {
        question: "What element is used in your html file to link your javascript?",
        option1: "1. <div>",
        option2: "2. <a>",
        option3: "3. <script>",
        option4: "4. <html>",
        answer: "3",
    }
];

var indexQuestion = 0;

function startTimer(){
    var countDown = 71;//sets the countdown timer for the quiz
    var promptQuestion = h2El.textContent;

    //This for loop assigns a custom data attribute and creates an event listener for each choice button
    for(i=1; i<5; i++){
        btnList[i-1].dataset.number = i;
        btnList[i-1].addEventListener("click", function(event){
            element = event.target;
            var theirAnswer = element.dataset["number"];
            if(theirAnswer == questions[indexQuestion].answer){//if they selected the correct answer run this code:
                indexQuestion++;
                if(indexQuestion == questions.length){//If we reach the end of the questions, clear the timer and show that they got the answer correct
                    clearInterval(timer);
                    pResult.textContent = "Correct!";
                    showAlldone(countDown);
                    submitBtn.addEventListener("click", function(){//Reset the timer after the user submits their score
                        timeRemaining.textContent = 0;
                    })

                    userInput.addEventListener("click", function(){//if the user clicks on the input box, then remove the response "Correct!" from the bottom screen
                        brEl.setAttribute("class" , "hide");
                        pResult.setAttribute("class", "hide");
                    })
                } else{
                    showQuestion(indexQuestion);
                    body.children[0].children[2].children[2].appendChild(brEl);
                    body.children[0].children[2].children[2].appendChild(pResult);
                    pResult.textContent = "Correct!";
            
                }
            }else{
                indexQuestion++;
                if(indexQuestion == questions.length){//If we reach the last question and they got it wrong, show all done and 
                    countDown -= 10;
                    timeRemaining.textContent = countDown;
                    clearInterval(timer);
                    pResult.textContent = "Wrong!";
                    showAlldone(countDown);
                    submitBtn.addEventListener("click", function(){
                        timeRemaining.textContent = 0;

                    })
                     
                    userInput.addEventListener("click", function(){//If the user clicks on the input box, then remove the text that says "Wrong!" on the bottom of the screen
                        brEl.setAttribute("class", "hide");
                        pResult.setAttribute("class", "hide");
                    })
                }else{//else if we still haven't reached the last question, show if they got the question wrong
                showQuestion(indexQuestion);
                body.children[0].children[2].children[2].appendChild(brEl);
                body.children[0].children[2].children[2].appendChild(pResult);
                pResult.textContent = "Wrong!";
                countDown -= 10;
                }
            }
        })
    }

    var timer = setInterval(function(){
        countDown--;
        timeRemaining.textContent = countDown;
         if (countDown <= 0 && indexQuestion == 0){//If we're still on the first question and the timer runs out, show all done
            timeRemaining.textContent = countDown;
            clearInterval(timer);
            showAlldone(countDown);

        } else if (countDown <= 0){//If we're on a question and the timer runs out, show timer and remove <br> and <p> tag
            timeRemaining.textContent = countDown;
            clearInterval(timer);
            showAlldone(countDown);
            submitBtn.addEventListener("click", function(){
                timeRemaining.textContent = 0;
            })
        }
    },1000);
}

function showAlldone(finalTime){
    h2El.textContent = "All done!";
    body.children[0].children[2].appendChild(finalScore);
    body.children[0].children[2].appendChild(userInput);
    body.children[0].children[2].appendChild(submitBtn);
    body.children[0].children[2].appendChild(brEl);//If the user didn't finish answering the questions, the <br> is removed. See startTimer function. See line 174 and line 181.
    body.children[0].children[2].appendChild(pResult);//If the user didn't finish answering the questions, the <p> is removed. See startTimer function. See line 175 and line 182.
    for(i=0; i<btnList.length; i++){
        body.children[0].children[2].children[2].removeChild(btnList[i]);//adds buttons to the ordered list
    }

    body.children[0].children[2].removeChild(contentContainer);
    finalScore.textContent = "Your final score is " + finalTime + ". Enter Initials: ";
    localStorage.setItem("score", finalTime);
}

submitBtn.addEventListener("click", function(event){
    var user = userInput.value;
    if (user === ""){
        pResult.setAttribute("class", "");
        pResult.textContent = "error: username cannot be left blank";
        return;
    } else{
        body.children[0].children[2].removeChild(brEl);
        body.children[0].children[2].removeChild(pResult);
    }

    var newUser = {
        initials: user,
        score: localStorage.getItem("score"),
    }

    scoreBoard.push(newUser);//add newUser to the list
    if(localStorage.getItem("scoreList")){//If the local storage already exists, add the new user to the local storage 
        var allScores = JSON.parse(localStorage.getItem("scoreList"));
        allScores.push(newUser);
        scoreBoard = allScores;
        localStorage.setItem("scoreList", JSON.stringify(allScores));
    
    } else{
        localStorage.setItem("scoreList", JSON.stringify(scoreBoard));//create a copy of the scoreboard list to local storage
    }
    showHighscores();

})

//This function comes after showAlldone();
function showHighscores(){
    scoreBoard.sort(function(a,b){return b.score-a.score});
    timeDisplay.setAttribute("class", "timer hide");//Hide the time that was on the top-right corner
    highscoreLink.setAttribute("class", "score-link hide");//Hide the score link that was on the top-left corner
    h2El.textContent = "Highscores";
    body.children[0].children[2].removeChild(finalScore);
    body.children[0].children[2].removeChild(userInput);
    body.children[0].children[2].removeChild(submitBtn);
    body.children[0].children[2].appendChild(scoreRanking);

    //This for loop adds a li element inside of an unordered  list. Should only add one item to the list
    for(i=0; i<scoreBoard.length; i++){
        var liEl = document.createElement("li");
        liEl.setAttribute("class", "listUser");
        liArray.push(liEl);
        body.children[0].children[2].children[2].appendChild(liEl);
        liEl.textContent = scoreBoard[i].initials + ": " + scoreBoard[i].score;

    }

    body.children[0].children[2].appendChild(backBtn);
    body.children[0].children[2].appendChild(clearBtn);

    clearBtn.addEventListener("click", function(event){
        localStorage.clear();//clear local storage of the lists
        for(i=0; i<scoreBoard.length; i++){
            body.children[0].children[2].children[2].removeChild(liArray[i]);
        }
    
        liArray = [];
        
    })

}

backBtn.addEventListener("click", function(){
    document.location.reload(true);
})

//This function runs similar to showHighscores() but only executes when the user clicks on "view Highscores" link
function seeLink(){
    if(localStorage.getItem("scoreList")){//If the local storage already exists, add the new user to the local storage
        var allScores = JSON.parse(localStorage.getItem("scoreList"));
        scoreBoard = allScores;
    } 
    scoreBoard.sort(function(a,b){return b.score-a.score});
    body.children[0].removeChild(document.querySelector(".container"));
    var newContents = document.createElement("section");
    body.children[0].appendChild(newContents);

    timeDisplay.setAttribute("class", "timer hide");//Hide the time that was on the top-right corner
    highscoreLink.setAttribute("class", "score-link hide");//Hide the score link that was on the top-left corner

    var title = document.createElement("h2");
    title.textContent = "Highscores";

    body.children[0].children[2].appendChild(title);
    body.children[0].children[2].appendChild(scoreRanking);

    //This for loop adds a li element inside of an unordered  list. Should only add one item to the list
    for(i=0; i<scoreBoard.length; i++){
        var liEl = document.createElement("li");
        liEl.setAttribute("class", "listUser");
        liArray.push(liEl);
        body.children[0].children[2].children[1].appendChild(liEl);
        liEl.textContent = scoreBoard[i].initials + ": " + scoreBoard[i].score;
    }

    body.children[0].children[2].appendChild(backBtn);
    body.children[0].children[2].appendChild(clearBtn);

    clearBtn.addEventListener("click", function(event){
        localStorage.clear();//clear local storage of the lists
        for(i=0; i<scoreBoard.length; i++){
            body.children[0].children[2].children[1].removeChild(liArray[i]);
        }

        liArray = [];
        
    })
}

function showQuestion(questionNum){
    h2El.textContent = questions[questionNum].question;//Changes the text of the h2 element
    btn1.textContent = questions[questionNum].option1;//displays the question
    btn2.textContent = questions[questionNum].option2;
    btn3.textContent = questions[questionNum].option3;
    btn4.textContent = questions[questionNum].option4;

    btn1.setAttribute("class", "");
    btn2.setAttribute("class", "");
    btn3.setAttribute("class", "");
    btn4.setAttribute("class", "");
   
}

function startGame(){
    indexQuestion = 0;
    instructions.setAttribute("class", "hide");
    body.children[0].children[2].removeChild(startbtn);//removes the start button
    body.children[0].children[2].appendChild(contentContainer);//adds div section to hold buttons
    body.children[0].children[2].children[2].appendChild(btn1);//adds buttons to the ordered list
    body.children[0].children[2].children[2].appendChild(btn2);
    body.children[0].children[2].children[2].appendChild(btn3);
    body.children[0].children[2].children[2].appendChild(btn4);

    showQuestion(indexQuestion);
    startTimer();
}

startbtn.addEventListener("click", startGame);
viewHighscores.addEventListener("click", seeLink);



