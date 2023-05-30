/*
Author: Paul Kim
Date: May 10, 2023
Version: 1.0
platform game script
*/

/*variable declarations and definitions*/

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 575;
const keys = { a: { pressed: false }, d: { pressed: false } };
const gravity = 0.05;
const scaledCanvas = { width: canvas.width / 4, height: canvas.height / 4 };
const backgroundImageHeight = 432;
const camera = { position: { x: 0, y: -backgroundImageHeight + scaledCanvas.height } };
const floorBoundaries = [];
const platformBoundaries = [];
const floorCollisionsMap = [];
const platformCollisionsMap = [];
const floorCollisions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202, 202,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const platformCollisions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 202, 202, 202, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0,
    0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 202, 202, 202, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 202, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < floorCollisions.length; i += 36) {
    floorCollisionsMap.push(floorCollisions.slice(i, 36 + i));
}
for (let i = 0; i < platformCollisions.length; i += 36) {
    platformCollisionsMap.push(platformCollisions.slice(i, 36 + i));
}

/*class declarations and definitions*/

class Boundary {
    static width = 16;
    static height = 16;
    constructor({ position, height = 16 }) {
        this.position = position;
        this.width = 16;
        this.height = height;
    } // end constructor
    draw() {
        canvasContext.fillStyle = 'rgba(255,0,0,0.3)';
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
    } // end function draw
} // end class Boundary

class Sprite {
    constructor({ position, imageSrc, scale = 1, frameRate = 1, framesBuffer = 3 }) {
        this.position = position;
        this.scale = scale;
        this.loaded = false;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale;
            this.height = this.image.height * this.scale;
            this.loaded = true;
        }
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.framesBuffer = framesBuffer;
    } // end constructor
    draw() {
        const cropBox = { position: { x: this.currentFrame * this.image.width / this.frameRate, y: 0 }, width: this.image.width / this.frameRate, height: this.image.height };
        canvasContext.drawImage(this.image, cropBox.position.x, cropBox.position.y, cropBox.width, cropBox.height, this.position.x, this.position.y, this.width, this.height);
    }// end function draw
    updateFrames() {
        this.elapsedFrames++;
        if (this.elapsedFrames % this.framesBuffer == 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++;
            }
            else {
                this.currentFrame = 0;
            }
        }
    }// end function updateFrames
    update() {
        this.draw();
        this.updateFrames();
    } // end function update
} // end class Sprite

