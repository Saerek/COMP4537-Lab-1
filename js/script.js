import { messages } from '../lang/messages/en/user.js';

class Button {
    constructor(color, index) {
        this.color = color;
        this.index = index;
        this.element = document.createElement('button');
        this.element.className = 'button';
        this.element.style.backgroundColor = color;
    }

    hideText() {
        this.element.textContent = '';
    }

    showText() {
        this.element.textContent = this.index + 1;
    }
}

class GameManager {
    constructor(container) {
        this.container = container;
        this.buttons = [];
    }

    init(numButtons) {
        this.clearButtons();
        const colors = ['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'cyan'];
        for (let i = 0; i < numButtons; i++) {
            const button = new Button(colors[i % colors.length], i);
            this.container.appendChild(button.element);
            this.buttons.push(button);
        }
    }

    clearButtons() {
        this.container.innerHTML = ''; // Efficient way to remove all children
        this.buttons = [];
    }
}

const container = document.getElementById('container');
const gameManager = new GameManager(container);

document.getElementById('startButton').addEventListener('click', () => {
    const numButtons = parseInt(document.getElementById('numButtons').value, 10);
    gameManager.init(numButtons);
});
