class Node {
    constructor(letter) {
        this.letter = letter;
        this.morse = [];
        this.left = null;
        this.right = null;
    }
    setMorse(morse) {
        var copy = morse.slice();
        this.morse = copy;
    }
    addMorse(d) {
        this.morse.push(d);
    }
    setLeft(left) {
        this.left = left;
    }
    setRight(right) {
        this.right = right;
    }
}
class Tree {
    constructor(letter) {
        this.root = new Node(letter);
    }
}

// make binary tree (one-pass BFS traversal)
function makeTree(dict, array) {
    var tree = new Tree(array[0]);
    array.shift();

    var queue = [];
    queue.push(tree.root);
    while (array.length != 0) {
        var currNode = queue[0];
        const currMorse = currNode.morse;

        // set left node
        var left = new Node(array[0]);
        currNode.setLeft(left);

        // generate left morse and add to mainDict
        left.setMorse(currMorse);
        left.addMorse(0); // 0 for dot
        dict[array[0]] = left.morse;

        queue.push(left);
        array.shift();

        if (!array) break;

        // set right node
        var right = new Node(array[0]);
        currNode.setRight(right);

        // generate right morse and add to mainDict
        right.setMorse(currMorse);
        right.addMorse(1); // 1 for dash
        dict[array[0]] = right.morse;

        queue.push(right);
        array.shift();

        // remove the first index (fifo)
        queue.shift();
    }
}


// letters are in order of morse code binary tree
var morseDict = {};
var letters = ['null1', 'E', 'T', 'I', 'A', 'N', 'M', 'S', 'U', 'R', 'W', 'D', 'K', 'G', 'O', 'H', 'V', 'F', 'null2', 'L', 'null3', 'P', 'J', 'B', 'X', 'C', 'Y', 'Z', 'Q'];
makeTree(morseDict, letters);

var mnemonicDict = {
    'A': 'aCHOO',
    'B': 'BE a good boy',
    'C': 'COca COla',
    'D': 'DRACula',
    'E': 'eh',
    'F': 'fettuCCIne',
    'G': 'GOD BLESS you',
    'H': 'hippityhop',
    'I': 'i am',
    'J': 'just WAIT IT OUT',
    'K': 'KANgaROO',
    'L': 'los ANgeles',
    'M': 'MORE MILK',
    'N': 'NAvy',
    'O': 'OREO',
    'P': 'poTATO pie',
    'Q': "QUEEN'S WEDding DAY",
    'R': 'reFLECtion',
    'S': 'sun is up',
    'T': 'TALL',
    'U': 'underNEATH',
    'V': 'victory WALK',
    'W': "where's WALDO",
    'X': 'X marks the SPOT',
    'Y': 'YELlow YOYO',
    'Z': 'ZIGZAG zigzag'
};

var hintDict = {};
for (var key of Object.keys(morseDict)) {
    hintDict[key.slice()] = morseDict[key.slice()].length;
}


/* -------------------- we finished all the global constant variables woo!*/


/* -------------------- these are for manipulating the actual document!*/

class Letter {
    constructor(letter) {
        this.letter = letter;
    }

    getMnemonic() {
        return mnemonicDict[this.letter];
    }
    getMorse() {
        return morseDict[this.letter]; // remember, this returns an array like [1] or [0,1,1,0]
    }
    getHint() {
        return hintDict[this.letter];
    }
}

// function to generate a random letter, onload of step1 and onclick of next button (when user gets it right)
var letter;
var correctMorse;
var inputMorse = [];
var isMnemCorrect = false;
var isMorseCorrect = false;
var isFirstTurn = true;

var morseCount;
function generateLetter() {

    if (isRevealed) { 
        document.getElementById("hint-cover").innerHTML = letter.getHint();
    }

    morseCount = 0;
    isMnemCorrect = false;
    isMorseCorrect = false;
    var temp = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    letter = new Letter(temp);
    correctMorse = letter.getMorse().slice();
    document.getElementById("random-letter-box").innerHTML = letter.letter;

    if (isRevealed) { 
        document.getElementById("hint-cover").innerHTML = letter.getHint();
    }
    // clearing mnem box
    var mnemBox = document.getElementById("mnem-box");
    mnemBox.disabled = false;
    mnemBox.style.background = "white";
    mnemBox.value = "";

    // clearing morse box
    var morseBox = document.getElementById("morse-box");
    morseBox.style.backgroundColor = "white";
    morseBox.style.borderColor = "#7F7B82";
    morseBox.innerHTML = "";

    if (!isFirstTurn) { reinstateDefaultButtons(); }
    if (isFirstTurn) { isFirstTurn = false; }
}

