/*
    Course : SENG 513 Web Based Systems
    Date: Novemeber 3rd, 2023
    Assignment 3
    Name: Victor Han
    UCID: 30112492
*/
const suitToClass = {'hearts': 'heart','diamonds': 'diamond','clubs': 'club','spades': 'spade'};
const suitToChar = {'hearts': '♥','diamonds': '♦','clubs': '♣','spades': '♠'};
const raiseActionsHTML = () => {
    let betAmount = 0;
    if(playerTurn === 0){
        betAmount = (playerBetAmount[1] > playerBetAmount[2] ? playerBetAmount[1] : playerBetAmount[2]) - playerBetAmount[0]
    }
    else if(playerTurn === 1){
        betAmount = (playerBetAmount[0] > playerBetAmount[2] ? playerBetAmount[0] : playerBetAmount[2]) - playerBetAmount[1]
    }
    else{
        betAmount = (playerBetAmount[1] > playerBetAmount[0] ? playerBetAmount[1] : playerBetAmount[0]) - playerBetAmount[2]
    }
    
    return `<div id = "raise_actions">
<input type = "number" id ="raise_input" min = "${betAmount+1}" max = "${player_money_count[playerTurn]}" placeholder = "Enter amount to raise"></input>
<div class = "raise_form_button" onclick = "raise()"> Raise!</div>
<div class = "raise_form_button" onclick = "showActionButtons()"> Cancel </div>
</div>`}
const actionButtonsHTML = () => { 
    let betAmount = 0;
    if(playerTurn === 0){
        betAmount = (playerBetAmount[1] > playerBetAmount[2] ? playerBetAmount[1] : playerBetAmount[2]) - playerBetAmount[0]
    }
    else if(playerTurn === 1){
        betAmount = (playerBetAmount[0] > playerBetAmount[2] ? playerBetAmount[0] : playerBetAmount[2]) - playerBetAmount[1]
    }
    else{
        betAmount = (playerBetAmount[1] > playerBetAmount[0] ? playerBetAmount[1] : playerBetAmount[0]) - playerBetAmount[2]
    }
    let callOrCheck = "Call"
    if(betAmount === 0){
        callOrCheck = "Check"
    }
    return `<div id = "action_buttons">
<div class = "action_button" onClick = "fold()"> Fold </div>
<div class = "action_button" onClick = "toggleRaiseForm()"> Raise </div>
<div class = "action_button" onClick = "call()" id ="check_call_button"> ${callOrCheck} </div>
</div>`}
const potDisplayHTML = () => { return `<div id = "pot_display">
<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">${pot_value}</div>`;}
const createCardDiv = (card) =>{
    let value;
    if(card.value <= 10){
        value = card.value
    }
    else if(card.value === 11){
        value = 'J'
    }
    else if(card.value === 12){
        value = 'Q'
    }
    else if(card.value === 13){
        value = 'K'
    }
    else{
        value = 'A'
    }
    return `<div class= "face_up card ${suitToClass[card.suit]}">
        <div class = "top_of_card"> ${value} </div>
        <div class = "bottom_of_card"> ${suitToChar[card.suit]} </div>
    </div>`
}
function showCards(player){
    if(player !== playerTurn){
        document.getElementById("feedback_message").innerText = "You cheater! Don't look at someone else's cards!"
    }
    let card_list = null
    if(player === 0){
        card_list = document.getElementById("player1_card_list")
    }
    else if(player === 1){
        card_list = document.getElementById("player2_card_list")
    }
    else{
        card_list = document.getElementById("player3_card_list")
    }
    const faceDownHTML = card_list.innerHTML;
    const card1 = createCardDiv(player_cards[player][0])
    const card2 = createCardDiv(player_cards[player][1])
    card_list.innerHTML = card1+ card2;
    setTimeout(()=>{
        card_list.innerHTML = faceDownHTML;
    },1500)
}
//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// https://www.w3schools.com/js/js_htmldom_animate.asp
async function animateBet (bettingPlayer) {
    document.getElementById("game_display").innerHTML += `<img id = "dynamic_chip" src = "images/poker_chip.png" alt = "poker chip">`
    const movingChip = document.getElementById("dynamic_chip");
    movingChip.style.position = "absolute";
  
    if(window.innerWidth > 750){
        if(bettingPlayer === 1){
            movingChip.style.left = "310px";
            movingChip.style.top = "180px";
            for(let position = 180; position <= 410; position++){
                movingChip.style.top = position + "px";
                await sleep(7);
            }
        }
        else if(bettingPlayer === 0){
            movingChip.style.left = "80px";
            movingChip.style.top = "410px";
            for(let position = 80; position <= 310; position++){
                movingChip.style.left = position + "px";
                await sleep(7);
            }
        }
        else if(bettingPlayer === 2){
            movingChip.style.left = "540px";
            movingChip.style.top = "410px";
            for(let position = 540; position >= 310; position--){
                movingChip.style.left = position + "px";
                await sleep(7);
            }
        }
        
    }
    else{
        if(bettingPlayer === 1){
            movingChip.style.left = "155px";
            movingChip.style.top = "145px";
            for(let position = 145; position <= 380; position++){
                movingChip.style.top = position + "px";
                await sleep(7);
            }
        }
        else if(bettingPlayer === 0){
            movingChip.style.left = "45px";
            movingChip.style.top = "380px";
            for(let position = 45; position <= 155; position++){
                movingChip.style.left = position + "px";
                await sleep(9);
            }
        }
        else if(bettingPlayer === 2){
            movingChip.style.left = "280px";
            movingChip.style.top = "380px";
            for(let position = 280; position >= 155; position--){
                movingChip.style.left = position + "px";
                await sleep(9);
            }
        }
    }
    movingChip.remove()
   
}
async function animatePotWin( winningPlayer ){
    document.getElementById("game_display").innerHTML += `<img id = "dynamic_chip" src = "images/poker_chip.png" alt = "poker chip">`
    const movingChip = document.getElementById("dynamic_chip");
    movingChip.style.position = "absolute";
    if(window.innerWidth > 750){
        movingChip.style.top = "410px";
        movingChip.style.left = "310px";
        if(winningPlayer === 1){
            for(let position = 410; position >= 180; position--){
                movingChip.style.top = position + "px";
                await sleep(7);
            }
    
    
        }
        else if(winningPlayer === 0){
            for(let position = 310; position >= 80; position--){
                movingChip.style.left = position + "px";
                await sleep(7);
            }
        }
        else if(winningPlayer === 2){
            for(let position = 310; position <= 540; position++){
                movingChip.style.left = position + "px";
                await sleep(7);
            }
        }
    }
    else{
        movingChip.style.top = "380px";
        movingChip.style.left = "155px";
        if(winningPlayer === 1){
            for(let position = 380; position >= 145; position--){
                movingChip.style.top = position + "px";
                await sleep(7);
            }
    
    
        }
        else if(winningPlayer === 0){
            for(let position = 155; position >= 45; position--){
                movingChip.style.left = position + "px";
                await sleep(9);
            }
        }
        else if(winningPlayer === 2){
            for(let position = 155; position <= 280; position++){
                movingChip.style.left = position + "px";
                await sleep(9);
            }
        }
    }
   
    movingChip.remove()
}
async function animateFlop(card1,card2,card3){
    document.getElementById("game_display").innerHTML += `<img class = "dynamic_card" id = "dynamic_card" src = "images/card_back.jpg" alt = "card">`
    let movingCard = document.getElementById("dynamic_card");
    movingCard.style.position = "absolute";
    movingCard.style.top = "455px";
    movingCard.style.left = "300px";
    for(let position = 300; position >= 120; position--){
        movingCard.style.left = position + "px";
        await sleep(4);
    }
    movingCard.remove()
    document.getElementById("community_cards").innerHTML += createCardDiv(card1)
  
    document.getElementById("game_display").innerHTML += `<img class = "dynamic_card" id = "dynamic_card" src = "images/card_back.jpg" alt = "card">`
    movingCard = document.getElementById("dynamic_card");
    movingCard.style.position = "absolute";
    movingCard.style.top = "455px";
    movingCard.style.left = "300px";
    for(let position = 300; position >= 155; position--){
        movingCard.style.left = position + "px";
        await sleep(4);
    }
    movingCard.remove()
    document.getElementById("community_cards").innerHTML += createCardDiv(card2)

   
    document.getElementById("game_display").innerHTML += `<img class = "dynamic_card" id = "dynamic_card" src = "images/card_back.jpg" alt = "card">`
    movingCard = document.getElementById("dynamic_card");
    movingCard.style.position = "absolute";
    movingCard.style.top = "455px";
    movingCard.style.left = "300px";
    for(let position = 300; position >= 185; position--){
        movingCard.style.left = position + "px";
        await sleep(4);
    }
    movingCard.remove()
    document.getElementById("community_cards").innerHTML += createCardDiv(card3)
 
 
}

