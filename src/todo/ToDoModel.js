'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction.js'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction.js'
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction.js'
import EditItemName_Transaction from './transactions/EditItemName_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }

    /**
     * @author Taylor Ngo
     * 
     * @param {} item 
     * @param {*} index 
     * 
     * Adds item at specific index to a certain list
     */
    addItemAtIndex(item, index){
        // for(let i = 0; i < this.toDoLists.length; i++){
        //     if(id === this.toDoLists[i].id){
                this.currentList.addItemAtIndex(item, index);
        //     }
        // }
        // this.toDoLists[id].addItemAtIndex(item, index);
        this.view.viewList(this.currentList);
        this.enableItemControls();
    }

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        this.enableItemControls();
        return newItem;
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Delete an item in the list
     * 
     * @param {} itemId  The item id to delete
     * @author Taylor Ngo
     */
    deleteItemTransaction(itemId){
        let transaction = new DeleteItem_Transaction(this, itemId);
        this.tps.addTransaction(transaction);
    } 

    /**
     * Moves an item up in the list
     * @param {} itemId The item id to move up
     * @author Taylor Ngo
     */
    moveItemUpTransaction(itemId){
        let transaction = new MoveItemUp_Transaction(this, itemId);
        this.tps.addTransaction(transaction);
    }

    /**
     * Moves an item down in the list
     * @param {*} itemId The item id to move down
     * @author Taylor Ngo
     */
    moveItemDownTransaction(itemId){
        let transaction = new MoveItemDown_Transaction(this, itemId);
        this.tps.addTransaction(transaction);
    }

    /**
     * Edits an item's name
     * 
     * @param {*} itemId  the item id to change name
     * @author Taylor Ngo
     */
    editItemNameTransaction(itemId, newName){
        let transaction = new EditItemName_Transaction(this, itemId, newName);
        this.tps.addTransaction(transaction);
    }


    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        this.moveListToFront(listId);
        this.view.refreshLists(this.toDoLists);
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
            this.enableItemControls();
        }
        this.tps.clearAllTransactions();
        this.view.disableAddListButton();
        this.view.disableRedoAndUndoButton();
    }

    /**
     * @author Taylor Ngo
     * Moves the current list to the front
     */
    moveListToFront(listId){
        let listIndex = -1;
        for(let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++){
            if(this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if(listIndex >= 0){
            let tempList = this.toDoLists[listIndex];
            this.toDoLists[listIndex] = null;
            for(let i = listIndex; i > 0; i--){
                this.toDoLists[i] = this.toDoLists[i - 1]; 
            }
            this.toDoLists[0] = tempList;
        }
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
        this.performTransaction();
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Remove the itemToRemove from a certain list and refresh.
     * @author Taylor Ngo
     */
    removeItemFromList(itemToRemove) {
        let removedStuff = [];
        removedStuff = this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
        this.enableItemControls();
        return removedStuff;
    }

    /**
     * Moves the item up
     * @param {} itemId 
     * @author Taylor Ngo
     */
    moveItemUp(itemId){
        this.currentList.moveItemUp(itemId);
        this.view.viewList(this.currentList);
        this.enableItemControls();
    }

    /**
     * Moves the item down
     * @param {} itemId 
     * @author Taylor Ngo
     */
    moveItemDown(itemId){
        this.currentList.moveItemDown(itemId);
        this.view.viewList(this.currentList);
        this.enableItemControls();
    }

    /**
     * Edits an item's name
     * @param {} itemId the item id
     * @param {*} newName the new name to set to
     * @author Taylor Ngo
     */
    editItemName(itemId, newName){
        let oldName = this.currentList.editItemName(itemId, newName);
        this.view.viewList(this.currentList);
        this.enableItemControls();
        return oldName;
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
        this.performTransaction();
    }
    
    /**
     * @author Taylor Ngo
     * Closes the current open list
     */
    closeList(){
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
        this.view.enableAddListButton();
    }

    /**
     * Changes list name
     * @param {*} listId the list id to change
     * @param {*} newName the new name to change to
     */
    changeListName(listId, newName){
        for(let i = 0; i < this.toDoLists.length; i++){
            if(this.toDoLists[i].id === Number(listId)){
                this.toDoLists[i].setName(newName);
                break;
            }
        }
        this.view.refreshLists(this.toDoLists);
    }

    /**
     * Gives onmousedown function to the delete item buttons
     * 
     * @author Taylor Ngo
     */
    enableDeleteItemButtons(){
        const deleteButtons = document.getElementsByClassName("deleteItemButton");
        for(let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].onmousedown = () => {
                let itemId = deleteButtons[i].parentNode.parentNode.id;
                itemId = itemId.substring(15);
                this.deleteItemTransaction(itemId);
                this.performTransaction();
            }
        }
    }

    /**
     * Gives onmousedown function to the moveup item buttons
     * @author Taylor Ngo
     */
    enableMoveItemUpButtons(){
        const moveItemUpButtons = document.getElementsByClassName("moveItemUpButton");
        moveItemUpButtons[0].style.color = "#353a44";
        for(let i = 1; i < moveItemUpButtons.length; i++){
            moveItemUpButtons[i].onmousedown = () => {
                let itemId = moveItemUpButtons[i].parentNode.parentNode.id;
                itemId = itemId.substring(15);
                this.moveItemUpTransaction(itemId);
                this.performTransaction();
            }
        }
    }

    /**
     * Gives onmousedown function to the movedown item buttons
     * @author Taylor Ngo
     */
    enableMoveItemDownButtons(){
        const moveItemDownButtons = document.getElementsByClassName("moveItemDownButton");
        moveItemDownButtons[moveItemDownButtons.length - 1].style.color = "#353a44";
        for(let i = 0; i < moveItemDownButtons.length - 1; i++){
            moveItemDownButtons[i].onmousedown = () => {
                let itemId = moveItemDownButtons[i].parentNode.parentNode.id;
                itemId = itemId.substring(15);
                this.moveItemDownTransaction(itemId);
                this.performTransaction();
            }
        }
    }

    /**
     * Sets up the name change form
     * @author Taylor Ngo
     */
    setUpNameChangeForm(){
        let itemNameTexts = document.getElementsByClassName("listItemName");
        for(let i = 0; i < itemNameTexts.length; i++){
            itemNameTexts[i].onclick = () => {
                itemNameTexts[i].style.display = "none";
                let itemId = itemNameTexts[i].parentNode.parentNode.id;
                itemId = itemId.substring(15);
                let itemNameForm = document.getElementById("todo-list-itemName-form-" + itemId);
                itemNameForm.value = itemNameTexts[i].innerHTML;
                itemNameForm.style.display = "block";
                itemNameForm.focus();
                itemNameForm.onblur = () => {
                    itemNameTexts[i].style.display = "block";
                    itemNameForm.style.display = "none";
                    this.editItemNameTransaction(itemId, itemNameForm.value);
                    this.performTransaction();
                }
            }
        }
    }

    /**
     * Enable all item controls
     * @author Taylor Ngo
     * 
     */
    enableItemControls(){
        this.enableMoveItemUpButtons();
        this.enableMoveItemDownButtons();
        this.enableDeleteItemButtons();
        this.setUpNameChangeForm();
    }

    /**
     * Checks whether there are transactions
     * and enables the undo/redo buttons accordingly
     * 
     * @author Taylor Ngo
     */
    performTransaction(){
        if(this.tps.hasTransactionToRedo()){
            this.view.enableRedoButton();
        }
        else{
            this.view.disableRedoButton();
        }
        if(this.tps.hasTransactionToUndo()){
            this.view.enableUndoButton();
        }
        else{
            this.view.disableUndoButton();
        }
    }
}