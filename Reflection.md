Things I learned: 

I did not realize how many factors I had to keep track of. There are many edge cases when it comes to texas holdem.
I needed to track whether each player was active(both in the game and round), whether each player was all in, whether each player could raise, how much money they bet in the current round, and more. I needed to cover many cases where players were all in. 

Initially I had few variables that I used to conduct the game logic, but I kept adding more as I realized I needed them. I heavily underestimated the game logic and did not plan far enough ahead before I started writing code. By the time I understood this, the refactoring process was already a nightmare, and I decided to continue to use my sloppy code. I did some small refactors(as I should have, big refactors are very risky), but not enough to make my code clean.

It would have been better to simply keep track of how much money each player, how much they bet, and the history of betting for the current round. I could then derive the other factors based on just those. It would have led to longer code, but keeping track of less variables would have been far easier to debug - Keep it simple stupid! Instead I had to update many variables per action and it was easy to forget to update one of them, leading to unexpected behavior later.

Responsive design finally clicked for me during this assignment. I realized that hard coding pixel widths is not a horrible idea. I used to use a combination of viewport width and %(with the parent being based off viewport width) for everything. During this assignment I decided to simply center a div with a hard coded width and change the width of that div with media queries. 

Most of the elements within that parent div were based on % units so making my game responsive was even easier, there were far less values I needed to worry about, and I could be confident a certain viewport width wouldn't mess with the UI, as long as my screen width was over 450px.

Lastly, I learned about CSS and JS animations. CSS has built in animation, which can be toggled with JS. I also used Javascript to slowly move the positioning of elements, giving the appearance of an animation too. I will 100% be using CSS animations for future projects. 

I only used AI to write the instructions page(the text content, I styled it) because AI would not have been helpful in debugging and implementing the code.