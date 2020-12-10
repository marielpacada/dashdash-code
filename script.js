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
}

// function to generate a random letter, onload of step1 and onclick of next button (when user gets it right)
var letter;
var correctMorse;
var inputMorse;

function generateLetter() {
    inputMorse = [];
    var testBox = document.getElementById("test");
    testBox.innerHTML = inputMorse;

    var temp = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    letter = new Letter(temp);
    correctMorse = letter.getMorse();
    document.getElementById("letter").innerHTML = letter.letter;


    var testBox = document.getElementById("other-test");
    testBox.innerHTML = correctMorse;
}

function checkMnemonic() {
    var correctMnem = letter.getMnemonic();
    var inputMnem = document.getElementById("mnemonic-box").value;
    if (correctMnem == inputMnem) {
        document.getElementById("mnemonic-box").disabled = true;
    }
}

function addDot() {
    inputMorse.push(0);
    var dot = new Image();
    dot.src = "images/dot.svg";
    const morseBox = document.getElementById("morse-box");
    morseBox.appendChild(dot);
    checkMorse();
}

function addDash() {
    inputMorse.push(1);
    var dash = new Image();
    dash.src = "images/dash.svg";
    const morseBox = document.getElementById("morse-box");
    morseBox.appendChild(dash);
    checkMorse();
}

function backspace() {
    const morseBox = document.getElementById("morse-box");
    morseBox.removeChild(morseBox.lastElementChild);
    inputMorse.pop();
}

function checkMorse() {
    var testBox = document.getElementById("test");
    testBox.innerHTML = inputMorse;

    // why is this not working????
    if (inputMorse == correctMorse) {
        document.write('hefsfda');
        document.getElementById("morse-box").style.backgroundColor = "lightgreen";
    }
}