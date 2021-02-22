The Todo Tracker App - Required Functionality
Learn how all the code I have provided you works before getting started. This is essential for software engineering. Going in using guesswork to make changes is no way to build high quality software. You need to map out all the pieces in your mind so that you know where to do your own code editing. To complete this application, do the following:

Selected List on Top - currently when the user selects a todo list it loads that todo list into the workspace, in addition your program should promote your list to the top of the list of lists. This way the most recently used lists are always on top. Note, the provided example does not currently do this. In addition, make sure as more and more lists are added that the user can scroll down to access them all (this the example does properly).

Delete List Confirmation - should the user ask to delete a list your program should open up a modal (i.e. a dialog, which should simply be another div) and verify that the user really wants to delete the list. This should work as it does in the provided example.

List Editing - your application must provide the following functionality for editing an existing list:
List Item Data Editing - currently the fields for a list item are just plain text but instead should employ controls to allow for editing:
Task - should employ an editable text control.
Due Date - should employ an HTML date selection control, just like in the example.
Status - should employ a drop down list with two choices: complete and incomplete.
Undo/Redo - note that all edits of a todo list that can be done should be undoable and redoable. Note that you should employ the jsTPS library for doing so as it will manage the transaction stack. Note that you should reset the transaction stack whenever a new todo list is created or editing meaning as soon as editing on a new list is started. This means undo/redo should work for:
Adding a new Item (already working)
Changing the Task Text
Changing the Due Date
Changing the Status
Move an Item up
Move an Item down
Delete an item

Foolproof Design - it is important that you don't tempt users with features that are not usable. So, controls that are not usable should be either absent or visibly (i.e. greyed out) and functionally disabled:
Add List Button - if a list is in the process of being edited this button should be visibly and functionally disabled and only enabled if the edited list is first closed. Note that the provided example app does not work this way.
Undo/Redo Buttons - if there are no transactions to Undo, this button should be visibly and functionally disabled, the same goes for the Redo button. Note our example application does not do this.
List Controls - if a list is not loaded for editing the Add New Item, Trash List, and Close List buttons should be absent as shown in our example Todo Tracker.
Move Up/Down Buttons - for the top list item, the move up button should be visibly/functionally disabled. The same is true for the bottom list item's move down button

Layout and Style - note that the provided code base has much of the same style as the example, but you'll need to do additional things:
Highlight Current List - the list that is currently being edited should be at the top of the list. In addition, while being edited it should be highlighted in the same yellow as used in other parts of our UI. Note that should the list be closed it should no longer be highlighted. Note the example provided does not currently do this.
Fix the Font - the Chrome Web Store has a nice extension called What Font? that you can install and then activate for a loaded Web page and then find out what any font is in a Web page just by mousing over text. Use this tool to figure out what font is being used by the working app and then find that font and use it in this assignment.
Layout and Dimensions - note that you should fix all the little discrepencies between the look of the provided code and the working example. This should include:
Proper Separation of navbar from rest of app. Note in the example provided the navbar has a horizontal app between it and the rest of the UI
Proper Indentation/Margins for items table, including for dotted/solid borders so that lines are neatly aligned as in the provided example.
Proper Heights of list item rows in table
complete/incomplete - the status should use blue and yellow, as found in the example provided, for coloring the text in this field.
Mouse Over Highlighting - note that all buttons should properly employ mouse-over highlighting so that the user can always see what choice they are about to make. In addition, when the mouse is over an item in the todo list that item should be highlighted. Note that for both you should employ the contrasting color in the item hovering in the provided example.

There is obviously lots you'll have to do here starting with looking through a ton of my code to figure out what's going on here. Don't take the assignment lightly. When dealing with a large code base like this, everything takes time.
