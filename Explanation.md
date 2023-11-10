Explaining the "fold" function in "game_logic" on line 306

The first thing I need to do is make sure the player that folded(global variable) is no longer active in the round, and no longer has the option to raise. Next, I set the innerHTML of the "card list" to nothing, depending on the player that folded. Both the actual cards, and I need to make sure the button that says "show cards" has display none.
Due to the game mechanics, if a player folds the round might have ended, so I need to check to see if only one player is active, which I do in the next three conditionals. If that is the case, a player will win the pot which is an async operation due to the animation. After the pot is won, the function returns a boolean letting me know whether the game is over or not. I display the gameOver screen if it is, otherwise I double check if anyone is broke/bankrupt. Then I setup everything for the next round(new cards are dealt).
There is also a case where everyone has gone all in, or nobody has the option to raise, in which case the next round of betting should ensue.

Explaining the "evaluateHandStrength" function in "back_end" on line 78 (and all the code above it to some extent)

Properties of poker hands are incredibly easy to exploit when the list is sorted. 
A flush should be checked first because no other combination below (other than straight flush which I do inside the if scope) can be created with cards from the same suit. 
A straight is the same case, as no combination can be created when all the cards have different values.
Four of a kind should be the next I check, as it classifies as a pair, two pair, and three of a kind. A full house also meets these same requirements, I check it immediately after
Three of a kind counts as a pair, and it has "two pairs"-  there are two sets of adjacent pairs when the list is sorted, so I must check this before two pair.
Two pair obviously counts as a pair, so two pair is checked next and we need to check for the basic pair.
Lastly, we can assign it "high card" if none of the combos are reached.

There are also primary, secondary, and tertiary strengths for breaking pair vs pair, or flush vs flush for example.
A full house only has the triple as the primary and the pair as the secondary, whereas a flush may need all five cards to beat another flush

Explaining the "animatePotWin" function in the "dom_manipulation" on line 159

I had to make a sleep function in javascript because it wasn't built it, it returns a promise that resolves a timeout(it wasn't my idea, I linked the stack overflow post). To use this function, I had to make the animations async functions. I could then use the await keyword to simulate a sleep function. To start, I created a img with postion absolute and used the left and top properties to put it directly where the pot was. I set a loop that uses the sleep function to slowly increment either the left or top property, giving it an animated appearance. The exact mechanics of the loop differ for each player as they are in different locations.
