var inputF = document.querySelector("input")



inputF.addEventListener("input", function (event) {
    event.target.value = inputF.value.replace(/\D/g, "");
    var thousandsSeperator = inputF.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    event.target.value = thousandsSeperator;
});


document.addEventListener("keydown", function (event) {
    if (event.key.match(/[0-9]/)) {
        if (document.activeElement !== inputF) {
            inputF.focus()
        }
    }
    if (event.key == "Escape") {

        inputF.value = ""
    }
    if (event.key == "Backspace") {
        event.preventDefault();
        inputF.focus()
        document.querySelector("#backspace").classList.add("active");
    }
})

document.addEventListener("keyup", function (event) {
    if (event.key == "Backspace") {
        document.querySelector("#backspace").classList.remove("active");
    }
});