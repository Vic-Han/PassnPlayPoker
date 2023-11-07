/*
    Course : SENG 513 Web Based Systems
    Date: November 10th, 2023
    Assignment 3
    Name: Victor Han
    UCID: 30112492
*/

// names
let player1Name = ""
let player2Name = ""
let player3Name = ""
// are players active in the game
let active_players = [false, false, false]
// are players active in the round
let player_active_round = [false, false, false]
// how much each player has bet in the current round
let playerBetAmount = [0,0,0]
// whether each player is currently all in
let playerAllIn = [false,false,false]
// can each player raise
let playerRaiseOption = [false,false,false]
// how many chips does each player have
let player_money_count = [0,0,0]

// card objects for each
let player_cards = [[],[],[]]
//community cards
let communityCards = []
// current value of pot
let pot_value = 0;
// value of small blind
let small_blind = 0;
// how many small blinds have gone by
let turn_number = 0;
// who is currently betting
let playerTurn = 0;
// who is the small blind for the round
let small_blind_player = 0;

// hash tables for converting indices into html ids
const idToStack = {0: "player1_stack", 1 : "player2_stack", 2:"player3_stack"}
// rotates player from 0 -> 1 -> 2 -> 0 
const nextPlayer = {0:1,1:2,2:0}
let gameActive = true;
const card_deck = new Set()
const card_types = ["diamonds", "spades", "clubs", "hearts"]
const reset_deck = () => {
    card_deck.clear();
    player_cards = [[],[],[]]
    communityCards = []
    document.getElementById("player1_card_list").innerHTML = ""
    document.getElementById("player2_card_list").innerHTML = ""
    document.getElementById("player3_card_list").innerHTML = ""
    document.getElementById("player1").querySelectorAll(".show_cards").forEach(button => {button.style.display = "none"})
    document.getElementById("player2").querySelectorAll(".show_cards").forEach(button => {button.style.display = "none"})
    document.getElementById("player3").querySelectorAll(".show_cards").forEach(button => {button.style.display = "none"})
    card_types.forEach(card_type => {
        for (let i=2 ;i<=14;++i){
            card_deck.add({
                suit: card_type,
                value: i
            })
        }
    })
}
function submitPlayerNames(){
    player1Name = document.getElementById("player1_name_input").value
    player2Name = document.getElementById("player2_name_input").value
    player3Name = document.getElementById("player3_name_input").value
    active_players[0] = (player1Name !== "")
    active_players[1] = (player2Name !== "")
    active_players[2] = (player3Name !== "")
    let numPlayers = 0
    active_players.forEach(bool => {if(bool){numPlayers++}})
    if(numPlayers < 2){
        const error_div = document.getElementById("error_message_name_screen")
        error_div.innerText = "You need at least two players"
        error_div.classList.add("visible")
        setTimeout(()=>{
            error_div.classList.remove("visible")
        },2500)
    }
    else{
        const name_screen = document.getElementById("player_name_form")
        name_screen.classList.add("invisible");
        const game_screen = document.getElementById("game_display")
        game_screen.classList.remove("invisible")
    }
    if(active_players[0]){
        document.getElementById('player1_name').innerText=player1Name;
        player_money_count[0] = 1500;
        document.getElementById("player1_stack").innerHTML = `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">`+
        player_money_count[0] ;
        small_blind_player = 0;
    }
    else{
        small_blind_player = 1;
    }
    if(active_players[1]){
        document.getElementById('player2_name').innerText=player2Name;
        player_money_count[1] = 1500;
        document.getElementById("player2_stack").innerHTML = `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">`+
        player_money_count[1] ;
    }
    if(active_players[2]){
        document.getElementById('player3_name').innerText=player3Name;
        player_money_count[2] = 1500;
        document.getElementById("player3_stack").innerHTML = `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">`+
        player_money_count[2] ;
    }
}
function getRandomCard(){
    const tempArray = Array.from(card_deck)
    const randomCard = tempArray[Math.floor(Math.random()*tempArray.length)];
    return randomCard;
}
function shuffleCards(){
    reset_deck();

    if(active_players[0]){
        const card1 = getRandomCard();
        //const card1 = {suit:'spades', value:4}
        player_cards[0].push(card1);
        card_deck.delete(card1);
        const card2 = getRandomCard();
        //const card2 = {suit:'hearts', value:6}
        player_cards[0].push(card2);
        card_deck.delete(card2);
        const cardlist =  document.getElementById("player1_card_list")
        cardlist.innerHTML = `<img src="images/card_back.jpg" class="card" id = "player1_card1">`;
        cardlist.innerHTML += `<img src="images/card_back.jpg" class="card" id = "player1_card2">`;
        const player1 = document.getElementById("player1")
        const showButton = player1.querySelectorAll(".show_cards")
        showButton.forEach(button => {button.style.display = "inline"})
    }
    if(active_players[1]){
        const card1 = getRandomCard();
        //const card1 = {suit:'hearts', value:9}
        player_cards[1].push(card1);
        card_deck.delete(card1);
        const card2 = getRandomCard();
        //const card2 = {suit:'diamonds', value:7}
        player_cards[1].push(card2);
        card_deck.delete(card2);
        const cardlist =  document.getElementById("player2_card_list")
        cardlist.innerHTML = `<img src="images/card_back.jpg" class="card" id = "player2_card1">`;
        cardlist.innerHTML += `<img src="images/card_back.jpg" class="card" id = "player2_card2">`;
        const player2 = document.getElementById("player2")
        const showButton = player2.querySelectorAll(".show_cards")
        showButton.forEach(button => {button.style.display = "inline"})
    }
    if(active_players[2]){
        const card1 = getRandomCard();
        //const card1 = {suit:'spades', value:13}
        player_cards[2].push(card1);
        card_deck.delete(card1);
        const card2 = getRandomCard();
        //const card2 = {suit:'spades', value:10}
        player_cards[2].push(card2);
        card_deck.delete(card2);
        const cardlist =  document.getElementById("player3_card_list")
        cardlist.innerHTML = `<img src="images/card_back.jpg" class="card" id = "player3_card1">`;
        cardlist.innerHTML += `<img src="images/card_back.jpg" class="card" id = "player3_card2">`
        const player3 = document.getElementById("player3")
        const showButton = player3.querySelectorAll(".show_cards")
        showButton.forEach(button => {button.style.display = "inline"})
    }
    const boardCenter = document.getElementById("board_center")
    boardCenter.innerHTML = "";
    boardCenter.innerHTML += potDisplayHTML();
   
    
}

