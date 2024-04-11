const numberButtons = document.querySelectorAll('.numbers-area button');
const screenText = document.querySelector('.screen-text');
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        screenText.append(event.target.innerText);
    });
});

function actionClick(id) {
    switch (id) {
        case 'delete':
            screenText.innerText = '';
            break;
        case 'backspace':
            screenText.innerText = screenText.innerText.slice(0, -1);
            break;
        case 'enter':
            try {
                const expression = screenText.innerText;
                const result = math.evaluate(expression);
                screenText.innerText = result.toString();
            } catch (error) {
                screenText.innerText = 'Invalid expression';
            }
            break;
        default:
            screenText.innerText = 'err... maybe 42?'
            break;
    }
}

function operatorClick(id) {
    const lastChar = screenText.innerText.slice(-1);
    if (screenText.innerText.trim() === '' || (lastChar !== ' ' && ['+', '-', '*', '/'].includes(lastChar))) {
        return;
    }

    switch (id) {
        case 'add':
            screenText.append(' + ');
            break;
        case 'divide':
            screenText.append(' / ');
            break;
        case 'minus':
            screenText.append(' - ');
            break;
        case 'multiply':
            screenText.append(' * ');
            break;
        default:
            screenText.innerText = 'err... so 42 be it?'
    }
}

const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '(', ')', 'enter', 'backspace', 'delete'];
const keyToIdMap = {
    '+': 'add',
    '-': 'minus',
    '*': 'multiply',
    '/': 'divide',
    '(': 'left-parenthesis',
    ')': 'right-parenthesis',
};

window.addEventListener('keydown', (event) => {
    if (allowedKeys.includes(event.key.toLowerCase())) {
        const buttonId = keyToIdMap[event.key] || event.key.toLowerCase();
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('hover');
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (allowedKeys.includes(event.key.toLowerCase())) {
        const buttonId = keyToIdMap[event.key] || event.key.toLowerCase();
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.remove('hover');
            button.click();
        }
    }
});
