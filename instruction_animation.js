/*
    Course : SENG 513 Web Based Systems
    Date: November 10th, 2023
    Assignment 3
    Name: Victor Han
    UCID: 30112492
*/

let screenNum = 0;
let nextButtonOn = true
let prevButtonOn = false
document.getElementById('instruction_1').style.display = "inline"
document.getElementById("prev_button").style.opacity = 0.0;
document.getElementById('prev_button').style.cursor = "unset"
const instructionIDs = ["instruction_1" ,"instruction_2","instruction_3" ,"instruction_4",
"instruction_5", "instruction_6","instruction_7","instruction_8"]
function moveForward() {
    if(!nextButtonOn){
        return;
    }
    const currentScreen = document.getElementById(instructionIDs[screenNum]);
    const nextScreen = document.getElementById(instructionIDs[screenNum+1]);

    currentScreen.classList.add('slide_out_left');
    nextScreen.classList.add('slide_in_right');
    nextButtonOn = false;
    prevButtonOn = false;
    setTimeout(() => {
        currentScreen.style.display='none';
        nextScreen.style.display = 'inline';
    }, 500)
    setTimeout(() => {
        currentScreen.classList.remove('slide_out_left');
        nextScreen.classList.remove('slide_in_right');
        if(screenNum < 7){
            nextButtonOn = true;
        }
        prevButtonOn = true;
    }, 1000);
    screenNum++;
    if(screenNum === 7){
        document.getElementById("next_button").style.opacity = 0.0;
        document.getElementById('next_button').style.cursor = "unset"
    }
    else if(screenNum === 1){
        document.getElementById("prev_button").style.opacity = 1.0;
        document.getElementById('prev_button').style.cursor = "pointer"
    }
}
function moveBackward(){
    if(!prevButtonOn){
        return
    }
    const currentScreen = document.getElementById(instructionIDs[screenNum]);
    const nextScreen = document.getElementById(instructionIDs[screenNum-1]);

    currentScreen.classList.add('slide_out_right');
    nextScreen.classList.add('slide_in_left');
    nextButtonOn = false;
    prevButtonOn = false;
    setTimeout(() => {
        currentScreen.style.display='none';
        nextScreen.style.display = 'inline';
    }, 500)
    setTimeout(() => {
        currentScreen.classList.remove('slide_out_right');
        nextScreen.classList.remove('slide_in_left');
        if(screenNum > 0){
            prevButtonOn = true;
        }
        nextButtonOn = true;
    }, 1000);
    screenNum--;
    if(screenNum === 0){
        document.getElementById("prev_button").style.opacity = 0.0;
        document.getElementById('prev_button').style.cursor = "unset"
    }
    else if(screenNum === 6){
        document.getElementById("next_button").style.opacity = 1.0;
        document.getElementById('next_button').style.cursor = "pointer"
    }
}
