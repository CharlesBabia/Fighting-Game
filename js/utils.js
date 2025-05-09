function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId);
    document.querySelector('.Result').style.display = 'flex'
    document.querySelector('.restart').style.display = 'flex'
    if(player.health === enemy.health){
        document.querySelector('.Result').innerHTML = 'Tie'
    
    }else if(player.health > enemy.health){
        document.querySelector('.Result').innerHTML = 'Player Wins'
       
    }else if(enemy.health > player.health){
        document.querySelector('.Result').innerHTML = 'Enemy Wins'
       
    }
}

let timer = 60;
let timerId;
function decreaseTimer(){

if(timer > 0){
    timerId = setTimeout(decreaseTimer, 1000);
    timer --
    document.querySelector('.timer').innerHTML = timer;
}

if(timer === 0){
     
     determineWinner({ player, enemy, timerId});

}
}

function PreGame(){
    const preGameBackground = new Image();
    preGameBackground.src = './img/background.png';

    preGameBackground.onload = () => {
        c.drawImage(preGameBackground, 0, 0, canvas.width, canvas.height);
    }


    document.querySelector('.pre-header').style.display = 'flex';
    document.querySelector('.pre-instructions').style.display = 'flex';
    document.querySelector('.pre-text').style.display = 'flex';
    document.querySelector('.health-container').style.display = 'none';
}