class Player extends Sprite {
    constructor({ position, collisionBlocks, platformCollisionBlocks, imageSrc, frameRate, scale = 0.5, animations }) {
        super({ imageSrc, frameRate, scale });
        this.position = position;
        this.velocity = { x: 0, y: 0 };
        this.lastKey;
        this.collisionBlocks = collisionBlocks;
        this.platformCollisionBlocks = platformCollisionBlocks;
        this.hitbox = { position: { x: this.position.x, y: this.position.y }, width: 10, height: 10 };
        this.animations = animations;
        this.lastDirection = "right";
        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            this.animations[key].image = image;
        }
        this.cameraBox = {
            position: { x: this.position.x, y: this.position.y },
            width: 200,
            height: 80
        };
    } // end constructor
    applyGravity() {
        this.velocity.y += gravity;
        this.position.y += this.velocity.y;
    } // end function applyGravity
    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) {
            return;
        }
        this.currentFrame = 0;
        this.image = this.animations[key].image;
        this.framesBuffer = this.animations[key].framesBuffer;
        this.frameRate = this.animations[key].frameRate;
    } // end switchSprite function
    updateHitBox() {
        this.hitbox = { position: { x: this.position.x + 35, y: this.position.y + 26 }, width: 14, height: 27 }
    } // end function updateHitBox
    updateCameraBox() {
        this.cameraBox = {
            position: { x: this.position.x - 50, y: this.position.y },
            width: 200,
            height: 80
        };
    } // end function updateCameraBox
    panCameraToLeft() {
        const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width
        if (cameraBoxRight >= 576) {
            return;
        }
        if (cameraBoxRight >= canvas.width / 4 + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    } // end function panCameraToLeft
    panCameraToRight() {
        if (this.cameraBox.position.x <= 0) {
            return;
        }
        const cameraBoxLeft = this.cameraBox.position.x;
        if (cameraBoxLeft <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    } // end function panCameraToRight
    panCameraDown() {
        if (this.cameraBox.position.y + this.velocity.y <= 0) {
            return;
        }
        const cameraBoxDown = this.cameraBox.position.y;
        if (cameraBoxDown <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }  // end function panCameraDown
    panCameraUp() {
        const cameraBoxUp = this.cameraBox.position.y + this.cameraBox.height;
        if (cameraBoxUp >= Math.abs(camera.position.y) + canvas.height / 4) {
            camera.position.y -= this.velocity.y;
        }
    }  // end function panCameraUp
    checkForHorizontalCanvasCollision() {
        if (this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 || this.hitbox.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        }
    } // end function checkForHorizontalCanvasCollision
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; ++i) {
            const collisionBlock = this.collisionBlocks[i];
            if (isColliding({ object1: this.hitbox, object2: collisionBlock })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset;
                    break;
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    const offset = this.hitbox.position.x - this.position.x;
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.1;
                    break;
                }
            }
        } // end for
    }// end function checkForVerticalCollisions
    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; ++i) {
            const collisionBlock = this.collisionBlocks[i];
            if (isColliding({ object1: this.hitbox, object2: collisionBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.1;
                    break;
                }
            }
        } // end for
        for (let i = 0; i < this.platformCollisionBlocks.length; ++i) {
            const collisionBlock = this.platformCollisionBlocks[i];
            if (isCollidingPlatform({ object1: this.hitbox, object2: collisionBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        } // end for
    }// end function checkForVerticalCollisions
    update() {
        this.updateFrames();
        this.updateHitBox();
        this.updateCameraBox();
        // canvasContext.fillStyle = "rgb(0,155,0,0.5)"
        // canvasContext.fillRect(this.cameraBox.position.x, this.cameraBox.position.y, this.cameraBox.width, this.cameraBox.height)
        // canvasContext.fillStyle = "rgb(0,0,155,0.5)"
        // canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
        // canvasContext.fillStyle = "rgb(0,155,0,0.5)"
        // canvasContext.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitBox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitBox();
        this.checkForVerticalCollisions();
    } // end function update
} // end class Player

/*class object instantiations*/

floorCollisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 202) {
            floorBoundaries.push(new Boundary({ position: { x: j * Boundary.width, y: i * Boundary.height } }));
        }
    })
}) // end forEach
platformCollisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 202) {
            platformBoundaries.push(new Boundary({ position: { x: j * Boundary.width, y: i * Boundary.height }, height: 4 }));
        }
    })
}) // end forEach
const background = new Sprite({ position: { x: 0, y: 0 }, imageSrc: '../html/image/background.png' })
const player = new Player({
    position: { x: 55, y: 300 },
    collisionBlocks: floorBoundaries,
    platformCollisionBlocks: platformBoundaries,
    imageSrc: "../html/image/warrior/Idle.png", frameRate: 8,
    animations: {
        idle: { imageSrc: "../html/image/warrior/Idle.png", frameRate: 8, framesBuffer: 6 },
        idleLeft: { imageSrc: "../html/image/warrior/IdleLeft.png", frameRate: 8, framesBuffer: 6 },
        run: { imageSrc: "../html/image/warrior/Run.png", frameRate: 8, framesBuffer: 6 },
        jump: { imageSrc: "../html/image/warrior/Jump.png", frameRate: 2, framesBuffer: 10 },
        jumpLeft: { imageSrc: "../html/image/warrior/JumpLeft.png", frameRate: 2, framesBuffer: 10 },
        fall: { imageSrc: "../html/image/warrior/Fall.png", frameRate: 2, framesBuffer: 6 },
        fallLeft: { imageSrc: "../html/image/warrior/FallLeft.png", frameRate: 2, framesBuffer: 6 },
        runLeft: { imageSrc: "../html/image/warrior/RunLeft.png", frameRate: 8, framesBuffer: 6 }
    }
});

/*function definitions*/

function isColliding({ object1, object2 }) {
    return (object1.position.y + object1.height >= object2.position.y &&
        object1.position.y + object1.height <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x);
} // end function isColliding

function isCollidingPlatform({ object1, object2 }) {
    return (object1.position.y + object1.height >= object2.position.y &&
        object1.position.y + object1.height <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x);
} // end function isColliding

function animate() {
    window.requestAnimationFrame(animate);
    // canvasContext.fillStyle = 'black'
    // canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    canvasContext.save();
    canvasContext.scale(4, 4);
    canvasContext.translate(camera.position.x, camera.position.y);
    background.update();
    floorBoundaries.forEach(boundary => {
        boundary.draw();
    })
    platformBoundaries.forEach(boundary => {
        boundary.draw();
    })
    player.checkForHorizontalCanvasCollision();
    player.update();
    player.velocity.x = 0;
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -1;
        player.switchSprite('runLeft');
        player.lastDirection = "left";
        player.panCameraToRight();
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 1;
        player.switchSprite('run');
        player.lastDirection = "right";
        player.panCameraToLeft();
    }
    else if (player.velocity.y == 0) {
        if (player.lastDirection == "right") {
            player.switchSprite('idle');
        }
        else {
            player.switchSprite('idleLeft');
        }
    }
    if (player.velocity.y < 0) {
        player.panCameraDown();
        if (player.lastDirection == "right") {
            player.switchSprite('jump');
        }
        else {
            player.switchSprite('jumpLeft');
        }
    }
    else if (player.velocity.y > 0) {
        player.panCameraUp();
        if (player.lastDirection == "right") {
            player.switchSprite('fall');
        }
        else {
            player.switchSprite('fallLeft');
        }
    }
    canvasContext.restore();
} // end function animate

/*event listeners*/

addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case ' ':
            player.velocity.y = -2
            break;
    } // end switch
}) // end event listener

addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;

            break;
        case 'd':
            keys.d.pressed = false;
            break;
    } // end switch
}) // end event listener

/*function call*/

animate();