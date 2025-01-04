var addButton = document.getElementById("add-button");
var addModal = document.getElementById("add-modal");
var addModalCancel = document.getElementById("add-modal-cancel");
var addModalSubmit = document.getElementById("add-modal-submit");

addButton.addEventListener("click", function(){
    addModal.style.display = "grid";
})

addModalCancel.addEventListener("click", function(){
    addModal.style.display = "none";
})

addModalSubmit.addEventListener("click", function(){
    const title = document.getElementById("title").value;

    const descriptions = document.getElementsByName("description");
    let descriptionValue = '';
    for (const description of descriptions) {
        if (description.checked) {
        descriptionValue = description.value;
        break; 
        }
    }

    const date = document.getElementById("date").value;

    const priorities = document.getElementsByName("priority");
    let priorityValue = '';
    for (const priority of priorities) {
        if (priority.checked) {
        priorityValue = priority.value;
        break; 
        }
    }

    if(!title || !descriptionValue || !date || !priorityValue){
        alert("Fill in all info")
    }else {
        alert("Item added");
      }
})