async function animateTurn(card){
    document.getElementById("game_display").innerHTML += `<img class = "dynamic_card" id = "dynamic_card" src = "images/card_back.jpg" alt = "card">`
    movingCard = document.getElementById("dynamic_card");
    movingCard.style.position = "absolute";
    movingCard.style.top = "455px";
    movingCard.style.left = "300px";
    for(let position = 300; position >= 225; position--){
        movingCard.style.left = position + "px";
        await sleep(7);
    }
    movingCard.remove()
    document.getElementById("community_cards").innerHTML += createCardDiv(card)
}
async function animateRiver(card){
    document.getElementById("game_display").innerHTML += `<img class = "dynamic_card" id = "dynamic_card" src = "images/card_back.jpg" alt = "card">`
    movingCard = document.getElementById("dynamic_card");
    movingCard.style.position = "absolute";
    movingCard.style.top = "455px";
    movingCard.style.left = "300px";
    for(let position = 300; position >= 260; position--){
        movingCard.style.left = position + "px";
        await sleep(7);
    }
    movingCard.remove()
    document.getElementById("community_cards").innerHTML += createCardDiv(card)
}
function highlightPlayer(){
    const p1 = document.getElementById("player1")
    const p2 = document.getElementById("player2")
    const p3 = document.getElementById("player3")
    if(playerTurn === 0){
        p3.style.opacity = "0.6";
        p2.style.opacity = "0.6";
        p1.style.opacity = "1.0";
    }
    else if(playerTurn === 1){
        p3.style.opacity = "0.6";
        p2.style.opacity = "1.0";
        p1.style.opacity = "0.6";
    }
    else if(playerTurn === 2){
        p3.style.opacity = "1.0";
        p2.style.opacity = "0.6";
        p1.style.opacity = "0.6";
    }
}
function showExitPopup(){
    const popup = document.getElementById("exit_popup");
    popup.style.display = "inline";
}
function hideExitPopup(){
    const popup = document.getElementById("exit_popup");
    popup.style.display = "none";
}
function toggleRaiseForm(){
    const board_center = document.getElementById("board_center");
    board_center.innerHTML = potDisplayHTML() + raiseActionsHTML();
    document.getElementById("raise_input").addEventListener('keydown',event=>{
        if(event.key === '-' || event.key === '+'){
            event.preventDefault();
        }
    })
}
function showActionButtons(){
    const board_center = document.getElementById("board_center");
    board_center.innerHTML = potDisplayHTML() + actionButtonsHTML();
}
function showPotOnly(){
    document.getElementById("board_center").innerHTML = potDisplayHTML()
}
function showWinScreen(player){
    let winText =""
    if(player === 0){
        winText = player1Name + " wins!!";
    }
    else if(player === 1){
        winText = player2Name + " wins!!";
    }
    else{
        winText = player3Name + " wins!!";
    }
    const popup = document.getElementById("player_win_popup")
    const text = popup.querySelectorAll(".popup_text")
    text.forEach(t=>{
        t.innerText = winText;
    })
    popup.style.display = "inline";
    
}