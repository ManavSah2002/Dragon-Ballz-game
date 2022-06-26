// Inital conditons
score = 0;
cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.wav');
setTimeout(() => {
    audio.play()
}, 1000);

// Keys to operate the spaceship
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        spaceship = document.querySelector('.spaceship');
        spaceship.classList.add('animateSpaceship');    //animation of jumping
        setTimeout(() => {
            spaceship.classList.remove('animateSpaceship')
        }, 700);
    }
    if (e.keyCode == 39) {
        spaceship = document.querySelector('.spaceship');
        spaceshipX = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('left'));
        spaceship.style.left = spaceshipX + 112 + "px";    //move forward
    }
    if (e.keyCode == 37) {
        spaceship = document.querySelector('.spaceship');
        spaceshipX = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('left'));
        spaceship.style.left = (spaceshipX - 112) + "px";  //move backwards
    }
}

//Start the game
setInterval(() => {
    spaceship = document.querySelector('.spaceship');
    gameOver = document.querySelector('.gameOver');
    asteroid = document.querySelector('.asteroid');
    dx = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('left')); //x_coordinate of spaceship
    dy = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('top'));  //y_coordinate of spaceship

    ox = parseInt(window.getComputedStyle(asteroid, null).getPropertyValue('left'));  //x_coordinate of asteroid
    oy = parseInt(window.getComputedStyle(asteroid, null).getPropertyValue('top'));   //y_coordinate of asteroid
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);  //check if spaceship hits the asteroid
    //if hits then game over
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        asteroid.classList.remove('asteroidAni')
        audiogo.play();
        cross=false;
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    //if not then update the score and increase the speed
    else if(offsetX < 50 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(asteroid, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.2;
            asteroid.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 1000);

    }
    
}, 10);

//display the score
function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}