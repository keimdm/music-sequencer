var columnClicked = 0;
var rowClicked = 0;
var columnsEntered = 0;

let columnCount = document.getElementById("columnCount");

columnCount.addEventListener('change', (event) => {
    columnChange();
})

function columnClick(x) {
    if (x <= columnsEntered) {
        columnClicked = x;
        if (rowClicked != 0 && columnClicked != 0) {
            console.log("Column: " + columnClicked.toString() + ", " + "Row: " + rowClicked.toString());
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
            document.getElementById("column" + j.toString()).style.animationName = "hideColumns";
        }
    }
}