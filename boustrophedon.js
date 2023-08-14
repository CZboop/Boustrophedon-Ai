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
    var textOutlines = textSelection.createOutline();
    var textObjects = textOutlines.compoundPathItems; // note this might not be the way to get items in the group?
    var previousY;
    alert(textObjects.length);
    var groupNum = 1;
    var currentGroup = currentLayer.groupItems.add();
    currentGroup.name = "TextGroup1";
    currentGroup.move( document, ElementPlacement.PLACEATEND );
    for (var i=0; i < textObjects.length; i++){
        var currentY = textObjects[i].bottom;
        if (!previousY){
            previousY = currentY;
        }
        var currentX = textObjects[i].left;
        // alert("current x: " + currentX + " current y: " + currentY);
        
        if (!(-3 < (currentY - previousY) < 3)){ // checking if y is not close/almost the same, may not be best numbers/to hardcode
            // make new group for the new line of text
            groupNum += 1;
            var newGroup = currentLayer.groupItems.add();
            currentGroup = newGroup;
            currentGroup.name = "TextGroup" + groupNum.toString();
            currentGroup.move( document, ElementPlacement.PLACEATEND );
            // TODO: set the position of the group or just the contents?
        }
        // TODO: why is only every other path being moved into the new group?
        // alert(currentGroup.name);
        textObjects[i].move(currentGroup, ElementPlacement.PLACEATEND);
        previousY = currentY;
    }
    // need to actively move out of the group one by one
    // BUT this can potentially help make by each line, can get the Y of each object and make a new group
}
turnIntoShapes(currentSelection);

// TODO: reflecting each alternate line
function reflectAlternate(){}
