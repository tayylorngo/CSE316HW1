'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"
import ToDoListItem from "../ToDoListItem.js";

// THIS TRANSACTION IS FOR DELETING AN ITEM IN A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, listId) {
        super();
        this.model = initModel;
        this.itemId = itemId;
        this.listId = listId;
    }

    doTransaction() {
        this.removedStuff = this.model.removeItem(new ToDoListItem(this.itemId), this.listId);
    }

    undoTransaction() {
        // console.log(this.removedStuff);
        this.model.addItemAtIndex(this.removedStuff[0], this.removedStuff[1], this.removedStuff[2]);
    }
}