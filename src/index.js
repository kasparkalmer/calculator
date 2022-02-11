'use strict'
import './styles.css';

let buttons = document.querySelectorAll('.btn');
let screen = document.querySelector('.calculator-screen');
let clearButton = document.querySelector('.btn-danger');
let memory = '';
let secondOperand = '';
let operator = '';
let waiting = false;

initiateButtons();
initiateKeys();

function calculate(operand1, operand2, operator) {
  switch(operator) {
    case '+':
      return parseFloat(operand1) + parseFloat(operand2);
    case '-':
      return parseFloat(operand1) - parseFloat(operand2);
    case '*':
      return parseFloat(operand1) * parseFloat(operand2);
    case '/':
      return parseFloat(operand1) / parseFloat(operand2);
    default:
      return 0;
  }
}

function initiateButtons() {
  buttons.forEach((button) => {
    if (button.className.includes('operator')) {
      button.onclick = () => operatorClicked(button.value);
    } else {
      switch(button.value) {
        case 'clear':
          button.onclick = () => clear();
          break;
        case '=':
          button.onclick = () => equals();
          break;
        default:
          button.onclick = () => inputClicked(button.value);
      }
    }
  });
}

function initiateKeys() {
  document.addEventListener('keypress', event => {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'].includes(event.key)) {
      inputClicked(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
      operatorClicked(event.key);
    } else if (['c', 'C', 'Escape'].includes(event.key)) {
      clear();
    } else if (event.key === 'Backspace') {
      removeLast();
    } else if (event.key === 'Enter') {
      equals();
    }
    console.log(event.key);
  });
}

function operatorClicked(value) {
  secondOperand = '';
  const length = screen.value.toString().length;
  if (value === '-' && (length === 0 || (length === 1 && waiting))) {
    inputClicked(value);
  } else {
    memory = screen.value.toString();
    operator = value;
    waiting = true;
  }
}

function clear() {
  if (screen.value.toString().length === 0) {
    memory = '';
    operator = '';
  } else {
    clearButton.textContent = 'CE';
  }
  secondOperand = '';
  screen.value = '';
}

function removeLast() {
  const length = screen.value.toString().length - 1;
  screen.value = screen.value.toString().substr(0, length);
}

function equals() {
  let result;
  if (secondOperand !== '') {
    result = calculate(memory, secondOperand.toString(), operator);
  } else {
    result = calculate(memory, screen.value.toString(), operator);
    secondOperand = screen.value;
  }
  memory = result;
  screen.value = result.toString().length > 11 ? result.toExponential(6) : result;
}

function inputClicked(input) {
  if (waiting) {
    screen.value = '';
    waiting = false;
  }

  const current = screen.value.toString();

  if (current.length === 0) {
    clearButton.textContent = 'C';
  }

  if (current === '0' && input === '0') {
    return;
  }

  if ((!isNaN(input) || input === '-' || (input === '.' && !current.includes('.'))) && current.length <= 10) {
    screen.value = screen.value + input;
  }
}
