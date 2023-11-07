/*
    Course : SENG 513 Web Based Systems
    Date: November 10th, 2023
    Assignment 3
    Name: Victor Han
    UCID: 30112492
*/
async function winPot(winningPlayer){
    const feedBackMessage = document.getElementById("feedback_message");
    if(winningPlayer === 0){
        feedBackMessage.innerText = player1Name + " wins the pot!!"
    }
    else if(winningPlayer === 1){
        feedBackMessage.innerText = player2Name + " wins the pot!!"
    }
    else{
        feedBackMessage.innerText = player3Name + " wins the pot!!"
    }
    await animatePotWin(winningPlayer)
    player_money_count[winningPlayer] += pot_value;
    pot_value = 0;
    showPotOnly();
   
    document.getElementById(idToStack[winningPlayer]).innerHTML = 
    `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">` + player_money_count[winningPlayer]
    
    player_money_count.forEach((val, index) =>{
        if(val === 0){
            active_players[index] = false;
        }
    })
    await sleep(1000)
    if(((active_players[0]  === true) + (active_players[1] === true) + (active_players[2] === true)) === 1){
        return true;
    }
    else{
        return false;
    }
}
const partialWinPot = async(player, amount) =>{
    const ahead = nextPlayer[player]
    const behind = nextPlayer[ahead]
    if((!player_active_round[behind]  || playerBetAmount[player] === playerBetAmount[behind])  && (!player_active_round[ahead] || playerBetAmount[player] === playerBetAmount[ahead])){
        winPot(player).then(gameOver =>{
            if(gameOver){
                showWinScreen(player)
                return false;
            }
            else{
                sleep(1000).then(() => {
                    rotateBlinds();
                    playRound();
                })
            }
        })
    }
    else{
        const feedBackMessage = document.getElementById("feedback_message");
        if(player === 0){
            feedBackMessage.innerText = player1Name + " wins " + amount
        }
        else if(player === 1){
            feedBackMessage.innerText = player2Name + " wins " + amount
        }
        else{
            feedBackMessage.innerText = player3Name + " wins " + amount
        }
        await animatePotWin(player)
        player_money_count[player] += amount;
        pot_value -= amount;
        showPotOnly();
        document.getElementById(idToStack[player]).innerHTML = 
        `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">` + player_money_count[player]
        return true;
    }
   
}
// p1 and p2 will be sorted; p2 will be larger
async function splitPot(p1,p2){
    const feedBackMessage = document.getElementById("feedback_message");
    if(p1 === 1){
        feedBackMessage.innerText = player2Name + " and " + player3Name + " split the pot"
    }
    else if(p2 === 2){
        feedBackMessage.innerText = player1Name + " and " + player3Name + " split the pot"
    }
    else{
        feedBackMessage.innerText = player1Name + " and " + player2Name + " split the pot"
    }
    await animatePotWin(p1)
    player_money_count[p1] += pot_value/2;
    pot_value /= 2;
    document.getElementById(idToStack[p1]).innerHTML = 
    `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">` + player_money_count[p1]
    showPotOnly();
    await animatePotWin(p2)
    player_money_count[p2] += pot_value;
    pot_value = 0;
    showPotOnly();
    document.getElementById(idToStack[p2]).innerHTML = 
    `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">` + player_money_count[p2]
}
async function threeWayPotSplit(){
    document.getElementById("feedback_message").innerText = "Everyone splits the pot!!"
    await animatePotWin(0)
    player_money_count[p1] += pot_value/3;
    pot_value *= (2/3);
    showPotOnly();
    document.getElementById(idToStack[0]).innerHTML = 
    `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">` + player_money_count[0]
    await animatePotWin(1)
    player_money_count[1] += pot_value/2;
    pot_value /= 2;
    showPotOnly();
    document.getElementById(idToStack[1]).innerHTML = 
    `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">` + player_money_count[1]
    await animatePotWin(2)
    player_money_count[2] += pot_value;
    pot_value = 0;
    showPotOnly();
    document.getElementById(idToStack[2]).innerHTML = 
    `<img class ="chip_icon" src = "images/poker_chip.png" alt ="poker chip">` + player_money_count[2]

}
const flopLogic = async () =>{
    const randomCard1 = getRandomCard();
    //const randomCard1 = {suit:'diamonds',value: 11}
    communityCards.push(randomCard1)
    card_deck.delete(randomCard1);
    const randomCard2 = getRandomCard();
    //const randomCard2 = {suit:'spades',value: 12}
    communityCards.push(randomCard2)
    card_deck.delete(randomCard2);
    const randomCard3 = getRandomCard();
    //const randomCard3 = {suit:'clubs',value: 14}
    communityCards.push(randomCard3)
    card_deck.delete(randomCard3);
    await animateFlop(randomCard1,randomCard2,randomCard3)
    for(let i = 0; i < 3; i++){
        playerRaiseOption[i] = player_active_round[i] && !playerAllIn[i]
    }
    showActionButtons();
}
const turnLogic = async() =>{

    const randomCard = getRandomCard();
    //const randomCard = {suit:'clubs',value: 13}
    communityCards.push(randomCard)
    card_deck.delete(randomCard);
    await animateTurn(randomCard)
    for(let i = 0; i < 3; i++){
        playerRaiseOption[i] = player_active_round[i] && !playerAllIn[i]
    }
    showActionButtons();
}
const riverLogic = async() =>{
    const randomCard = getRandomCard();
    //const randomCard = {suit:'diamonds',value: 13}
    communityCards.push(randomCard)
    card_deck.delete(randomCard);
    await animateRiver(randomCard)
    for(let i = 0; i < 3; i++){
        playerRaiseOption[i] = player_active_round[i] && !playerAllIn[i]
    }
    showActionButtons();
}
const showDown_1_and_2 = () => {
    const playerHands = [{
        name: 0,
        cards: [...player_cards[0]]
    },
    {
        name: 1,
        cards: [...player_cards[1]]
    }]
    const order = determineWinner(playerHands,communityCards);
    const result = stronger(order[0].strength,order[1].strength)
    if(result === true){
        if(playerBetAmount[order[0].name] < playerBetAmount[order[1].name]){
            showPotOnly();
            partialWinPot(order[0].name, pot_value-(playerBetAmount[order[1].name] - playerBetAmount[order[0].name])).then(()=>{
                winPot(order[1].name).then(()=>{
                    sleep(1000).then(() => {
                        rotateBlinds();
                        playRound();
                    })
                })
            })
        }
        else{
            winPot(order[0].name).then(gameOver => {
                if(!gameOver){
                    sleep(1000).then(() => {
                        rotateBlinds();
                        playRound();
                    })
                }
                else{
                    showWinScreen(order[0].name)
                }
            })
        }
        
    }

    else{
        splitPot(0,1).then(async() =>{
            await sleep(1000);
            rotateBlinds();
            playRound();
        })
    }
}
const showDown_1_and_3 = () =>{
    const playerHands = [{
        name: 0,
        cards: [...player_cards[0]]
    },
    {
        name: 2,
        cards: [...player_cards[2]]
    }]
        const order = determineWinner(playerHands,communityCards);
        const result = stronger(order[0].strength,order[1].strength)
        if(result === true){
            if(playerBetAmount[order[0].name] < playerBetAmount[order[1].name]){
                showPotOnly();
                partialWinPot(order[0].name, pot_value-(playerBetAmount[order[1].name] - playerBetAmount[order[0].name])).then(()=>{
                    winPot(order[1].name).then(()=>{
                        sleep(1000).then(() => {
                            rotateBlinds();
                            playRound();
                        })
                    })
                })
            }
            else{
                winPot(order[0].name).then(gameOver => {
                    if(!gameOver){
                        sleep(1000).then(() => {
                            rotateBlinds();
                            playRound();
                        })
                    }
                    else{
                        showWinScreen(order[0].name)
                    }
                })
            }
            
        }
        else{
            splitPot(0,2).then(async () =>{
                await sleep(1000)
                rotateBlinds();
                playRound();
            })
        }
}
const showDown_2_and_3 = () =>{
    const playerHands = [{
        name: 1,
        cards: [...player_cards[1]]
    },
    {
        name: 2,
        cards: [...player_cards[2]]
    }]
    const order = determineWinner(playerHands,communityCards);
    const result = stronger(order[0].strength,order[1].strength)
    if(result === true){
        if(playerBetAmount[order[0].name] < playerBetAmount[order[1].name]){
            showPotOnly();
            partialWinPot(order[0].name, pot_value-(playerBetAmount[order[1].name] - playerBetAmount[order[0].name])).then(()=>{
                winPot(order[1].name).then(()=>{
                    sleep(1000).then(() => {
                        rotateBlinds();
                        playRound();
                    })
                })
            })
        }
        else{
            winPot(order[0].name).then(gameOver => {
                if(!gameOver){
                    sleep(1000).then(() => {
                        rotateBlinds();
                        playRound();
                    })
                }
                else{
                    showWinScreen(order[0].name)
                }
            })
        }
        
    }
    else{
        splitPot(1,2).then(() =>{
            sleep(1000).then(()=>{
                rotateBlinds();
                playRound();
            })
            
        })
    }
}
const threeWayShowdown = () =>{
    const playerHands = [{
        name: 0,
        cards: [...player_cards[0]]
    },
    {
        name: 1,
        cards: [...player_cards[1]]
    },
    {
        name: 2,
        cards: [...player_cards[2]]
    }]
    const order = determineWinner(playerHands,communityCards);
    const result = stronger(order[0].strength,order[1].strength);
    const winner = order[0].name
    const runner_up = order[1].name
    const loser = order[2].name
    if(result === true){
        if(playerBetAmount[winner] < playerBetAmount[runner_up] || playerBetAmount[winner] < playerBetAmount[loser]){
            const runner_up_loss = playerBetAmount[winner] > playerBetAmount[runner_up] ? playerBetAmount[runner_up] : playerBetAmount[winner]
            playerBetAmount[runner_up] -= runner_up_loss
            const loser_loss = playerBetAmount[winner] > playerBetAmount[loser] ? playerBetAmount[loser] : playerBetAmount[winner]
            playerBetAmount[loser] -= loser_loss
            let totalEarnings = playerBetAmount[winner];
            playerBetAmount[winner] = 0;
            totalEarnings += (runner_up_loss+loser_loss)
            showPotOnly();
            partialWinPot(winner,totalEarnings).then(() =>{
                if(playerBetAmount[runner_up] > 0 && playerBetAmount[loser] > 0){
                    if(winner === 0){
                        showDown_2_and_3();
                    }
                    else if(winner === 1){
                        showDown_1_and_3();
                    }
                    else{
                        showDown_1_and_2();
                    }
                }
                else{
                    if(playerBetAmount[runner_up] > 0){
                        winPot(runner_up).then(()=>{
                            sleep(1000).then(() => {
                                rotateBlinds();
                                playRound();
                            })
                        })
                    }
                    else{
                        winPot(loser).then(()=>{
                            sleep(1000).then(() => {
                                rotateBlinds();
                                playRound();
                            })
                        })
                    }
                }
            })
        }
        else{
            winPot(order[0].name).then(gameOver => {
                if(!gameOver){
                    sleep(1000).then(()=>{
                        rotateBlinds();
                        playRound();
                    })
                }
                else{
                    showWinScreen(order[0].name)
                }
                
            })
        }
    }
        else{
            const res2 = stronger(order[1].strength, order[2].strength)
            if(res2 === "tie"){
                threeWayPotSplit().then(() =>{
                    sleep(1000).then(()=>{
                        rotateBlinds();
                        playRound()
                    })   
                })
            }
            else{
                splitPot(order[0].name,order[1].name).then(()=>{
                    sleep(1000).then(()=>{
                        rotateBlinds();
                        playRound();
                    })
                })
            }
        }
}
function showDown(){
    if(!player_active_round[0]){
        showDown_2_and_3();
    }
    else if(!player_active_round[1]){
        showDown_1_and_3();
    }
    else if(!player_active_round[2]){
        showDown_1_and_2();
    }
    else{
        threeWayShowdown();
    }
}