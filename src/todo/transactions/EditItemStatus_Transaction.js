'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditItemStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, newStatus) {
        super();
        this.model = initModel;
        this.itemId = itemId;
        this.newStatus = newStatus;
    }

    doTransaction() {
        this.oldStatus = this.model.editItemStatus(this.itemId, this.newStatus);
    }

    undoTransaction() {
        this.model.editItemStatus(this.itemId, this.oldStatus);
    }
}