function changeTurn(){
    if(playerTurn === 0){
        if(player_active_round[1] && !playerAllIn[1]){
            playerTurn = 1;
        }
        else{
            playerTurn = 2;
        }
    }
    else if(playerTurn === 1){
        if(player_active_round[2] && !playerAllIn[2]){
            playerTurn = 2;
        }
        else{
            playerTurn = 0;
        }
    }
    else if(playerTurn === 2){
        if(player_active_round[0] && !playerAllIn[0]){
            playerTurn = 0;
        }
        else{
            playerTurn = 1;
        }
    }
    highlightPlayer();
}

function rotateBlinds(){
    if(small_blind_player === 0){
        if(active_players[1]){
            small_blind_player = 1;
        }
        else{
            small_blind_player = 2;
        }
    }
    else if(small_blind_player === 1){
        if(active_players[2]){
            small_blind_player = 2;
        }
        else{
            small_blind_player = 0;
        }
    }
    else{
        if(active_players[0]){
            small_blind_player = 0;
        }
        else{
            small_blind_player = 1;
        }
    }
}

async function playerBets(value){
    value = player_money_count[playerTurn] > value ? value : player_money_count[playerTurn];
    pot_value += value;
    player_money_count[playerTurn] -= value;
    if(player_money_count[playerTurn] === 0){
        playerAllIn[playerTurn] = true;
        playerRaiseOption[playerTurn] = false
    }
    playerBetAmount[playerTurn] += value;
    await animateBet(playerTurn);
    
    if(playerTurn === 0){
        const playerPot = document.getElementById("player1_stack")
        playerPot.innerHTML =`<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">`+
        player_money_count[playerTurn]
    }
    else if(playerTurn === 1){
        const playerPot = document.getElementById("player2_stack")
        playerPot.innerHTML =`<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">`+
        player_money_count[playerTurn]
    }
    else if(playerTurn === 2){
        const playerPot = document.getElementById("player3_stack")
        playerPot.innerHTML =`<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">`+
        player_money_count[playerTurn]
    }
    const boardCenter = document.getElementById("board_center")
    boardCenter.innerHTML = potDisplayHTML() + actionButtonsHTML();
}
async function putBlinds(){
    let allIn = false;
    playerTurn = small_blind_player;
    highlightPlayer();
    await playerBets(small_blind);
    showPotOnly()
    changeTurn();
    await playerBets(2*small_blind);
    playerRaiseOption[playerTurn] = true;
    changeTurn();
}
async function playRound(){
    document.getElementById("community_cards").innerHTML = ""
    shuffleCards();
    if(++turn_number % 5 === 1){
        small_blind += 25;
    }
    player_active_round = [...active_players]
    playerAllIn = [false,false,false]
    playerRaiseOption = [...active_players]
    playerBetAmount = [0,0,0]
    const playerCanBet = playerNum =>{
        return player_active_round[playerNum] && !playerAllIn[playerNum];
    } 
    
    await putBlinds();
    const player1Bet = playerCanBet(0) ? 1: 0;
    const player2Bet = playerCanBet(1) ? 1 :0;
    const player3Bet = playerCanBet(2) ? 1: 0;
    if(player1Bet + player2Bet + player3Bet <= 1 && playerTurn == small_blind_player){
        showPotOnly();
            flopLogic().then(() => {
                showPotOnly()
                turnLogic().then(() => {
                    showPotOnly()
                    riverLogic().then(()=>{
                        showPotOnly();
                        showDown()
                    })
                })
            })
    }
    else{
        showActionButtons();
    }
}
async function fold(){
    let cardlist = null
    player_active_round[playerTurn] = false;
    playerRaiseOption[playerTurn] = false;
    console.log(playerRaiseOption)
    player_cards[player_cards] = []
    if(playerTurn === 0){
        cardlist =  document.getElementById("player1_card_list")
        const player3 = document.getElementById("player1")
        const showButton = player3.querySelectorAll(".show_cards")
        showButton.forEach(button => {button.style.display = "none"})

    }
    else if(playerTurn === 1){
        cardlist =  document.getElementById("player2_card_list")
        const player3 = document.getElementById("player2")
        const showButton = player3.querySelectorAll(".show_cards")
        showButton.forEach(button => {button.style.display = "none"})
    }
    else if(playerTurn === 2){
        cardlist =  document.getElementById("player3_card_list")
        const player3 = document.getElementById("player3")
        const showButton = player3.querySelectorAll(".show_cards")
        showButton.forEach(button => {button.style.display = "none"})

    }
    cardlist.innerHTML = "";
    if(!player_active_round[0] && !player_active_round[1] && player_active_round[2]){
        document.getElementById("board_center").innerHTML = potDisplayHTML();
        winPot(2).then(gameOver=>{
            if(gameOver){
                showWinScreen(2)
                return;
            }
            if(player_money_count[0] === 0){
                active_players[0] = false
            }
            if(player_money_count[1] === 0){
                active_players[1] = false
            }
            if(!active_players[0] && !active_players[1]){
                console.log("player3 Wins!!")
            }
            rotateBlinds();
            playRound();

        })
    }
    else if(!player_active_round[0] && player_active_round[1] && !player_active_round[2]){
        document.getElementById("board_center").innerHTML = potDisplayHTML();
        winPot(1).then(gameOver=>{
            if(gameOver){
                showWinScreen(1)
                return
            }
            if(player_money_count[0] === 0){
                active_players[0] = false
            }
            if(player_money_count[2] === 0){
                active_players[2] = false
            }
            if(!active_players[0] && !active_players[2]){
                console.log("player2 Wins!!")
            }
            rotateBlinds();
            playRound();
        })
    }
    else if(player_active_round[0] && !player_active_round[1] && !player_active_round[2]){
        document.getElementById("board_center").innerHTML = potDisplayHTML();
        winPot(0).then(gameOver=>{
            if(gameOver){
                showWinScreen(0);
                return;
            }
            if(player_money_count[2] === 0){
                active_players[2] = false
            }
            if(player_money_count[1] === 0){
                active_players[1] = false
            }
            rotateBlinds();
            playRound();  
        })
    }
    else{
        if((!playerRaiseOption[0] && !playerRaiseOption[1] && !playerRaiseOption[2]) || allIn()){
            nextBettingRound();
        }
        else{
            
            changeTurn();
            showActionButtons();
        }
        
    }
}
async function call(){
    
    playerRaiseOption[playerTurn] = false;
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
    if(betAmount > 0){
        document.getElementById("board_center").innerHTML = potDisplayHTML();
        await playerBets(betAmount);
    }
    
    if((!playerRaiseOption[0] && !playerRaiseOption[1] && !playerRaiseOption[2] )|| allIn()){
            nextBettingRound();
    }
    else{
        changeTurn();
        showActionButtons();
    }
        
    
}

