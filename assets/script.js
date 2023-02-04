//set up default variables related to interactivity
var columnClicked = 0;
var rowClicked = 0;
var columnsEntered = 32;
var playbackOn = false;
var refreshIntervalID = 0;

//import default audio clips
let clip1 = new Audio("./assets/sounds/violin/violinNote1.mp3");
let clip2 = new Audio("./assets/sounds/violin/violinNote2.mp3");
let clip3 = new Audio("./assets/sounds/violin/violinNote3.mp3");
let clip4 = new Audio("./assets/sounds/violin/violinNote4.mp3");
let clip5 = new Audio("./assets/sounds/violin/violinNote5.mp3");
let clip6 = new Audio("./assets/sounds/violin/violinNote6.mp3");
let clip7 = new Audio("./assets/sounds/violin/violinNote7.mp3");
let clip8 = new Audio("./assets/sounds/violin/violinNote8.mp3");
let clip9 = new Audio("./assets/sounds/violin/violinNote9.mp3");
let clip10 = new Audio("./assets/sounds/violin/violinNote10.mp3");
let clip11 = new Audio("./assets/sounds/violin/violinNote11.mp3");
let clip12 = new Audio("./assets/sounds/violin/violinNote12.mp3");
let clip13 = new Audio("./assets/sounds/violin/violinNote13.mp3");

var currentPlaybackLocation = 1;
var tempoDelay = 250;

//set up column count input
let columnCount = document.getElementById("columnCount");

//set up listener to change the number of columns if input changes
columnCount.addEventListener('change', (event) => {
    columnChange();
})

//set up tempo input
let tempoInput = document.getElementById("tempo");

//set up listener to change the tempo
tempoInput.addEventListener('change', (event) => {
    tempoChange();
})

//start playing if it isn't already, stop playing if it is (on button press)
function playButtonPress() {
    if (playbackOn === false) {
        playbackOn = true;
        currentPlaybackLocation = 1;
        startPlayback();
    }
    else {
        clearInterval(refreshIntervalID);
        var previousPlaybackColumn = 0;
        if (currentPlaybackLocation === 1) {
            previousPlaybackColumn = document.getElementById("column" + columnsEntered.toString());
        }
        else {
            previousPlaybackColumn = document.getElementById("column" + (currentPlaybackLocation - 1).toString());
        }
        for (var c = 0; c < previousPlaybackColumn.children.length; c++) {
            previousPlaybackColumn.children[c].classList.remove("cellInPlayback");
        }
        currentPlaybackLocation = 0;
        playbackOn = false;
    }
}

//starts playback loop
function startPlayback() {
    refreshIntervalID = setInterval(playbackLoop, tempoDelay);
}

