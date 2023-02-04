var columnClicked = 0;
var rowClicked = 0;

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