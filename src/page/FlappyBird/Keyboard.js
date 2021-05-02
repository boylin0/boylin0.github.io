const PIXI = require('pixi.js');
const Events = require('nom-events');

class Keyboard {
  constructor() {
    this.keyStates = new Map();
    this.events = new Events();
    this._keyDownListener = this._keyDownListener.bind(this);
    this._keyUpListener = this._keyUpListener.bind(this);
  }

  _keyDownListener(event) {
    if (!this.keyStates.get(event.code)) {
      this.keyStates.set(event.code, event);
      this.events.call('pressed', event.code, event);
      this.events.call('pressed_' + event.code, event.code, event);
    }
  }
  
  _keyUpListener(event) {
    event = this.keyStates.get(event.code);
    if (event) {
      //this.keyStates.set(event.code, event);
      event.wasReleased = true;
      this.events.call('released', event.code, event);
      this.events.call('released_' + event.code, event.code, event);
    }
  }

  init() {
    window.addEventListener("keydown", this._keyDownListener, false);
    window.addEventListener("keyup", this._keyUpListener, false);
  }

  destroy() {
    window.removeEventListener("keydown", this._keyDownListener, false);
    window.removeEventListener("keyup", this._keyUpListener, false);
  }

  clear() {
    this.keyStates.clear();
  }

  update() {
    this.keyStates.forEach((value, keyCode) => {
      const event = this.keyStates.get(keyCode);

      event.alreadyPressed = true;

      if (event.wasReleased) {
        this.keyStates.delete(keyCode);
      }

      this.events.call('down', keyCode, event);
      this.events.call('down_' + keyCode, keyCode, event);
    });
  }

  isKeyDown(...args) {
    let result = false;
    for (let keyCode of args) {
      const event = this.keyStates.get(keyCode);
      if (event && !event.wasReleased)
        result = true;
    }

    return result;
  }

  isKeyUp(...args) {
    return !this.isKeyDown(args);
  }

  isKeyPressed(...args) {
    let result = false;

    if (args.length == 0)
      return false;

    for (let keyCode of args) {
      const event = this.keyStates.get(keyCode);
      if (event && !event.wasReleased && !event.alreadyPressed)
        result = true;
    }

    return result;
  }

  isKeyReleased(...args) {
    let result = false;

    if (args.length == 0)
      return false;

    for (let keyCode of args) {
      const event = this.keyStates.get(keyCode);
      if (event && event.wasReleased)
        result = true;
    }

    return result;
  }
}


/*keyboard.events.on('pressed', null, (keyCode, event) => {
  console.log('dd', keyCode);
});*/
/*
setInterval(() => {
  console.log(keyboard.isKeyReleased('KeyA'));
  keyboard.update();
}, 0);*/

export default Keyboard;
