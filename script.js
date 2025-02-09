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
let itemsArray = JSON.parse(localStorage.getItem('items')) || []; // Array of items
let nextId = parseInt(localStorage.getItem('nextId')) || 1; // Next ID to assign to a new item
let categoriesArray = JSON.parse(localStorage.getItem('categories')) || []; // Array of categories
const PROTECTED_CATEGORIES = ['gym', 'school', 'work']; // These categories cannot be deleted

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
    blanket.style.display = "none";
    let categoryName = document.getElementById("category-name").value;
    
    if (!categoryName) {
        alert("Please enter a category name");
        return;
    }

    // Check for duplicate categories (case insensitive)
    if (categoriesArray.some(cat => cat.toLowerCase() === categoryName.toLowerCase()) || 
        PROTECTED_CATEGORIES.includes(categoryName.toLowerCase())) {
        alert("This category already exists");
        return;
    }

    // Add to categories array and save
    categoriesArray.push(categoryName);
    saveCategories();

    // Create category elements
    createCategoryElements(categoryName);

    // Clear and close modal
    addCategoryModal.style.display = "none";
    document.getElementById('category-name').value = "";
});

addItemModalSubmit.addEventListener("click", function(){
    let itemObj = new Object(); 
    itemObj.id = nextId++;
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

    itemObj.checked = false;

    if(!itemObj.title || !itemObj.descriptionValue || !itemObj.date || !itemObj.priorityValue){
        alert("Fill in all info")
    }else {
        blanket.style.display = "none"
        itemsArray.push(itemObj);
        saveToLocalStorage();   
        displayItem(itemObj);
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
});

var sidebarCategories = document.getElementsByClassName("sidebar-category");
for (const sidebarCategory of sidebarCategories) {
    sidebarCategory.addEventListener("click", function () {
        displayCategory(this);
    })
}

var homeSidebar = document.getElementById("home-sidebar");
homeSidebar.addEventListener("click", function(){
    displayAllItems();
});

function createCategoryElements(categoryName){
    // Create sidebar category
    let category = document.createElement("span");
    category.textContent = categoryName;
    category.className = "sidebar-category";
    sidebarItems.appendChild(category);
    category.addEventListener("click", function () {
        displayCategory(this);
    });

    // Create delete button for non-default categories
    if (!PROTECTED_CATEGORIES.includes(categoryName.toLowerCase())) {
        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = ' <i class="fa-solid fa-1x fa-trash"></i>';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent category click event
            if (confirm(`Delete category "${categoryName}"?`)) {
                deleteCategory(categoryName);
            }
        };
        category.appendChild(deleteBtn);
    }

    // Create category radio option
    let categoryLabel = document.createElement("label");
    let categoryOption = document.createElement("input");
    categoryOption.type = "radio";
    categoryOption.name = "description";
    categoryOption.value = categoryName.toLowerCase();
    categoryLabel.appendChild(categoryOption);
    categoryLabel.insertAdjacentText('beforeend', categoryName);
    descriptionOptions.appendChild(categoryLabel);
}

function displayItem(itemObj){
    let item = document.createElement("div");
    item.dataset.itemId = itemObj.id;  // Store the ID in the DOM element
    
    let colorPhrase = '';
    if(itemObj.priorityValue == "high"){
        colorPhrase = '<span style="height: 20px; width: 20px; background-color: red;"></span>';
    }
    else if(itemObj.priorityValue == "medium"){
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
        '<h2 class="item-property" style="margin-right: auto; margin-left: 10px; margin-top: 0; margin-bottom: 0">' + itemObj.title + '</h2>' +
        '<div style="display: flex; align-items: center; gap: 10px;">' + colorPhrase +
        '<p class="item-property">' + itemObj.date + '</p>' +
        '<i class="fa-solid fa-circle-info item-property"></i>' +
        '<i class="fa-regular fa-pen-to-square item-property"></i>' +
        '<i class="fa-solid fa-trash item-property"></i>' +
        '</div>';

    bodySubdiv.appendChild(item);
    
    if(itemObj.checked === true){
        item.querySelectorAll(".item-property").forEach(itemProperty => {
            itemProperty.style.color = "grey";
        });
        item.querySelector("h2").style.textDecoration = "line-through";
    }

    let checkbox = item.querySelector(".done-checkbox");
    checkbox.checked = itemObj.checked;
    let itemProperties = item.querySelectorAll(".item-property");

    checkbox.addEventListener("change", function () {
        itemObj.checked = checkbox.checked;
        if (checkbox.checked) {
            itemProperties.forEach(itemProperty => itemProperty.style.color = "grey");
            item.querySelector("h2").style.textDecoration = "line-through";
        } else {
            itemProperties.forEach(itemProperty => itemProperty.style.color = "black");
            item.querySelector("h2").style.textDecoration = "none";
        }
        saveToLocalStorage();
    });

    let infoButton = item.querySelector(".fa-circle-info");
    infoButton.addEventListener("click", () => {
        displayInfo(itemObj.title, itemObj.descriptionValue, itemObj.date, itemObj.priorityValue);
    });

    let editButton = item.querySelector(".fa-pen-to-square");
    editButton.addEventListener("click", () => {
        editItemModal.style.display = "grid";
        blanket.style.display = "block";
        document.getElementById("edit-item-title").value = itemObj.title || '';
        document.getElementById("edit-item-date").value = itemObj.date || '';

        let editItemPriorities = document.getElementsByName("edit-item-priority");
        editItemPriorities.forEach(priority => {
            priority.checked = priority.value === itemObj.priorityValue;
        });

        let editItemDescriptions = document.getElementsByName("edit-item-description");
        editItemDescriptions.forEach(description => {
            description.checked = description.value === itemObj.descriptionValue;
        });
        
        editItemModalSubmit.onclick = () => editItem(itemObj);
    });

    let deleteButton = item.querySelector(".fa-trash");
    deleteButton.addEventListener("click", () => {
        deleteItem(itemObj.id);
        item.remove();  // Remove the item from DOM immediately
    });
}

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
        displayItem(item);
    });
}

