/* Requirement */
import React from 'react';
import { Link } from "react-router-dom";
import 'wowjs/css/libs/animate.css';

import * as PIXI from 'pixi.js'
import PixiKeyboard from './Keyboard';
import PixiMouse from './Mouse';

let Keyboard = new PixiKeyboard();
let Mouse = new PixiMouse();

class Collision {
    hitTestRect(spriteA, spriteB) {
        var ab = spriteA.getBounds();
        var bb = spriteB.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    }
}

class Bird extends Collision {
    constructor(texture) {
        super();
        this.sprite = new PIXI.Sprite(texture);

        let resizeRatio = (35 / this.sprite.width);
        this.sprite.width = this.sprite.width * resizeRatio;
        this.sprite.height = this.sprite.height * resizeRatio;

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

    update(delta) {

        if (this.sprite.position.y + this.speed.y < 0) {
            this.speed.y = 0.0;
            this.position.y = 0;
        } else {
            this.position.y += this.speed.y * delta;
        }

        if (this.sprite.position.y < 768) {
            this.speed.y += 0.4 * delta;
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
        return (this.sprite.position.y >= 768);
    }

    Jump() {
        this.setSpeed(0, -10);
    }

    hitTestRect(sprite) {
        return super.hitTestRect(this.sprite, sprite);
    }

}

class Pipe {
    constructor(texture, directionDown) {
        this.sprite = new PIXI.Sprite(texture);
        let resizeRatio = (80 / this.sprite.width);
        this.sprite.width = this.sprite.width * resizeRatio;
        this.sprite.height = this.sprite.height * resizeRatio;

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0;

        if (directionDown) {
            this.sprite.rotation = 3.14159;
            this.sprite.anchor.y = 0;
        }

        this.position = {
            x: 0,
            y: 0,
        }
        this.speed = {
            x: 0,
            y: 0,
        }
    }

    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;
    }

    update(delta) {

        this.position.x -= 5 * delta;

        this.sprite.position.x = this.position.x;
        this.sprite.position.y = this.position.y;

    }
    destroy() {
        this.sprite.destroy();
    }
}

class GameScene {

    constructor(width, height, canvas) {

        this.app = new PIXI.Application({ width: width, height: height, backgroundColor: 0x9acefe, view: canvas });
        this.app.loader
            .add('bird', require('./media/bird.png').default)
            .add('pipe', require('./media/pipe.png').default)
            .add('gameover', require('./media/gameover.png').default)
            .add('flappybirdTitle', require('./media/flappybird-title.png').default)
            .load((loader, resources) => {

                let textStyle = new PIXI.TextStyle({
                    fontFamily: 'Arial Black',
                    fontSize: 24,
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
                this.gameoverText = new PIXI.Text('PRESS SPACE TO START', textStyle);
                this.gameoverText.anchor.x = 0.5;
                this.gameoverText.x = this.app.renderer.width / 2;
                this.gameoverText.y = this.gameover.getBounds().y + this.gameover.getBounds().height + 30;
                this.gameUI.addChild(this.gameoverText);

                this.scoreTexture = new PIXI.Text('Score: 0', textStyle);
                this.gameUI.addChild(this.scoreTexture);

                this.gameUI.addChild(this.gameover);

                this.pipeTexture = resources.pipe.texture;
                this.pipes = [];

                this.app.ticker.add(delta => this.gameloop(delta));

                this.gameTitle = new PIXI.Sprite(resources.flappybirdTitle.texture);
                this.gameTitle.width = this.gameTitle.width * 0.7;
                this.gameTitle.height = this.gameTitle.height * 0.7;

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

            });

        /* Scene variable */
        this.frameElapsedTime = 0;
        this.lastAddPipeTime = 0;
        this.isGameover = false;
        this.score = 0;
    }

    setup() {
        this.gameTitle.visible = false;
        this.bird.setPosition(150, this.app.renderer.height / 3);
        this.bird.speed.y = -5.0;
        this.bird.sprite.visible = true;
        this.gameover.visible = false;
        this.gameoverText.visible = false;
        this.pipes.forEach((val) => {
            val.pipeUp.destroy();
            val.pipeBottom.destroy();
        })
        this.pipes = [];
        this.isGameover = false;
        this.score = 0;
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
            if (Mouse.isButtonPressed(0) || Keyboard.isKeyPressed('Space')) {
                if (!this.bird.isDie()) this.bird.Jump();
            }
        }

        /* Check bird is dead */
        if (this.bird.isDie()) {
            this.isGameover = true;
        }

        /* Display gameover */
        if (this.isGameover == true) {

            if (this.gameTitle.visible == false) {
                this.gameover.visible = true;
            }

            this.gameoverText.visible = true;
            if (Mouse.isButtonPressed(0) || Keyboard.isKeyPressed('Space')) {
                this.setup();
            }
        }

        /* Pipe Generator */
        if (!this.isGameover && this.lastAddPipeTime > 100) {
            let pipePosition = Math.floor(Math.random() * (400 - 80) + 80);

            let pTop = new Pipe(this.pipeTexture, true);
            let pBottom = new Pipe(this.pipeTexture, false);
            pTop.setPosition(this.app.renderer.width + pTop.sprite.width, pipePosition);
            pBottom.setPosition(this.app.renderer.width + pBottom.sprite.width, pipePosition + 170);
            this.gameLayer.addChild(pTop.sprite);
            this.gameLayer.addChild(pBottom.sprite);

            this.pipes.push({ pipeUp: pTop, pipeBottom: pBottom });
            this.lastAddPipeTime = 0;
        }

        Keyboard.update();
        Mouse.update();

    }

    gameFrameUpdate(delta) {
        this.frameElapsedTime += delta;
        if (1) {

            /* GameObject Update */
            if (!this.isGameover) {
                this.bird.update(this.frameElapsedTime);
                this.pipes.forEach((val, index) => {

                    val.pipeUp.update(this.frameElapsedTime);
                    val.pipeBottom.update(this.frameElapsedTime);

                    if (this.bird.hitTestRect(val.pipeUp.sprite) || this.bird.hitTestRect(val.pipeBottom.sprite)) {
                        this.isGameover = true;
                    }

                    if (val.pipeUp.sprite.getBounds().x < -val.pipeUp.sprite.getBounds().width) {
                        this.pipes.splice(index, 1);
                        val.pipeUp.destroy();
                        val.pipeBottom.destroy();
                    }

                });
            }
            this.frameElapsedTime = 0;
        }
    }

    gameloop(delta) {
        this.gameLogicUpdate(delta);
        this.gameFrameUpdate(delta);
    }

    destroy() {
        this.app.destroy();
        let a = 123;
    }

}

class FlappyBird extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.gameScene = new GameScene(1280, 720, document.getElementById('GameView'));
        Keyboard.init();
        Mouse.init();
    }

    componentWillUnmount() {
        Keyboard.destroy();
        Mouse.destroy();
        this.gameScene.destroy();
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center" style={{ backgroundColor: '#333' }}>
                <Link className="btn btn-secondary m-3" to={"/"} style={{ minWidth: '150px' }}><i className="fa fa-arrow-left"></i> Back</Link>

                <div className="container-fluid m-5 text-center" >
                    <canvas id="GameView"></canvas>
                </div>
            </div>

        );
    }
}

export default FlappyBird;
