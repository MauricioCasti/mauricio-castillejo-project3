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

//Making multiple typing tests
var tests = {text:["the quick brown fox jumped over the lazy dog",
            "the course, comp 484, is a class in which you can learn about web design and the code that goes along with it such as HTML, CSS, and Javascript",
            "those crazy contraptions can't create the kind of classic catastrophe one can cause by cleverly concealing a calamitous crater!",]}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function NumberSetup(num){
    return("0"+num);
}

// Run a standard minute/second/hundredths timer:
function timerUpdate(){
    var presentTime = new Date();
    var differnce = presentTime.getTime() - timeStart.getTime();

    //makes time into seconds since 1 sec is 1000 milliseconds
    differnce = differnce/1000;

    if(differnce/60 > 1){
        var min = Math.floor(differnce/60);
        var sec = differnce - (min * 60);
        document.getElementById("timer").innerHTML = ((min<10) ? NumberSetup(min):min) + ":" + ((sec < 10) ? NumberSetup(sec.toFixed(3)):sec.toFixed(3));
    }else{
        document.getElementById("timer").innerHTML = "00:" + ((differnce<10) ?NumberSetup(differnce.toFixed(3)) : differnce.toFixed(3));
    }
}

// Match the text entered with the provided text on the page:
function textCheck(){
    if(timeStart == null){
        startTime();
        console.log("timer has begun...");
    }
    var selected = document.getElementById('type-test');
    userInput = document.getElementById("test-area").value;

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
        console.log("finished! you made " + mistakes + " mistakes");
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

    document.getElementById("test-area").value = '';
    document.getElementById("timer").innerHTML = "00:00:00";
}

// new addition, relies on dropdown and select button to obtain and display the chosen test
function displayCurrent(){
    console.log(selected);
    var selected = document.getElementById("selection").value;
    switch(selected){
        case tests.text[0]:
            document.getElementById("type-test").innerHTML = selected;
            break;
        case tests.text[1]:
            document.getElementById("type-test").innerHTML = selected;
            break;
        case tests.text[2]:
            document.getElementById("type-test").innerHTML = selected;
            break;
    }
} 

// Event listeners for keyboard input and the reset button:
