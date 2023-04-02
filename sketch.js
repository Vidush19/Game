const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

y = 100;

const gravity = 0.5;



const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './images/bg.png'
})
const floorCollisions2D = []

for(i=0;  i < floorCollisions.length; i+=64) {
    floorCollisions2D.push(floorCollisions.slice(i, i+64));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol==2305){
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x*16,
                    y: y*16
                }
            }));
        }
    })
})

const platformCollisions2D = []

for(i=0;  i < platformCollisions.length; i+=64) {
    platformCollisions2D.push(platformCollisions.slice(i, i+64));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol==2305){
            platformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x*16,
                    y: y*16
                }
            }));
        }
    })
})

let p = new Player({
    position: {
        x:500,
        y:100
    },
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc: './images/sprite/1_right.png',
    images: {
        right: {
            imageSrc: './images/sprite/1_right.png'
        },
        left: {
            imageSrc: './images/sprite/1_left.png'
        }
    }
})
    

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },

}



function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(1, 1);
    background.update();
    c.restore();

    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.update();
    // })

    // platformCollisionBlocks.forEach((block) => {
    //     block.update();
    // })
    p.update();
    

    p.velocity.x = 0;
    if(keys.d.pressed){
        p.velocity.x = 5;
        p.switchSprite('right');
    }
    else if(keys.a.pressed){
        p.velocity.x = -5;
        p.switchSprite('left');
    }
    

}
animate();

window.addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w':
            if(p.velocity.y<= 1){
                p.velocity.y = -15;
            }
            break;
    }
})

window.addEventListener('keyup', (e)=>{
    switch(e.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
})