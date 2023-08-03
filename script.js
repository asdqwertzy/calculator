const inputF = document.querySelector("input")
var firstOperand = ""
var secondOperand = ""
var operator = ""
var result = ""
var operatorPressed = false;

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

  // Thousands seperator functionality, only for integer part of input and not for decimal part
  const decimalIndex = event.target.value.indexOf(".");
  const integerPart = decimalIndex !== -1 ? event.target.value.slice(0, decimalIndex) : event.target.value;
  const thousandsSeparator = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  event.target.value = thousandsSeparator + (decimalIndex !== -1 ? event.target.value.slice(decimalIndex) : "");
});


document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (key.match(/[0-9]/)) {
    if (operatorPressed) {
      inputF.value = ""
      operatorPressed = false;
    }
    if (document.activeElement !== inputF) {
      inputF.focus()
    }
  }
  if (key == "Escape") {
    inputF.value = "0"
    firstOperand = ""
    secondOperand = ""
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
  }
  if (key == "+") {
    operatorPressed = true;
    if (!secondOperand == "" & !firstOperand == "") {
      firstOperand = result;
      secondOperand = parseInt(inputF.value.replace(/,/g, ""))
      result = firstOperand + secondOperand
      inputF.value = "0"
      inputF.value = result
      operator = "+"

    }
    if (secondOperand == "") {
      if (!firstOperand == "") {
        secondOperand = parseInt(inputF.value.replace(/,/g, ""))
        result = firstOperand + secondOperand
        inputF.value = "0"
        inputF.value = result
        operator = "+"
      }
      else { firstOperand = parseInt(inputF.value.replace(/,/g, "")); operator = "+"; }
    }
  }
  if (key == "-") {
    operatorPressed = true;
    event.preventDefault()
    if (!secondOperand == "" & !firstOperand == "") {
      firstOperand = result;
      secondOperand = parseInt(inputF.value.replace(/,/g, ""))
      result = firstOperand - secondOperand
      inputF.value = "0"
      inputF.value = result
      operator = "-"
    }
    if (secondOperand == "") {
      if (!firstOperand == "") {
        secondOperand = parseInt(inputF.value.replace(/,/g, ""))
        result = firstOperand - secondOperand
        inputF.value = "0"
        inputF.value = result
        operator = "-"
      }
      else { firstOperand = parseInt(inputF.value.replace(/,/g, "")); operator = "-"; }
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

