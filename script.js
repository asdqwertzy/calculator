const buttons = document.querySelectorAll(".buttons button")
const inputF = document.querySelector("input")
const expression = document.querySelector(".expression")
var firstOperand = ""
var secondOperand = ""
var operator = ""
var result = ""
var operatorPressed = false;
var newValue = true;
var memoryValue = 0;

inputF.value = "0"

const buttonIDMap = {
  "Escape": "c",
  "Backspace": "backspace",
  "Enter": "equals",
  "1": "_1",
  "2": "_2",
  "3": "_3",
  "4": "_4",
  "5": "_5",
  "6": "_6",
  "7": "_7",
  "8": "_8",
  "9": "_9",
  "0": "_0",
  ".": "comma",
  "+": "plus",
  "-": "minus",
  "*": "multiplication",
  "/": "division",
};

const reversebuttonIDMap = {
  "mc": "MC",
  "mr": "MR",
  "mplus": "M+",
  "mminus": "M-",
  "ms": "MS",
  "percentage": "Percent",
  "inverse": "Inverse",
  "squareroot": "Square Root",
  "squared": "Squared",
  "plusminus": "+-",
  "ce": "CE",
  "c": "Escape",
  "backspace": "Backspace",
  "equals": "Enter",
  "_1": "1",
  "_2": "2",
  "_3": "3",
  "_4": "4",
  "_5": "5",
  "_6": "6",
  "_7": "7",
  "_8": "8",
  "_9": "9",
  "_0": "0",
  "comma": ".",
  "plus": "+",
  "minus": "-",
  "multiplication": "*",
  "division": "/"
};

buttons.forEach(button => {
  let timeoutId;
  button.addEventListener("click", function () {
    var buttonId = this.id;
    var key = reversebuttonIDMap[buttonId];

    if (key == "+" || key == "-" || key == "*" || key == "/") {
      handleOperator(key);
    } else if (key == "Enter") {
      simulateKeyEvent("Enter")
    } else if (key === "Backspace") {
      inputF.value = inputF.value.slice(0, -1); // Remove last character
      inputF.dispatchEvent(new Event("input"));
    } else if (key === "Escape") {
      simulateKeyEvent("Escape");
    } else if (key.match(/[0-9]/)) {
      handleNumericKey(key);
      inputF.dispatchEvent(new Event("input"));
    }
    else if (key === "CE") {
      inputF.value = "0"
      expression.textContent = ""
      inputF.dispatchEvent(new Event("input"));
    }
    else if (key === ".") {
      simulateKeyEvent(".");
    }
    else if (key === "+-") {
      if (inputF.value.startsWith("0")) { }
      else if (inputF.value.startsWith("-")) {
        inputF.value = inputF.value.slice(1);
      } else {
        inputF.value = "-" + inputF.value;
      }
      inputF.dispatchEvent(new Event("input"));
    }
    else if (key === "Squared") {
      let originalInput = inputF.value
      inputF.value = addThousandsSeparator(parseFloat(inputF.value.replace(/,/g, "")) ** 2);
      newValue = true;
      operatorPressed = true;
      inputF.dispatchEvent(new Event("input"));
      expression.textContent = `${originalInput}²`
    }
    else if (key === "Square Root") {
      let originalInput = inputF.value
      inputF.value = addThousandsSeparator(parseFloat(Math.sqrt(inputF.value.replace(/,/g, ""))));
      newValue = true;
      operatorPressed = true;
      expression.textContent = `√${originalInput.replace(/,/g, "")}`
    }
    else if (key === "Inverse") {
      if (inputF.value.startsWith("0")) { }
      else {
        inputValue = parseFloat(inputF.value.replace(/,/g, ""));
        inputF.value = addThousandsSeparator(1 / inputValue);
        console.log("Input value:", inputValue);
        newValue = true;
        operatorPressed = true;
        inputF.dispatchEvent(new Event("input"));
        expression.textContent = `1 / ${inputF.value.replace(/,/g, "")} =`
      }
    }
    else if (key === "Percent") {
      if (firstOperand == "") {
        inputF.value = "0"
        inputF.dispatchEvent(new Event("input"));
      }
      else if (operatorPressed) {
        inputF.value = addThousandsSeparator((firstOperand / 100) * parseFloat(inputF.value.replace(/,/g, "")));
        inputF.dispatchEvent(new Event("input"));
        expression.textContent = `${firstOperand} ${operator} ${inputF.value.replace(/,/g, "")}`
      }
    }

    // Memory keys
    else if (key === "M+") {
      memoryValue += parseFloat(inputF.value.replace(/,/g, ""));
    }
    else if (key === "M-") {
      memoryValue -= parseFloat(inputF.value.replace(/,/g, ""));
    }
    else if (key === "MR") {
      inputF.value = addThousandsSeparator(memoryValue);
      inputF.dispatchEvent(new Event("input"));
    }
    else if (key === "MC") {
      memoryValue = 0;
    }
    else if (key === "MS") {
      memoryValue = parseFloat(inputF.value.replace(/,/g, ""));
    }



    timeoutId = setTimeout(() => {
      button.classList.remove("active");
    }, 30);
  });
});

function simulateKeyEvent(key) {
  const event = new KeyboardEvent("keydown", { key: key });
  document.dispatchEvent(event);
}

