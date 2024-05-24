// Constants Declarations
const numberButtons = document.querySelectorAll(".symbol");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const clearBtn = document.querySelector(".clear");
const resultBtn = document.querySelector(".result");
const signBtn = document.querySelector(".sign");
const backspaceBtn = document.querySelector(".backspace");
const dotBtn = document.querySelector(".dot");
const pageBody = document.querySelector("body");

// Variable Declarations
let numberOne;
let numberTwo;
let operator;
let operationResult;
let isOperation = false;

function add(numberOne, numberTwo) {
    return numberOne + numberTwo;
};
function subtract(numberOne, numberTwo) {
    return numberOne - numberTwo;
};
function multiply(numberOne, numberTwo) {
    return numberOne * numberTwo;
};
function divide(numberOne, numberTwo) {
    return numberOne / numberTwo;
};

function getNumberValue(event) {
    let numberButtonText;
    event.type === "click" ? numberButtonText = event.target.textContent : numberButtonText = event.key;
    if (operator === undefined && numberTwo === undefined) {
        display.textContent = display.textContent + numberButtonText;
    }
    if (operator !== undefined && numberTwo === undefined) {
        display.textContent = "";
        display.textContent = numberButtonText;
        numberTwo = Number(display.textContent);
    } else if (typeof numberTwo === "number") {
        display.textContent = display.textContent + numberButtonText;
        numberTwo = display.textContent
    };
}

function getOperatorValue(event) {
    let operatorButtonText;
    event.type === "click" ? operatorButtonText = event.target.textContent : operatorButtonText = event.key;
    if (typeof numberOne === "number" && numberTwo === undefined) {
        display.textContent = display.textContent;
    } else if (numberOne === undefined) {
        numberOne = Number(display.textContent);
        operator = operatorButtonText;
    } else if (typeof numberOne === "number" && typeof numberTwo === "number") {
        getOperation();
        numberOne = operationResult;
        numberTwo = undefined;
        operator = operatorButtonText;
        isOperation = true;
    } else if (isOperation === true) {
        getOperation();
        operator = operatorButtonText;
    }
}

function getOperation() {
    if (numberOne === undefined) {
        display.textContent = display.textContent
    } else {
        operationResult = operate(numberOne, numberTwo, operator);
        display.textContent = operationResult;
    }
};

function operate(numberOne, numberTwo, operator) {
    let result;
    switch (operator) {
        case "+":
            result = add(numberOne, numberTwo);
            break;
        case "x":
            result = multiply(numberOne, numberTwo);
            break;
        case "-":
            result = subtract(numberOne, numberTwo);
            break;
        case "÷":
            result = divide(numberOne, numberTwo);
            break;
    }
    result = result = Math.round(result * 100) / 100;
    return result;
};

// event listener for the number buttons
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", getNumberValue)
});

// event listener for the symbol buttons
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", getOperatorValue)
});

clearBtn.addEventListener("click", clear);

resultBtn.addEventListener("click", getResult);

signBtn.addEventListener("click", () => {
    if (numberOne === undefined || numberOne === "") {
        numberOne = Number(display.textContent);
    }
    numberOne *= -1;
    display.textContent = numberOne;
    numberOne = undefined;
});

backspaceBtn.addEventListener("click", backspace)

dotBtn.addEventListener("click", addFloat)

pageBody.addEventListener("keypress", (keyevent) => {
    if (!isNaN(Number(keyevent.key))) {
        getNumberValue(keyevent);
    } else if (keyevent.key === "+" ||
        keyevent.key === "-" ||
        keyevent.key === "+/-" ||
        keyevent.key === "÷" ||        
        keyevent.key === "x"        
    ) {        
        getOperatorValue(keyevent);
    } else if(keyevent.key === "="){
        getResult();        
    }
     else if (keyevent.key === "Delete") {
        clear();
    }
     else if (keyevent.key === ".") {
        addFloat();
    }
    });
pageBody.addEventListener("keyup", (keyevent) => {
    if (keyevent.key === "Backspace") {
        backspace();
    }
});

function getResult() {
    if (numberOne === undefined || numberTwo === undefined) {
        display.textContent = display.textContent;
    } else {
        getOperation();
        console.log(numberOne);
        console.log(numberTwo);
        console.log(operator);
        numberOne = undefined;
        numberTwo = undefined;
        operator = undefined;
    }
};

function clear() {
    display.textContent = "";
    numberOne = undefined;
    numberTwo = undefined;
    operator = undefined;
}

function backspace() {
    let text = display.textContent;
    display.textContent = text.slice(0, text.length - 1);
}

function addFloat(){
    let text = display.textContent;
    isFloat = text.includes(".");
    if(!isFloat){
        display.textContent = text + ".";        
    } else{
        text = text;
    }
}
