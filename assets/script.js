var columnClicked = 0;
var rowClicked = 0;
var columnsEntered = 32;
var playbackOn = false;
var refreshIntervalID = 0;
var testClip = new Audio("./assets/biu.mp3");
var currentPlaybackLocation = 1;

let columnCount = document.getElementById("columnCount");

columnCount.addEventListener('change', (event) => {
    columnChange();
})

function playButtonPress() {
    if (playbackOn === false) {
        console.log("pressed play")
        playbackOn = true;
        currentPlaybackLocation = 1;
        startPlayback();
    }
    else {
        clearInterval(refreshIntervalID);
        console.log("pressed stop")
        for (var c = 0; c < document.getElementById("column" + (currentPlaybackLocation - 1).toString()).children.length; c++) {
            document.getElementById("column" + (currentPlaybackLocation - 1).toString()).children[c].classList.remove("cellInPlayback");
        }
        currentPlaybackLocation = 0;
        playbackOn = false;
    }
}

function startPlayback() {
    refreshIntervalID = setInterval(playbackLoop, 250);
}

function playbackLoop() {
    var previousPlaybackColumn = 0;
    if (currentPlaybackLocation === 1) {
        previousPlaybackColumn = document.getElementById("column" + columnsEntered.toString());
    }
    else {
        previousPlaybackColumn = document.getElementById("column" + (currentPlaybackLocation - 1).toString());
    }
    for (var b = 0; b < previousPlaybackColumn.children.length; b++) {
        previousPlaybackColumn.children[b].classList.remove("cellInPlayback");
        console.log("loop 1");
    }
    var selectedPlaybackColumn = document.getElementById("column" + currentPlaybackLocation.toString());
    for (var a = 0; a < selectedPlaybackColumn.children.length; a++) {
        console.log("loop 2");
        selectedPlaybackColumn.children[a].classList.add("cellInPlayback");
        if (selectedPlaybackColumn.children[a].classList.contains("cellSelected")) {
            testClip.pause();
            testClip.currentTime = 0;
            console.log("biu");
            testClip.play();
        }
    }
    if (currentPlaybackLocation >= columnsEntered) {
        currentPlaybackLocation = 1;
    }
    else {
        currentPlaybackLocation = currentPlaybackLocation + 1;
    }
}

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

function cellClick(x) {
    rowClicked = x;
}

function columnChange() {
    columnsEntered = Number(document.getElementById("columnCount").value);
    if (columnsEntered > 32) {
        columnsEntered = 32;
        document.getElementById("columnCount").value = 32;
    }
    if (columnsEntered < 1) {
        columnsEntered = 1;
        document.getElementById("columnCount").value = 1
    }
    for (i = 1; i < columnsEntered + 1; i++) {
        //document.getElementById("column" + i.toString()).style.display = "inline-flex";
        var currentAnimation = document.getElementById("column" + i.toString()).style.animationName;
        if (currentAnimation === "hideColumns") {
            document.getElementById("column" + i.toString()).style.animationName = "showColumns";
        }
    }
    for (j = columnsEntered + 1; j < 33; j++) {
        //document.getElementById("column" + j.toString()).style.display = "none";
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