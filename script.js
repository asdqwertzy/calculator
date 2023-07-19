var inputF = document.querySelector("input")



inputF.addEventListener("input", function(event) {
    event.target.value = inputF.value.replace(/\D/g, "");
    var thousandsSeperator = inputF.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    event.target.value = thousandsSeperator;
}); 

