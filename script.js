const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

PreGame();

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', () => {
    document.querySelector('.Message').style.display = 'flex';
})

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    document.querySelector('.pre-header').style.display = 'none';
    document.querySelector('.pre-instructions').style.display = 'none';
    document.querySelector('.pre-text').style.display = 'none';
    document.querySelector('.health-container').style.display = 'flex';
    animate();
    decreaseTimer();
});

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position:{
    x: 200,
    y: 0
    },

    velocity:{
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run:{ 
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
            image: new Image()
        },jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        },attack2: {
            imageSrc: './img/samuraiMack/Attack2.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50
        },
        width: 150,
        height: 50
    },


    
    

});

const enemy = new Fighter({
    position:{
    x: 800,
    y: 0
    },

    velocity:{
        x: 0,
        y: 0
    },offset: {
        x: 50,
        y: 0
    },
    color: 'red',
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run:{ 
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        },death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        },attack2: {
            imageSrc: './img/kenji/Attack2.png',
            framesMax: 4
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
    },

});

enemy.lastKey = null;

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    w: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
}


function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height); 
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // Player movement

    if(keys.d.pressed && player.lastKey === 'd'){
        player.switchSprite('run');
        if(player.position.x < canvas.width - player.width){
        player.velocity.x = 3;}
        
    }else if(keys.a.pressed && player.lastKey === 'a'){
        player.switchSprite('run');
        if(player.position.x > 0){
        player.velocity.x = -3;}
        

    } else if(keys.w.pressed && player.lastKey === 'w'){
        if(player.velocity.y === 0){
        player.velocity.y = -15;
    }
    } else{
        player.switchSprite('idle');
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump');
    }else if(player.velocity.y > 0){
        player.switchSprite('fall');
    }

   


    // Enemy movement
    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('run');
        if(enemy.position.x < canvas.width - enemy.width){
        enemy.velocity.x = 5;}
    }else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.switchSprite('run');
        if(enemy.position.x > 0){
        enemy.velocity.x = -5;}
    }else if(keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp'){
        if(enemy.velocity.y === 0){
        enemy.velocity.y = -20;
        }
    }else{
        enemy.switchSprite('idle');
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump');
    }else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall');
    }


    

    //detect collision

  

    if(rectangularCollision({rectangle1: player, 
        rectangle2: enemy}) 
        && player.isAttacking1 && player.framesCurrent ===4)
        {
        enemy.takeHit('player');
        player.isAttacking1 = false;
        gsap.to('.enemy-health', {
            width: enemy.health + '%'
        })
    }

    if (player.isAttacking1 && player.framesCurrent === 4) {
        player.isAttacking1 = false;
    }

    if(rectangularCollision({rectangle1: player, 
        rectangle2: enemy}) 
        && player.isAttacking2 && player.framesCurrent ===4)
        {
        enemy.takeHit('player');
        player.isAttacking2 = false;
        gsap.to('.enemy-health', {
            width: enemy.health + '%'
        })
    }

    if (player.isAttacking2 && player.framesCurrent === 4) {
        player.isAttacking2 = false;
    }

    if(rectangularCollision({rectangle1: enemy, 
        rectangle2: player}) 
        && enemy.isAttacking1 && enemy.framesCurrent ===2)
        {
        enemy.isAttacking1 = false;
        player.takeHit('enemy');
        gsap.to('.player-health', {
            width: player.health + '%'
        })
    }

    if (enemy.isAttacking1 && enemy.framesCurrent === 2) {
        enemy.isAttacking1 = false;
    }

    if(rectangularCollision({rectangle1: enemy, 
        rectangle2: player}) 
        && enemy.isAttacking2 && enemy.framesCurrent ===2)
        {
        enemy.isAttacking2 = false;
        player.takeHit('enemy');
        gsap.to('.player-health', {
            width: player.health + '%'
        })
    }

    if (enemy.isAttacking2 && enemy.framesCurrent === 2) {
        enemy.isAttacking2 = false;
    }

    // end game based on health
    if(enemy.health <= 0 || player.health <= 0){
      determineWinner({player, enemy, timerId});
    }return;
}


window.addEventListener('keydown', (event) => {
    if(!player.dead ){

        switch(event.key){
            //player controls
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                keys.w.pressed = true;
                player.lastKey = 'w';
                break;
            case ' ':
                player.attack1();
                break;
            case 'c':
                player.attack2();
                break;
        }

    }

    if(!enemy.dead){
        //enemy controls
    switch(event.key){
             
    case 'ArrowRight':
       keys.ArrowRight.pressed = true;
       enemy.lastKey = 'ArrowRight'; // Use enemy's lastKey
       break;
   case 'ArrowLeft':
       keys.ArrowLeft.pressed = true;
       enemy.lastKey = 'ArrowLeft'; // Use enemy's lastKey
       break;
   case 'ArrowUp':
       keys.ArrowUp.pressed = true;
       enemy.lastKey = 'ArrowUp'; // Use enemy's lastKey
       break;
   case 'Enter':
       enemy.attack1();
       break;
    case 'm':
       enemy.attack2();
       break;
    
    
}
    }

});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;

            
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
});
