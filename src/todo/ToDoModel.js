'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction.js'

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
        this.enableDeleteItemButtons();
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
        this.enableDeleteItemButtons();
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

    deleteItemTransaction(itemId, listId){
        let transaction = new DeleteItem_Transaction(this, itemId, listId);
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
            this.enableDeleteItemButtons();
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
        this.enableDeleteItemButtons();
        return removedStuff;
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
                this.deleteItemTransaction(itemId, this.currentList.id);
                this.performTransaction();
                }
        }
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