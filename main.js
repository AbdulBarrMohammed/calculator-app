

const btns = document.querySelectorAll('.btns');
const screen = document.querySelector('.screen');


//container to always only hold two numbers and one operation
let operationLst = [];
let equalPressed = false;

function operate(arr) {
    const operation = arr[1];
    const firstNum = arr[0];
    const secondNum = arr[2];

    //operate

    const total = calculate(Number(firstNum), Number(secondNum), operation);
    arr = [];
    arr.push(total);


    return [arr, total];

    //empty current operate array and place calculated total in first index;

    //return the new operate array
}

function calculate(num1, num2, operation) {

    let total = 0;
    if (operation === '+') {
        total = num1 + num2;

    }
    else if (operation === '-') {
        total = num1 - num2;
    }
    else if (operation === '*') {
        total = num1 * num2;
    }
    else if (operation === '/') {
        //first check if they are dividing number by 0
        if (num2 === 0) {
            console.log("diving by 9");
            total = 'ERROR';

        }
        else {
            total = num1 / num2;
        }


    }
    return total;

}

function isOperation(btnPressed) {

    if (btnPressed == '+') {
        return true;
    }
    else if (btnPressed == '-') {
        return true;
    }
    else if (btnPressed == '*') {
        return true;
    }
    else if (btnPressed == '/') {
        return true;
    }
    else if (btnPressed == '%') {
        return true;
    }
    else if (btnPressed == '+/-') {
        return true;
    }
    return false;
}

let currNumber = '';
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function(e) {
        //console.log(e.target.innerText);
        const btnPressed = e.target.innerText;

        //check if clear button is pressed;
        if (btnPressed === 'AC' ) {
            //reset current number
            currNumber = '';
            screen.innerHTML = '0';
            operationLst = [];
            equalPressed = false;

        }
        //check if first if operation is not main operations (+, -, /, *)

        else if (btnPressed === '%') {
            const percentage = Number(currNumber) / 100;
            currNumber = percentage.toString();
            screen.innerHTML = currNumber;
            operationLst[0] = currNumber;
        }
        else if (btnPressed === '+/-') {
            const number = Number(currNumber) * -1;
            currNumber = number.toString();
            screen.innerHTML = currNumber;
        }
        else if (btnPressed === '=') {

            equalPressed = true;
            operationLst.push(currNumber);
            let calc = operate(operationLst);

            operationLst = calc[0];
            screen.innerHTML = calc[1];
            currNumber = calc[1];
        }
        else {
                //check if btn pressed is an operation
            if (isOperation(btnPressed)) {

                //check if equal was pressed before first
                if (equalPressed) {
                    //operationLst.push(btnPressed);
                    console.log(operationLst);
                    equalPressed = false;

                }
                else {
                    //append current number to operate array
                    operationLst.push(currNumber);

                }
                //check if operate array in length of 3;
                if (operationLst.length === 3) {
                    let calc = operate(operationLst);
                  //  console.log(operationLst);
                    //console.log(calc);
                    operationLst = calc[0];
                    screen.innerHTML = calc[1];
                }

                //then append operation to operate array
                operationLst.push(btnPressed);
                //empty currNumber
                currNumber = '';

            }
            else {
                currNumber = currNumber + btnPressed;
                screen.innerHTML = currNumber;
            }

        }

    });
}
