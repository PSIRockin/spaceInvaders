let x = 300
let y = 900
let dx = 5
let shooting = false
const enemy = [];
const enemySize = 80;
const bullet = [];
const bulletSize = 10;
const bulletSpeed = 10;

function setup(){
    createCanvas(600, 1000);
    enemy[0] = width/2;
    enemy[1] = 50;
    bullet[0] = width/2;
    bullet[1] = height;
}

function draw(){
    background("gray")
    rectMode(CENTER)
    fill("blue")
    rect(x, y, 30, 60)

    if (keyIsDown(LEFT_ARROW)) {
        x -= 5;
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
        x += 5;
    }

    drawEnemy();

    if(keyIsDown(UP_ARROW)){
        shooting = true;
    }
    if(shooting == true){
        drawBullet();
    }
    if(checkForCollision() == true){
        shooting = false;
    }

    if(checkOffscreen() == true){
        shooting = false;
    }


}
function drawBullet(){
    bullet[0] = x
    let a = bullet[0];
    const b = bullet[1];
    
    fill("white");
    ellipse(a,b,bulletSize);
    moveBullet();
}

function moveBullet(){
    const collision = checkForCollision();
    if(collision){
        console.log("Collision has occured!");
        bullet[1] = height;
    }else{
        bullet[1] -= bulletSpeed;
    }

    const offscreen = checkOffscreen();
    if(offscreen){
        console.log("Went Offscreen, Try Again.")
        bullet[1] = height;
    }else{
        bullet[1] -= bulletSpeed;
    }
}

function drawEnemy(){
    let x = enemy[0];
    let y = enemy[1];
    fill("red");
    ellipse(x, y, enemySize);
    if(x + dx > 550 || x + dx < 50) {
        dx = -dx
    }
    x+=dx
   enemy[0]=x
}

function checkForCollision(){
    const enemyX  = enemy[0];
    const enemyY  = enemy[1];
    const bulletX = bullet[0];
    const bulletY = bullet[1];
    const distance = dist(enemyX,enemyY,bulletX,bulletY);
    const enemyRadius  = enemySize/2;
    const bulletRadius = bulletSize/2;
    return distance <= (enemyRadius + bulletRadius);
}

function checkOffscreen(){
    const bulletY = bullet[1]
    return bulletY < 0
}