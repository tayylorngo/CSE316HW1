'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveItemUp_Transaction extends jsTPS_Transaction {
    constructor(initModel, itemId) {
        super();
        this.model = initModel;
        this.itemId = itemId;
    }

    doTransaction() {
        this.model.moveItemUp(this.itemId);
    }

    undoTransaction() {
        this.model.moveItemDown(this.itemId);
    }
}