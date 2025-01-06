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
    let title = document.getElementById("title").value;

    let descriptions = document.getElementsByName("description");
    let descriptionValue = '';
    for (const description of descriptions) {
        if (description.checked) {
        descriptionValue = description.value;
        break; 
        }
    }

    let date = document.getElementById("date").value;

    let priorities = document.getElementsByName("priority");
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
        displayItem(title, descriptionValue, date, priorityValue);
        document.getElementById("title").value = "";
        for (const description of descriptions) {
            description.checked = false;
        }
        document.getElementById("date").value = "";
        for (const priority of priorities) {
            priority.checked = false;
        }
        addModal.style.display = "none";
      }
})

function displayItem(title, descriptionValue, date, priorityValue){
    let body = document.getElementById("body");
    let item = document.createElement("div");
    let colorPhrase = '';
    if(priorityValue == "high"){
        colorPhrase = '<span style="height: 20px; width: 20px; background-color: red;"></span>';
    }
    else if(priorityValue == "medium"){
        colorPhrase = '<span style="height: 20px; width: 20px; background-color: orange;"></span>';
    }
    else{
        colorPhrase = '<span style="height: 20px; width: 20px; background-color: green;"></span>';
    }
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.justifyContent = "space-between";
    item.innerHTML = 
        '<input type="checkbox" name="done" id="done">'+
        '<h2 style="margin-right: auto; margin-left: 10px;">' + title + '</h2>'+
        '<div style="display: flex; align-items: center; gap: 10px;">'+
        colorPhrase +
        '<p>' + date + '</p>'+
        '<i class="fa-solid fa-circle-info"></i>'+
        '<i class="fa-regular fa-pen-to-square"></i>'+    
        '<i class="fa-solid fa-trash"></i>';

    body.appendChild(item);
}

