var addItemButton = document.getElementById("add-item-button");
var addCategoryButton = document.getElementById("add-category-button");
var addItemModal = document.getElementById("add-item-modal");
var addCategoryModal = document.getElementById("add-category-modal");
var editItemModal = document.getElementById("edit-item-modal");
var addItemModalCancel = document.getElementById("add-item-modal-cancel");
var addCategoryModalCancel = document.getElementById("add-category-modal-cancel");
var editItemModalCancel = document.getElementById("edit-item-modal-cancel");
var addItemModalSubmit = document.getElementById("add-item-modal-submit");
var addCategoryModalSubmit = document.getElementById("add-category-modal-submit");
var editItemModalSubmit = document.getElementById("edit-item-modal-submit");
var descriptionOptions = document.getElementById("description-options");
let body = document.getElementById("body");
let bodySubdiv = document.getElementById("body-subdiv");
var blanket = document.getElementById("blanket");
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

editItemModalCancel.addEventListener("click", function(){
    editItemModal.style.display = "none";
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
    let itemObj = new Object();
    itemObj.id = itemsArray.length;
    itemObj.title = document.getElementById("add-item-title").value;

    let descriptions = document.getElementsByName("add-item-description");
    for (const description of descriptions) {
        if (description.checked) {
            itemObj.descriptionValue = description.value;
            break; 
        }
    }

    itemObj.date = document.getElementById("add-item-date").value;

    let priorities = document.getElementsByName("add-item-priority");
    for (const priority of priorities) {
        if (priority.checked) {
            itemObj.priorityValue = priority.value;
            break; 
        }
    }

    itemObj.displayed = false;
    itemObj.checked = false;

    if(!itemObj.title || !itemObj.descriptionValue || !itemObj.date || !itemObj.priorityValue){
        alert("Fill in all info")
    }else {
        itemsArray.push(itemObj);
        console.log(itemsArray);
        displayItem(itemObj.id, itemObj.title,itemObj.descriptionValue, itemObj.date, itemObj.priorityValue, itemObj.displayed, itemObj.checked);
        document.getElementById("add-item-title").value = "";
        for (const description of descriptions) {
            description.checked = false;
        }
        document.getElementById("add-item-date").value = "";
        for (const priority of priorities) {
            priority.checked = false;
        }
        addItemModal.style.display = "none";
    }
})

function displayItem(id,title,descriptionValue, date, priorityValue, displayed, checked){
    // if(displayed === true){
    //     return;
    // }
    //else{
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
    
        bodySubdiv.appendChild(item);
        if(checked === true){
            item.querySelectorAll(".item-property").forEach(itemProperty => {
                itemProperty.style.color = "grey";
            });
            item.querySelector("h2").style.textDecoration = "line-through";
        }

        let checkbox = item.querySelector(".done-checkbox");
        let itemProperties = item.querySelectorAll(".item-property");

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                itemProperties.forEach(itemProperty => itemProperty.style.color = "grey");
                item.querySelector("h2").style.textDecoration = "line-through";
                checked = true;
            } else {
                itemProperties.forEach(itemProperty => itemProperty.style.color = "black");
                item.querySelector("h2").style.textDecoration = "none";
            }
        });

        let infoButton = item.querySelector(".fa-circle-info");
        infoButton.addEventListener("click", () => {
            displayInfo(title, descriptionValue, date, priorityValue);
        });

        let editButton = item.querySelector(".fa-pen-to-square");
        editButton.addEventListener("click", () => {
            let targetItem;
            for (const target of itemsArray) {
                if (target.id === id) {
                    targetItem = target;
                    break;
                }
            }
            console.log(targetItem);
            editItemModal.style.display = "grid";
            blanket.style.display = "block";

            document.getElementById("edit-item-title").value = title || '';
            document.getElementById("edit-item-date").value = date || '';

            let editItemPriorities = document.getElementsByName("edit-item-priority");
            editItemPriorities.forEach(priority => {
                priority.checked = priority.value === priorityValue;
            });

            let editItemDescriptions = document.getElementsByName("edit-item-description");
            editItemDescriptions.forEach(description => {
                description.checked = description.value === descriptionValue;
            });
            console.log("before submit" + itemsArray);
            editItemModalSubmit.addEventListener("click", function(){
                let newTitle = document.getElementById("edit-item-title").value || title;
                let newDate = document.getElementById("edit-item-date").value || date;

                let newPriorityValue = '';
                for (const editItemPriority of editItemPriorities) {
                    if (editItemPriority.checked) {
                        newPriorityValue = editItemPriority.value;
                        break;
                    }
                }
                if (!newPriorityValue) newPriorityValue = priorityValue;

                let newDescriptionValue = '';
                for (const editItemDescription of editItemDescriptions) {
                    if (editItemDescription.checked) {
                        newDescriptionValue = editItemDescription.value;
                        break;
                    }
                }
                if (!newDescriptionValue) newDescriptionValue = descriptionValue;

                if(!newTitle && !newPriorityValue && newDate && !newDescriptionValue){
                    alert("Fill in at least one info")
                }
                else{
                    editItem(targetItem, newTitle, newDescriptionValue, newDate, newPriorityValue);
                    displayAllItems();
                    console.log("after submit" , itemsArray);
                }
                editItemModal.style.display = "none";
                blanket.style.display = "none";
            });
        });
    }
