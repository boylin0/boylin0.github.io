/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import 'wowjs/css/libs/animate.css';

import * as PIXI from 'pixi.js'
import PixiKeyboard from './Keyboard';
import PixiMouse from './Mouse';
import { goFullscreenMode, exitFullscreenMode, isMobile } from '../../utils';

let Keyboard = new PixiKeyboard();
let Mouse = new PixiMouse();
let gameScene = null;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mapValue(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function toggleFullscreen() {
    if ((document.fullscreenElement != null)) {
        exitFullscreenMode();
    } else {
        goFullscreenMode(document.getElementById('GameView'));
    }

}

class Collision {
    hitTestRect(spriteA, spriteB) {
        let ab = spriteA.getBounds();
        let bb = spriteB.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }

    hitTestCircleRect(spriteA, radius, spriteB) {

        let ab = spriteA.getBounds();
        let bb = spriteB.getBounds();

        let cx = ab.x + (ab.width / 2);
        let cy = ab.y + (ab.height / 2);
        let rx = bb.x;
        let ry = bb.y;
        let rw = bb.width;
        let rh = bb.height;

        let testX = cx;
        let testY = cy;
        if (cx < rx) testX = rx;
        else if (cx > rx + rw) testX = rx + rw;
        if (cy < ry) testY = ry;
        else if (cy > ry + rh) testY = ry + rh;

        let distX = cx - testX;
        let distY = cy - testY;
        let distance = Math.sqrt((distX * distX) + (distY * distY));

        if (distance <= radius) {
            return true;
        }
        return false;
    }

}

class Button {
    constructor(texture) {
        this.sprite = new PIXI.Sprite(texture);

        let resizeRatio = (70 / this.sprite.width);
        this.sprite.width = this.sprite.width * resizeRatio;
        this.sprite.height = this.sprite.height * resizeRatio;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.position = {
            x: 0,
            y: 0,
        }
        this.width = this.sprite.width;
        this.height = this.sprite.height;
    }
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
    }
    update(delta) {
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;

        let bound = this.sprite.getBounds();
        if (Mouse.getPosX() < bound.x + bound.width &&
            Mouse.getPosX() > bound.x &&
            Mouse.getPosY() < bound.y + bound.height &&
            Mouse.getPosY() > bound.y) {
            this.sprite.width = this.width * 1.1;
            this.sprite.height = this.height * 1.1;
        } else {
            this.sprite.width = this.width * 1.0;
            this.sprite.height = this.height * 1.0;
        }
    }
    isClick() {
        if (this.sprite.visible == false) return false;
        let bound = this.sprite.getBounds();
        if (Mouse.isButtonReleased('touchtap') || Mouse.isButtonReleased(0)) {
            return (
                Mouse.getPosX() < bound.x + bound.width &&
                Mouse.getPosX() > bound.x &&
                Mouse.getPosY() < bound.y + bound.height &&
                Mouse.getPosY() > bound.y);
        }

        return false;
    }
}

class Bird extends Collision {
    constructor(texture) {
        super();
        this.sprite = new PIXI.Sprite(texture);
        this._resize();
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.position = {
            x: 0,
            y: 0,
        }
        this.speed = {
            x: 0,
            y: 0,
        }
    }

    _resize(){
        let resizeRatio = ((gameScene.height / 20) / this.sprite.width);
        this.sprite.width = this.sprite.width * resizeRatio;
        this.sprite.height = this.sprite.height * resizeRatio;
    }

    update(delta) {
        const rotateValue = (gameScene.height / 25);
        // Bird rotating based on speed
        let speedRate = Math.max(Math.min(this.speed.y, rotateValue), -rotateValue);
        this.sprite.rotation = mapValue(speedRate, rotateValue, -rotateValue, (3.14 / 2), -(3.14 / 2));

        // Speed Y
        if (this.sprite.position.y + this.speed.y < 0) {
            this.speed.y = 0.0;
            this.position.y = 0;
        } else {
            this.position.y += this.speed.y * delta;
        }

        // Down Gravity
        if (this.sprite.position.y < gameScene.height) {
            this.speed.y += (gameScene.height / 1500) * delta;
        } else {
            this.speed.y = 0;
        }

        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
    }

    setSpeed(x, y) {
        this.speed.x = x;
        this.speed.y = y;
    }

    isDie() {
        return (this.sprite.position.y >= gameScene.height);
    }

