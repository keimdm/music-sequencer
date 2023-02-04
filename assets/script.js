var columnClicked = 0;
var rowClicked = 0;
var columnsEntered = 0;

let columnCount = document.getElementById("columnCount");

columnCount.addEventListener('change', (event) => {
    columnChange();
})

function columnClick(x) {
    columnClicked = x;
    if (rowClicked != 0 && columnClicked != 0) {
        console.log("Column: " + columnClicked.toString() + ", " + "Row: " + rowClicked.toString());
    }
    console.log
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
        document.getElementById("column" + i.toString()).style.display = "inline-flex";
    }
    for (j = columnsEntered + 1; j < 33; j++) {
        document.getElementById("column" + j.toString()).style.display = "none";
    }
}