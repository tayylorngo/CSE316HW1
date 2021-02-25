'use strict'

/**
 * ToDoList.js
 * 
 * This class represents a list with all the items in our todo list.
 * 
 * @author McKilla Gorilla
 */
export default class ToDoList {
    /**
     * The constructor creates a default, empty list.
     */
    constructor(initId) {
        this.id = initId;
        this.name = "Unknown";
        this.items = [];
    }   
    
    // GETTER/SETTER METHODS

    setName(initName) {
        this.name = initName;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    /**
     * Adds an item to the end of the list.
     * 
     * @param {TodoListItem} itemToAdd Item to add to the list.
     */
    addItem(itemToAdd) {
        this.items.push(itemToAdd);
    }

    /**
     * 
     * @author Taylor Ngo
     */
    addItemAtIndex(item, index){
        this.items.splice(index, 0, item);
    }

    /**
     * Finds and then removes the argument from the list.
     * 
     * @param {TodoListItem} itemToRemove Item to remove from the list.
     */
    removeItem(itemToRemove) {
        let indexOfItem = -1;
        for (let i = 0; (i < this.items.length) && (indexOfItem < 0); i++) {
            if (this.items[i].id === Number(itemToRemove.id)) {
                indexOfItem = i;
            }
        }
        let removedItem = this.items[indexOfItem];
        this.items.splice(indexOfItem, 1);
        return [removedItem, indexOfItem, this.id];
    }

    /**
     * Finds the index of the argument in the list.
     * 
     * @param {TodoListItem} item Item to search for in the list.
     */
    getIndexOfItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            let testItem = this.items[i];
            if (testItem === item) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Gets and returns the item at the index location.
     * 
     * @param {Number} index Location in the list of item to return.
     */
    getItemAtIndex(index) {
        return this.items[index];
    }

    /**
     * Moves the item up with a certain id
     * @author Taylor Ngo
     */
    moveItemUp(itemId){
        let index = -1;
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].id === Number(itemId)){
                index = i;
                break;
            }
        }
        let tempItem = this.items[index - 1];
        this.items[index - 1] = this.items[index];
        this.items[index] = tempItem;
    }

    /**
     * Moves the item down with a certain id
     * @author Taylor Ngo
     */
    moveItemDown(itemId){
        let index = -1;
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].id === Number(itemId)){
                index = i;
                break;
            }
        }
        let tempItem = this.items[index + 1];
        this.items[index + 1] = this.items[index];
        this.items[index] = tempItem;
    }

    /**
     * Edits an item name with a certain id
     * @param {} itemId 
     * @param {*} newName 
     * @author Taylor Ngo
     */
    editItemName(itemId, newName){
        let oldName;
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].id === Number(itemId)){
                oldName = this.items[i].description;
                this.items[i].setDescription(newName);
                break;
            }
        }
        return oldName;
    }
}