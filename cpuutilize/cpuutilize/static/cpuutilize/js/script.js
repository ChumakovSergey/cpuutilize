columnsIncreaseSort = [true, true, true];
sortData = {
    'column': 'datetime',
    'columnType': 'datetime',
    'ascType': false
}

// function sortNumber(columnIndex) {
//     if (columnsIncreaseSort[columnIndex])
//         sortFunc = (rowA, rowB) => Number(rowA.cells[columnIndex].innerHTML) < Number(rowB.cells[columnIndex].innerHTML) ? 1 : -1
//     else
//         sortFunc = (rowA, rowB) => Number(rowA.cells[columnIndex].innerHTML) > Number(rowB.cells[columnIndex].innerHTML) ? 1 : -1
//     columnsIncreaseSort[columnIndex] = !columnsIncreaseSort[columnIndex];
//     let sortedRows = Array.from(utilize_tbl.rows)
//         .slice(1)
//         .sort(sortFunc);
//     utilize_tbl.tBodies[0].append(...sortedRows);
// }
//
// function sortDate(columnIndex) {
//
//     if (columnsIncreaseSort[columnIndex])
//         sortFunc = (rowA, rowB) => Date(rowA.cells[columnIndex].innerHTML) < Date(rowB.cells[columnIndex].innerHTML) ? 1 : -1
//     else
//         sortFunc = (rowA, rowB) => Date(rowA.cells[columnIndex].innerHTML) > Date(rowB.cells[columnIndex].innerHTML) ? 1 : -1
//     columnsIncreaseSort[columnIndex] = !columnsIncreaseSort[columnIndex];
//     let sortedRows = Array.from(utilize_tbl.rows)
//         .slice(1)
//         .sort(sortFunc);
//     utilize_tbl.tBodies[0].append(...sortedRows);
// }
function sortAction(columnName, columnType) {
    if (sortData.column == columnName)
        sortData.ascType = !sortData.ascType;
    else {
        sortData.column = columnName;
        sortData.ascType = true;
    }
    sortData.column = columnName;
    sortData.columnType = columnType;
    show();
}

function show() {
    var req = new XMLHttpRequest();
    req.open('GET', 'list/', false);
    req.send(null);

    if (req.status == 200) {
        data = JSON.parse(req.responseText);
        data = sort(data, sortData.column, sortData.columnType);
        update(data);
        console.log(req.responseText);
    }
}

function sortNumber(asc_type, columnName) {
    if (asc_type)
        sortFunc = (rowA, rowB) => Number(rowA[columnName]) < Number(rowB[columnName]) ? 1 : -1;
    else
        sortFunc = (rowA, rowB) => Number(rowA[columnName]) > Number(rowB[columnName]) ? 1 : -1;
    return sortFunc;
}

function sortDate(ascType, columnName) {
    if (ascType)
        sortFunc = (rowA, rowB) => new Date(rowA[columnName]) < new Date(rowB[columnName]) ? 1 : -1;
    else
        sortFunc = (rowA, rowB) => new Date(rowA[columnName]) > new Date(rowB[columnName]) ? 1 : -1;
    return sortFunc;
}

function sort(data, columnName, dataType) {
    console.log(sortData.ascType);
    if (dataType == "number")
        sortFunc = sortNumber(sortData.ascType, columnName);
    else
        sortFunc = sortDate(sortData.ascType, columnName);
    return data.sort(sortFunc);
}

function update(data) {
    for (var i = 1; i < utilize_tbl.rows.length;) {
        utilize_tbl.deleteRow(i);
    }
    let index = 0;
    for (var el in data) {
        date = new Date(data[el].datetime);
        console.log(date);
        strDate = date.getFullYear() + '-'
            + ('0'+(date.getMonth() + 1)).slice(-2) + '-'
            + ('0'+date.getDate()).slice(-2) + ' '
            + ('0'+date.getHours()).slice(-2) + ':'
            + ('0'+date.getMinutes()).slice(-2) + ':'
            + ('0'+date.getSeconds()).slice(-2);

        var newRow = utilize_tbl.insertRow();
        newRow.insertCell(0).appendChild(document.createTextNode(++index));
        newRow.insertCell(1).appendChild(document.createTextNode(strDate));
        newRow.insertCell(2).appendChild(document.createTextNode(data[el].value));
        last_id = data[el].id;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    show();

    setInterval('show()', 1000);
});