async function raise(){
    const raiseInput = document.getElementById("raise_input").value;
    const raiseValue = parseInt(raiseInput)
    if(playerTurn === 0 && (playerBetAmount[0] + raiseValue <= playerBetAmount[1] ||  playerBetAmount[0] + raiseValue <= playerBetAmount[2])){
        document.getElementById("feedback_message").innerText = "You didn't raise :("
        return;
    }
    else if(playerTurn === 1 && (playerBetAmount[1] + raiseValue <= playerBetAmount[0] ||  playerBetAmount[1] + raiseValue <= playerBetAmount[2])){
        document.getElementById("feedback_message").innerText = "You didn't raise :("
        return;
    }
    else if(playerTurn === 2 && (playerBetAmount[2] + raiseValue <= playerBetAmount[0] ||  playerBetAmount[2] + raiseValue <= playerBetAmount[1])){
        document.getElementById("feedback_message").innerText = "You didn't raise :("
        return;
    }
    
    for(let i = 0; i < 3; i++){
        playerRaiseOption[i] = player_active_round[i] && !playerAllIn[i]
    }
    playerRaiseOption[playerTurn] = false
    document.getElementById("board_center").innerHTML = potDisplayHTML();
    await playerBets(raiseValue)
    changeTurn();
    document.getElementById("board_center").innerHTML = actionButtonsHTML() + potDisplayHTML();
}
function allIn(){
    const playerCanBet = playerNum =>{
        return player_active_round[playerNum] && !playerAllIn[playerNum];
    } 
    const player1Bet = playerCanBet(0)
    const player2Bet = playerCanBet(1)
    const player3Bet = playerCanBet(2)
    const everyoneAllIn = (player1Bet ? 1 : 0) + (player2Bet ? 1 : 0) + (player3Bet ? 1:0) === 0
    const allIn_1_2 = (!player1Bet && !player2Bet) && !playerRaiseOption[2];
    const allIn_1_3 = (!player1Bet && !player3Bet) && !playerRaiseOption[1];
    const allIn_2_3 = (!player2Bet && !player3Bet) && !playerRaiseOption[0];
    return everyoneAllIn || allIn_1_2 || allIn_1_3 || allIn_2_3;
}