    Jump() {
        const birdJumpSpeed = -(gameScene.height / 60);
        this.setSpeed(0, birdJumpSpeed);
    }

    hitTestCircleRect(sprite) {
        return super.hitTestCircleRect(this.sprite, (this.sprite.width / 2) - 5, sprite);
    }

}

class Pipe {
    constructor(textureHead, textureBody, posX, posY, directionDown) {


        const container = new PIXI.Container();
        const spriteHead = new PIXI.Sprite(textureHead);
        const spriteBody = new PIXI.Sprite(textureBody);
        let resizeRatio = ((gameScene.height / 25) / spriteHead.height);
        spriteHead.width = spriteHead.width * resizeRatio;
        spriteHead.height = spriteHead.height * resizeRatio;
        spriteBody.width = spriteBody.width * resizeRatio;
        spriteBody.height = gameScene.height * 2;
        spriteBody.position.y = spriteHead.position.y + spriteHead.height;
        spriteBody.position.x = (spriteHead.width / 2) - (spriteBody.width / 2);
        container.addChild(spriteHead);
        container.addChild(spriteBody);

        this.texture = gameScene.app.renderer.generateTexture(container);
        this.sprite = new PIXI.Sprite(this.texture);
        container.destroy();
        spriteHead.destroy();
        spriteBody.destroy();

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0;

        if (directionDown) {
            this.sprite.rotation = 3.14159;
            this.sprite.anchor.y = 0;
        }

        this.position = {
            x: posX,
            y: posY,
        }
        this.speed = {
            x: 0,
            y: 0,
        }

        this.pipeOffset = 0;
        this.isStaticPipe = true;
    }

    setStaticPipe(val){
        this.isStaticPipe = val;
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
    }

    update(delta) {

        const pipeSpeed = (gameScene.height / 120);

        this.position.x -= pipeSpeed * delta;


        if (this.isStaticPipe) {
            this.pipeOffset = Math.sin(new Date().getTime() / 1000) / 2;
            this.position.y = this.position.y + this.pipeOffset;
        }

        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;

    }
    destroy() {
        this.sprite.destroy();
        this.texture.destroy();
    }
}

class GameScene {

    constructor(canvas) {

        this.app = new PIXI.Application({ resizeTo: window, backgroundColor: 0x9acefe, view: canvas });
        this.app.loader
            .add('bird', require('./media/duck.png').default)
            .add('pipe', require('./media/pipe.png').default)
            .add('pipebody', require('./media/pipe-body.png').default)
            .add('pipehead', require('./media/pipe-head.png').default)
            .add('gameover', require('./media/gameover.png').default)
            .add('flappybirdTitle', require('./media/flappyduck-title.png').default)
            .add('buttonRestart', require('./media/button-restart.png').default)
            .add('buttonFullscreen', require('./media/button-fullscreen.png').default)
            .add('buttonHome', require('./media/button-home.png').default)
            .add('buttonExit', require('./media/button-exit.png').default)
            .add('buttonShare', require('./media/button-share.png').default)
            .load((loader, resources) => {

                let textStyle = new PIXI.TextStyle({
                    fontFamily: 'Arial Black',
                    fontSize: 28,
                    fill: '#fff',
                    align: 'center',
                    stroke: "black",
                    strokeThickness: 5,
                });

                this.gameLayer = new PIXI.Container();
                this.app.stage.addChild(this.gameLayer);
                this.gameUI = new PIXI.Container();
                this.app.stage.addChild(this.gameUI);

                this.bird = new Bird(resources.bird.texture);
                this.gameLayer.addChild(this.bird.sprite);

                this.gameover = new PIXI.Sprite(resources.gameover.texture);
                this.gameover.x = this.app.renderer.width / 2;
                this.gameover.y = this.app.renderer.height / 2;
                this.gameover.anchor.x = 0.5;
                this.gameover.anchor.y = 0.8;

                this.scoreTexture = new PIXI.Text('Score: 0', textStyle);
                this.gameUI.addChild(this.scoreTexture);

                this.gameUI.addChild(this.gameover);

                this.pipeTexture = resources.pipe.texture;
                this.pipeheadTexture = resources.pipehead.texture;
                this.pipebodyTexture = resources.pipebody.texture;
                this.pipes = [];

                this.app.ticker.add(delta => this.gameloop(delta));

                this.gameTitle = new PIXI.Sprite(resources.flappybirdTitle.texture);
                this.gameTitle.width = this.gameTitle.width * 0.8;
                this.gameTitle.height = this.gameTitle.height * 0.8;
                this.gameTitle.x = this.app.renderer.width / 2;
                this.gameTitle.y = this.app.renderer.height / 2;
                this.gameTitle.anchor.x = 0.5;
                this.gameTitle.anchor.y = 0.8;
                this.gameUI.addChild(this.gameTitle);

                this.gameover.x = this.app.renderer.width / 2;
                this.gameover.y = this.app.renderer.height / 2;
                this.gameover.anchor.x = 0.5;
                this.gameover.anchor.y = 0.8;
                this.gameover.visible = false;
                this.bird.sprite.visible = false;
                this.isGameover = true;

                this.restartButton = new Button(resources.buttonRestart.texture);
                this.fullScreenButton = new Button(resources.buttonFullscreen.texture);
                this.exitButton = new Button(resources.buttonExit.texture);
                this.shareButton = new Button(resources.buttonShare.texture);

                this.gameUI.addChild(this.restartButton.sprite);
                this.gameUI.addChild(this.fullScreenButton.sprite);
                this.gameUI.addChild(this.exitButton.sprite);
                this.gameUI.addChild(this.shareButton.sprite);

                this._resizeScene();

                //goFullscreenMode(document.getElementById('GameView'));

            });

        /* Scene variable */
        this.frameElapsedTime = 0;
        this.lastAddPipeTime = 0;
        this.isGameover = false;
        this.score = 0;
        this.width = this.app.renderer.width;
        this.height = this.app.renderer.height;
        this._resizeScene = this._resizeScene.bind(this);
        window.addEventListener('resize', this._resizeScene);

        document.addEventListener('fullscreenchange', this._resizeScene, false);
        document.addEventListener('mozfullscreenchange', this._resizeScene, false);
        document.addEventListener('MSFullscreenChange', this._resizeScene, false);
        document.addEventListener('webkitfullscreenchange', this._resizeScene, false);

    }

