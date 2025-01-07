var addButton = document.getElementById("add-button");
var addModal = document.getElementById("add-modal");
var addModalCancel = document.getElementById("add-modal-cancel");
var addModalSubmit = document.getElementById("add-modal-submit");
let body = document.getElementById("body");
let itemsArray = [];
let displayedItems = {};

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
        displayItem(title,descriptionValue, date, priorityValue);
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

function displayItem(title,descriptionValue, date, priorityValue){
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
    item.style.border = "1px solid black";
    item.style.backgroundColor = "antiquewhite";
    item.style.padding = "10px";
    item.style.marginBottom = "10px";
    item.innerHTML =
        '<input type="checkbox" class="done-checkbox">' +
        '<h2 class="item-property" style="margin-right: auto; margin-left: 10px; margin-top: 0; margin-bottom: 0">' + title + '</h2>' +
        '<div style="display: flex; align-items: center; gap: 10px;">' +
        colorPhrase +
        '<p class="item-property">' + date + '</p>' +
        '<i class="fa-solid fa-circle-info item-property"></i>' +
        '<i class="fa-regular fa-pen-to-square item-property"></i>' +
        '<i class="fa-solid fa-trash item-property"></i>' +
        '</div>';

    body.appendChild(item);

    itemsArray.push({ element: item, title, descriptionValue, date, priorityValue });

    let checkbox = item.querySelector(".done-checkbox");
    let itemProperties = item.querySelectorAll(".item-property");

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            itemProperties.forEach(itemProperty => itemProperty.style.color = "grey");
            item.querySelector("h2").style.textDecoration = "line-through";
        } else {
            itemProperties.forEach(itemProperty => itemProperty.style.color = "black");
            item.querySelector("h2").style.textDecoration = "none";
        }
    });
}

var sidebarCategories = document.getElementsByClassName("sidebar-category");
for (const sidebarCategory of sidebarCategories) {
    sidebarCategory.addEventListener("click", function () {
        let category = this.textContent.trim();
        if (displayedItems[category]) {
            return; 
        }

        let filteredItems = itemsArray.filter(item => item.descriptionValue.toLowerCase() === category.toLowerCase());
        if (filteredItems.length > 0) {
            body.innerHTML = "";
            filteredItems.forEach(item => {
                displayItem(item.title, item.descriptionValue, item.date, item.priorityValue);
            });
            displayedItems[category] = true;
        } else {
            alert("You have no " + category + " items")
        }
    });
}