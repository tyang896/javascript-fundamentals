var body = document.body;
var h2El = document.createElement("h2");
var instructions = document.createElement("p");//holds instructions for how to play the game
var contentContainer = document.createElement("div");//div container to hold all the buttons for the user's choices
var startbtn = document.createElement("button");
var scoreRanking = document.createElement("ol");//Contains a list of scores from highest to lowest
var finalScore = document.createElement("p");//This element shows "Your final score is...."
var brEl = document.createElement("br");
var pResult = document.createElement("p");//This element shows "Correct!" or "Wrong!" in response to the user's response 

var btn1 = document.createElement("button");//Choice 1
var btn2 = document.createElement("button");//Choice 2
var btn3 = document.createElement("button");//Choice 3
var btn4 = document.createElement("button");//Choice 4

var submitBtn  = document.createElement("button");
var clearBtn = document.createElement("button");
var backBtn = document.createElement("button");
var userInput = document.createElement("input");//creates an element for users to enter their intials at the end of the game

var timeRemaining = document.querySelector(".countdownTimer");//This is the <span> tag that holds the time
var timeDisplay = document.querySelector(".timer");//This is the <div> tag that holds all the contents related to showing time on the webpage
var highscoreLink = document.querySelector(".score-link");// This is the <a> tag

//holds an array of all the highscores
var scoreBoard = [];
//An array of <li> elements
var liArray = [];
//An array of the user's button choices
var btnList = [btn1,btn2,btn3,btn4];

h2El.textContent = "Coding Quiz Challenge";
instructions.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
startbtn.textContent = "Start Quiz";
submitBtn.textContent = "Submit";
backBtn.textContent = "Go Back";
clearBtn.textContent = "Clear Highscores";

//Initialized at start of webpage
body.children[0].children[2].appendChild(h2El);
body.children[0].children[2].appendChild(instructions);
body.children[0].children[2].appendChild(startbtn);

//An array of ojects containing all questions, choices, and answers
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

//Keeps track of what question the user is on
var indexQuestion = 0;

//This function starts the countdown timer at 71 seconds and cuts the time by -10 if the user's choice was wrong
function startTimer(){
    var countDown = 71;//sets countdown timer for the quiz. Set to 71 so the screen will first show countdown from 70.
    //This for loop assigns a custom data attribute and creates an event listener for each choice button
    for(i=1; i<5; i++){
        btnList[i-1].dataset.number = i;
        btnList[i-1].addEventListener("click", function(event){
            element = event.target;
            var theirAnswer = element.dataset["number"];//creates data-number attribute
            if(theirAnswer == questions[indexQuestion].answer){//This code runs if user's choice was correct
                indexQuestion++;
                if(indexQuestion == questions.length){//If we reach the end of the questions, clear timer and show they got the answer correct
                    clearInterval(timer);
                    pResult.textContent = "Correct!";
                    showAlldone(countDown);
                    submitBtn.addEventListener("click", function(){//Reset timer after user submits their score
                        timeRemaining.textContent = 0;
                    })

                    userInput.addEventListener("click", function(){//Remove response "Correct!" from the bottom screen when user clicks inside the input box
                        brEl.setAttribute("class" , "hide");
                        pResult.setAttribute("class", "hide");
                    })
                } else{//If we did not reach the end of the question yet, show next question and tell the user they got previous question correct
                    showQuestion(indexQuestion);
                    body.children[0].children[2].children[2].appendChild(brEl);
                    body.children[0].children[2].children[2].appendChild(pResult);
                    pResult.textContent = "Correct!";
                }
            }else{//This code runs if user's choice was wrong
                indexQuestion++;
                if(indexQuestion == questions.length){//If we reach the last question show all done, -10 seconds from their time and tell the user they got the question wrong 
                    countDown -= 10;
                    timeRemaining.textContent = countDown;
                    clearInterval(timer);
                    pResult.textContent = "Wrong!";
                    showAlldone(countDown);
                    submitBtn.addEventListener("click", function(){//reset time to 0 when user clicks submit button
                        timeRemaining.textContent = 0;
                    })
                     
                    userInput.addEventListener("click", function(){//Remove text that says "Wrong!" on the bottom of the screen when user clicks on input box
                        brEl.setAttribute("class", "hide");
                        pResult.setAttribute("class", "hide");
                    })
                }else{//if we still haven't reached the last question, show if they got the question wrong, -10 seconds from their time and then show next question
                showQuestion(indexQuestion);
                body.children[0].children[2].children[2].appendChild(brEl);
                body.children[0].children[2].children[2].appendChild(pResult);
                pResult.textContent = "Wrong!";
                countDown -= 10;
                }
            }
        })
    }//End of for loop
    //This function changes time displayed every second
    var timer = setInterval(function(){
        countDown--;
        timeRemaining.textContent = countDown;
         if (countDown <= 0 && indexQuestion == 0){//If we're still on the first question and timer runs out, show all done
            timeRemaining.textContent = countDown;
            clearInterval(timer);
            showAlldone(countDown);

        } else if (countDown <= 0){//If we're on a question and timer runs out, show all done and remove <br> and <p> tag
            timeRemaining.textContent = countDown;
            clearInterval(timer);
            showAlldone(countDown);
            submitBtn.addEventListener("click", function(){
                timeRemaining.textContent = 0;
            })
        }
    },1000);
}//End of startTimer() function

