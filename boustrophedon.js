// === AN ADOBE ILLUSTRATOR SCRIPT TO APPLY A BOUSTROPHEDON EFFECT TO SELECTED TEXT === //

// turning text into shapes and splitting into groups per line
function turnIntoShapes(textSelection, currentLayer, document){
    // creating outlines from each letter and getting ref to the resulting path items (in a group)
    var textOutlines = textSelection.createOutline();
    var textObjects = textOutlines.compoundPathItems;

    // init variable to use in group name
    var groupNum = 1;

    // creating new group in the current layer and adding to the document
    var currentGroup = currentLayer.groupItems.add();
    currentGroup.name = "BoustrophedonTextLine1";
    currentGroup.move(document, ElementPlacement.PLACEATEND);

    // storing initial number of chars in the group as a var, as this will reduce as we move objects out of the group!
    var textObjectsLength = textObjects.length;
    var previousBottom;
    var previousTop;

    // iterating over each character path, will move to a different group based on Y, intended to make each line a diff group
    for (var i=0; i < textObjectsLength; i++){
        // iterating backwards, last index is the first element, always use the last index as group items reducing per iteration, can't use i
        var lastIndex = textObjects.length - 1;
        var currentCharBottomY = textObjects[lastIndex].geometricBounds[3];
        var currentCharTopY = textObjects[lastIndex].geometricBounds[1];
        
        // init value for previous y values for comparison to be valid
        if (!previousBottom){
            previousBottom = currentCharBottomY;
            previousTop = currentCharTopY;
        }

        // checking if top of current top is below the last bottom as a way of capturing descenders, punctuation etc in a simple rule
        if (currentCharTopY - previousBottom < -10){
            // make new group for the new line of text, naming it and setting it as current group
            groupNum += 1;
            var newGroup = currentLayer.groupItems.add();
            currentGroup = newGroup;
            currentGroup.name = "BoustrophedonTextLine" + groupNum.toString();
            currentGroup.move( document, ElementPlacement.PLACEATEND );
        }

        // moving the current item/char out of the original group to the current/new group
        textObjects[lastIndex].move(currentGroup, ElementPlacement.PLACEATEND);
        previousBottom = currentCharBottomY;
        previousTop = currentCharTopY;
    }
}

// getting the groups that have been subject of transform
function selectAndReturnTargetGroups(currentLayer){
    // array to store the layers that have group names created in turnIntoShapes func
    var targetGroups = [];

    // iterate over groups in layer to get the groups whos name starts with expected
    for (var i = 0; i < currentLayer.groupItems.length; i++) {
        var currentGroupName = currentLayer.groupItems[i].name;
        if (currentGroupName.length > 0){
            // using indexOf as startsWith not supported
            if (currentGroupName.indexOf("BoustrophedonTextLine") === 0){
                targetGroups.push(currentLayer.groupItems[i]);
            }
        }
    }
    return targetGroups;
}

// reflecting each alternate line
function reflectAlternate(currentLayer){
    // reflecting with scale matrix reversing on x axis
    var totalMatrix = app.getScaleMatrix(-100,100);
    
    var targetGroups = selectAndReturnTargetGroups(currentLayer);
    // iterating over the groups and applying scale matrix (reflection) to every other group
    for (var i = targetGroups.length - 1; i >= 0; i--){
        // iterating backwards as the groups will be backwards from bottom to top
        if (i % 2 == 1){
            targetGroups[i].transform(totalMatrix);
        }
    }
}

// take the current groups per line and regroup them into another higher level group
function regroupText(currentLayer, document){
    //  get the groups that have been transformed
    var targetGroups = selectAndReturnTargetGroups(currentLayer);
    // create a new group to add the smaller groups to
    var newGroup = currentLayer.groupItems.add();
    newGroup.name = "BoustrophedonTextGroup";
    newGroup.move(document, ElementPlacement.PLACEATEND);
    for (var i = targetGroups.length - 1; i >= 0; i--){
        targetGroups[i].move(newGroup, ElementPlacement.PLACEATEND);
    }
}

// getting the active document and selection
function run(uppercase, centre){
    const document = app.activeDocument;

    // error handling - nothing selected
    if (document.selection.length === 0){
        alert("No text selected! Please select the text to apply the effect to.", "Error: No Selection", false);
        return;
    }
    const currentSelection = document.selection[0];

    // error handling - selection isn't a text fram
    if (currentSelection.typename != "TextFrame"){
        alert("Please select a text frame object!", "Error: Invalid Selection", false);
        return;
    }
    const currentLayer = document.activeLayer;

    // uppercase and align centre
    if (uppercase === true){
        currentSelection.textRange.changeCaseTo(CaseChangeType.UPPERCASE);
    }
    if (centre === true){
        currentSelection.textRange.justification = Justification.CENTER;
    }

    // run the main script
    turnIntoShapes(currentSelection, currentLayer, document);
    reflectAlternate(currentLayer);
    regroupText(currentLayer, document); 
}

run(true, true);
