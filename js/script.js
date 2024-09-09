//ChatGPT has been used on this file.
class Button {
    constructor(color, index) {
        this.index = index;
        this.element = document.createElement('button');
        this.element.className = 'button';
        this.element.style.backgroundColor = color;
        this.element.textContent = index + 1;  // Initially show numbers for clarity
    }
}

class GameManager {
    constructor(container) {
        this.container = container;
        this.buttons = [];
        this.originalOrder = [];
        this.currentIndex = 0;  // To track the current expected index in sequence
        this.gameActive = true;  // Track whether the game is active
    }

    init(numButtons) {
        if (numButtons < 3 || numButtons > 7) {
            alert("Only numbers from 3 to 7 are allowed!");
            return;  // Exit the function if the input is not valid
        }
        this.clearButtons();
        const colors = this.shuffleColors(['red', 'green', 'blue', 'orange', 'purple', 'yellow', 'cyan']);
        for (let i = 0; i < numButtons; i++) {
            const button = new Button(colors[i], i);
            this.container.appendChild(button.element);
            this.buttons.push(button);
            this.originalOrder.push(button);
        }
        this.delayAndScramble(numButtons);
    }

    clearButtons() {
        this.container.innerHTML = '';
        this.buttons = [];
        this.originalOrder = [];
        this.currentIndex = 0;
        this.gameActive = true;
    }

    shuffleColors(colors) {
        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];  // Swap colors
        }
        return colors;
    }

    delayAndScramble(num) {
        setTimeout(() => {
            this.scrambleButtons(num);
        }, num * 1000);
    }

    scrambleButtons(times) {
        let counter = 0;
        const interval = setInterval(() => {
            for (const button of this.buttons) {
                const x = Math.random() * (this.container.offsetWidth - button.element.offsetWidth);
                const y = Math.random() * (this.container.offsetHeight - button.element.offsetHeight);
                button.element.style.position = 'absolute';
                button.element.style.left = `${x}px`;
                button.element.style.top = `${y}px`;
            }
            counter++;
            if (counter === times) {
                clearInterval(interval);
                this.enableClicks();
            }
        }, 2000);
    }

    enableClicks() {
        this.buttons.forEach(button => {
            button.element.textContent = ''; // Hide numbers after scramble
            button.element.onclick = () => this.checkOrder(button);
        });
    }

    checkOrder(clickedButton) {
        if (!this.gameActive) return;  // Ignore clicks if the game is not active

        if (this.originalOrder[this.currentIndex] === clickedButton) {
            clickedButton.element.textContent = clickedButton.index + 1;
            this.currentIndex++;
            if (this.currentIndex === this.originalOrder.length) {
                alert("Excellent memory!");
                this.endGame();
            }
        } else {
            this.originalOrder.forEach(btn => btn.element.textContent = btn.index + 1);
            alert("Wrong order!");
            this.endGame();
        }
    }

    endGame() {
        this.gameActive = false;  // Set game state to inactive
        this.buttons.forEach(button => {
            button.element.onclick = null;  // Remove click handlers
        });
    }
}

document.getElementById('startButton').addEventListener('click', () => {
    const numButtons = parseInt(document.getElementById('numButtons').value, 10);
    const container = document.getElementById('container');
    const gameManager = new GameManager(container);
    gameManager.init(numButtons);
});