//}

function displayInfo(title, descriptionValue, date, priorityValue){
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
    bodySubdiv.appendChild(infoBox);

    let cancelInfoBtns = document.getElementsByClassName("cancel-btn-info")

    for(const cancelInfoBtn of cancelInfoBtns){
        cancelInfoBtn.addEventListener("click", function(){
            infoBox.style.display = "none"
            blanket.style.display = "none"
        })
    }
}

function displayAllItems(){
    console.log("display all items");
    bodySubdiv.innerHTML = "";
    addItemButton.style.display = "flex";
    itemsArray.forEach(item => {
        //if(!item.displayed){
            // const checkbox = item.element.querySelector(".done-checkbox");
            // item.checked = checkbox.checked;

            displayItem(item.id, item.title, item.descriptionValue, item.date, item.priorityValue, item.displayed, item.checked);
            //item.displayed = true;

            // if(item.checked){
            //     checkbox.checked = true; // Sync the DOM checkbox state
            //     item.element.querySelectorAll(".item-property").forEach(itemProperty => {
            //         itemProperty.style.color = "grey";
            //     });
            //     item.element.querySelector("h2").style.textDecoration = "line-through";
            // }
        //}
    });
}

function editItem(targetItem,newTitle,newDescriptionValue, newDate, newPriorityValue){
    if (newTitle) targetItem.title = newTitle || "";
    if (newDate) targetItem.date = newDate;
    if (newPriorityValue) targetItem.priorityValue = newPriorityValue;
    if (newDescriptionValue) targetItem.descriptionValue = newDescriptionValue;

    // Update the DOM element
    // const itemElement = targetItem.element;
    // if (newTitle) {
    //     const titleElement = itemElement.querySelector("h2");
    //     titleElement.textContent = newTitle;
    // }
    // if (newDate) {
    //     const dateElement = itemElement.querySelector(".item-property:nth-child(2)");
    //     if (dateElement) {
    //         dateElement.textContent = newDate;
    //     }
    //     console.log(newDate);
    // }

    // if (newPriorityValue) {
    //     const color =
    //     newPriorityValue === "high" ? "red" :
    //     newPriorityValue === "medium" ? "orange" : "green";
    //     const priorityElement = itemElement.querySelector("span");
    //     if (priorityElement) {
    //         priorityElement.style.backgroundColor = color;
    //     }
    // }
}

var sidebarCategories = document.getElementsByClassName("sidebar-category");
for (const sidebarCategory of sidebarCategories) {
    sidebarCategory.addEventListener("click", function () {
        displayCategory(this);
    })
}

var homeSidebar = document.getElementById("home-sidebar");
homeSidebar.addEventListener("click", function(){
    displayAllItems();
})

function displayCategory(element){
    let category = element.textContent.trim();
    let filteredItems = itemsArray.filter(item => item.descriptionValue.toLowerCase() === category.toLowerCase());
    if (filteredItems.length > 0) {
        bodySubdiv.innerHTML = "";
        addItemButton.style.display = "none";
        filteredItems.forEach(item => {
            //if(!item.displayed){
                // const checkbox = item.element.querySelector(".done-checkbox");
                // item.checked = checkbox.checked;

                displayItem(item.id, item.title, item.descriptionValue, item.date, item.priorityValue, item.displayed, item.checked);
                //item.displayed = true;

                // if(item.checked){
                //     checkbox.checked = true; // Sync the DOM checkbox state
                //     item.element.querySelectorAll(".item-property").forEach(itemProperty => {
                //         itemProperty.style.color = "grey";
                //     });
                //     item.element.querySelector("h2").style.textDecoration = "line-through";
                // }
            //}
        });
    } else {
        alert("You have no " + category + " items")
    }
};