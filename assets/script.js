var columnClicked = 0;
var rowClicked = 0;
var columnsEntered = 32;

let columnCount = document.getElementById("columnCount");

columnCount.addEventListener('change', (event) => {
    columnChange();
})

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