function reinstateDefaultButtons() {
    inputMorse = [];
    enableButton(document.getElementById("skip-button"), "generateLetter()");
    enableButton(document.getElementById("hint-button"), "revealHint()");
    enableButton(document.getElementById("dot"), "addDot()");
    enableButton(document.getElementById("dash"), "addDash()");
    enableButton(document.getElementById("back"), "backspace()");

    var next = document.getElementById("next-button");
    next.style.filter = "opacity(40%)";
    next.style.cursor = "default";
    next.onclick = null;
}

function checkMnemonic() {
    var correctMnem = letter.getMnemonic();
    var box = document.getElementById("mnem-box");
    var inputMnem = box.value;
    if (correctMnem == inputMnem) {
        isMnemCorrect = true;
        box.disabled = true;
        box.style.backgroundColor = "#DFF2D8";
    }
    checkBothCorrect();
}

function showAlert() {
    alert("there can only be four dots or dashes, silly!");
    morseCount--;
}

function addDot() {
    morseCount++;
    if (morseCount > 4) {
        showAlert();
        return;
    }
    inputMorse.push(0);
    var dot = new Image();
    dot.src = "images/dot.svg";
    dot.style.height = "10px"
    dot.style.marginLeft = "5px";
    dot.style.marginRight = "5px";

    const morseBox = document.getElementById("morse-box");
    morseBox.appendChild(dot);
    checkMorse();
}

function addDash() {
    morseCount++;
    if (morseCount > 4) {
        showAlert();
        return;
    }
    inputMorse.push(1);
    var dash = new Image();
    dash.src = "images/dash.svg";
    dash.style.height = "10px"
    dash.style.marginLeft = "5px";
    dash.style.marginRight = "5px";
    const morseBox = document.getElementById("morse-box");
    morseBox.appendChild(dash);
    checkMorse();
}

function backspace() {
    if (morseCount == 0) {
        return;
    }
    morseCount--;
    const morseBox = document.getElementById("morse-box");
    morseBox.removeChild(morseBox.lastElementChild);
    inputMorse.pop();
}

function disableButton(button) {
    button.onclick = null;
    button.style.cursor = "default";
    button.style.filter = "opacity(40%)";
}

function enableButton(button, func) {
    button.setAttribute("onclick", func);
    button.style.cursor = "pointer";
    button.style.filter = "opacity(100%)";
}

function checkMorse() {
    if (JSON.stringify(inputMorse) == JSON.stringify(correctMorse)) {
        var box = document.getElementById("morse-box");
        box.style.backgroundColor = "#DFF2D8";
        box.style.borderColor = "#A9BA90";
        isMorseCorrect = true;
    }
    checkBothCorrect();
}

function checkBothCorrect() {
    if (isMorseCorrect) { 
        disableButton(document.getElementById("dot"));
        disableButton(document.getElementById("dash"));
        disableButton(document.getElementById("back"));
    }

    if (isMnemCorrect && isMorseCorrect) {
        disableButton(document.getElementById("dot"));
        disableButton(document.getElementById("dash"));
        disableButton(document.getElementById("back"));
        disableButton(document.getElementById("hint-button"));
        disableButton(document.getElementById("skip-button"));

        enableButton(document.getElementById("next-button"), "generateLetter()");
    }
}

var isRevealed = false;
function revealHint() {
    if (!isRevealed) {
        isRevealed = true;
        document.getElementById("hint-cover").style.backgroundColor = "transparent";
        document.getElementById("hint-button").src = "images/unlocked.svg";
        document.getElementById("hint-cover").innerHTML = letter.getHint();

    } else {
        isRevealed = false;
        document.getElementById("hint-cover").style.backgroundColor = "#D7ACB2";
        document.getElementById("hint-button").src = "images/locked.svg";
        document.getElementById("hint-cover").innerHTML = "";

    }
}

function checkKeyPress(e) { 
    if (e.code == 'KeyM') { 
        document.write("hello");
        revealHint();
    }
}

document.addEventListener("keydown", checkKeyPress(), true); 
