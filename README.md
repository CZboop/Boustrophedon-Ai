# Boustrophedon Ai ⏪
Adobe Illustrator script to apply a boustrophedon effect to text, with alternating directions for each line!

## Boustrophedon?
Boustrophedon is a system of writing where every other line is reversed or reflected. For example the first line may be left to right, the second line would then be right to left, the next line would be left to right etc. 
The term also encompasses every other line being upside down.

This was a much more common way of writing in ancient times, and there are lots of examples of languages where this was the default way of writing, or was common.

Link to the [Wikipedia article on the subject](https://en.wikipedia.org/wiki/Boustrophedon)

## The Script
This script provides a simple and repeatable way of applying the left to right reflection style of boustrophedon to a selected text frame in Adobe Illustrator.
It will also optionally uppercase and/or centre the text.

Note: the text may become larger if it doesn't start uppercase, and original forced line breaks may be lost due to this expansion. If this is the case it may be necessary to ensure the starting text frame is larger than the original text

## How to Use
Clone this repository or download the boustrophedon.js file so you have the script locally

In Illustrator:
- Select a single text frame. This should be in a state where the text is still editable, you can still type in the frame
- Click File > Scripts > Other Script or use the shortcut for selecting a script (in Windows this is Shift + Fn + F12)
- Navigate to the directory containing the boustrophedon.js file you just downloaded
- Select the file containing the script
- This will run the script

By default, this will also uppercase and centre align the text. 
To prevent the script from doing one or both of these:
- Open the downloaded file containing the script (boustrophedon.js)
- Go to the final line where the run function is being called
- Change true to false for the first argument (uppercase) and/or second argument (centre)
- Save the .js file
- Run again!

## Examples
Check out an example of a before and after from running the script:
![Two Adobe Illustrator artboards with arrows in between, the left one shows standard text and the right one shows the same text with the boustrophedon style](https://github.com/CZboop/Boustrophedon-Ai/blob/main/images/before_and_after.png?raw=true)
