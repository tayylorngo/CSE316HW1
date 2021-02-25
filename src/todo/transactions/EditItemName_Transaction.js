'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditItemName_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, newName) {
        super();
        this.model = initModel;
        this.itemId = itemId;
        this.newName = newName;
    }

    doTransaction() {
        this.oldName = this.model.editItemName(this.itemId, this.newName);
    }

    undoTransaction() {
        this.model.editItemName(this.itemId, this.oldName);
    }
}