function nextBettingRound(){
    if(allIn()){
        if(communityCards.length === 0){
            showPotOnly();
            flopLogic().then(() => {
                showPotOnly()
                turnLogic().then(() => {
                    showPotOnly()
                    riverLogic().then(()=>{
                        showPotOnly();
                        showDown()
                    })
                })
            })
        }
        else if(communityCards.length === 3){
            turnLogic().then(() => {
                showPotOnly()
                riverLogic().then(()=>{
                    showPotOnly();
                    showDown()
                })
            })
        }
        else if(communityCards.length === 4){
            riverLogic().then(()=>{
                showPotOnly();
                showDown()
            })
        }
        else{
            showDown();
        }
    }
    else{
        for(let i = 0; i < 3; i++){
            playerRaiseOption[i] = player_active_round[i] && !playerAllIn[i]
        }
        //playerAllIn = [false,false,false]
        showPotOnly();
        if(communityCards.length === 0){
            playerTurn = small_blind_player;
            if(!player_active_round[small_blind_player] || playerAllIn[small_blind_player]){
                changeTurn()
            }
            else{
                highlightPlayer()
            }
            flopLogic()
        }
        else if(communityCards.length === 3){
           
            playerTurn = small_blind_player;
            if(!player_active_round[small_blind_player]){
                changeTurn()
            }
            else{
                highlightPlayer()
            }
            turnLogic()
        }
        else if(communityCards.length === 4){
            playerTurn = small_blind_player;
            if(!player_active_round[small_blind_player]){
                changeTurn()
            }
            else{
                highlightPlayer()
            }
            riverLogic()
        }   
        else{
            showDown();
        }
    }
}

