// === AN ADOBE ILLUSTRATOR SCRIPT TO APPLY A BOUSTROPHEDON EFFECT TO SELECTED TEXT === //

// getting the active document and selection
const document = app.activeDocument;
const currentSelection = document.selection[0];
const currentLayer = document.activeLayer;

// turning text into shapes and splitting into groups per line
function turnIntoShapes(textSelection){
    // creating outlines from each letter and getting ref to the resulting path items (in a group)
    var textOutlines = textSelection.createOutline();
    var textObjects = textOutlines.compoundPathItems;
    // init some variables for iteration 
    var previousY;
    var groupNum = 1;
    // creating new group in the current layer and adding to the document
    var currentGroup = currentLayer.groupItems.add();
    currentGroup.name = "BoustrophedonTextGroup1";
    currentGroup.move(document, ElementPlacement.PLACEATEND);
    // storing initial number of chars in the group as a var, as this will reduce as we move objects out of the group!
    var textObjectsLength = textObjects.length; 
    // iterating over each character path, will move to a different group based on Y, intended to make each line a diff group
    for (var i=0; i < textObjectsLength; i++){
        // iterating but will always want the first elem... as we are removing the current first element/last element evaluated each time
        var currentY = textObjects[0].geometricBounds[3];
        if (!previousY){
            previousY = currentY;
        }
        // checking if y is not close/almost the same, may not be best numbers/to hardcode
        // TODO: this is not capturing puntuation as being part of the same line
        if (!(Math.abs(currentY - previousY) < 3)){
            // make new group for the new line of text and setting it as current group
            groupNum += 1;
            var newGroup = currentLayer.groupItems.add();
            currentGroup = newGroup;
            currentGroup.name = "BoustrophedonTextGroup" + groupNum.toString();
            currentGroup.move( document, ElementPlacement.PLACEATEND );
        }
        // moving the current item/char out of the original group to the current/new group
        textObjects[0].move(currentGroup, ElementPlacement.PLACEATEND);
        previousY = currentY;
    }
}
turnIntoShapes(currentSelection);

// reflecting each alternate line
function reflectAlternate(){
    // reflecting with scale matrix reversing on x axis
    var totalMatrix = app.getScaleMatrix(-100,100);
    // array to store the layers that have group names created in turnIntoShapes func
    var targetGroups = [];
    // iterate over groups in layer to get the groups whos name starts with expected
    for (var i = 0; i < currentLayer.groupItems.length; i++) {
        var currentGroupName = currentLayer.groupItems[i].name;
        if (currentGroupName.length > 0){
            // using indexOf as startsWith not supported
            if (currentGroupName.indexOf("BoustrophedonTextGroup") === 0){
                targetGroups.push(currentLayer.groupItems[i]);
            }
        }
    }
    // iterating over the groups and applying scale matrix to every other group
    for (var i = targetGroups.length - 1; i >= 0; i--){
        // iterating backwards as the groups will be backwards from bottom to top
        if (i % 2 == 1){
            targetGroups[i].transform(totalMatrix);
        }
    }
}
reflectAlternate();
