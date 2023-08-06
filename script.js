const inputF = document.querySelector("input")
var firstOperand = ""
var secondOperand = ""
var operator = ""
var result = ""
var operatorPressed = false;
var newValue = true;

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
  if (!newValue) {
    operator = key;
  } else {
    if (!secondOperand == "" && !firstOperand == "") {
      firstOperand = result;
      secondOperand = parseInt(inputF.value.replace(/,/g, ""));
      result = calculateResult(firstOperand, secondOperand, operator);
      inputF.value = "0";
      inputF.value = addThousandsSeparator(result);
      operator = key;
      newValue = false;
    }
    if (secondOperand == "") {
      if (!firstOperand == "") {
        secondOperand = parseInt(inputF.value.replace(/,/g, ""));
        result = calculateResult(firstOperand, secondOperand, operator);
        inputF.value = "0";
        inputF.value = addThousandsSeparator(result);
        operator = key;
        newValue = false;
      } else {
        firstOperand = parseInt(inputF.value.replace(/,/g, ""));
        operator = key;
      }
    }
  }
}

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
    if (operatorPressed) {
      inputF.value = ""
      operatorPressed = false;
      newValue = true;
    }
    if (document.activeElement !== inputF) {
      inputF.focus()
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
  }
  if (key == "Enter") {
    event.preventDefault();
    if (!firstOperand == "" && !operator == "" && secondOperand == "") {
      result = calculateResult(parseInt(firstOperand), parseInt(inputF.value), operator)
      inputF.value = addThousandsSeparator(result);
      secondOperand = firstOperand;
      firstOperand = result;
    }
    else if (firstOperand !== "" && !operator == "" && secondOperand !== "") {
      result = calculateResult(parseInt(firstOperand), parseInt(secondOperand), operator)
      inputF.value = addThousandsSeparator(result);
      firstOperand = parseInt(result);
    }
  }
  if (key == "Backspace") {
    inputF.focus()
    document.querySelector("#backspace").classList.add("active");
  }
  if (key == ".") {
    if (inputF.value.includes(".")) {
      event.preventDefault();
    }
  }
  if (key in buttonIDMap) {
    const buttonId = buttonIDMap[key];
    const button = document.querySelector(`#${buttonId}`);
    button.classList.add("active");
    if (key == "+" || key == "-" || key == "*" || key == "/") {
      handleOperator(key);
      event.preventDefault();
    }
  }
})


document.addEventListener("keyup", function (event) {
  const key = event.key;
  if (key in buttonIDMap) {
    const buttonId = buttonIDMap[key];
    const button = document.querySelector(`#${buttonId}`);
    button.classList.remove("active");
  }
});

