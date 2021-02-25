'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class EditItemDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId, newDate) {
        super();
        this.model = initModel;
        this.itemId = itemId;
        this.newDate = newDate;
    }

    doTransaction() {
        this.oldDate = this.model.editItemDate(this.itemId, this.newDate);
    }

    undoTransaction() {
        this.model.editItemDate(this.itemId, this.oldDate);
    }
}