    _resizeScene() {
        let t = this;
        setTimeout(function () {
            if (typeof t.app?.renderer?.width === 'undefined') return;
            t.width = t.app.renderer.width;
            t.height = t.app.renderer.height;

            t.bird._resize();
            t.scoreTexture.position.x = 10;
            t.scoreTexture.position.y = 10;
            t.gameTitle.x = t.app.renderer.width / 2;
            t.gameTitle.y = t.app.renderer.height / 2;
            t.gameover.x = t.app.renderer.width / 2;
            t.gameover.y = t.app.renderer.height / 2;

            let ratio = Math.min(t.width / t.gameover.width, 1);
            t.gameover.width = t.gameover.width * ratio;
            t.gameover.height = t.gameover.height * ratio;

            ratio = Math.min((t.width) / t.gameTitle.width, 1);
            t.gameTitle.width = t.gameTitle.width * ratio;
            t.gameTitle.height = t.gameTitle.height * ratio;

            let buttons = [t.restartButton, t.fullScreenButton, t.exitButton, t.shareButton];
            let buttonWidth = buttons.reduce((total, arr) => { return total + arr.width + 10 }, 0);
            let lastPosX = (t.width / 2) - (buttonWidth / 2) + 40;
            let buttonY = t.gameTitle.getBounds().y + t.gameTitle.getBounds().height + 120;
            buttons.forEach((elem, idx, arr) => {
                elem.setPosition(lastPosX, buttonY);
                lastPosX += elem.width + 10;
            });
        }, 50);

    }

    setup() {
        this.gameTitle.visible = false;
        this.bird.setPosition(Math.min(this.width / 8, 200), this.app.renderer.height / 3);
        this.bird.speed.y = -5.0;
        this.bird.sprite.visible = true;
        this.gameover.visible = false;
        this.pipes.forEach((val) => {
            val.pipeUp.destroy();
            val.pipeBottom.destroy();
        })
        this.pipes = [];
        this.isGameover = false;
        this.score = 0;
        this.restartButton.sprite.visible = false;
        this.fullScreenButton.sprite.visible = false;
        this.exitButton.sprite.visible = false;
        this.shareButton.sprite.visible = false;
    }

