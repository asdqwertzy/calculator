const inputF = document.querySelector("input")

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
    event.target.value = inputF.value.replace(/\D/g, "");
    var thousandsSeperator = inputF.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    event.target.value = thousandsSeperator;
});


document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key.match(/[0-9]/)) {
        if (document.activeElement !== inputF) {
            inputF.focus()
        }
    }
    if (key == "Escape") {

        inputF.value = ""
    }
    if (key == "Backspace") {
        event.preventDefault();
        inputF.focus()
        document.querySelector("#backspace").classList.add("active");
    }
      if (key in buttonIDMap) {
        const buttonId = buttonIDMap[key];
        const button = document.querySelector(`#${buttonId}`);
        button.classList.add("active");
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