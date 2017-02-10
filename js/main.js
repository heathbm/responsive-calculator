$(function () {

    var firstNum = true;
    var firstValue = "";
    var secondValue = "";
    var type = "";
    var clear = false;
    var restart = false;
    var result;
    var justCalced = false;

    // Get the values of numbers from their buttons
    $('.button').filter('.num').on('click', function () {
        var value = $(this).text();
        getNum(value);
    });

    // Assign the numbers to variables
    function getNum(value) {

        if (justCalced) {
            justCalced = false;
        }

        if (clear) {
            console.log('cleared');
            $('#result').html('');
            clear = false;
        }

        if (restart) {
            console.log('restarted');
            firstNum = true;
            firstValue = "";
            secondValue = "";
            result = "";
            type = "";
            clear = false;
            restart = false;
        }

        if (firstNum) {
            firstValue += value;
            display(firstValue);
        } else {
            secondValue += value;
            display(secondValue);
        }
        console.log('First:' + firstValue + ' ,Second: ' + secondValue);
    }

    // Display what is sent to this function the result screen
    function display(value) {
        if (value == '') {
            value = '0';
        }
        $('#result').html(value);
    }

    // Prepares the calculator to clear it's screen
    //  when the user presses a number after an operator
    $('.special').on('click', function () {
        restart = false;
        clear = true;
    });

    // Calculates and displays the result depending on the current operator 
    function calculate() {

        console.log('calculating' + 'First:' + firstValue + ' ,Second: ' + secondValue + ' , type: ' + type);
        var first = Number(firstValue);
        var second = Number(secondValue);
        var temp = 0;

        switch (type) {
            case 'addition':
                temp = first + second;
                break;
            case 'subtract':
                temp = first - second;
                break
            case 'times':
                temp = first * second;
                break;
            case 'divide':
                if (second == 0) {
                    temp = 0;
                } else {
                    temp = first / second;
                }
        }

        result = +temp.toFixed(9).toString().replace(/\.0+$/, '');
        display(result);
        clear = true;
        justCalced = true;
        firstValue = result;
        secondValue = "";
    };

    // Listener for the equals button
    $('#btn-equals').on('click', function () {
        restart = true;
        if (secondValue != "") {
            calculate();
        }
    });

    // Listener for the clear button
    $('#btn-ac').on('click', function () {
        display('0');
        firstNum = true;
        firstValue = "";
        secondValue = "";
        result = "";
        type = "";
        clear = false;
        restart = false;
    });

    // Listener for the delete button
    $('#btn-del').on('click', function () {
        var temp = "";

        if (firstNum) {
            if (firstValue == "") {
                return;
            }
            temp = firstValue;
            temp = temp.slice(0, -1);
            firstValue = temp;
        } else {
            if (secondValue == "") {
                return;
            }
            temp = secondValue;
            temp = temp.slice(0, -1);
            secondValue = temp;
        }

        display(temp);
    });

    // Listener for the add button
    $('#btn-add').on('click', function () {
        if (firstNum) {
            firstNum = false;
        }

        if (secondValue != "") {
            calculate();
        }

        type = "addition";
    });

    // Listener for the subtract button
    $('#btn-subtract').on('click', function () {
        if (firstNum) {
            firstNum = false;
        }

        if (secondValue != "") {
            calculate();
        }

        type = "subtract";
    });

    // Listener for the times button
    $('#btn-times').on('click', function () {
        if (firstNum) {
            firstNum = false;
        }

        if (secondValue != "") {
            calculate();
        }

        type = "times";
    })

    // Listener for the divide button
    $('#btn-divide').on('click', function () {
        if (firstNum) {
            firstNum = false;
        }

        if (secondValue != "") {
            calculate();
        }

        type = "divide";
    })

    // Turns the current number displayed into a decimal
    $('#btn-dot').on('click', function () {
        clear = false;
        restart = false;

        if (justCalced) {
            justCalced = false;
            firstNum = true;
        }

        if (firstNum) {
            if (typeof firstValue == 'number') {
                firstValue = firstValue.toString();
            }

            if (firstValue.includes('.')) {
                return;
            }

            console.log(typeof firstValue);
            firstValue += '.';
            console.log(firstValue);
            display(firstValue);
        } else {
            if (secondValue.includes('.')) {
                return;
            }
            secondValue += '.';
            display(secondValue);
        }
    });

    // Converts the polarity of the current number
    $('#btn-convert').on('click', function () {
        clear = false;
        restart = false;

        if (justCalced) {
            justCalced = false;
            firstNum = true;
        }

        if (firstNum) {
            if (typeof firstValue == 'number') {
                firstValue = firstValue.toString();
            }

            if (firstValue.slice(0, 1) == '-') {
                firstValue = firstValue.slice(1);
            } else {
                firstValue = '-' + firstValue;
            }

            display(firstValue);
        } else {

            if (secondValue.slice(0, 1) == '-') {
                secondValue = secondValue.slice(1);
            } else {
                secondValue = '-' + secondValue;
            }

            display(secondValue);
        }

    });

});

