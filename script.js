// const testWrapper = document.querySelector(".test-wrapper");
// const testArea = document.querySelector("#test-area");
// const originText = document.querySelector("#origin-text p").innerHTML;
// const resetButton = document.querySelector("#reset");
// const theTimer = document.querySelector(".timer");
/////////////////////////////////////////////////////////////////////////
//Since I am directly handling html via javascript and getId/getAttribute function calls, the lines of code above are not needed
/////////////////////////////////////////////////////////////////////////

// Global Variables
var timeStart = null;
var timeRun;
var mistakes = 0;
var userInput= '';
var totalTime;
var scoreBoard = [undefined,undefined,undefined];
console.log(scoreBoard + " from global method");
console.log(scoreBoard.length);
//the quick brown fox jumped over the lazy dog

//Making multiple typing tests
var tests = {text:["the quick brown fox jumped over the lazy dog",
            "the course, comp 484, is a class in which you can learn about HTML, CSS, and Javascript for web design",
            "those crazy contraptions can't create the kind of classic catastrophe one can cause by cleverly concealing a calamitous crater!",]}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function NumberSetup(num){
    return("0"+num);
}

// Run a standard minute/second/hundredths timer:
function timerUpdate(){
    var presentTime = new Date();
    var difference = presentTime.getTime() - timeStart.getTime();

    //makes time into seconds since 1 sec is 1000 milliseconds
    difference = difference/1000;

    if(difference/60 > 1){
        var min = Math.floor(difference/60);
        var sec = difference - (min * 60);
        document.getElementById("timer").innerHTML = ((min<10) ? NumberSetup(min):min) + ":" + ((sec < 10) ? NumberSetup(sec.toFixed(3)):sec.toFixed(3));
    }else{
        document.getElementById("timer").innerHTML = "00:" + ((difference<10) ?NumberSetup(difference.toFixed(3)) : difference.toFixed(3));
    }
    // sets total time to show final score
    totalTime = difference;
}

// Match the text entered with the provided text on the page:
function textCheck(){
    // var selected = document.getElementById('type-test').value;
    var selected = getTest();
    // console.log("entered textCheck");
    // console.log(selected);
    // learned about undefined when getting values from a event call 
    //https://stackoverflow.com/questions/2778901/how-to-compare-variables-to-undefined-if-i-don-t-know-whether-they-exist
    if (selected == undefined){
        document.getElementById("type-test").innerHTML = "Test not chosen please select a test.";
        return console.log("Error: Not Selected a Test");
    }else{
        if(timeStart == null){
            startTime();
            console.log("timer has begun...");
            document.getElementById("select").setAttribute("style","display: none");
        }
    }
    userInput = document.getElementById("test-area").value;

    // used a style.remove property to change the style of the selected element
    // source: https://stackoverflow.com/questions/18691655/remove-style-on-element
    if(userInput.charAt(userInput.length-1) !== selected.charAt(userInput.length-1)){
        document.getElementById("border-color").style.removeProperty("border");
        document.getElementById("border-color").setAttribute("style", "border: 10px solid #ff000099");//removes and re-sets the border property to red if matching is incorrect
        mistakes++;
    }else{
        document.getElementById("border-color").style.removeProperty("border");
        document.getElementById("border-color").setAttribute("style", "border: 10px solid #ffffff");//resets back to black if matching is correct
    }

    // user completes the typing task
    if(userInput == selected){
        clearInterval(timeRun);
        document.getElementById("border-color").setAttribute("style", "border: 10px solid green");
        document.getElementById("mistakes").innerHTML = "Finished! you made " + mistakes + " mistake(s)";
        document.getElementById("select").setAttribute("style","display: block");
        //call display score to populate top 3
        displayScore(totalTime);
    }

}

// Start the timer:
function startTime(){
    timeStart = new Date();
    timeRun = window.setInterval(timerUpdate, 1);
}

// Reset everything:
function reset(){
    console.log("stopping and resetting");
    clearInterval(timeRun);
    timeStart = null;
    document.getElementById("select").setAttribute("style","display: block");
    document.getElementById("mistakes").innerHTML = "";
    document.getElementById("test-area").value = '';
    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("score-board").innerHTML = "";
    console.log(scoreBoard + " from reset function");
}

// new handler, relies on dropdown and select button to obtain and display the chosen test
function getTest(){
    // console.log(document.getElementById("select").value);
    var choice=document.getElementById("select").value;
    document.getElementById("mistakes").innerHTML = "";
    //document.getElementById("selection").value
    switch(choice){
        case "test1":
            var selected = tests.text[0]
            console.log(selected);
            document.getElementById("type-test").innerHTML = selected;
            return selected;
        case "test2":
            var selected = tests.text[1]
            console.log(selected);
            document.getElementById("type-test").innerHTML = selected;
            return selected;
        case "test3":
            var selected = tests.text[2]
            console.log(selected);
            document.getElementById("type-test").innerHTML = selected;
            return selected;
            case "null":
            var selected = null;
            document.getElementById("type-test").innerHTML = "Please choose a test before starting";
            return selected;
    }
} 

// Event listeners for keyboard input and the reset button:

function displayScore(time){
    console.log("checking times...");

    //set first by default
    if(scoreBoard[0] == undefined){
        scoreBoard[0] = time;
    }
    
    if(time < scoreBoard[0]){ //if new time beats first
        scoreBoard[2] = scoreBoard[1];
        scoreBoard[1] = scoreBoard[0];
        scoreBoard[0] = time;
    }else if(time > scoreBoard[0] && (time< scoreBoard[1] || scoreBoard[1] == undefined)){ //if new time isnt first but beats second
        scoreBoard[2] = scoreBoard[1];
        scoreBoard[1] = time;
    }else if(time > scoreBoard[1] && (time < scoreBoard[2] || scoreBoard[2] == undefined)){ //if new time isnt second but beats third
        scoreBoard[2] = time;
    }else{ //was not fast enough to be tope 3
        console.log("time not fast for top 3 ranking");
    }



    document.getElementById("score-board").innerHTML = "Leaderboard:<br>"+ "1st: " + scoreBoard[0]+ "<br>" + "2nd: " + scoreBoard[1]+ "<br>" + "3rd: " + scoreBoard[2];
}
