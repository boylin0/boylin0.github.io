const PIXI = require('pixi.js');
const Events = require('nom-events');

let canvasElement = null;

function getMousePos(event) {
  const rect = canvasElement.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}


class Mouse {
  constructor() {
    this.Button = { LEFT: 0, MIDDLE: 1, RIGHT: 2, FOURTH: 3, FIFTH: 4 };

    this.buttonStates = new Map();
    this.events = new Events();
    this._mousemoveListener = this._mousemoveListener.bind(this)
    this._mousedownListener = this._mousedownListener.bind(this)
    this._mouseupListener = this._mouseupListener.bind(this)
    this._targetCanvas = null;
  }

  _mousemoveListener(event) {
    if (this.posLocalX != event.clientX || this.posLocalY != event.clientY) {
      this.events.call('move', event.clientX, this.posLocalY);
      this.events.call('moveLocal', event.clientX, this.posLocalY);
      this.posLocalX = event.clientX; this.posLocalY = event.clientY;
    }

    if (this.posGlobalX != event.screenX || this.posGlobalY != event.screenY) {
      this.events.call('moveGlobal', event.screenX, event.screenY);
      this.posGlobalX = event.screenX; this.posGlobalY = event.screenY;
    }
  }

  _mousedownListener(event) {
    let buttonCode = event.button;
    if (!this.buttonStates.get(buttonCode)) {
      event.posLocalX = this.getPosLocalX(); event.posLocalY = this.getPosLocalY();
      this.buttonStates.set(buttonCode, event);
      this.events.call('pressed', buttonCode, event, this.getPosLocalX(), this.getPosLocalY());
      this.events.call('pressed_' + buttonCode, buttonCode, event, this.getPosLocalX(), this.getPosLocalY());
    }
  }

  _mouseupListener(event) {
    let buttonCode = event.button;
    event = this.buttonStates.get(buttonCode);
    if (event) {
      event.wasReleased = true;
      this.events.call('released', buttonCode, event, this.getPosLocalX(), this.getPosLocalY(), event.posLocalX, event.posLocalY, this.getPosLocalX() - event.posLocalX, this.getPosLocalY() - event.posLocalY);
      this.events.call('released_' + buttonCode, buttonCode, event, this.getPosLocalX(), this.getPosLocalY(), event.posLocalX, event.posLocalY, this.getPosLocalX() - event.posLocalX, this.getPosLocalY() - event.posLocalY);
    }
  }

  init(canvasElement = document.getElementById('main') || document.getElementsByTagName('canvas')[0]) {
    this._targetCanvas = canvasElement
    this._targetCanvas.addEventListener("mousemove", this._mousemoveListener);
    this._targetCanvas.addEventListener("mousedown", this._mousedownListener);
    this._targetCanvas.addEventListener("mouseup", this._mouseupListener);
  }

  destroy() {
    this._targetCanvas.removeEventListener("mousemove", this._mousemoveListener);
    this._targetCanvas.removeEventListener("mousedown", this._mousedownListener);
    this._targetCanvas.removeEventListener("mouseup", this._mouseupListener);
  }

  getPosGlobalX() {
    return this.posGlobalX;
  }

  getPosGlobalY() {
    return this.posGlobalY;
  }

  getPosLocalX() {
    return this.posLocalX;
  }

  getPosLocalY() {
    return this.posLocalY;
  }

  getPosX() {
    return this.getPosLocalX();
  }

  getPosY() {
    return this.getPosLocalY();
  }

  clear() {
    this.buttonStates.clear();
  }

  update() {
    this.buttonStates.forEach((value, buttonCode) => {
      const event = this.buttonStates.get(buttonCode);

      event.alreadyPressed = true;
      if (event.wasReleased)
        this.buttonStates.delete(buttonCode);

      this.events.call('down', buttonCode, event, this.getPosLocalX(), this.getPosLocalY(), event.posLocalX, event.posLocalY, this.getPosLocalX() - event.posLocalX, this.getPosLocalY() - event.posLocalY);
      this.events.call('down_' + buttonCode, buttonCode, event, this.getPosLocalX(), this.getPosLocalY(), event.posLocalX, event.posLocalY, this.getPosLocalX() - event.posLocalX, this.getPosLocalY() - event.posLocalY);
    });
  }

  isButtonDown(...args) {
    let result = false;
    for (let buttonCode of args) {
      const key = this.buttonStates.get(buttonCode);
      if (key && !key.wasReleased)
        result = true;
    }

    return result;
  }

  isButtonUp(...args) {
    return !this.isButtonDown(args);
  }

  isButtonPressed(...args) {
    let result = false;

    if (args.length == 0)
      return false;

    for (let buttonCode of args) {
      const event = this.buttonStates.get(buttonCode);
      if (event && !event.wasReleased && !event.alreadyPressed)
        result = true;
    }

    return result;
  }

  isButtonReleased(...args) {
    let result = false;

    if (args.length == 0)
      return false;

    for (let buttonCode of args) {
      const event = this.buttonStates.get(buttonCode);
      if (event && event.wasReleased)
        result = true;
    }

    return result;
  }
}



export default Mouse;
