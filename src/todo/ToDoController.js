'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        // OPENS DELETE LIST MODAL
        document.getElementById("delete-list-button").onmousedown = function() {
            document.getElementById("modal-overlay").style.display = "block";
        }
        // DELETES LIST AND CLOSES MODAL
        document.getElementById("confirmDeleteList-button").onmousedown = function(){
            appModel.removeCurrentList();
            document.getElementById("modal-overlay").style.display = "none";
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
            appModel.performTransaction();
        }
        document.getElementById("close-list-button").onmousedown = function(){
            appModel.closeList();
        }
    }
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }

    handleListNameChange(newListId, newName){
        this.model.changeListName(newListId, newName);
    }
}