//This function shows user's score at end of the game
function showAlldone(finalTime){
    h2El.textContent = "All done!";
    body.children[0].children[2].appendChild(finalScore);
    body.children[0].children[2].appendChild(userInput);
    body.children[0].children[2].appendChild(submitBtn);
    body.children[0].children[2].appendChild(brEl);
    body.children[0].children[2].appendChild(pResult);
    //Removes all button choices
    for(i=0; i<btnList.length; i++){
        body.children[0].children[2].children[2].removeChild(btnList[i]);//add buttons to the ordered list
    }
    body.children[0].children[2].removeChild(contentContainer);
    finalScore.textContent = "Your final score is " + finalTime + ". Enter Initials: ";
    localStorage.setItem("score", finalTime);
}//End of showAlldone() function

//Add a new user to the scoreboard and show highscores
submitBtn.addEventListener("click", function(event){
    var user = userInput.value;
    if (user === ""){//show an error if user left input blank
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
    //add newUser to the list
    scoreBoard.push(newUser);
    //If the local storage already exists, add new user to local storage 
    if(localStorage.getItem("scoreList")){
        var allScores = JSON.parse(localStorage.getItem("scoreList"));
        allScores.push(newUser);
        scoreBoard = allScores;
        localStorage.setItem("scoreList", JSON.stringify(allScores));
    } else{//create new local storage if one does not exist
        localStorage.setItem("scoreList", JSON.stringify(scoreBoard));//create copy of scoreboard list and add to local storage
        }
    showHighscores();
})

//This function comes after showAlldone();
function showHighscores(){
    scoreBoard.sort(function(a,b){return b.score-a.score});//Sort scores from highest to lowest
    timeDisplay.setAttribute("class", "timer hide");//Hide time from top-right corner
    highscoreLink.setAttribute("class", "score-link hide");//Hide score link from top-left corner
    h2El.textContent = "Highscores";
    body.children[0].children[2].removeChild(finalScore);
    body.children[0].children[2].removeChild(userInput);
    body.children[0].children[2].removeChild(submitBtn);
    body.children[0].children[2].appendChild(scoreRanking);

    //Adds a li element inside of an unordered list. 
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
        liArray = [];//Removes all <li> tags elements from array
    })

}

//Reload page when back button is clicked
backBtn.addEventListener("click", function(){
    document.location.reload(true);
})

//This function is similar to showHighscores() but only executes when the user clicks on "view Highscores" link
function seeLink(){
    timeDisplay.setAttribute("class", "timer hide");//Hide time from top-right corner
    highscoreLink.setAttribute("class", "score-link hide");//Hide score link from top-left corner
    if(localStorage.getItem("scoreList")){//If local storage exists, retrieve scores from local storage
        var allScores = JSON.parse(localStorage.getItem("scoreList"));
        scoreBoard = allScores;
    } 
    scoreBoard.sort(function(a,b){return b.score-a.score});
    var newContents = document.createElement("section");
    var title = document.createElement("h2");
    title.textContent = "Highscores";
    body.children[0].removeChild(document.querySelector(".container"));
    body.children[0].appendChild(newContents);
    body.children[0].children[2].appendChild(title);
    body.children[0].children[2].appendChild(scoreRanking);

    //Adds a li element inside of an unordered list. 
    for(i=0; i<scoreBoard.length; i++){
        var liEl = document.createElement("li");
        liEl.setAttribute("class", "listUser");
        liArray.push(liEl);
        body.children[0].children[2].children[1].appendChild(liEl);
        liEl.textContent = scoreBoard[i].initials + ": " + scoreBoard[i].score;
    }

    body.children[0].children[2].appendChild(backBtn);
    body.children[0].children[2].appendChild(clearBtn);
    //Clear local storage and remove <li> elements
    clearBtn.addEventListener("click", function(event){
        localStorage.clear();//clear local storage of the lists
        for(i=0; i<scoreBoard.length; i++){
            body.children[0].children[2].children[1].removeChild(liArray[i]);
        }

        liArray = []; //removes all <li> elements from the array
    })
}//End of seeLink() function

//Displays question and choices on screen
function showQuestion(questionNum){
    h2El.textContent = questions[questionNum].question;//Changes text of the h2 element
    btn1.textContent = questions[questionNum].option1;//displays question
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
    body.children[0].children[2].children[2].appendChild(btn1);//adds buttons to ordered list
    body.children[0].children[2].children[2].appendChild(btn2);
    body.children[0].children[2].children[2].appendChild(btn3);
    body.children[0].children[2].children[2].appendChild(btn4);
    showQuestion(indexQuestion);
    startTimer();
}

highscoreLink.addEventListener("click", seeLink);
startbtn.addEventListener("click", startGame);




