var inputF = document.querySelector("input")



inputF.addEventListener("input", function(event) {
    event.target.value = inputF.value.replace(/\D/g, "");
}); 

