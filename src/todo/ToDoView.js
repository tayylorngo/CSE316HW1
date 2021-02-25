'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");

        // CREATES LIST NAME TEXT
        let listNameText = document.createElement("h4");
        listNameText.setAttribute("class", "listTextName");
        listNameText.setAttribute("id", "todo-list-text-" + newList.id);

        // listElement.appendChild(document.createTextNode(newList.name));

        // CREATES FORM TO CHANGE LIST NAME
        let listNameChangeInput = document.createElement("input");
        listNameChangeInput.setAttribute("id", "todo-list-text-form-" + newList.id);
        listNameChangeInput.style.display = "none";

        listNameText.appendChild(document.createTextNode(newList.name));
        listElement.appendChild(listNameText);
        listElement.appendChild(listNameChangeInput);
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onclick = event => {
            if(event.detail === 1){
                thisController.handleLoadList(newList.id);
                document.getElementById(newListId).style.color = "#ffc800";
            }
            else if(event.detail === 2){
                listNameText.style.display = "none";
                listNameChangeInput.style.display = "block";
                listNameChangeInput.value = listNameText.innerHTML;
                listNameChangeInput.focus();
                listNameChangeInput.onblur = function(){
                    thisController.handleListNameChange(newList.id, listNameChangeInput.value);
                    listNameText.style.display = "block";
                    listNameChangeInput.style.display = "none";
                }
            }
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        // DISABLES DELETE LIST BUTTON WHEN LIST IS CLOSED
        this.disableListItems();
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                + "<div class='task-col'> <h4 class='listItemName' id='list-item-name-" + listItem.id + "'>" + listItem.description + "</h4></div>"
                                + "<div class='due-date-col'> <h4 class='listItemDate'>" + listItem.dueDate + "</h4></div>"
                                + "<div class='status-col'> <h4 class='listItemStatus'>" + listItem.status + "</h4></div>"
                                + "<div class='list-controls-col'>"
                                + " <div class='list-item-control material-icons moveItemUpButton'>keyboard_arrow_up</div>"
                                + " <div class='list-item-control material-icons moveItemDownButton'>keyboard_arrow_down</div>"
                                + " <div class='list-item-control material-icons deleteItemButton'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            itemsListDiv.innerHTML += listItemElement;

            // CREATES EDIT NAME FORM
            let listNameChangeInput = document.createElement("input");
            listNameChangeInput.setAttribute("class", "itemNameChangeForm");
            listNameChangeInput.setAttribute("id", "todo-list-itemName-form-" + listItem.id);
            listNameChangeInput.style.display = "none";
            document.getElementById("todo-list-item-" + listItem.id).children[0].appendChild(listNameChangeInput);

            // CREATES EDIT DATE FORM
            let dateChangeInput = document.createElement("input");
            dateChangeInput.setAttribute("class", "itemDateChangeForm");
            dateChangeInput.setAttribute("id", "todo-list-itemDate-form-" + listItem.id);
            dateChangeInput.setAttribute("type", "date");
            dateChangeInput.style.display = "none";
            document.getElementById("todo-list-item-" + listItem.id).children[1].appendChild(dateChangeInput);

            // CREATES COMPLETE/INCOMPLETE FORM
            let completionForm = document.createElement("select");
            completionForm.setAttribute("class", "itemCompletionForm");
            completionForm.setAttribute("id", "todo-list-itemCompletion-form-" + listItem.id);
            let option1 = document.createElement("option");
            option1.setAttribute("value", "complete");
            option1.innerHTML = option1.value;
            let option2 = document.createElement("option");
            option2.setAttribute("value", "incomplete");
            option2.innerHTML = option2.value;
            completionForm.appendChild(option1);            
            completionForm.appendChild(option2);
            completionForm.style.display = "none";
            document.getElementById("todo-list-item-" + listItem.id).children[2].appendChild(completionForm);
        }
        // CHANGES COLOR OF THE COMPLETE/INCOMPLETE ITEMS
        const status = document.getElementsByClassName("listItemStatus");
        for(let i = 0; i < status.length; i++){
            if(status[i].innerHTML === "complete"){
               status[i].style.color = "#8ed4f8";     
            }
            else if(status[i].innerHTML === "incomplete"){
                status[i].style.color = "#f5bc75";     
            }
        }
        this.enableListItems();
    }

    /**
     * @author Taylor Ngo
     * Disables the list items for current list
     */
    disableListItems(){
        const listItems = document.getElementsByClassName("list-item-control");
        for(let i = 0; i < listItems.length; i++){
            listItems[i].style.pointerEvents = "none";
            listItems[i].style.color = "#322d2d";
        }
    }

    /**
     * @author Taylor Ngo
     * Enables the list items for current list
     */
    enableListItems(){
        const listItems = document.getElementsByClassName("list-item-control");
        for(let i = 0; i < listItems.length; i++){
            listItems[i].style.pointerEvents = "auto";
            listItems[i].style.color = "white";
        }
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }

    /**
     * Disables the add new list button
     * @author Taylor Ngo
     */
    disableAddListButton(){
        const addListButton = document.getElementById("add-list-button");
        addListButton.style.pointerEvents = "none";
        addListButton.style.color = "#322d2d";
    }

    /**
     * Enables the add new list button
     * @author Taylor Ngo
     */
    enableAddListButton(){
        const addListButton = document.getElementById("add-list-button");
        addListButton.style.pointerEvents = "auto";
        addListButton.style.color = "#e9edf0";
    }

    /**
     * Disables the undo button
     * @author Taylor Ngo
     */
    disableUndoButton(){
        const undoButton = document.getElementById("undo-button");
        undoButton.style.pointerEvents = "none";
        undoButton.style.color = "#322d2d";
    }

    /**
     * Enables the undo button
     * @author Taylor
     */
    enableUndoButton(){
        const undoButton = document.getElementById("undo-button");
        undoButton.style.pointerEvents = "auto";
        undoButton.style.color = "#e9edf0";
    }

        /**
     * Disables the redo button
     * @author Taylor Ngo
     */
    disableRedoButton(){
        const undoButton = document.getElementById("redo-button");
        undoButton.style.pointerEvents = "none";
        undoButton.style.color = "#322d2d";
    }

    /**
     * Enables the redo button
     * @author Taylor
     */
    enableRedoButton(){
        const undoButton = document.getElementById("redo-button");
        undoButton.style.pointerEvents = "auto";
        undoButton.style.color = "#e9edf0";
    }

    /**
     * Disables both redo and undo buttons
     * @author Taylor Ngo
     */
    disableRedoAndUndoButton(){
        this.disableRedoButton();
        this.disableUndoButton();
    }
}