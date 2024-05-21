// Constants Declarations
const numberButtons = document.querySelectorAll(".symbol");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const clearBtn = document.querySelector(".clear");
const resultBtn = document.querySelector(".result");

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

function getOperation() { 
    if(numberOne === undefined){
        display.textContent = display.textContent
    }else{
        operationResult = operate(numberOne, numberTwo, operator);
        console.log(operationResult);
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
    numberButton.addEventListener("click", () => {
        if (operator === undefined && numberTwo === undefined) {
            display.textContent = display.textContent + numberButton.textContent;
        }
        if (operator !== undefined && numberTwo === undefined) {
            display.textContent = "";
            display.textContent = numberButton.textContent;
            numberTwo = Number(display.textContent);
            console.log(numberOne);
            console.log(numberTwo);
            console.log(operator);
            
        } else if (typeof numberTwo === "number") {
            display.textContent = display.textContent + numberButton.textContent;
            numberTwo = display.textContent
            console.log(numberOne);
            console.log(numberTwo);
            console.log(operator);
            
        };
    })
});

// event listener for the symbol buttons
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        if(typeof numberOne === "number" && numberTwo === undefined){
            display.textContent = display.textContent;
        }else if(numberOne === undefined){
            numberOne = Number(display.textContent);
            operator = operatorButton.textContent;
            console.log(numberOne);
            console.log(numberTwo);
            console.log(operator);
        }else if(typeof numberOne === "number" && typeof numberTwo==="number"){
            getOperation();
            numberOne = operationResult;
            numberTwo = undefined;
            operator = operatorButton.textContent;
            isOperation = true;
            console.log(numberOne);
            console.log(numberTwo);
            console.log(operator);            
        }else if(isOperation === true){           
            getOperation();            
            operator = operatorButton.textContent;
            // display.textContent = result;
            // numberOne = result;
            console.log(numberOne);
            console.log(numberTwo);
            console.log(operator);
        }
    })
});

clearBtn.addEventListener("click", () => {
    display.textContent = "";
    numberOne = undefined;
    numberTwo = undefined;
    operator = undefined;
});

resultBtn.addEventListener("click", () =>{
    if(numberOne === undefined || numberTwo === undefined){
       display.textContent = display.textContent; 
    } else{
        getOperation();
        numberOne = undefined;
        numberTwo = undefined;
        operator = undefined;

    }
});
