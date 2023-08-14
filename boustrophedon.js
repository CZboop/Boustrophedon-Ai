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
splitIntoLines(currentSelection);

// TODO: turning into shapes
function turnIntoShapes(){}

// TODO: reflecting each alternate line
function reflectAlternate(){}