//playback loop
function playbackLoop() {
    //determine the previous column played
    var previousPlaybackColumn = 0;
    var clearedSound = false;
    if (currentPlaybackLocation === 1) {
        previousPlaybackColumn = document.getElementById("column" + columnsEntered.toString());
    }
    else {
        previousPlaybackColumn = document.getElementById("column" + (currentPlaybackLocation - 1).toString());
    }
    //remove the playback active class from the previous column (removes special color)
    for (var b = 0; b < previousPlaybackColumn.children.length; b++) {
        previousPlaybackColumn.children[b].classList.remove("cellInPlayback");
    }
    //loop through current column and add playback active class, and play the note if it's selected
    var selectedPlaybackColumn = document.getElementById("column" + currentPlaybackLocation.toString());
    for (var a = 0; a < selectedPlaybackColumn.children.length; a++) {
        selectedPlaybackColumn.children[a].classList.add("cellInPlayback");
        if (selectedPlaybackColumn.children[a].classList.contains("cellSelected")) {
            //clear previously playing sounds if any are playing
            if (clearedSound === false) {
                clearedSound = true;
                clip1.pause();
                clip1.currentTime = 0;
                clip2.pause();
                clip2.currentTime = 0;
                clip3.pause();
                clip3.currentTime = 0;
                clip4.pause();
                clip4.currentTime = 0;
                clip5.pause();
                clip5.currentTime = 0;
                clip6.pause();
                clip6.currentTime = 0;
                clip7.pause();
                clip7.currentTime = 0;
                clip8.pause();
                clip8.currentTime = 0;
                clip9.pause();
                clip9.currentTime = 0;
                clip10.pause();
                clip10.currentTime = 0;
                clip11.pause();
                clip11.currentTime = 0;
                clip12.pause();
                clip12.currentTime = 0;
                clip13.pause();
                clip13.currentTime = 0;
            }
            //play the relevant clip for each row
            switch(a + 1) {
                case 1:
                    clip1.play();
                    break;
                case 2:
                    clip2.play();
                    break;
                case 3:
                    clip3.play();
                    break;
                case 4:
                    clip4.play();
                    break;
                case 5:
                    clip5.play();
                    break;
                case 6:
                    clip6.play();
                    break;
                case 7:
                    clip7.play();
                    break;
                case 8:
                    clip8.play();
                    break;
                case 9:
                    clip9.play();
                    break;
                case 10:
                    clip10.play();
                    break;
                case 11:
                    clip11.play();
                    break;
                case 12:
                    clip12.play();
                    break;
                case 13:
                    clip13.play();
                    break;    
            }
        }
    }
    //set next playback location
    if (currentPlaybackLocation >= columnsEntered) {
        currentPlaybackLocation = 1;
    }
    else {
        currentPlaybackLocation = currentPlaybackLocation + 1;
    }
}

//determine which cell/column combo was clicked
function columnClick(x) {
    if (Number(x) <= columnsEntered) {
        columnClicked = x;
        if (rowClicked != 0 && columnClicked != 0) {
            var selectedColumn = document.getElementById("column" + columnClicked.toString());
            var selectedCell = selectedColumn.children[rowClicked - 1];
            if (selectedCell.classList.contains("cellSelected")) {
                selectedCell.classList.remove("cellSelected");
            }
            else {
                selectedCell.classList.add("cellSelected");
            }
        }
    }
}

//determined class of cell clicked
function cellClick(x) {
    rowClicked = x;
}

//update columns based on input
function columnChange() {
    columnsEntered = Number(document.getElementById("columnCount").value);
    //enforce min and max
    if (columnsEntered > 32) {
        columnsEntered = 32;
        document.getElementById("columnCount").value = 32;
    }
    if (columnsEntered < 1) {
        columnsEntered = 1;
        document.getElementById("columnCount").value = 1
    }
    //show columns less than or equal to columns entered
    for (i = 1; i < columnsEntered + 1; i++) {
        var currentAnimation = document.getElementById("column" + i.toString()).style.animationName;
        if (currentAnimation === "hideColumns") {
            document.getElementById("column" + i.toString()).style.animationName = "showColumns";
        }
    }
    //hide columns greater than
    for (j = columnsEntered + 1; j < 33; j++) {
        var currentAnimation = document.getElementById("column" + j.toString()).style.animationName;
        if (currentAnimation != "hideColumns") {
            var columnToClear = document.getElementById("column" + j.toString());
            columnToClear.style.animationName = "hideColumns";
            for (var y = 0; y < columnToClear.children.length; y++) {
                if (columnToClear.children[y].classList.contains("cellSelected")) {
                    columnToClear.children[y].classList.remove("cellSelected");
                }
            }
        }
    }
}

//update tempo based on input
function tempoChange() {
    tempoEntered = Number(document.getElementById("tempo").value);
    //enforce min and max
    if (tempoEntered > 1000) {
        columnsEntered = 1000;
        document.getElementById("tempo").value = 1000;
    }
    if (tempoEntered < 1) {
        tempoEntered = 1;
        document.getElementById("tempo").value = 1
    }
    //update tempo delay based on tempoEntered
    tempoDelay = Math.floor(60000 / tempoEntered);
}