function handleNumericKey(key) {
  var inputValue = inputF.value;

  if (operatorPressed) {
    inputF.value = "0";
    operatorPressed = false;
    newValue = true;
  }
  if (inputValue.length >= inputF.maxLength) {
    return;
  }

  if (!inputValue.includes(".") && inputValue === "-" && key === "0") {
    return;
  }
  else {
    inputF.value += key
  }
}

function addThousandsSeparator(value) {
  value = value.toString();
  const decimalIndex = value.indexOf(".");
  let integerPart = decimalIndex !== -1 ? value.slice(0, decimalIndex) : value;
  let minusSign = "";

  if (integerPart.startsWith("-")) {
    minusSign = "-";
    integerPart = integerPart.slice(1);
  }

  const thousandsSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return minusSign + thousandsSeparator + (decimalIndex !== -1 ? value.slice(decimalIndex) : "");
}

function calculateResult(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
    default:
      return "";
  }
}

function handleOperator(key) {
  operatorPressed = true;
  if (newValue == false) {
    operator = key;
    expression.textContent = `${firstOperand} ${operator}`
  } else {
    if (!secondOperand == "" && !firstOperand == "") {
      firstOperand = result;
      secondOperand = parseFloat(inputF.value.replace(/,/g, ""));
      result = calculateResult(firstOperand, secondOperand, operator);
      inputF.value = "0";
      inputF.value = addThousandsSeparator(result);
      operator = key;
      newValue = false;
      expression.textContent = `${firstOperand} ${operator} ${secondOperand}`
    }
    if (secondOperand == "") {
      if (!firstOperand == "") {
        secondOperand = parseFloat(inputF.value.replace(/,/g, ""));
        result = calculateResult(firstOperand, secondOperand, operator);
        inputF.value = "0";
        inputF.value = addThousandsSeparator(result);
        operator = key;
        newValue = false;
        expression.textContent = `${firstOperand} ${operator} ${secondOperand}`
      } else {
        firstOperand = parseFloat(inputF.value.replace(/,/g, ""));
        operator = key;
        newValue = false;
        expression.textContent = `${firstOperand} ${operator}`
      }
    }
  }
}


inputF.addEventListener("click", function () {
  inputF.selectionStart = inputF.selectionEnd = inputF.value.length;
});


inputF.addEventListener("input", function (event) {
  event.target.value = inputF.value.replace(/[^\d.-]/g, "");
  var decimalCount = event.target.value.split(".").length - 1;
  if (decimalCount > 1) {
    var parts = event.target.value.split(".");
    event.target.value = parts[0] + parts.splice(1).join("");
  }
  if (event.target.value.match(/^0\d/)) {
    event.target.value = event.target.value.slice(1);
  }

  event.target.value = addThousandsSeparator(event.target.value);
});



document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key.match(/[0-9]/)) {
    event.preventDefault();
    if (operatorPressed) {
      inputF.value = "0"
      operatorPressed = false;
      newValue = true;
    }
    if (inputF.value.length >= inputF.maxLength) {
      return;
    }

    if (inputF.value.includes(".") && inputF.value === "-" && key === "0") {
      return;
    }
    else {
      inputF.value += key
      inputF.dispatchEvent(new Event("input"));
    }
  }
  if (key == "Escape") {
    inputF.value = "0"
    firstOperand = ""
    secondOperand = ""
    result = ""
    operatorPressed = false
    operator = ""
    newValue = true;
    expression.textContent = ""
  }
  if (key == "Enter") {
    event.preventDefault();
    if (!firstOperand == "" && !operator == "" && secondOperand == "") {
      expression.textContent = `${firstOperand} ${operator} ${inputF.value.replace(/,/g, "")} =`
      result = calculateResult(parseFloat(firstOperand), parseFloat(inputF.value.replace(/,/g, "")), operator)
      secondOperand = parseFloat(inputF.value.replace(/,/g, ""));
      inputF.value = addThousandsSeparator(result);
      firstOperand = result;
      newValue = false;
      operatorPressed = true;
    }
    else if (firstOperand !== "" && !operator == "" && secondOperand !== "") {
      expression.textContent = `${inputF.value.replace(/,/g, "")} ${operator} ${secondOperand} =`
      result = calculateResult(parseFloat(inputF.value.replace(/,/g, "")), parseFloat(secondOperand), operator)
      inputF.value = addThousandsSeparator(result);
      firstOperand = parseFloat(result);
      newValue = false;
      operatorPressed = true;
    }
    else if (operator == "") {
      if (inputF.value == "") { }
      else {
        expression.textContent = `${inputF.value.replace(/,/g, "")} =`
      }
    }
  }
  if (key == "Backspace") {
    inputF.value = inputF.value.slice(0, -1);
    inputF.dispatchEvent(new Event("input"));
    document.querySelector("#backspace").classList.add("active");
    event.preventDefault()
  }
  if (key == ".") {
    if (inputF.value.includes(".")) {
      event.preventDefault();
    }
    else {
      inputF.value += key
      inputF.dispatchEvent(new Event("input"));
    }
  }
  if (key in buttonIDMap) {
    const buttonId = buttonIDMap[key];
    const button = document.querySelector(`#${buttonId}`);
    button.classList.add("active");
    if (key == "+" || key == "-" || key == "*" || key == "/") {
      handleOperator(key);
      event.preventDefault()
    }
  }
  // else {
  //   event.preventDefault();
  // }
})


document.addEventListener("keyup", function (event) {
  const key = event.key;
  if (key in buttonIDMap) {
    const buttonId = buttonIDMap[key];
    const button = document.querySelector(`#${buttonId}`);
    button.classList.remove("active");
  }
});

