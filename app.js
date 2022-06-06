
const numbers = document.querySelectorAll(".numbers .line>div");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operators");
const buttons = document.querySelectorAll(".buttons");
let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
const KEYBOARD_OPERATORS = ["/","*","-","+","Enter", "Backspace", "Delete"]

document.addEventListener('keyup', keyboardInput);

numbers.forEach((number)=>number.addEventListener("click",displayNumber));
operators.forEach((operator)=>operator.addEventListener("click", getOperator));
buttons.forEach(button => button.addEventListener('transitionend', removeTransition))


function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('touch');
}

function add(a,b){
    return parseFloat(a) + parseFloat(b)
}
function subtract(a,b){
    return parseFloat(a) - parseFloat(b)
}
function multiply(a,b){
    return parseFloat(a) * parseFloat(b)
}
function divide(a,b){
    return parseFloat(a) / parseFloat(b)
}

function operate(operator,a,b){
    let result = null;
    switch(operator){
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "*":
            result = multiply(a,b);
            break;
        case "/":
            result = divide(a,b);
            break;
        default:
            break;
    }
    if(result.toString().length>13){
        return result.toPrecision(11)
    }

    return result
}

function displayNumber(e){
    e.target.classList.add('touch');

    if(currentOperator){
        if(secondOperand===""){
            display.textContent = "";
        }
        display.textContent = display.textContent+e.target.textContent
        secondOperand = display.textContent; 
    } else{
        display.textContent = display.textContent+e.target.textContent
        firstOperand = display.textContent;    
    }
    if((!(/(^$|^\d+\.?\d*$)/).test(display.textContent))){
        display.textContent = display.textContent.slice(0, -1); 
    }
}

function getOperator(e){
    e.target.classList.add('touch');
    if(e.target.textContent==="←"){
        display.textContent = display.textContent.slice(0, -1);
    } else {
        if(currentOperator&&secondOperand){
            display.textContent = operate(currentOperator,firstOperand,secondOperand);
            firstOperand = display.textContent;
        }
        currentOperator = e.target.textContent;
        if(e.target.textContent==="Clear"){
            firstOperand = "";
            currentOperator = "";
            display.textContent = "";
        } else if(e.target.textContent==="="){
            firstOperand = display.textContent;
            currentOperator = "";   
        }
        secondOperand = "";
    }
}

function keyboardInput(e){
    console.log(e.key)
    if(KEYBOARD_OPERATORS.includes(e.key)){
        if(e.key==="Backspace"){
            display.textContent = display.textContent.slice(0, -1);
        } else {
            if(currentOperator&&secondOperand){
                display.textContent = operate(currentOperator,firstOperand,secondOperand);
                firstOperand = display.textContent;
            }
            currentOperator = e.key;
            if(e.key==="Delete"){
                firstOperand = "";
                currentOperator = "";
                display.textContent = "";
            } else if(e.key==="Enter"){
                firstOperand = display.textContent;
                currentOperator = "";   
            }
            secondOperand = "";
        }
    } else if(/[\d\.]/.test(e.key)){        
        if(currentOperator){
            if(secondOperand===""){
                display.textContent = "";
            }
            display.textContent = display.textContent+e.key.replace(/[^0-9\.]/g, '');
            secondOperand = display.textContent; 
        } else{
            display.textContent = display.textContent+e.key.replace(/[^0-9\.]/g, '');
            firstOperand = display.textContent;    
        }
        if((!(/(^$|^\d+\.?\d*$)/).test(display.textContent))){
            display.textContent = display.textContent.slice(0, -1); 
        }
    }
}