function displayCategory(element){
    let category = element.textContent.trim();
    category = category.replace('<i class="fa-solid fa-1x fa-trash"></i>', '').trim();
    let filteredItems = itemsArray.filter(item => item.descriptionValue.toLowerCase() === category.toLowerCase());
    if (filteredItems.length > 0) {
        bodySubdiv.innerHTML = "";
        addItemButton.style.display = "none";
        filteredItems.forEach(item => {
            displayItem(item);         
        });
    } else {
        alert("You have no " + category + " items");
        if (!PROTECTED_CATEGORIES.includes(category.toLowerCase()) && 
            confirm(`Delete empty category "${category}"?`)) {
            deleteCategory(category);
        }
    }
};

function deleteItem(id){
    let targetIndex = itemsArray.findIndex(item => item.id === id);
    if (targetIndex !== -1) { 
        itemsArray.splice(targetIndex, 1);
        saveToLocalStorage();
    }
}

function deleteCategory(categoryName) {
    if (PROTECTED_CATEGORIES.includes(categoryName.toLowerCase())) {
        alert("This category cannot be deleted");
        return;
    }
    // Remove from arrays
    categoriesArray = categoriesArray.filter(cat => cat !== categoryName);
    itemsArray = itemsArray.filter(item => item.descriptionValue.toLowerCase() !== categoryName.toLowerCase());
    
    // Save changes
    saveCategories();
    saveToLocalStorage();
    
    // Refresh display
    location.reload(); 
}

function saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(itemsArray));
    localStorage.setItem('nextId', nextId.toString());
    saveCategories();
}

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categoriesArray));
}

function loadCategories() {
    categoriesArray.forEach(categoryName => {
        createCategoryElements(categoryName);
    });
}

function editItem(targetItem){
    console.log("targetItem", targetItem);
    let newTitle = document.getElementById("edit-item-title").value || targetItem.title;
    let newDate = document.getElementById("edit-item-date").value || targetItem.date;

    let editItemPriorities = document.getElementsByName("edit-item-priority");
    let newPriorityValue = '';
    for (const editItemPriority of editItemPriorities) {
        if (editItemPriority.checked) {
            newPriorityValue = editItemPriority.value;
            break;
        }
    }
    if (!newPriorityValue) newPriorityValue = targetItem.priorityValue;

    let editItemDescriptions = document.getElementsByName("edit-item-description");
    let newDescriptionValue = '';
    for (const editItemDescription of editItemDescriptions) {
        if (editItemDescription.checked) {
            newDescriptionValue = editItemDescription.value;
            break;
        }
    }
    if (!newDescriptionValue) newDescriptionValue = targetItem.descriptionValue;

    if(!newTitle && !newPriorityValue && !newDate && !newDescriptionValue){
        alert("Fill in at least one info")
    }
    else{
        if (!targetItem) {
            console.error("Error: targetItem is undefined or null");
            return;
        }
        if (newTitle) targetItem.title = newTitle;
        if (newDate) targetItem.date = newDate;
        if (newPriorityValue) targetItem.priorityValue = newPriorityValue;
        if (newDescriptionValue) targetItem.descriptionValue = newDescriptionValue;
        saveToLocalStorage();
        displayAllItems();
    }
    editItemModal.style.display = "none";
    blanket.style.display = "none";
}

window.addEventListener('load', function() {
    displayAllItems();
    loadCategories();
    addCategoryDeleteButtons();
});