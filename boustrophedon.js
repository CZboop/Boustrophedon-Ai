// === AN ADOBE ILLUSTRATOR SCRIPT TO APPLY A BOUSTROPHEDON EFFECT TO SELECTED TEXT === //

// getting the active document and selection
const document = app.activeDocument;
const currentSelection = document.selection[0];
const currentLayer = document.activeLayer;

function splitIntoLines(textSelection) {
    var textContent = textSelection.contents.toString();
    // TODO: is there a char that can split on if ai added a forced line break because text too long for frame?
    var splitText = textContent.split(/[\r]|[\r\n]+/)
    var newTextFrame;
    // TODO: preserve styling, size, and position of original!
    for (var i = 0 ; i < splitText.length ; i++) {
        var newTextFrame = currentLayer.textFrames.add();
        newTextFrame.contents = splitText[i];
    }
}
// splitIntoLines(currentSelection);

// turning text into shapes
function turnIntoShapes(textSelection){
    // creating outlines from each letter and getting ref to the resulting path items (in a group)
    var textOutlines = textSelection.createOutline();
    var textObjects = textOutlines.compoundPathItems;
    // init some variables for iteration 
    var previousY;
    var groupNum = 1;
    // creating new group in the current layer and adding to the document
    var currentGroup = currentLayer.groupItems.add();
    currentGroup.name = "TextGroup1";
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
            currentGroup.name = "TextGroup" + groupNum.toString();
            currentGroup.move( document, ElementPlacement.PLACEATEND );
        }
        // moving the current item/char out of the original group to the current/new group
        textObjects[0].move(currentGroup, ElementPlacement.PLACEATEND);
        previousY = currentY;
    }
}
turnIntoShapes(currentSelection);

// TODO: reflecting each alternate line
function reflectAlternate(){}