    gameLogicUpdate(delta) {
        this.lastAddPipeTime += delta;

        /* Update Score */
        if (!this.isGameover) {
            this.score += delta;
            this.scoreTexture.text = 'Score: ' + parseInt(this.score / 10);
        }

        /* User Input */
        if (!this.isGameover) {
            if (Mouse.isButtonPressed('touchtap') || Mouse.isButtonPressed(0) || Keyboard.isKeyPressed('Space')) {
                if (!this.bird.isDie()) this.bird.Jump();
            }
        }

        /* UI */
        if (this.restartButton.isClick()) {
            this.setup();
        }

        if (this.fullScreenButton.isClick()) {
            toggleFullscreen();
        }

        if (this.exitButton.isClick()) {
            window.location.hash = "#";
        }

        if (this.shareButton.isClick()) {
            if (isMobile()) {
                window.open('fb-messenger://share?link=' + encodeURIComponent(window.location.href));
            } else {
                alert('Sharing is not supported on your device.');
            }
            //window.open(`https://line.me/R/msg/text/?${encodeURIComponent(window.location.href)}`);
        }

        /* Check bird is dead */
        if (this.bird.isDie()) {
            this.isGameover = true;
        }

        /* Display gameover */
        if (this.isGameover == true) {

            // Display game title
            if (this.gameTitle.visible == false) {
                this.gameover.visible = true;
            }

            // Display game options
            this.restartButton.sprite.visible = true;
            this.fullScreenButton.sprite.visible = true;
            this.exitButton.sprite.visible = true;
            this.shareButton.sprite.visible = true;
        }

        /* Pipe Generator */
        if (!this.isGameover && this.lastAddPipeTime > 100) {

            const pipeGap = (gameScene.height / 4); 

            let pipePosition = getRandomInt(20, gameScene.height - pipeGap - 20);

            let pTop = new Pipe(
                this.pipeheadTexture,
                this.pipebodyTexture,
                this.app.renderer.width + 75,
                pipePosition,
                true);
            let pBottom = new Pipe(
                this.pipeheadTexture,
                this.pipebodyTexture,
                this.app.renderer.width + 75,
                pipePosition + pipeGap,
                false);
            this.gameLayer.addChild(pTop.sprite);
            this.gameLayer.addChild(pBottom.sprite);

            if(Math.random() * 10 > 5){
                pTop.setStaticPipe(false);
                pBottom.setStaticPipe(false);
            }

            this.pipes.push({ pipeUp: pTop, pipeBottom: pBottom });
            this.lastAddPipeTime = 0;
        }
    }

    gameFrameUpdate(delta) {
        this.frameElapsedTime += delta;
        if (this.frameElapsedTime >= 0) {

            /* GameObject Update */
            if (!this.isGameover) {
                this.bird.update(this.frameElapsedTime);
                this.pipes.forEach((val, index) => {

                    val.pipeUp.update(this.frameElapsedTime);
                    val.pipeBottom.update(this.frameElapsedTime);

                    if (this.bird.hitTestCircleRect(val.pipeUp.sprite) || this.bird.hitTestCircleRect(val.pipeBottom.sprite)) {
                        this.isGameover = true;
                    }

                    if (val.pipeUp.sprite.getBounds().x < -val.pipeUp.sprite.getBounds().width) {
                        this.pipes.splice(index, 1);
                        val.pipeUp.destroy();
                        val.pipeBottom.destroy();
                    }

                });
            }

            this.restartButton.update(this.frameElapsedTime);
            this.fullScreenButton.update(this.frameElapsedTime);
            this.exitButton.update(this.frameElapsedTime);
            this.shareButton.update(this.frameElapsedTime);

            this.frameElapsedTime = 0;
        }
    }

    gameloop(delta) {
        this.gameLogicUpdate(delta);
        this.gameFrameUpdate(delta);
        Keyboard.update();
        Mouse.update();
    }

    destroy() {
        this.app.destroy();
        document.removeEventListener('fullscreenchange', this._resizeScene, false);
        document.removeEventListener('mozfullscreenchange', this._resizeScene, false);
        document.removeEventListener('MSFullscreenChange', this._resizeScene, false);
        document.removeEventListener('webkitfullscreenchange', this._resizeScene, false);
    }

}

class FlappyBird extends React.Component {
    constructor(props) {
        super(props);
    }

/*     touchListen(){
        k = 1;
    } */

    componentDidMount() {
        document.title = "FlappyDuck";
        gameScene = new GameScene(document.getElementById('GameView'));
        Keyboard.init();
        Mouse.init();
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        Keyboard.destroy();
        Mouse.destroy();
        gameScene.destroy();
        document.body.style.overflow = '';
    }

    render() {
        return (
            <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
                <canvas id="GameView"></canvas>
            </div>

        );
    }
}

export default FlappyBird;
