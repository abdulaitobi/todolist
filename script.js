var addItemButton = document.getElementById("add-item-button");
var addCategoryButton = document.getElementById("add-category-button");
var addItemModal = document.getElementById("add-item-modal");
var addCategoryModal = document.getElementById("add-category-modal");
var addItemModalCancel = document.getElementById("add-item-modal-cancel");
var addCategoryModalCancel = document.getElementById("add-category-modal-cancel");
var addItemModalSubmit = document.getElementById("add-item-modal-submit");
var addCategoryModalSubmit = document.getElementById("add-category-modal-submit");
var descriptionOptions = document.getElementById("description-options");
let body = document.getElementById("body");
var blanket = document.getElementById("blanket");
body.setAttribute("data-previous-content", body.innerHTML);
let sidebarItems = document.getElementById("sidebar-items")
let itemsArray = [];

addItemButton.addEventListener("click", function(){
    addItemModal.style.display = "grid";
    addCategoryModal.style.display = "none";
    blanket.style.display = "block"
})

addCategoryButton.addEventListener("click", function(){
    addCategoryModal.style.display = "grid";
    addItemModal.style.display = "none";
    blanket.style.display = "block"
})

addItemModalCancel.addEventListener("click", function(){
    addItemModal.style.display = "none";
    blanket.style.display = "none"
})

addCategoryModalCancel.addEventListener("click", function(){
    addCategoryModal.style.display = "none";
    blanket.style.display = "none"
})

addCategoryModalSubmit.addEventListener("click", function(){
    blanket.style.display = "none"
    let categoryName = document.getElementById("category-name").value;
    let category = document.createElement("span");
    category.textContent = categoryName;
    category.className = "sidebar-category"
    sidebarItems.appendChild(category);
    category.addEventListener("click", function () {
        displayCategory(this);
    })
    addCategoryModal.style.display = "none";
    document.getElementById('category-name').value = "";
    let categoryLabel = document.createElement("label");
    let categoryOption = document.createElement("input");
    categoryOption.type = "radio";
    categoryOption.name = "description";
    categoryOption.value = categoryName.toLowerCase();
    categoryLabel.appendChild(categoryOption);
    categoryLabel.insertAdjacentText('beforeend', categoryName);
    descriptionOptions.appendChild(categoryLabel);
})

addItemModalSubmit.addEventListener("click", function(){
    blanket.style.display = "none"
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

    let displayed = false;

    if(!title || !descriptionValue || !date || !priorityValue){
        alert("Fill in all info")
    }else {
        alert("Item added");
        displayItem(title,descriptionValue, date, priorityValue, displayed);
        document.getElementById("title").value = "";
        for (const description of descriptions) {
            description.checked = false;
        }
        document.getElementById("date").value = "";
        for (const priority of priorities) {
            priority.checked = false;
        }
        addItemModal.style.display = "none";
      }
})

function displayItem(title,descriptionValue, date, priorityValue, displayed){
    if(displayed === true){
        return;
    }
    else{
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
        itemsArray.push({ element: item, title, descriptionValue, date, priorityValue, displayed });

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

        let infoButton = item.querySelector(".fa-circle-info");
        infoButton.addEventListener("click", () => {
            displayInfo(title, descriptionValue, date, priorityValue);
        });
    }
}

function displayInfo(title, descriptionValue, date, priorityValue, displayed){
    let infoBox = document.createElement("div");
    infoBox.style.height = "fit-content";
    infoBox.style.width = "fit-content";
    infoBox.style.border = "1px solid black";
    infoBox.style.backgroundColor = "antiquewhite";
    infoBox.style.padding = "10px";
    infoBox.style.marginBottom = "10px";
    infoBox.style.position = 'absolute'
    infoBox.style.left = 'calc(50vw - 100px)';
    infoBox.style.top = 'calc(50vh - 100px)';
    infoBox.style.zIndex = "10000";
    infoBox.innerHTML = 
        '<h2 style="margin-right: auto; margin-left: 10px; margin-top: 0; margin-bottom: 0">' + title + '</h2>' +
        '<p> Description:  ' + descriptionValue + '</p>' +
        '<p> Priority: ' + priorityValue + '</p>' +
        '<p> Due Date: ' + date + '</p>' + 
        '<span class="cancel-btn-info">Cancel</span>';

    blanket.style.display = "block"
    addCategoryModal.style.display = "none";
    addItemModal.style.display = "none";
    body.appendChild(infoBox);

    let cancelInfoBtns = document.getElementsByClassName("cancel-btn-info")

    for(const cancelInfoBtn of cancelInfoBtns){
        cancelInfoBtn.addEventListener("click", function(){
            infoBox.style.display = "none"
            blanket.style.display = "none"
        })
    }
}

var sidebarCategories = document.getElementsByClassName("sidebar-category");
for (const sidebarCategory of sidebarCategories) {
    sidebarCategory.addEventListener("click", function () {
        displayCategory(this);
    })
}

var homeSidebar = document.getElementById("home-sidebar");
homeSidebar.addEventListener("click", function(){
    location.reload();
    itemsArray.forEach(item => {
        displayItem(item.title, item.descriptionValue, item.date, item.priorityValue, item.displayed);
        item.displayed = true;
    })
})

function displayCategory(element){
    let category = element.textContent.trim();
        let filteredItems = itemsArray.filter(item => item.descriptionValue.toLowerCase() === category.toLowerCase());
        if (filteredItems.length > 0) {
            body.innerHTML = "";
            filteredItems.forEach(item => {
                displayItem(item.title, item.descriptionValue, item.date, item.priorityValue, item.displayed);
                item.displayed = true;
            });
        } else {
            alert("You have no " + category + " items")
        }
};