/*
    Course : SENG 513 Web Based Systems
    Date: November 3rd, 2023
    Assignment 3
    Name: Victor Han
    UCID: 30112492
*/

function checkFlush(cardArray) {
    const suit = cardArray[0].suit
    return (cardArray[1].suit === suit && cardArray[2].suit === suit && cardArray[3].suit === suit &&cardArray[4].suit === suit)
}
const straightAce = sortedCardArray =>{
    const aceVal = 14;
    if(sortedCardArray[4].value === aceVal && sortedCardArray[0] === 2){
        for(let index = 0; index < 3; index++){
            if(sortedCardArray[index].value != sortedCardArray[index+ 1].value -1){
                return false;
            }
        }
    }
    return false;
}
function checkStraight(sortedCardArray){
    
    for(let index = 0; index < 4; index++){
        if(sortedCardArray[index].value != sortedCardArray[index+1].value - 1){
            return straightAce(sortedCardArray);
        }
    }
    return true;

}
function checkFullHouse(sortedCardArray){
    if(sortedCardArray[2].value === sortedCardArray[4].value){
        return sortedCardArray[0].value === sortedCardArray[1].value
    }
    if(sortedCardArray[2].value === sortedCardArray[0].value){
        return sortedCardArray[3].value === sortedCardArray[4].value
    }
    return false;
}
function checkFourKind(sortedCardArray){
    if(sortedCardArray[0].value === sortedCardArray[3].value){
        return true;
    }
    if(sortedCardArray[1].value === sortedCardArray[4].value){
        return true;
    }
    return false;
}
function checkThreeKind(sortedCardArray){
    if(sortedCardArray[0].value === sortedCardArray[2].value){
        return true;
    }
    if(sortedCardArray[1].value === sortedCardArray[3].value){
        return true;
    }
    if(sortedCardArray[2].value === sortedCardArray[4].value){
        return true;
    }
    return false;
}
function checkTwoPair(sortedCardArray){
    let pairs = 0;
    for(let index = 0; index < 4; index++){
        pairs += (sortedCardArray[index].value === sortedCardArray[index + 1].value)
    }
    return pairs === 2;
}
function checkPair(sortedCardArray){
    for(let index = 0; index < 4; index++){
        if(sortedCardArray[index].value === sortedCardArray[index + 1].value) {
            return true;
        }
    }
    return false;
}
function evaluateHandStrength(cardArray){
    const strength = {
        primary: 0,
        secondary: 0,
        tertiary: 0,
        fourth: 0,
        fifth: 0,
        type: "high_card",
    };
    for(let index = 1; index < 5; index++){
        for(let currPos = index; currPos > 0 && cardArray[currPos].value < cardArray[currPos-1].value; currPos--){
            const temp = cardArray[currPos];
            cardArray[currPos] = cardArray[currPos-1];
            cardArray[currPos-1] = temp;
        }
    }
    if(checkFlush(cardArray)){
        if(checkStraight(cardArray)){
            strength.type = "straight_flush"
            if(cardArray[4].value === 14 && cardArray[3].value === 5){
                strength.primary = 5;
            }
            else{
                strength.primary = cardArray[4].value
            }
        }
        else{
            strength.type = "flush";
            strength.primary = cardArray[4].value;
            strength.secondary = cardArray[3].value;
            strength.tertiary =  cardArray[2].value;
            strength.fourth = cardArray[1].value;
            strength.fifth = cardArray[0].value;
        }
    }
    else if(checkStraight(cardArray)){
        strength.type = "straight"
            if(cardArray[4].value === 14 && cardArray[3].value === 5){
                strength.primary = 5;
            }
            else{
                strength.primary = cardArray[4].value
            }
    }
    else if(checkFourKind(cardArray)){
        strength.type = "four_of_a_kind"
        strength.primary = cardArray[2].value;
        if(cardArray[2].value === cardArray[0].value){
            strength.secondary = cardArray[4].value;
        }
        else{
            strength.secondary = cardArray[0].value;
        }
    }
    else if(checkFullHouse(cardArray)){
        strength.type = "full_house"
        strength.primary = cardArray[2].value;
        if(cardArray[2].value === cardArray[0].value){
            strength.secondary = cardArray[4].value;
        }
        else{
            strength.secondary = cardArray[0].value;
        }
    }
    else if(checkThreeKind(cardArray)){
        strength.type = "three_of_a_kind"
        strength.primary = cardArray[2].value;
        if(cardArray[2].value === cardArray[0].value){
            strength.secondary = cardArray[4].value;
            strength.tertiary = cardArray[3].value
        }
        else if(cardArray[1].value === cardArray[3].value){
            strength.secondary = cardArray[4].value;
            strength.tertiary = cardArray[0].value
        }
        else{
            strength.secondary = cardArray[1].value;
            strength.tertiary = cardArray[0].value;
        }
    }
    else if(checkTwoPair(cardArray)){
        strength.type = "two_pair"
        strength.primary = cardArray[3].value;
        strength.secondary = cardArray[1].value;
        for(let index = 0; index < 5; index++){
            const equal_left = (index > 0 && cardArray[index-1].value === cardArray[index].value);
            const equal_right = (index < 4 && cardArray[index+1].value === cardArray[index].value);
            if(!equal_left || !equal_right){
                strength.tertiary = cardArray[index].value;
                break;
            }
        }
    }
    else if(checkPair(cardArray)){
        strength.type = "pair"
        for(let index = 0; index < 4; index++){
            if(cardArray[index].value === cardArray[index + 1].value) {
                strength.primary = cardArray[index].value;
                if(index === 3 ){
                    strength.secondary = cardArray[2].value;
                    strength.tertiary =  cardArray[1].value;
                    strength.fourth = cardArray[0].value;
                }
                else if(index === 2){
                    strength.secondary = cardArray[4].value;
                    strength.tertiary =  cardArray[1].value;
                    strength.fourth = cardArray[0].value;
                }
                else if(index === 1){
                    strength.secondary = cardArray[4].value;
                    strength.tertiary =  cardArray[3].value;
                    strength.fourth = cardArray[0].value;
                }
                else if(index === 0){
                    strength.secondary = cardArray[4].value;
                    strength.tertiary =  cardArray[3].value;
                    strength.fourth = cardArray[2].value;
                }
                break;
            }
        }
    }
    else{
        strength.primary = cardArray[4].value;
        strength.secondary = cardArray[3].value;
        strength.tertiary =  cardArray[2].value;
        strength.fourth = cardArray[1].value;
        strength.fifth = cardArray[0].value;
    }
    return strength;
}
const strengthRanking = {
    "straight_flush" : 9,
    "four_of_a_kind" : 8,
    "full_house" : 7,
    "flush" : 6,
    "straight" : 5,
    "three_of_a_kind":4,
    "two_pair" :3 ,
    "pair" :2,
    "high_card":1,
}
// returns true if strength 1 is stronger than strength 2
function stronger(strength1,strength2){
    if(strengthRanking[strength1.type] > strengthRanking[strength2.type]){
        return true;
    }
    else if(strengthRanking[strength1.type] < strengthRanking[strength2.type]){
        return false;
    }
    if(strength1.primary > strength2.primary){
        return true;
    }
    else if(strength1.primary < strength2.primary){
        return false;
    }
    if(strength1.secondary > strength2.secondary){
        return true;
    }
    else if(strength1.secondary < strength2.secondary){
        return false;
    }
    if(strength1.tertiary > strength2.tertiary){
        return true;
    }
    else if(strength1.tertiary < strength2.tertiary){
        return false;
    }
    if(strength1.fourth > strength2.fourth){
        return true;
    }
    else if(strength1.fourth < strength2.fourth){
        return false;
    }
    if(strength1.fifth > strength2.fifth){
        return true;
    }
    else if(strength1.fifth < strength2.fifth){
        return false;
    }
    return "tie";
}
function determineWinner(playerHands, communityCards){
    const playerStrengths = []
    playerHands.forEach((hand,playerNum) =>{
        playerStrengths.push({
            name: hand.name,
            strength: {
                primary: 0,
                secondary: 0,
                tertiary: 0,
                fourth: 0,
                fifth: 0,
                type: "high_card",
            }
        })
        const allCards = [...communityCards,hand.cards[0],hand.cards[1]]
        for(let firstExclusion = 0; firstExclusion < 6; firstExclusion++){
            for(let secondExclusion = firstExclusion+1; secondExclusion < 7; secondExclusion++){
                const currHand = []
                for(let index = 0; index < 7; index++){
                    if(index !== firstExclusion && index !== secondExclusion){
                        currHand.push(allCards[index]);
                    }
                }
                const currStrength = evaluateHandStrength(currHand);
                //console.log(currStrength,playerStrengths[playerNum].strength)
                const result = stronger(currStrength,playerStrengths[playerNum].strength)
                if(result === true){
                    playerStrengths[playerNum].strength= currStrength
                }
            }
        }
    })
    for(let i = 0; i + 1< playerStrengths.length; i++){
        for(let j = i+1; j > 0 && stronger(playerStrengths[j].strength,playerStrengths[j-1].strength) === true; j--){
            const temp = playerStrengths[j];
            playerStrengths[j] = playerStrengths[j-1];
            playerStrengths[j-1] = temp;
        }
    }
    return playerStrengths;
}

const test1hand = {
    name:0,
    cards:[{
        suit: "hearts", 
        value: 8
        },
        {
            suit:"diamonds",
            value: 7
        }]
}
const test2hand = {
    name:1,
    cards:[{
        suit: "spades", 
        value: 9
        },
        {
            suit:"spades",
            value: 2
        }]
}
const communityTest =[
    {
        suit: "spades", 
        value: 8
    },
    {
        suit: "spades", 
        value: 7
    },
    {
        suit: "spades", 
        value: 5
    },
    {
        suit: "hearts", 
        value: 7
    },
    {
        suit: "clubs", 
        value: 14
    }
]
/*
const playerhands = [test2hand]
console.log(determineWinner(playerhands,  communityTest))
console.log(evaluateHandStrength([...test2hand.cards,communityTest[0],communityTest[1],communityTest[2]]))*/