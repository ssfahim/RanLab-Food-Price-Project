function populateTable(csv) {
    // Split the CSV data into rows
    var rows = csv.trim().split('\n');

    // // Extract header (product names)
    var headers = rows[0].split(',');

    // Create HTML table
    var table = document.getElementById('csvTable');

    // Create table header
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var th = document.createElement('th');
    th.textContent = headers[0].trim(); // Use only the first header
    headerRow.appendChild(th);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body with product names
    // var tbody = document.createElement('tbody');
    var row = csv.split("\n");
    for (var i = 2; i < row.length; i++) {
        var rowData = row[i].split(',');
        if(rowData.length>= 2){
            var productName = rowData[0].trim(); // Use only the first column data
            var rop = table.insertRow(-1);

            // Add checkbox column
            var cellCheckbox = rop.insertCell(0);
            cellCheckbox.innerHTML = '<input type="checkbox">';

            // Add product column
            var cellProduct = rop.insertCell(-1);
            cellProduct.innerHTML = rowData[0];
        }
    }
}

function generateTable(){
    populateTable(csvData);
    document.getElementById('content').style.display = "block";
    document.getElementById('glance').style.display = "none";
    document.getElementById("menuWindow").style.display = "none";
}

function glanceButton(){
    document.getElementById('glance').style.display = "block";
    document.getElementById('content').style.display = "none";
    document.getElementById("menuWindow").style.display = "none";
}

function monthlyCases(selectedYear,header,a,dates,headers){
    for (let i = 0; i < header.length; i++) {
        if (header[i].split('-')[1] == parseInt(selectedYear,10)) {
            a.push(i);
            dates.push(header[i]);
            headers.push(header[i]);
        }
    }
}

function yearlyCases(header,a,dates,headers){
    var lastMonthIndex = header[header.length - 1];
    var lastMonthValues = lastMonthIndex.split('-')[0];

    for (let i = 0; i<header.length;i++){
        if(header[i].split('-')[0] == lastMonthValues){
            a.push(i);
            dates.push(header[i]);
            headers.push(header[i])
        }
    }
}

function updateAndVisualize() {
    var selectedTable = document.getElementById("selectedTable");
    selectedTable.innerHTML = ""; // Clear previous content

    var selectedRows = document.querySelectorAll("#csvTable input:checked");
    if (selectedRows.length === 0) {
        alert("Please select at least one item.");
        return;
    }

    // Determine the file based on the selected "View by" option
    var viewBy = document.getElementById("viewBy").value;
    var yearDropdown = document.getElementById("yearDropdown");

    // Show/hide the year dropdown based on the selected option
    yearDropdown.style.display = viewBy.includes("monthly") ? "block" : "none";
    var csvFile;

    switch (viewBy) {
        case "yearlyStan":
            var lines = csvData1.split("\n");
            break;
        case "yearly":
            var lines = csvData.split("\n");
            break;
        case "monthlyStan":
            var lines = csvData1.split("\n");
            break;
        case "monthly":
            var lines = csvData.split("\n");
            break;
        default:
            var lines = csvData.split("\n"); // Default value
    }

    // Create a new table with specified headers
    var newTable = document.createElement("table");
    newTable.classList.add("selectedTable");

    var headerRow = newTable.insertRow(-1);

    var rows = csvData.trim().split('\n');
    var header= rows[0].split(',');
    var headers = [];
    headers.push(rows[0].split(',')[0],rows[0].split(',')[1]);
    var dates = [];
    var a = [];
    var prices = [];


    if (viewBy.includes("yearly")) {
        yearlyCases(header,a,dates,headers)
    }
    
    else if (viewBy.includes("yearlyStan")){
        yearlyCases(header,a,dates,headers)
    }

    else if (viewBy.includes("monthly")){
        // Assuming it's "monthly" option
        var lastMonthIndex = header[header.length - 1];
        var lastMonthValues = lastMonthIndex.split('-')[0];

        var selectedYear = document.getElementById("year").value;
        // console.log('selected year is: ',typeof parseInt(selectedYear,10))

        switch (selectedYear) {
            case "2017":
                monthlyCases(selectedYear,header,a,dates,headers)
                break;
            case "2018":
                monthlyCases(selectedYear,header,a,dates,headers)
                break;
            case "2019":
                monthlyCases(selectedYear,header,a,dates,headers)
                break;
            case "2020":
                monthlyCases(selectedYear,header,a,dates,headers)
                break;
            case "2021":
                monthlyCases(selectedYear,header,a,dates,headers)
                break;
            case "2022":
                monthlyCases(selectedYear,header,a,dates,headers)
                break;
            case "2023":
                monthlyCases(selectedYear,header,a,dates,headers)
                break;
            default:
                var lastMonthIndex = header[header.length - 1];
                for (let i = (header.length - 1) - 11; i < header.length; i++) {
                    a.push(i);
                    dates.push(header[i]);
                    headers.push(header[i]);
                }
                break;
        }
    }

    else if (viewBy.includes("monthlyStan")){
        // Assuming it's "monthly" option
        var lastMonthIndex = header[header.length - 1];
        for (let i = (header.length - 1) - 11 ; i<header.length;i++){
            a.push(i);
            dates.push(header[i]);
            headers.push(header[i])  
        }
    }

    for (var i = 0; i < headers.length; i++) {
        var cell = headerRow.insertCell(-1);
        cell.innerHTML = headers[i];
    }
    var newRow;
    // Add selected rows with all columns and values
    for (var j = 0; j < selectedRows.length; j++) {
        var selectedRow = selectedRows[j].parentNode.parentNode;
        var product = selectedRow.cells[1].innerHTML;

        newRow = newTable.insertRow(-1);
        // newRow.classList.add("newRowClass");

        for (var k = 1; k < selectedRow.cells.length; k++) {
            var cell = newRow.insertCell(-1);
            cell.innerHTML = selectedRow.cells[k].innerHTML;
        }

        // Retrieve all data for the selected item from the CSV file
        // var lines = csvData.split("\n");
        for (var m = 0; m < lines.length; m++) {
            var cells = lines[m].split(",");
            if (cells.length >= 2 && cells[0] === product) { 
                var cell = newRow.insertCell(-1);
                // newRow.classList.add("newRowClass");
                cell.innerHTML = cells[1];
                for (var n = 0; n < a.length; n++) {
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = cells[a[n]];
                    // prices.push(cells[a[n]]);
                }
                break;
            }
        }
        // Add a heat map to each row
        // newRow.classList.add("newRowClass");
        addHeatMapToRow(newRow);
    }
    newRow.classList.add("newRowClass");
    selectedTable.appendChild(newTable);

    // // Create Plotly marker+line chart
    if (viewBy ==="yearly") {
        createPlot(selectedRows, csvData, dates,a);
    } 
    else if(viewBy === "yearlyStan") {
        createPlot(selectedRows, csvData1,dates,a);
    }
    else if(viewBy === "monthlyStan") {
        createPlot(selectedRows, csvData1,dates,a);
    }
    else if(viewBy === "monthly") {
        createPlot(selectedRows, csvData, dates,a);
    }
}

function addHeatMapToRow(row) {
    var maxValue = 0;
    var minValue = Number.MAX_VALUE;

    // Find the maximum and minimum values in the row
    for (var k = 2; k < row.cells.length; k++) {
        var value = parseFloat(row.cells[k].innerHTML);
        if (!isNaN(value)) {
            maxValue = Math.max(maxValue, value);
            minValue = Math.min(minValue, value);
        }
    }
    var k = maxValue;
    maxval(k);

    // Add the heatmap to each cell in the row
    for (var m = 2; m < row.cells.length; m++) {
        var value = parseFloat(row.cells[m].innerHTML);
        if (!isNaN(value)) {
            var percentage = (value - minValue) / (maxValue - minValue) * 100;
            var color = getColorForPercentage(percentage);
            row.cells[m].style.position = 'relative';
            row.cells[m].innerHTML += '<div class="heatmap" style="background: ' + color + '; opacity: 0.7;"></div>';
        }
    }
}

function maxval(val){
    var k = val;
    return k;
}

function getColorForPercentage(percentage) {
// OrRd color scale
    var colors = ['#fef0d9','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#990000'];
    var index = Math.round((colors.length - 1) * (percentage / 100));
    return colors[index];
}

function createPlot(selectedRows, csvData, dates,a ) {
    var plotData = [];
    // Add traces for selected products
    for (var j = 0; j < selectedRows.length; j++) {
        var selectedRow = selectedRows[j].parentNode.parentNode;
        var product = selectedRow.cells[1].textContent.trim();

        // Use getProductData to get the data for the product
        var productData = getProductData(product, csvData, a);

        if (productData) {
            var trace = {
                x: dates,
                y: productData,
                type: 'scatter',
                mode: 'markers+lines',
                name: product
            };

            plotData.push(trace);
        }
    }
    // Layout for the plot
    var layout = {
        title: 'Product Prices Over Time',
        xaxis: {
            title: 'Time Period',
            tickvals: [0, 1, 2, 3, 4, 5, 6,7,8,9,10,11],
            ticktext: dates,
            zeroline: true,
            zerolinewidth: 2,
            zerolinecolor: 'black'
        },
        yaxis: {
            title: 'Price in dollars(CAD)',
            zeroline: true,
            zerolinewidth: 2,
            zerolinecolor: 'black'
        }
    };
    // Plot the data
    Plotly.newPlot('chart', plotData, layout);
}

function getProductData(product, csvData,a) {
    var prices = [];
    var lines = csvData.split("\n");
        for (var m = 0; m < lines.length; m++) {
            var cells = lines[m].split(",");
            if (cells.length >= 2 && cells[0] === product) { 
                for (var n = 0; n < a.length; n++) {
                    prices.push(cells[a[n]]);
                }
                return prices;
            }
        }
}

function selectAll() {
    var checkboxes = document.querySelectorAll("#csvTable input[type='checkbox']");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

// Function to deselect all checkboxes
function deselectAll() {
    var checkboxes = document.querySelectorAll("#csvTable input[type='checkbox']");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}

function resetPage() {
    location.reload(); // This reloads the current page
}

function openMenu(menuType) {
    var menuWindow = document.getElementById("menuWindow");
    menuWindow.style.display = "block";
    // document.getElementById('glance').style.display = "none";
    // document.getElementById('content').style.display = "none";

    // Get the content container
    var menuContent = document.getElementById("selectedTablesd");
    menuContent.innerHTML = ""; // Clear previous content

    // Populate content based on the selected menu
    switch (menuType) {
        case "ChristmasMenu":
            var lst = `
            Peanuts,Almonds,Pork loin cuts,Carrots,White bread,Milk,Potatos
            `;
            populateMenu(menuContent, lst);
            break;
        case "BakingCake":
        var lst = `
            Wheat flour,White sugar,Vegetable oil,Milk,Butter,Cream
            `;
            populateMenu(menuContent, lst);
            break;

        case "BakingPie":
            var lst = `
            Apples,Wheat flour,White sugar,Lemons,Butter
            `;
            populateMenu(menuContent, lst);
            break;
        // Add more cases for additional menus if needed
    }
}

// Function to populate menu content
function populateMenu(container,lst) {
    var lines = csvData.split("\n");

    var newTable = document.createElement("table");
    newTable.classList.add("selectedTablesd");

    var headerRow = newTable.insertRow(-1);

    var rows = csvData.trim().split('\n');
    var header= rows[0].split(',');
    var headers = [];
    headers.push(rows[0].split(',')[0],rows[0].split(',')[1]);
    var dates = [];
    var a = [];
    var p = [];

    var lastMonthIndex = header[header.length - 1];
    var lastMonthValues = lastMonthIndex.split('-')[0];

    for (let i = 0; i<header.length;i++){
        if(header[i].split('-')[0] == lastMonthValues){
            a.push(i);
            dates.push(header[i]);
            headers.push(header[i])
        }
    }
    var r = lst.trim().split(',');
    cases(rows, r, p)

    for (var i = 0; i < headers.length; i++) {
        var cell = headerRow.insertCell(-1);
        cell.innerHTML = headers[i];
    }

    // Add selected rows with all columns and values
    for (var j = 0; j < p.length; j++) {
        // var selectedRow = selectedRows[j];
        var product = rows[p[j]].split(',')[0].trim();
        var newRow = newTable.insertRow(-1);

        // Retrieve all data for the selected item from the CSV file
        // var lines = csvData.split("\n");
        for (var m = 0; m < lines.length; m++) {
            var cells = lines[m].split(",");
            if (cells.length >= 2 && cells[0] === product) { 
                var cell = newRow.insertCell(-1);
                cell.innerHTML = cells[0];
                var cell = newRow.insertCell(-1);
                cell.innerHTML = cells[1];

                for (var n = 0; n < a.length; n++) {
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = cells[a[n]];
                    // prices.push(cells[a[n]]);
                }
                break;
            }
        }
        // Add a heat map to each row
        addHeatMapToRow(newRow);
    }
    var plot = 'chartsd';

    container.appendChild(newTable);
    createGPlot(plot,csvData, dates,a,p);
}

function closeMenu() {
    var menuWindow = document.getElementById("menuWindow");
    menuWindow.style.display = "none";
}

function generateTable(){
    populateTable(csvData);
    document.getElementById('content').style.display = "block";
}

function createGPlot(plot, csvData, dates, a, p) {
    var plotData = [];
    var rows = csvData.trim().split('\n');
    // Add traces for selected products
    for (var j = 0; j < p.length; j++) {
        var product = rows[p[j]].split(',')[0].trim();
        // Use getProductData to get the data for the product
        var productData = getProductData(product, csvData, a);

        if (productData) {
            var trace = {
                x: dates,
                y: productData,
                type: 'scatter',
                mode: 'markers+lines',
                name: product
            };

            plotData.push(trace);
        }
    }
    // console.log(plotData)

    // Layout for the plot
    var layout = {
        title: 'Product Prices Over Time',
        xaxis: {
            title: 'Time Period',
            tickvals: [0, 1, 2, 3, 4, 5, 6,7,8,9,10,11],
            ticktext: dates,
            zeroline: true,
            zerolinewidth: 2,
            zerolinecolor: 'black'
        },
        yaxis: {
            title: 'Price in dollars(CAD)',
            zeroline: true,
            zerolinewidth: 2,
            zerolinecolor: 'black'
        }
    };

    // Plot the data
    Plotly.newPlot(plot, plotData, layout);
}

function getProductData(product, csvData,a) {
    var prices = [];
    var lines = csvData.split("\n");
        for (var m = 0; m < lines.length; m++) {
            var cells = lines[m].split(",");
            if (cells.length >= 2 && cells[0] === product) { 
                for (var n = 0; n < a.length; n++) {
                    prices.push(cells[a[n]]);
                }
                return prices;
            }
        }
}

function updateAtAGlance() {
    var selectedTable = document.getElementById("selectedTables");
    selectedTable.innerHTML = "";
    
    var selectedOption = document.getElementById("atAGlance").value;
    var viewByOption = document.getElementById("view").value;

    var yearDropdown = document.getElementById("yearDrop");
    var priceView = document.getElementById("priceView");

    if (selectedOption.value !== "none") {
        priceView.style.display = "block";
        // yearDropdown.style.display = "block";
    } else {
        priceView.style.display = "none";
        // yearDropdown.style.display = "none";
    }
    // Dynamically construct the file name based on the selected options
    switch (viewByOption) {
        case "yearlyStan":
                var lines = csvData1.split("\n");
                var rows = csvData1.trim().split('\n');
                break;
            case "yearly":
                var lines = csvData.split("\n");
                var rows = csvData.trim().split('\n');
                break;
            case "monthlyStan":
                var lines = csvData1.split("\n");
                var rows = csvData1.trim().split('\n');
                break;
            case "monthly":
                var lines = csvData.split("\n");
                var rows = csvData.trim().split('\n');
                break;
            default:
                var lines = csvData.split("\n"); // Default value
                var rows = csvData.trim().split('\n');
    }

    var newTable = document.createElement("table");
    newTable.classList.add("selectedTables");

    var headerRow = newTable.insertRow(-1);

    // var rows = csvData.trim().split('\n');
    var header= rows[0].split(',');
    var headers = [];
    headers.push(rows[0].split(',')[0],rows[0].split(',')[1]);
    var dates = [];
    var a = [];
    var p = [];

    switch(viewByOption){
        case "yearly":
            var lastMonthIndex = header[header.length - 1];
            var lastMonthValues = lastMonthIndex.split('-')[0];
    
            for (let i = 0; i<header.length;i++){
                if(header[i].split('-')[0] == lastMonthValues){
                    a.push(i);
                    dates.push(header[i]);
                    headers.push(header[i])
                }
            }
            switches(selectedOption,rows,p);
            break;
        case "yearlyStan":
            var lastMonthIndex = header[header.length - 1];
            var lastMonthValues = lastMonthIndex.split('-')[0];
    
            for (let i = 0; i<header.length;i++){
                if(header[i].split('-')[0] == lastMonthValues){
                    a.push(i);
                    dates.push(header[i]);
                    headers.push(header[i])
                }
            }
            switches(selectedOption,rows,p);
            break;
        case "monthly":
            var selectedYear = document.getElementById("years").value;
            yearDropdown.style.display = viewByOption.includes("monthly") ? "block" : "none";
            switch (selectedYear) {
                case "2017":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2018":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2019":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2020":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2021":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2022":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2023":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                default:
                    var lastMonthIndex = header[header.length - 1];
                    for (let i = (header.length - 1) - 11; i < header.length; i++) {
                        a.push(i);
                        dates.push(header[i]);
                        headers.push(header[i]);
                    }
                    break;
            }

            switches(selectedOption,rows,p);
            break;
        case "monthlyStan":
            var selectedYear = document.getElementById("years").value;
            yearDropdown.style.display = viewByOption.includes("monthly") ? "block" : "none";
            switch (selectedYear) {
                case "2017":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2018":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2019":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2020":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2021":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2022":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                case "2023":
                    monthlyCases(selectedYear,header,a,dates,headers)
                    break;
                default:
                    var lastMonthIndex = header[header.length - 1];
                    for (let i = (header.length - 1) - 11; i < header.length; i++) {
                        a.push(i);
                        dates.push(header[i]);
                        headers.push(header[i]);
                    }
                    break;
            }

            switches(selectedOption,rows,p);
            break;
        default: 
            var lastMonthIndex = header[header.length - 1];
            var lastMonthValues = lastMonthIndex.split('-')[0];
    
            for (let i = 0; i<header.length;i++){
                if(header[i].split('-')[0] == lastMonthValues){
                    a.push(i);
                    dates.push(header[i]);
                    headers.push(header[i])
                }
            }
            switches(selectedOption,rows,p);
            break;
    }
    // console.log('header',header)
    console.log('headers',headers)
    console.log('dates',dates)
    console.log('a',a)


    // Create a new table
    var newTable = document.createElement("table");
    newTable.classList.add("selectedTables");

    var headerRow = newTable.insertRow(-1);

    for (var i = 0; i < headers.length; i++) {
        var cell = headerRow.insertCell(-1);
        cell.innerHTML = headers[i];
    }

    for (var j = 0; j < p.length; j++) {
        var product = rows[p[j]].split(',')[0].trim();
        var newRow = newTable.insertRow(-1);
        newRow.classList.add("newRowClass");

        // Retrieve all data for the selected item from the CSV file
        for (var m = 0; m < lines.length; m++) {
            var cells = lines[m].split(",");
            if (cells.length >= 2 && cells[0] === product) { 
                var cell = newRow.insertCell(-1);
                cell.innerHTML = cells[0];
                var cell = newRow.insertCell(-1);
                cell.innerHTML = cells[1];

                for (var n = 0; n < a.length; n++) {
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = cells[a[n]];
                    // prices.push(cells[a[n]]);
                }
                break;
            }
        }
        // Add a heat map to each row
        addHeatMapToRow(newRow);
    }
    var plot = 'charts';
    selectedTable.appendChild(newTable);

    if (viewByOption ==="yearly") {
        createGPlot(plot,csvData, dates,a,p);
    }
    else if (viewByOption ==="monthly") {
        createGPlot(plot,csvData, dates,a,p);
    }
    else if(viewByOption === "yearlyStan") {
        createGPlot(plot,csvData1, dates,a,p);
    }
    else if(viewByOption === "monthlyStan") {
        createGPlot(plot,csvData1, dates,a,p);
    }

}

function cases(rows, w,p){
    for (let j = 0; j<w.length;j++){
        for (let i = 1; i < rows.length; i++){
            if(rows[i].split(',')[0].trim() == w[j]){
                p.push(i);
            }
        } 
    }
    return p;
}

function switches(selectedOption,rows,p){
    switch(selectedOption){
        case "Vegetables":
            var r = veg.trim().split(',');
            return cases(rows, r,p);
            // console.log(p)
            break;
            
        case "Meat":
            var s = meat.trim().split(',');
            return cases(rows, s,p);
            // console.log(p)
            break;
        case "Fruits":
            var t = fruit.trim().split(',');
            return cases(rows, t,p);
            // console.log(p)
            break;
        case "Frozen":
            var u = froz.trim().split(',');
            return cases(rows, u,p);
            // console.log(p)
            break;
        case "Dairy":
            var v = dairy.trim().split(',');
            return cases(rows, v,p);
            // console.log(p)
            break;
        case "Canned":
            var w = canned.trim().split(',');
            return cases(rows, w,p);
            // console.log(p)
            break;
            // default:
            //     console.error("Unexpected selectedOption:", selectedOption);
    }
}

var veg = `
Potatoes,Sweet potatoes,Tomatoes,Cabbage,Carrots,Onions,Celery,Cucumber,Mushrooms,Iceberg lettuce,Romaine lettuce,Broccoli,Peppers,Squash,Salad greens
`;
var meat = `
Beef stewing cuts,Beef striploin cuts,Beef top sirloin cuts,Beef rib cuts,Ground beef,Pork loin cuts,Pork rib cuts,Pork shoulder cuts,Whole chicken,Chicken breasts,Chicken thigh,Chicken drumsticks,Bacon,Wieners,Salmon,Shrimp
`;
var fruit = `
Apples,Oranges,Oranges,Bananas,Pears,Lemons,Limes,Grapes,Cantaloupe,Strawberries
`;
var froz = `
Meatless burgers,Frozen french fried potatoes,Frozen green beans,Frozen broccoli,Frozen corn,Frozen mixed vegetables,Frozen peas,Frozen pizza,Frozen spinach,Frozen strawberries
`;
var dairy = `
Milk,Milk(2),Soy milk,Eggs,Nut milk,Cream,Butter,Margarine,Block cheese,Yogurt
`;
var canned = `
Canned salmon,Canned tuna,Canned baked beans,Canned tomatoes,Canned soup,Canned beans and lentils,Canned corn,Canned peach,Canned pear
`;


// Example usage
var csvData = `
Product,Unit of Measurement,Jan-2017,Feb-2017,Mar-2017,Apr-2017,May-2017,Jun-2017,Jul-2017,Aug-2017,Sep-2017,Oct-2017,Nov-2017,Dec-2017,Jan-2018,Feb-2018,Mar-2018,Apr-2018,May-2018,Jun-2018,Jul-2018,Aug-2018,Sep-2018,Oct-2018,Nov-2018,Dec-2018,Jan-2019,Feb-2019,Mar-2019,Apr-2019,May-2019,Jun-2019,Jul-2019,Aug-2019,Sep-2019,Oct-2019,Nov-2019,Dec-2019,Jan-2020,Feb-2020,Mar-2020,Apr-2020,May-2020,Jun-2020,Jul-2020,Aug-2020,Sep-2020,Oct-2020,Nov-2020,Dec-2020,Jan-2021,Feb-2021,Mar-2021,Apr-2021,May-2021,Jun-2021,Jul-2021,Aug-2021,Sep-2021,Oct-2021,Nov-2021,Dec-2021,Jan-2022,Feb-2022,Mar-2022,Apr-2022,May-2022,Jun-2022,Jul-2022,Aug-2022,Sep-2022,Oct-2022,Nov-2022,Dec-2022,Jan-2023,Feb-2023,Mar-2023,Apr-2023,May-2023,Jun-2023,Jul-2023,Aug-2023,Sep-2023
Beef stewing cuts,per kilogram,13.57,14.24,14.07,13.1,13.75,13.99,14.53,14.67,14.73,13.94,13.05,14.18,13.4,11.73,13.36,12.42,14.01,16.21,13.1,14.82,11.89,11.39,11.43,13.98,11.77,11.26,11.72,12.66,14.45,15.7,14.21,15.74,14.46,11.48,13.33,14.87,13.92,13.14,15.17,14.7,16.5,18.8,17.79,16.98,13.94,13.47,15.5,13.67,14.55,15.43,14.95,15.19,15.74,16.6,16.96,17.27,15.65,16.01,16.37,17.24,14.37,16.89,16.75,17.53,17.61,18.78,19.43,17.86,14.69,18.74,16.78,14.83,16.44,16.46,15.43,18.02,19.08,19.39,18.58,19.93,17.63
Beef striploin cuts,per kilogram,16.51,19.92,18.49,26.41,20.96,19.02,19.83,19.18,26.36,26.41,16.35,13.64,16.29,17.65,22.66,17.94,18.05,20.76,26.99,15.89,20.89,16.46,18.27,15.93,18.61,16.94,17.37,15.84,19.9,18.63,16.83,16.56,18.96,18.87,21.17,15.5,17.09,15.86,17.92,18.77,26.45,30.24,23.7,22.66,27.68,24.65,23.17,17.1,29.78,21.94,22.63,31.04,21.4,23.67,24.34,24.78,24.96,26.48,26.67,24.4,25.32,23.41,26.7,25.89,24.56,23.85,24.41,25.2,23.22,27.81,22.44,18.62,29.17,21.31,23.49,26.04,24.57,26.4,37.21,41.8,27.03
Beef top sirloin cuts,per kilogram,12.09,9.95,15.8,15.96,14.33,14.36,15.05,13.21,14.77,13.78,13,13.23,17.14,13,11.39,14.27,13.52,13.09,13.55,12.97,12.34,13.31,12.39,9.71,13.19,11.84,16.82,16.66,16.96,13.83,13.43,13.82,13.39,13.36,12.79,17.17,14.66,13.88,14.03,12.74,20.11,19.21,15.93,15.64,12.25,13.79,14.99,12.75,13.33,13.8,15.29,13.14,14.49,17.45,15.6,16.87,15.5,17.65,19.88,13.4,14.74,18.27,19.74,15.66,15.64,18.27,14.29,16.36,18.47,14.81,14.52,14.48,15.28,17.31,16.57,20.88,19.77,21.76,20.14,25.94,20.57
Beef rib cuts,per kilogram,24.63,24.87,25.12,18.99,25.65,18.74,26.86,17.9,21.12,15.91,25.64,13.62,25.8,24.91,15.68,26.54,20.49,17.04,18.66,17.7,24.19,15.54,23.7,15.76,19.92,22.13,27.09,17.18,20.51,18.33,18.29,27.14,27.94,14.35,19.51,15.48,19.29,22.65,29.25,18.46,22.86,26.62,20.49,22.29,30.86,27.32,31.26,18.41,25.29,21.18,19.24,20.89,28.43,29.95,33.86,33.24,31.27,22.95,31.16,33.27,31.34,33.91,33.74,35.47,21.99,26.27,27.64,26.57,32.85,21.88,28.93,23.35,31.95,33.84,26.17,25.45,27.16,27.05,36.22,28.37,32.33
Ground beef,per kilogram,8.13,7.91,8.12,8.67,8.89,8.98,9.71,9.35,8.29,8.07,7.6,7.79,7.28,8.88,7.77,7.46,8.69,7.73,8.85,8.69,8.16,8.69,6.91,7.63,7.98,7.94,7.87,8.04,8.38,8.8,8.7,8.52,8.47,8.75,8.74,9.34,9.06,9.29,9.71,10.16,12.49,12.58,10.28,9.26,9.66,9.6,9.45,9.79,8.6,9.04,8.89,8.63,8.83,8.76,8.84,9.74,10.02,9.51,10.97,10.47,11.12,9.96,10.35,9.99,10.51,9.65,10.45,11.01,10.93,9.67,9.69,10.28,9.99,9.86,10.09,10.2,11.02,11.09,11.34,12.06,11.52
Pork loin cuts,per kilogram,5.92,6.59,6.67,6.49,7.71,6.97,7.78,6.6,6.81,7.22,6.28,6.21,5.29,6.85,7.65,7.37,6.34,8.35,7.35,6.41,6.97,5.87,6.92,6.63,6.77,7.49,6.89,8.1,7.64,7.5,8.03,7.48,6.78,6.46,6.37,7.29,6.49,7.52,7.54,7.48,7.57,7.7,7.18,7.91,8.45,7.63,8.41,7.3,7.17,6.75,6.76,7.13,7.96,7.24,7.7,7.4,7.91,8.07,7.01,9.18,8.9,8.03,7.74,9.24,8.01,8.05,7.11,8.23,8.08,7.27,7.1,8.56,8.46,7.73,8.13,8.34,8.7,7.7,8.24,8.61,9.1
Pork rib cuts,per kilogram,5.88,8.35,6.33,7.08,7.31,6.7,8.15,8.12,9.73,6.8,6.13,8.42,8.39,6.57,7.45,7.92,8.48,7.14,6.6,7.13,7.02,7.15,6.3,7.79,7.97,7.26,7.84,8.13,7.42,7.3,8.68,8.12,7.13,6.94,5.88,6.79,7.59,6.94,7.6,8.88,8.03,8.95,8.7,7.97,9.41,10.29,10.67,7.56,7.81,7.15,7.93,8.57,10.48,11.37,12.87,12.39,11.1,11.55,11.88,9.15,10.53,9.99,10.02,9.61,9.99,10.86,11.04,9.02,9.1,9.97,8.97,9.81,8.54,8.45,8.79,8.81,8.94,9.34,7.94,8.88,9.58
Pork shoulder cuts,per kilogram,6.01,4.77,4.91,5.17,6.29,6.18,6.22,6.29,4.18,3.57,3.36,5.47,6.96,5.49,7.49,5.87,5.42,8.48,8.05,8.14,7.82,5.84,5.44,5.01,5.53,5.8,6.23,6.27,8.21,8.22,8.36,7.98,7.61,6.97,5.55,6.97,7.31,6.08,7.31,7.19,7.72,7.48,6.67,6.11,6.35,5.88,7.25,5.88,7.26,6.96,5.79,5.62,6.86,7.37,7.37,6.74,7.78,5.91,7.02,7.52,6.52,6.3,6.39,6.74,7.18,6.73,7.47,6.71,8.1,7.9,6.66,6.79,7.38,6.94,6.49,7.77,8.06,8.18,8.34,8.7,8.92
Whole chicken,per kilogram,5.76,4.83,5.2,5.9,5.49,5.11,5.59,5.91,4.96,5.35,4.8,6.71,5.67,4.73,4.69,5.41,4.88,4.69,4.33,4.51,4.83,4.86,4.68,6.88,5.13,6.2,5.38,6.35,4.82,4.88,4.65,4.43,4.73,4.93,5.01,4.67,4.97,4.84,5.01,5.22,4.7,4.84,5.09,5.24,4.76,5.92,4.6,5.47,4.74,5.08,4.91,5.06,5.14,5.26,5.71,7.05,5.62,5.96,5.8,6.69,5.69,5.66,5.9,5.55,4.89,5.56,5.16,6.03,6.09,5.82,5.89,6.43,5.65,6.49,6.59,6.02,6.21,6.44,6.63,6.04,6.42
Chicken breasts,per kilogram,12.05,11.06,12.37,12.96,11.13,10.47,10.63,12.21,12.31,11.65,9.85,11.01,13.65,11.76,11.12,11.31,12.25,10.75,10.84,10.5,11.59,11.63,12.96,12.22,12.95,10.7,11.32,11.55,11.81,11.73,13.43,13.34,12.58,12.26,12.78,13.09,12.05,13.5,13.05,13.25,11.85,11.79,11.57,10.86,12.28,12.83,13.6,11.99,12.73,13.07,12.57,11.62,12.39,11.53,12.47,12.3,13.02,15.38,12.98,13.19,13.36,13.61,12.68,14.19,13.35,12.58,13.67,12.93,13.11,12.73,14.77,13.44,13.51,13.57,13.74,15.23,14.48,14.51,15.21,14.31,13.81
Chicken thigh,per kilogram,8.59,7.14,7.38,7.66,6.85,6.22,6.51,7.32,6.64,7.85,6.83,8.76,6.11,6.37,6.37,5.63,5.05,5.2,6.68,7.63,6.78,8.05,6.97,7.16,6.41,6.4,6.54,6.8,5.97,6.9,6.26,7.51,6.32,6.24,7.14,7.26,6.88,8.62,7.05,7.27,6.37,5.8,6.86,6,6.94,6.1,6.68,7.29,6.7,8.32,6.75,7.34,6.58,7.22,7.36,6.96,7.97,7.48,7.9,7.85,7.66,8.18,7.7,8.42,7.2,7.09,7.53,7.25,8.16,9.83,8.03,7.85,7.61,8.71,8.15,7.9,9.36,9.06,8.98,8.31,7.99
Chicken drumsticks,per kilogram,7.92,6.75,6.6,6.95,6.47,5.65,6,6.54,6.03,7.12,5.97,7.75,5.47,5.88,5.93,5.31,4.69,4.91,6.12,7.05,6.57,7.2,6.6,6.68,5.92,6.06,6.02,6.29,5.56,6.32,6.02,6.55,5.85,5.57,6.42,6.64,6.07,7.59,6.28,6.91,6.21,5.65,6.47,5.71,6.23,5.43,5.73,6.44,5.73,7.15,5.73,6.15,5.56,5.91,6.46,6.13,6.86,6.11,6.46,6.82,7.2,7.47,6.9,7.34,6.39,6.13,6.66,7.09,6.99,7.78,7,7.2,6.71,7.69,6.74,6.3,6.89,8.31,7.24,6.94,6.55
Bacon,500 grams,4.06,4.94,5.94,5.54,4.85,5.39,5.32,6.37,5.8,5.4,4.75,4.9,4.94,5.07,5.51,5.08,5.44,5.36,5.49,5.94,6.06,5.52,5.45,5.29,5.36,5.63,5.25,4.86,5.51,5.42,5.94,5.77,5.97,5.2,5.58,5.88,5.13,5.43,6.08,5.55,5.44,5.14,5.56,5.76,5.7,5.79,5.38,5.67,5.71,5.53,5.75,5.8,6.11,6.37,6.56,6.13,6.74,6.68,6.3,7.24,6.29,6.56,6.49,6.73,6.74,6.54,6.81,6.86,7.19,6.94,6.76,7.13,6.68,6.64,6,6.69,6.57,6.71,6.69,6.82,6.84
Wieners,500 grams,2.81,2.77,2.81,2.47,2.66,2.55,2.51,2.53,2.75,3,2.97,3.21,2.84,2.72,2.99,2.64,2.81,2.77,2.85,3.02,3.27,3.07,3.03,3.69,2.78,2.81,3.14,3.09,2.78,2.94,3.17,3.15,3.14,3.37,3.25,3.81,3.31,2.74,3.23,3.34,3.46,2.99,3.49,3.65,3.32,3.46,3.43,3.7,2.65,3.69,3.45,3.34,3.48,3.54,3.44,3.76,3.41,3.27,3.42,4.27,3.34,3.54,3.67,4.18,3.96,3.92,3.77,3.93,4.06,3.5,3.68,4.08,3.28,3.84,3.43,3.3,3.97,3.97,3.74,3.93,3.53
Salmon,per kilogram,20.53,20.77,21.3,20.25,21.11,20.8,20.55,20.14,20.05,19.91,19.82,19.5,20.06,19.93,20.11,20.32,20.28,20.43,21.19,20.77,19.92,20.27,21.16,20.19,20.96,20.85,21.13,20.48,20.49,20.54,20.4,20.62,20.13,19.93,20.76,19.9,20.36,22.15,22.87,22.16,22.46,22.31,21.3,20.61,21.37,21.62,22.38,18.55,21.56,21.32,21.8,21.33,21.82,21.99,22.34,22.35,22.21,22.43,22.22,21.46,23.58,23.39,23.58,23.65,25.83,26.01,26.57,26.29,25.66,22.89,23.71,22.41,24.63,25.01,25.97,24.38,27.17,27.74,28.03,26.52,26.67
Shrimp,grams,6.3,6.63,6.87,6.66,6.74,8.09,7.36,7.11,7.51,6.73,6.8,7.34,6.35,6.99,7.35,6.84,7.02,8.48,7.47,6.73,6.61,6.7,6.98,7.53,6.67,6.59,6.68,6.58,7.36,6.94,6.62,6.94,6.98,6.81,6.8,6.95,7,6.61,6.54,6.56,6.94,6.42,6.23,6.57,6.96,6.74,6.89,6.8,6.14,6.59,6.16,6.71,6.91,6.56,6.62,6.72,6.9,7.5,7.55,7.72,7.3,8.05,7.54,7.84,8.31,7.98,7.8,7.77,7.53,7.8,7.3,8.22,7.83,7.45,7.81,7.59,7.75,7.79,7.69,7.81,8.16
Milk,1 litre,2.79,2.81,2.82,2.82,2.82,2.82,2.81,2.8,2.8,2.81,2.82,2.82,2.81,2.82,2.8,2.8,2.79,2.81,2.82,2.84,2.94,2.98,2.96,2.96,2.98,2.98,2.98,2.97,2.95,2.96,2.94,2.95,2.95,2.95,2.97,2.97,3,3,3.06,3.02,3.01,3,3.01,3.01,3.04,3.05,3.04,3.05,3.08,3.16,3.16,3.15,3.15,3.15,3.15,3.13,3.14,3.16,3.16,3.17,3.16,3.31,3.34,3.35,3.34,3.35,3.34,3.34,3.47,3.45,3.46,3.46,3.45,3.56,3.59,3.58,3.55,3.59,3.58,3.56,3.56
Milk(2),2 litres,3.76,3.78,3.77,3.78,3.76,3.74,3.76,3.75,3.74,3.72,3.73,3.74,3.74,3.75,3.72,3.73,3.73,3.72,3.74,3.72,3.7,3.71,3.7,3.69,3.68,3.69,3.69,3.68,3.68,3.69,3.7,3.69,3.68,3.68,3.68,3.69,3.72,3.75,3.78,3.78,3.79,3.79,3.81,3.82,3.86,3.86,3.83,3.79,3.79,3.88,3.9,3.91,3.92,3.92,3.93,3.94,3.92,3.91,3.92,3.93,3.92,4.18,4.21,4.21,4.22,4.25,4.49,4.52,4.75,4.7,4.72,4.75,4.73,4.91,4.95,4.94,4.95,4.97,4.99,4.98,4.95
Soy milk,1.89 litres,3.98,3.96,4.07,3.99,3.88,4.07,4.13,3.9,3.97,3.86,4.07,3.89,3.78,3.85,3.9,3.67,3.77,3.7,3.88,3.63,3.58,3.69,3.78,3.84,3.67,3.97,4,3.76,3.94,3.9,3.89,3.84,3.83,3.77,3.77,4.02,3.84,3.84,3.98,3.81,4.08,3.84,3.9,3.97,3.97,4.1,3.78,3.96,3.78,3.96,3.92,3.79,4.05,4.19,3.99,4.04,3.96,3.77,3.7,4.04,3.84,3.99,4.18,4.11,4.31,4.37,4.36,4.22,4.34,3.92,4.44,4.34,4.65,4.44,4.34,4.74,4.44,4.64,4.33,4.51,4.75
Eggs,dozen,3.4,3.43,3.52,3.47,3.33,3.28,3.63,3.47,3.41,3.56,3.34,3.49,3.09,3.61,3.36,3.5,3.37,3.48,3.53,3.67,3.52,3.38,3.47,3.16,3.45,3.57,3.29,3.26,3.45,3.43,3.33,3.45,3.59,3.59,3.51,3.32,3.64,3.36,3.3,3.94,3.96,3.97,4.01,4.06,4.05,4.08,4.07,4.06,4.05,4.1,4.23,4.24,4.26,4.26,3.59,4.34,3.77,4.37,4.08,4.47,4.26,4.24,4.28,4.75,4.85,4.53,5.02,5.04,5.09,5.12,4.56,4.79,4.43,4.79,4.2,5.01,5.06,5.09,5.16,4.87,4.65
Nut milk,1.89 litres,3.85,3.95,3.91,3.88,3.96,3.99,4.01,3.88,3.95,3.88,3.99,3.88,3.83,3.76,3.76,3.63,3.77,3.68,3.83,3.7,3.64,3.7,3.76,3.78,3.66,3.86,3.89,3.8,3.87,3.91,3.93,3.73,3.74,3.8,3.79,3.9,3.81,3.86,3.98,3.88,3.95,3.89,3.9,3.95,3.93,4.04,3.93,4.03,3.88,4,3.97,3.86,4.03,4.12,4.02,4.01,3.99,3.85,3.8,4.03,3.93,4,4.08,4.11,4.26,4.39,4.26,4.31,4.34,4.38,4.38,4.36,4.6,4.42,4.4,4.7,4.44,4.73,4.36,4.45,6
Cream,1 litre,4.56,4.51,4.92,5.02,4.66,4.64,4.72,4.72,4.91,4.87,4.79,4.95,4.79,4.93,4.72,4.69,4.96,4.86,4.8,4.97,4.93,5.12,5.1,5.14,5.15,4.9,4.86,4.92,4.7,4.74,4.92,4.94,4.94,4.86,4.83,5.04,4.8,5.14,5,5.05,5.12,5.25,5.27,5.18,5.33,5.35,5.12,5.06,5.13,5.09,4.96,4.99,5.19,5.14,5.43,5.53,5.49,5.21,5.26,5.48,5.37,5.2,5.25,5.72,5.83,5.66,5.52,5.46,5.73,5.49,5.44,5.41,5.67,5.72,5.82,5.56,5.81,6.11,6.03,5.79,6.03
Butter,454 grams,5.05,4.96,4.95,4.4,5.35,5.24,4.54,5.24,4.23,4.67,4.68,5.29,5.28,5.19,4.07,4.54,5.23,4.41,4.29,4.51,3.99,4.73,4.33,4.72,5.03,4.5,4.78,4.24,4.61,4.27,4.64,4.36,4.14,4.32,4.01,4.37,4.26,4.8,4.62,4.7,4.87,4.72,4.36,4.1,4.87,5.3,4.96,5.29,4.52,5.12,4.43,5.17,5.25,5.38,5.18,5.47,4.9,5.23,4.8,5.35,5.21,5.69,5.6,5.53,5.92,6.16,5.93,5.61,5.98,5.62,5.97,6.71,6.11,6.32,6.08,6.53,6.49,6.22,6.37,5.95,7.58
Margarine,907 grams,4.32,4.26,4.06,4.29,4.43,4.06,4.32,4.3,4.61,4.66,4.32,4.13,4.14,4.38,4.02,4.5,4.48,4.19,4.37,4.5,4.28,4.1,4.54,4.6,4.11,4.64,4.6,4.67,4.57,4.57,4.52,4.77,4.48,4.47,4.07,4.24,4.31,4.16,4.48,4.48,4.4,4.38,4.16,4.53,4.76,4.59,4.4,4.38,4.34,4.64,4.46,4.87,4.91,5.01,4.97,5.11,5.02,5.02,5.26,5.08,5.43,5.35,6.14,6.33,6.19,6.66,6.75,7.23,6.95,7.03,7.14,7.3,7.22,6.85,7.25,7.22,7.27,7.52,7.8,7.61,6.75
Block cheese,500 grams,6.01,6.19,5.99,5.3,5.79,6.01,5.85,5.95,5.52,5.46,5.74,5.32,5.52,5.8,5.25,5.93,5.85,5.83,5.7,6.1,5.78,5.38,5.15,5.21,5.62,5.64,6.06,5.46,5.79,5.82,6.02,5.8,5.8,5.4,5.83,5.36,5.92,5.74,6.04,6.27,5.97,6.16,6.07,5.84,5.69,5.76,5.72,6.04,5.99,6.19,5.78,6.05,6.26,6.52,6.2,6.31,6.3,6.14,6.12,5.98,6.41,6.57,6.9,6.52,6.83,6.77,6.41,6.84,6.71,6.52,6.65,6.29,6.83,6.59,6.62,6.65,6.58,6.86,6.86,6.76,3.97
Yogurt,500 grams,2.94,3.12,3.18,3.2,3.21,3.13,3.21,3.27,3.18,3.34,3.2,3.43,3.05,3.17,3.06,3.22,3.14,3.16,3.26,3.15,3.08,3.19,3.32,3.26,3.24,3.27,3.39,3.2,3.23,3.27,3.16,3.14,3.19,3.19,3.17,3.12,3.15,3.14,3.21,3.18,3.16,3.29,3.2,3.32,3.38,3.38,3.42,3.26,3.19,3.23,3.26,3.34,3.3,3.3,3.45,3.47,3.49,3.46,3.47,3.4,3.43,3.38,3.51,3.61,3.64,3.74,3.71,3.65,3.58,3.58,3.75,3.78,3.77,3.75,3.78,3.83,3.8,3.83,4,3.89,5.19
Apples,per kilogram,5.37,5.28,5.16,5.43,5.29,5.48,5.4,5.51,5.23,4.7,4.74,4.68,5.17,5.14,5.1,5.3,5.4,5.58,5.49,5.5,5.32,4.55,5.38,5.5,5.69,5.48,5.63,5.51,5.75,5.85,6.1,6.31,5.84,5.48,5.79,5.74,5.88,5.69,6.05,5.67,6,6.02,6.05,6.27,5.57,5.84,6.1,6.3,6.23,5.87,6.22,6.3,6.47,6.39,6.21,6.45,6.37,5.99,6.28,6.55,6.28,6.39,6.11,6.28,6,6.39,6.89,7.15,7.02,6.42,7.07,6.78,6.16,6.97,7.03,6.56,6.88,6.97,7.15,7.48,7.06
Oranges,per kilogram,4.16,4.05,4.25,4.59,4.85,5.06,4.23,4.57,4.25,3.82,4.24,4.48,4.62,3.57,4.38,4.06,4.26,4.29,4.17,4.2,3.98,3.83,5.06,4.87,4.43,4.44,4.96,4.55,4.79,4.3,4.59,4.36,3.97,4.47,4.81,5,4.34,4.11,4.66,4.86,4.95,5.34,4.95,4.3,4.55,4.74,4.51,5.18,4.51,4.83,4.35,4.03,5.13,5.13,5.01,4.97,5.19,5.19,5.03,5.31,4.71,5.07,5.37,5.22,5.19,4.12,5.35,5.55,6.03,6.22,6.27,5.62,5.8,5.51,5.65,5.76,5.88,6.06,5.8,6.1,6
Oranges,1.36 kilogram,5.29,5.65,5.32,5.38,6.49,6.63,6.12,5.81,5.09,5.17,6.08,5.91,5.7,5.29,5.87,5.36,6.2,6.24,6.18,5.63,5.32,5.22,6.48,6.18,5.95,5.94,5.75,5.66,5.91,5.51,5.86,5.85,5.39,5.3,5.76,5.63,4.59,5.23,5.28,5.46,5.83,6.37,6.14,5.96,5.58,6.11,5.75,6.38,5.12,5.52,5.64,5.55,5.45,6.02,6.02,6.15,5.32,5.67,5.5,6.12,5.73,6.84,5.93,6.7,6.54,6.27,6.81,6.95,6.73,6,7.24,7.27,6.83,6.89,6.26,7.18,7.26,7.73,7.63,7.84,6.67
Bananas,per kilogram,2.11,2.15,2.15,2.14,2.16,2.16,2.14,2.14,2.13,2.13,2.07,2.1,2.12,2.17,2.16,2.16,2.16,2.15,2.15,2.12,2.1,2.06,2.05,2.03,2.05,2.08,2.09,2.09,2.08,2.1,2.06,2.04,2.06,2.07,2.06,2.05,2.09,2.12,2.07,2.06,2.09,2.1,2.05,2.04,2.11,2.14,2.08,2.04,2.09,2.09,2.07,2.06,2.08,2.07,2.05,2.01,2.06,2.01,2.02,2.08,2.14,2.07,2.12,2.17,2.18,2.16,2.14,2.15,2.15,2.18,2.15,2.15,2.17,2.17,2.16,2.22,2.18,2.19,2.17,2.16,2.18
Pears,per kilogram,5.32,5.38,5.36,4.85,5.1,5.21,5.21,5.05,4.81,4.39,4.82,4.88,5.17,4.92,5.29,5.21,5.37,5.19,4.96,4.79,5.47,5.11,4.72,5.27,5.46,5.14,5.31,5.14,5.3,5.64,4.85,4.91,4.75,5.45,5.21,5.58,5.56,5.88,5.86,6.02,6.05,5.83,5.61,5.62,6.03,6.04,5.83,6,5.91,5.77,6.21,6.03,6.01,5.65,5.91,6.06,6.25,6.48,6.5,6.76,6.52,6.34,6.56,6.36,6.33,6.47,6.57,7.2,7.14,6.52,7,7.17,6.96,7.08,6.98,6.92,6.77,6.44,6.78,7.28,6.89
Lemons,unit,1.1,1.14,1.17,1.16,1.17,1.2,1.17,1.09,1.04,1.01,0.96,1.07,1.01,1,1.05,1.03,0.97,1.01,1.02,1.06,1.04,0.93,0.98,0.84,1.04,1.03,0.99,0.97,0.99,1.02,0.99,1.01,1,0.97,1.01,1.02,0.95,0.91,1.04,1.05,1.1,1.08,1.08,1.12,1.09,1.1,1.09,1.06,1.04,1,0.98,0.99,1.01,1.03,1.1,1.01,1.02,0.99,0.99,1.03,0.94,1.04,1.02,1.02,1.04,1.01,0.97,1.03,1.13,1.15,1.13,1.13,1.12,1.17,1.13,1.19,1.17,1.26,1.25,1.31,1.14
Limes,unit,0.76,0.85,0.89,0.9,0.9,0.87,0.81,0.82,0.82,0.7,0.69,0.8,0.56,0.82,0.87,0.87,0.9,0.87,0.89,0.86,0.85,0.76,0.8,0.83,0.67,0.75,0.81,0.89,0.9,0.9,0.9,0.89,0.8,0.82,0.79,0.87,0.82,0.79,0.88,0.84,0.86,0.85,0.82,0.86,1,0.99,0.96,0.95,0.88,0.85,0.86,0.9,0.92,0.95,0.99,0.94,1,0.95,0.86,0.97,0.87,1.13,1.28,1.56,1.57,1.15,1.07,1.06,1.07,1.05,1.13,1.11,0.94,1.04,1.07,1.25,1.46,1.49,1.36,1.36,1.36
Grapes,per kilogram,9.21,7.53,7,7.1,7.92,5.91,6.35,5.67,6.27,6.2,6.62,6.81,8.58,6.68,6.08,6.57,7.32,6.4,7.54,7.35,6.65,6.66,5.91,6.69,6.99,6.9,6.98,6.08,7.5,7.07,5.83,6.17,5.99,6.1,5.93,6.63,6.7,6.5,6.8,7.28,7.9,7.14,7.51,7.37,7.32,7.08,8,7.22,7.77,7.33,7.91,7.98,9.09,8.36,8.11,7.96,7.28,7.23,7.15,8.01,8.26,9.42,8.82,8.21,9.04,8.43,8.7,8.2,7.41,7.19,8.39,8.73,9.04,9.15,8.81,8.23,11.37,9.6,8.21,7.83,8.67
Cantaloupe,unit,3.36,3.02,3.01,3.31,3.18,3.63,3.58,2.9,2.99,3.39,3.13,3.37,3.9,3.27,2.92,3.62,3.27,3.53,3.25,3.18,3.14,2.48,4.04,3.41,3.53,3.07,3.56,3.77,3.5,4.28,4.15,3.17,3.39,3.71,3.74,3.69,3.58,3.51,3.58,3.83,4.05,4.04,4.01,3.38,3.3,4.55,4.36,3.57,4.17,4.33,3.64,3.81,3.72,3.57,3.85,3.41,3.57,3.84,4.6,4.15,4.3,4.41,4.23,4.9,5.16,4.95,4.75,3.96,4.91,4.7,5.23,4.83,4.96,5.42,5.12,5.16,5.28,5.22,4.95,3.79,4.2
Strawberries,454 grams,4.58,4.04,4.23,3.49,3.56,3.78,4.13,4.24,3.78,3.82,4.73,5.6,4.58,3.75,3.77,4.64,3.36,3.77,3.96,3.65,3.62,3.54,4.71,6.7,5.34,4.5,3.39,3.94,3.82,4.1,3.92,3.7,3.97,4.36,5,5.95,4.78,3.75,4.52,4.12,3.77,3.53,4.36,5.08,5.04,5.74,6.15,5.93,4.53,5.05,3.56,4.16,4.92,4.24,4.36,5.03,4.7,4.9,6.22,6.72,5.85,4.77,4.01,4.93,4.81,5.1,5.22,4.91,5.14,6.12,7.12,7.19,5.66,5.39,4.45,5.63,4.56,4.52,5.06,5.71,5.29
Avocado,unit,2.06,1.85,2.12,2.29,2.28,2.08,2.16,2.28,2.13,1.97,1.45,1.68,1.38,1.66,1.88,2.01,1.86,1.79,1.62,1.67,1.76,1.46,1.51,1.75,1.69,1.7,1.57,1.92,2.05,2.14,2.13,1.97,1.82,1.78,1.92,1.98,1.91,1.91,1.79,1.94,2.1,2.03,2.1,1.89,1.97,1.72,1.71,1.39,1.53,1.59,1.77,1.75,1.74,1.86,2.13,1.9,1.84,1.78,1.86,1.88,1.66,2.04,2.36,2.21,2.61,2.48,2.21,1.95,1.56,1.85,1.94,1.86,1.8,1.62,1.71,1.83,1.8,1.9,1.96,2.06,1.87
Potatoes,4.54 kilogram,4.31,4.18,4.46,4.08,4.71,5.15,6.43,5.57,5.1,4.22,4.18,4.78,3.86,4.64,4.7,4.11,4.24,5.1,6.17,5.63,4.59,4.62,4.63,4.47,4.77,5.11,4.3,4.89,5.36,5.37,5.82,5.64,5.36,4.02,4.97,3.78,4.62,5.38,5.28,5.65,5.97,5.88,5.49,5.4,5.73,5.85,5.2,3.38,4.17,5.02,4.88,5.53,5.98,5.45,5.21,5.38,4.98,5.02,5.02,5.38,5.45,5.38,5.18,5.38,5.82,5.67,6.5,6.05,5.89,5.04,5.84,5.23,5.97,5.72,5.84,6.22,6.5,6.84,6.29,6.83,6.27
Potatoes,per kilogram,3.74,3.82,3.93,3.98,4.58,4.54,4.55,4.57,4.21,4.14,4.39,4.13,4.4,4.01,3.85,3.79,3.9,4.07,4.15,4.1,4.19,4.17,4.13,4.12,4.22,4.05,4.18,4.11,4.21,4.91,4.8,4.59,4.97,4.72,4.79,4.63,4.85,4.75,4.49,4.6,4.76,4.76,4.92,4.85,4.45,4.48,4.48,4.41,4.71,4.45,4.43,4.55,4.93,4.4,5.03,5.05,5.1,5.07,5.25,4.71,4.71,4.96,4.83,4.9,5.17,5.61,5.71,5.64,5.58,5.51,5.77,5.29,5.37,5.44,5.38,5.13,5.57,5.51,5.77,5.69,5.78
Sweet potatoes,per kilogram,4.29,4.61,4.89,4.34,4.61,4.67,4.82,4.99,4.88,3.98,4.66,3.5,4.62,4.81,3.85,4.7,5,5.13,4.96,5.17,4.82,4.32,4.82,4.13,4.47,4.49,5.16,4.22,5.17,4.79,4.83,4.92,5.21,4.68,4.96,4.39,5.05,4.77,5.03,4.87,5.35,5.29,5.29,5.02,5,4.04,4.62,4.2,4.55,4.88,4.93,4.94,4.97,4.55,5.13,4.68,4.53,3.87,4.39,3.88,4.05,4.53,4.62,4.22,4.55,4.68,4.78,4.76,4.49,4.26,4.74,4.12,4.89,4.79,4.68,4.46,5.01,4.92,5.06,5.35,5.12
Tomatoes,per kilogram,5.6,5.34,5.14,4.75,4.92,4.93,4.84,4.4,4.5,4.71,4.94,6.03,6.92,6.1,5.85,5,4.73,4.47,4.77,4.33,4.21,4.21,5.04,6.15,6.63,5.68,5.59,5.21,4.77,4.46,4.8,4.58,4.36,4.72,5.91,6.54,7.51,7.52,7.63,6.68,5.73,6.42,6.76,6.48,7.12,7.07,7.12,7.33,7.77,7.38,6.56,5.15,4.77,5.09,5.24,5.22,5.37,5.29,6.39,6.9,6.78,6.81,6.31,5.48,5.5,5.32,6.09,5.82,5.89,5.29,7.86,8.46,8.42,8.08,7.19,6.57,6.47,5.98,6.43,6.15,6.11
Cabbage,grams,2.2,2.13,2.2,2.13,2.43,2.56,2.42,2.29,2.33,2.17,2.29,2.08,2.2,2.19,2.23,2.4,2.33,2.42,2.4,2.3,2.27,2.33,2.24,2.25,2.56,2.54,2.22,2.63,2.93,3.14,3.11,2.9,2.53,2.22,2.34,2.12,2.45,2.4,2.19,2.17,2.62,2.87,2.97,2.78,2.75,2.53,2.44,2.44,2.53,2.81,2.4,2.61,2.69,2.7,2.64,2.52,2.33,2.24,2.31,2.42,2.4,2.63,2.49,2.47,2.41,2.55,2.86,2.5,2.63,2.72,2.9,2.82,2.69,2.94,2.87,2.86,2.99,3.15,2.92,2.82,2.91
Carrots,1.36 kilogram,3.06,3.23,3.3,3.14,3.09,3.81,3.84,3.54,2.89,2.95,2.9,3.12,3.05,2.72,3.65,3.59,4.01,4,3.54,3.31,2.98,2.35,2.9,2.77,2.78,2.79,3.22,3.4,4.03,4.58,4.46,3.86,3.07,3.05,3.01,2.64,2.89,2.74,2.82,3.24,3.86,4.17,4.6,4.22,3.51,3.56,3.8,2.82,3.69,3.53,3.63,3.87,4.42,4.3,4.21,3.8,3.53,3.06,3.21,3.38,3.44,3.54,3.55,4.1,4.39,4.71,4.64,4.51,4.15,2.9,3.64,3.82,4.14,4.4,4.09,4.32,4.56,4.68,4.57,4.16,4.19
Onions,per kilogram,5.51,5.27,5.26,5.1,5.08,5.04,5.18,5.1,5.05,5,4.9,5.06,5.17,5.1,5.08,5,5.03,5.08,5.19,5.31,5.12,4.83,4.86,5.05,4.84,5.05,5.12,5.21,5.34,5.72,5.8,5.79,5.11,4.91,4.86,4.89,4.78,4.85,4.89,4.93,4.57,4.79,5.15,4.99,4.78,5.09,5.12,5.39,5.07,5.2,5.14,4.61,4.86,4.85,5.25,5.52,5.21,5.19,5.32,5.45,4.87,5.38,5.58,5.9,6.08,6.09,6.05,5.99,5.77,5.75,5.54,5.87,5.83,5.88,5.82,5.76,5.61,5.81,6.15,6.12,6.06
Onions,1.36 kilogram,3.61,3.65,3.6,3.75,3.74,3.85,4.27,4.26,3.51,3.61,3.41,3.66,3.48,3.1,3.55,3.54,3.58,3.82,4.11,3.97,3.56,2.97,3.22,3.14,3.24,3.23,3.71,3.61,4.06,4.44,4.61,4.62,3.65,3.64,3.57,3.12,3.34,3.11,3.16,3.49,3.78,4.13,4.19,4.13,3.89,4.04,4.23,3.19,4.1,3.97,4.16,4.02,4.6,4.07,4.2,4.73,4.13,3.63,3.77,3.87,3.94,4.35,4.37,4.78,5.23,5.29,5.32,5.24,5.06,3.43,4.34,4.43,4.71,4.92,4.71,4.79,4.89,4.92,5.09,4.81,4.81
Celery,unit,3.32,2.99,3.08,2.97,3.66,3.97,3.69,3.11,2.74,2.6,2.89,3.13,3.35,3.33,3.19,2.77,3.02,3.21,3.3,3.05,3.03,2.74,3.04,3.43,3.01,3.56,3.77,4.71,5.29,5.57,4.26,3.2,3.04,3.14,3.3,3.53,3.6,3.32,3.4,3.31,3.5,3.43,3.37,3.12,3.14,3.45,3.49,3.42,3.64,3.71,3.43,3.3,3.42,3.46,3.19,2.93,2.58,2.94,3.52,3.61,3.54,3.71,3.63,3.5,3.74,3.85,3.54,3.11,3.11,3.46,4.2,4.62,5.1,4.8,4.84,4.76,4.66,4.88,4.22,3.62,3.43
Cucumber,unit,2.19,1.96,2.12,2,1.95,1.89,1.92,1.8,1.8,1.9,1.95,2.27,2.3,2.27,1.85,1.58,2.01,2.1,1.86,2.1,1.98,1.92,1.93,2.02,2.34,2.22,1.97,1.68,1.77,1.76,1.71,1.87,1.94,2.07,2.15,2.26,2.32,2.36,2.03,1.92,1.91,1.89,1.96,2.01,2.07,1.96,2.23,2.13,2.37,2.34,1.94,1.65,1.68,1.84,2.05,1.98,1.83,1.91,2.17,2.19,2.07,2.29,1.99,1.62,2.04,1.99,2.09,1.86,2.04,1.97,2.35,2.22,2.43,2.49,2.37,2.11,2.11,1.92,2.04,2.07,2.02
Mushrooms,227 grams,2.43,2.15,2.35,2.27,2.38,2.27,2.29,2.43,2.33,2.18,2.1,2.16,2.23,2.07,2.23,2.42,2.41,2.42,2.4,2.36,2.47,2.27,2.21,2.21,2.29,2.37,2.24,2.46,2.19,2.5,2.42,2.5,2.51,2.38,2.58,2.41,2.36,2.32,2.44,2.6,2.61,2.6,2.55,2.69,2.88,2.78,2.51,2.64,2.66,2.64,2.71,2.67,2.56,2.79,2.85,2.85,2.79,2.73,2.78,2.85,2.91,2.84,2.79,2.81,3.01,2.87,3.08,2.94,3.04,2.89,3.04,2.9,3.04,2.98,3.03,2.89,2.91,3.01,3.16,3.08,3
Iceberg lettuce,unit,2.57,2.6,2.57,3.35,3.35,3,2.72,2.17,2.12,2.62,2.87,2.98,2.86,2.84,2.75,2.76,2.73,2.53,2.45,2.56,2.57,2.48,2.8,3.45,3,2.95,3.03,2.89,2.91,2.77,2.38,2.43,2.28,2.73,3.23,3.14,3.18,3.14,3.31,3.36,3.18,3.24,2.78,2.49,2.64,3.24,3.47,3.38,3.49,3.57,3.3,2.99,3.12,3,2.48,2.44,2.61,3.17,4.3,3.58,3.12,3.24,3.76,3.77,3.35,3.34,2.58,2.56,2.95,3.69,4.82,4.93,4.72,4.23,3.74,3.86,4.31,3.61,3.21,3.2,3.31
Romaine lettuce,unit,2.97,3.27,3.23,3.69,3.76,2.64,2.33,2.3,2.36,2.46,2.87,2.78,2.71,3.14,2.96,3.03,2.92,2.53,2.23,2.42,2.36,2.84,2.99,3.76,3.13,3.42,3.34,3.14,3.21,3.26,2.47,2.47,2.71,3.01,3.25,3.47,3.34,3.04,3.4,3.39,3.57,3.46,2.78,2.47,2.79,3.72,3.83,3.71,3.93,3.92,3.52,3.51,3.27,2.73,2.2,2.16,2.4,2.84,3.85,3.81,3.58,3.81,4.22,4.35,3.89,3.28,2.28,2.44,2.97,3.96,4.93,4.75,4.72,3.98,4.18,4.34,4.43,3.4,2.89,2.62,2.79
Broccoli,unit,2.8,2.67,2.71,2.79,3.21,2.92,2.61,2.52,2.35,2.66,2.36,3.15,3.23,2.67,2.87,2.98,3.04,2.97,2.85,2.29,2.27,2.47,2.8,2.98,2.75,3.05,2.86,2.79,3,3.07,2.81,2.64,2.92,2.74,3.36,2.79,3.27,3.17,3.22,3.2,3.21,3.48,3.09,2.92,2.95,3.15,3.62,3.37,3.53,3.33,3.25,3.28,3.28,3.2,2.77,2.78,2.91,3.09,3.52,3.56,3.54,3.76,3.19,3.67,3.2,3.72,3.2,3.21,3.33,3.51,3.9,3.62,4.32,4.27,4.34,4.41,4.57,3.96,3.55,3.12,3.39
Peppers,per kilogram,7.56,7.15,7.37,7.18,7.36,7.52,7.62,7.25,7.19,7.29,8.23,8.63,8.97,8.2,8.76,8.35,8.06,8.74,8.6,8.26,7.27,7.85,8.79,9.25,9.03,9.06,9.53,8.64,7.75,8.82,8.74,6.44,6.7,7.31,8.36,8.22,8.45,8.83,9.27,8.65,8.77,9.04,9.98,7.96,8.49,9.21,9.43,9.38,9.68,9.9,8.95,7.3,8.07,8.4,8.78,7.78,7.82,7.93,9.02,8.52,8.87,8.77,8.33,8.7,8.89,9.33,9.1,7.93,7.41,8.09,10.01,10.16,10.23,10.15,10.23,9.43,9.52,9.52,9.35,8.5,8.43
Squash,kilograms,3.82,3.93,4.11,4.21,4.55,4.8,5.26,5.03,3.65,3.22,3.57,3.27,4.31,4.66,4.78,4.79,4.84,4.91,5.14,4.58,3.66,3.41,3.77,3.96,4.67,4.59,4.66,4.93,5.85,5.77,6.04,5.78,4.12,3.79,4.05,3.98,4.95,4.9,4.9,5.3,5.57,6.2,6.35,5.91,3.93,3.66,3.93,3.78,4.93,5.2,5.03,5.19,5.06,4.99,4.95,4.53,3.93,3.91,4.18,4.38,4.55,5.32,5.3,4.74,5.37,5.67,5.86,5.64,4.54,4.32,4.84,4.89,5.28,6.12,6.6,6.63,6.81,6.84,6.82,6.01,4.49
Salad greens,142 grams,4.69,4.61,4.66,4.56,4.63,4.68,4.71,4.58,4.55,4.49,4.43,4.2,4.72,4.39,4.4,4.45,4.58,4.7,4.75,4.35,4.72,4.44,4.71,4.53,4.11,4.25,4.47,4.36,4.58,4.44,4.31,4.37,4.48,4.34,4.34,3.99,4.53,4.2,4.46,4.44,4.37,4.51,4.37,4.21,4.72,4.69,4.65,3.92,4.46,4.54,4.62,4.44,4.48,4.62,4.77,4.77,4.43,4.44,4.84,4.45,4.45,4.57,4.69,4.52,5.05,5.05,4.74,4.63,4.86,4.81,5.04,4.51,4.93,4.43,4.79,4.66,4.96,4.73,4.79,4.91,4.4
Meatless burgers,226 grams,3.91,3.9,4,3.86,3.94,4.03,4.11,3.97,4.04,4.01,3.86,4.22,4.03,4.01,3.97,3.9,4.07,4.09,4.13,4.2,4.15,4.27,4.13,4.18,4.25,4.08,4.45,4.51,6.64,5.76,6.09,5.98,5.78,5.87,5.25,5.19,4.88,4.87,5.4,5.79,5.65,5.94,5.8,5.61,5.71,5.82,5.57,5.6,5.52,5.44,5.55,4.83,5.48,5.76,5.74,5.71,5.67,5.72,5.85,5.89,5.35,5.38,5.4,5.67,5.44,5.42,5.69,5.97,5.84,5.94,6.17,6.54,5.55,6.05,5.99,5.96,6,6.07,6.17,6.26,6.1
Frozen french fried potatoes,750 grams,1.98,1.92,2.03,2,2.08,2.05,2.05,2.06,2.07,2.03,2.02,2.03,1.89,1.94,1.97,2.05,2.02,2.04,2.1,2.07,2.03,2.08,2.03,2.07,2.17,2.11,2.1,2.2,2.26,2.27,2.24,2.28,2.35,2.37,2.35,2.32,2.33,2.17,2.36,2.34,2.31,2.38,2.23,2.3,2.38,2.47,2.44,2.37,2.29,2.37,2.34,2.38,2.37,2.4,2.42,2.41,2.45,2.49,2.46,2.55,2.42,2.53,2.43,2.64,2.68,2.7,2.73,2.82,2.91,2.89,2.81,2.8,2.88,3.1,3.28,3.22,3.23,3.1,3.26,3.31,3.29
Frozen green beans,750 grams,3.48,3.21,3.94,3.75,4.29,4.21,4.19,4.19,3.94,3.8,3.69,3.71,3.72,3.63,3.56,3.75,3.53,3.87,4.15,3.73,3.77,3.86,4.05,3.97,4.23,3.93,3.88,3.97,4.08,4.09,4.2,3.85,3.95,3.88,4,3.96,3.96,3.78,3.91,4.22,4.34,4.33,4.24,4.24,3.8,3.96,3.69,3.6,3.57,4.16,4.2,4.23,4.27,4.23,4.21,4.23,3.94,4,4.16,4.05,4.26,4.3,4.3,4.1,4.32,4.18,4.4,4.55,4.46,4.29,4.41,4.1,4.42,4.62,4.74,4.44,4.81,4.64,4.79,4.81,4.54
Frozen broccoli,500 grams,3.19,3.18,3.23,2.57,3.44,3.32,3.56,3.29,2.81,3.16,2.99,3.04,3.2,2.85,2.82,3.09,2.72,2.85,3.33,2.99,3.06,3.21,3.04,2.79,3.19,2.89,3.2,2.86,3.35,3.39,3.36,2.97,3.35,3,3.06,2.86,2.82,3.15,3.47,3.57,3.58,3.64,3.74,3.63,3.43,3.36,3.41,3.05,3.07,3.42,3.43,3.44,3.68,3.53,3.69,3.61,3.31,3.29,3.53,3.3,3.53,3.58,3.79,3.36,3.67,3.49,3.61,3.73,3.79,3.61,3.81,3.19,3.74,3.93,3.94,3.69,3.9,3.94,3.93,4.02,3.88
Frozen corn,750 grams,2.9,2.91,3.09,2.65,3.27,3.07,3.28,3.14,2.85,3,2.87,2.85,2.88,2.75,2.7,2.86,2.65,2.87,3.12,2.56,2.97,3.03,3.06,2.93,3.19,2.93,3.02,2.94,3.24,3.21,3.27,3.04,3.26,3.05,3.11,3.11,3.06,3.06,3.18,3.39,3.42,3.44,3.47,3.36,3.11,3.13,3.08,2.85,2.85,3.39,3.35,3.38,3.43,3.39,3.41,3.36,3.15,3.13,3.33,3.22,3.41,3.37,3.46,3.18,3.36,3.29,3.41,3.42,3.48,3.43,3.54,3.23,3.37,3.62,3.74,3.47,3.75,3.67,3.72,3.88,3.61
Frozen mixed vegetables,750 grams,3.48,3.37,3.63,3.27,3.82,3.64,3.84,3.45,3.45,3.37,3.34,3.44,3.31,3.4,3.26,3.38,3.19,3.43,3.71,3.48,3.42,3.6,3.75,3.31,3.56,3.41,3.47,3.51,3.58,3.65,3.69,3.56,3.74,3.52,3.76,3.46,3.56,3.44,3.63,3.94,3.98,3.94,3.96,3.88,3.7,3.71,3.6,3.42,3.37,3.73,3.54,3.79,4,3.91,3.99,3.87,3.58,3.67,3.85,3.77,3.81,3.93,4.08,3.65,3.84,3.91,3.94,4.06,4.14,4.05,4.04,3.84,3.99,4.18,4.24,3.9,4.33,4.3,4.39,4.42,4.39
Frozen peas,750 grams,2.95,2.98,3.13,2.69,3.31,3.13,3.36,3.16,2.9,2.97,2.9,2.88,2.86,2.79,2.69,2.87,2.67,2.96,3.17,3.03,3,3.04,3.13,2.95,3.17,2.98,3.12,3.01,3.23,3.3,3.28,3.11,3.3,3.13,3.15,3.11,3.16,3.07,3.2,3.37,3.38,3.4,3.49,3.39,3.1,3.1,3.04,2.88,2.89,3.34,3.22,3.3,3.39,3.28,3.3,3.26,3.07,3.12,3.28,3.2,3.35,3.32,3.43,3.1,3.05,3.08,3.27,3.49,3.45,3.5,3.64,3.49,3.48,3.67,3.76,3.61,3.76,3.73,3.81,3.93,3.63
Frozen pizza,390 grams,3.72,3.87,3.53,3.97,3.62,4.19,3.89,3.68,3.67,3.77,4.11,3.86,3.86,3.68,4.01,3.95,3.74,4.09,4.24,4.18,3.81,4.15,4.23,4.14,4.22,4.31,4.51,3.88,4.08,4.06,4.15,4.15,3.79,3.81,4,4.13,3.96,4.54,4.01,4.3,4.51,4.49,4.35,4.5,4.24,4.41,4.25,4.33,4.41,4.43,4.11,4.02,4.42,4.31,4.54,4.36,4.2,4.55,4.27,4.25,4.52,4.45,4.09,4.17,4.38,4.27,4.57,4.2,4.26,4.59,4.87,3.8,4.66,4.57,4.46,4.72,4.47,4.95,5.03,5.11,4.95
Frozen spinach,300 grams,1.73,1.73,1.72,1.77,1.89,1.93,1.93,1.88,1.87,1.61,1.66,1.95,1.76,1.93,1.68,1.65,1.93,1.74,1.97,1.72,1.98,1.68,1.77,1.91,1.78,1.96,1.91,1.99,1.91,1.83,1.98,1.92,1.79,1.69,1.84,1.9,1.96,1.99,2,1.95,1.96,1.94,1.98,1.92,1.73,1.61,1.84,1.8,1.74,1.82,1.84,1.96,1.96,1.93,2.03,2.03,1.99,1.94,1.94,2.08,2.08,2.07,2.12,2.12,2.15,2.04,2.09,2.31,2.49,2.38,2.41,2.33,2.24,2.5,2.56,2.33,2.42,2.46,2.41,2.43,2.52
Frozen strawberries,600 grams,4.16,4.91,4.42,5.16,4.48,4.84,4.26,4.78,4.18,4.44,4.42,4.26,4.38,3.93,4.24,4.33,4.28,3.87,4.07,4.19,4.28,4.45,4.85,4.09,4.38,4.38,4.37,4.1,4.57,4.37,4.02,4.08,4.45,4.13,4.5,3.85,4.36,4.3,4.51,4.73,4.77,4.68,4.21,4.32,4.59,4.77,4.54,4.15,4.34,4.41,4.51,4.49,4.54,4.26,4.44,4.44,4.44,4.43,4.81,5.01,4.75,4.9,4.74,4.81,4.9,4.91,5.08,5.14,5.26,4.51,4.81,4.58,5.43,5.5,5.26,5.23,5.02,4.71,5.12,5.18,4.68
White bread,675 grams,3.1,3.1,3.06,3.03,3.17,3.15,3.14,3.13,3.25,3.21,3.11,3.17,3.08,3.07,3.08,2.98,2.99,3,2.92,2.91,2.93,3.06,3.03,2.9,3.19,3.19,3.16,2.95,3.14,3.3,3.23,3.29,3.31,3.3,3.11,3.29,3.28,3.32,3.28,3.23,3.27,3.3,3.26,3.26,3.31,3.28,3.23,3.27,3.08,3.18,3.22,3.15,3.3,3.05,3.23,3.25,3.25,3.3,3.33,3.53,3.35,3.42,3.57,3.7,3.72,3.7,3.86,3.8,3.87,3.91,3.86,3.9,3.84,3.88,3.89,3.93,4.03,4.06,4.05,3.98,4.03
Flatbread and pita,500 grams,4.39,4.28,4.11,3.96,4.15,4.14,4.31,4.06,4.2,4.21,4.27,3.74,4.13,4.03,3.84,3.86,3.95,3.97,3.74,3.82,4.1,4.04,4.06,3.8,3.91,3.81,3.66,3.84,3.65,3.62,3.52,3.58,3.72,3.5,3.87,3.76,3.6,3.66,3.87,3.7,3.55,3.59,3.4,3.47,3.82,3.76,3.89,3.61,3.61,3.58,3.61,3.71,3.57,3.6,3.59,3.73,3.78,3.77,3.93,4.01,3.79,3.96,3.92,4.09,4.2,4.16,4.26,4.47,4.51,4.48,4.77,4.8,4.78,4.87,4.88,4.9,5.03,5,4.95,5.01,5.05
Crackers and crisp breads,200 grams,2.23,2.43,2.51,2.37,2.43,2.38,2.45,2.2,2.44,2.11,2.17,2.05,2.25,2.41,2.33,2.43,2.37,2.42,2.52,2.42,2.5,2.53,2.41,2.24,2.76,2.53,2.36,2.41,2.71,2.54,2.65,2.53,2.57,2.52,2.55,2.23,2.48,2.6,2.47,2.51,2.59,2.54,2.47,2.54,2.58,2.64,2.54,2.36,2.62,2.53,2.45,2.6,2.54,2.54,2.59,2.62,2.56,2.53,2.57,2.62,2.73,2.63,2.85,2.69,2.84,2.84,2.95,2.96,3.03,2.84,3.14,3,3.17,3.11,3.05,3.1,3.05,3.07,3.2,3.22,3.19
Cookies and sweet biscuits,300 grams,2.35,2.47,2.67,2.65,2.56,2.37,2.63,2.61,2.73,2.71,2.6,2.53,2.37,2.57,2.66,2.6,2.67,2.6,2.67,2.69,2.74,2.77,2.62,2.74,2.97,2.84,2.69,2.57,2.82,2.87,3.01,2.93,2.81,2.91,2.93,2.84,2.8,2.91,2.86,2.8,2.94,3.05,2.94,3.02,3.05,3.11,2.97,3.03,3.04,3.01,2.95,2.97,3.04,3.03,2.98,3.04,3.02,2.94,2.87,2.85,3.07,3.21,3.03,3.17,3.16,3.08,3.29,3.41,3.45,3.48,3.1,3.28,3.3,3.47,3.57,3.72,3.62,3.41,3.69,3.66,3.44
Dry or fresh pasta,500 grams,2.11,2.08,2.2,2.32,2.03,2.14,2.23,2.06,2.52,2.33,2.39,2.39,2.12,2.09,2.45,2.04,2.46,2.24,1.89,2.31,2.28,2.27,2.27,2.69,2.14,2.19,2.02,2.31,2.56,2.18,2.45,2.19,2.09,2.52,2.63,2.38,2.38,2.24,2.41,2.6,2.75,2.94,2.46,2.16,2.45,2.35,2.54,2.51,2.3,2.53,2.72,2.32,2.77,2.27,2.35,2.12,2.88,2.71,2.82,3.01,2.71,3.03,3.48,3.07,3.25,3.37,3.51,3.32,3.74,3.66,3,3.79,3.25,3.75,4.08,4.01,3.68,3.56,3.53,4.17,3.7
Brown rice,900 grams,4.81,4.59,4.81,4.87,4.93,5.06,4.91,5.05,4.91,4.67,4.78,4.84,4.62,4.85,4.99,4.84,4.9,4.89,5.08,5,4.94,4.76,4.75,4.53,4.85,4.77,4.71,4.84,4.89,4.6,4.85,4.7,4.62,4.86,5.17,5.21,5.48,5.26,5.4,5.47,5.63,5.59,5.49,5.06,5.21,5.53,5.41,5.72,5.2,5.52,5.48,5.07,5.17,5.13,5.52,5.24,5.07,5.11,5.38,5.16,5.18,5.43,5.33,4.99,5.05,5.41,5.75,5.83,5.82,6.01,6.09,5.8,5.61,6.07,5.93,5.62,5.89,5.99,5.64,5.77,5.5
White rice,2 kilogram,8.94,8.94,9.18,9.28,9.22,9.6,9.19,9.68,9.42,9.3,9.41,9.64,9.17,9.43,9.53,9.26,9.6,9.46,9.69,9.59,9.84,9.55,9.13,8.86,9.58,9.29,9.12,9.27,9.33,9.18,9.43,9.19,9.2,9.44,9.82,10.3,10.05,9.93,10.09,10.27,10.54,10.54,10.48,10.06,10.55,10.65,10.38,10.52,10.32,10.38,10.38,9.99,10.13,10.16,10.56,10.05,9.76,10.22,10.52,10.2,10.42,11.1,10.96,10.3,10.59,10.87,11.33,10.95,11.48,11.73,11.9,11.25,10.94,11.54,11.5,11.61,11.2,11.06,11.35,11.25,11.24
Cereal,400 grams,3.31,3.36,3.5,3.47,3.41,3.35,3.49,3.32,3.33,3.42,3.27,3.43,3.23,3.26,3.3,3.24,3.36,3.35,3.39,3.22,3.22,3.32,3.36,3.52,3.43,3.41,3.37,3.35,3.41,3.33,3.42,3.26,3.33,3.43,3.24,3.33,3.35,3.24,3.36,3.54,3.49,3.37,3.49,3.5,3.49,3.47,3.47,3.4,3.43,3.48,3.46,3.43,3.61,3.62,3.62,3.55,3.56,3.65,3.68,3.7,3.69,3.95,4.25,4.21,4.1,4.06,4.12,4.22,4.19,4.3,4.25,4.44,4.29,4.4,4.41,4.45,4.46,4.48,4.58,4.4,4.42
Wheat flour,2.5 kilogram,4.79,4.07,3.92,4.28,4.49,3.74,3.88,4.4,3.69,4.3,3.18,4.17,4.48,3.3,3.68,4.39,4.02,4.2,3.84,4.49,3.31,3.84,3.14,4.02,4.59,4.43,3.49,3.64,3.55,3.77,4.07,4.7,3.33,3.51,4.7,3.36,4.59,4.11,4.34,4.68,5.32,5.24,5.24,4.99,5.09,4.49,4.77,4.73,4.61,4.85,3.59,3.38,4.57,3.61,4.58,4.73,3.5,4.26,4.75,3.59,3.58,4.2,4.32,5.06,5.5,4.31,4.91,4.52,5.5,5.76,5.2,5.3,5.47,5.15,5.75,5.21,5.66,4.8,6.02,5.4,5.37
White sugar,2 kilogram,2.03,2.17,2.25,2.33,2.57,1.9,2.67,2.64,1.89,2.07,2.22,2.29,1.96,2.38,2.05,2.42,2.1,1.89,2.49,2.19,1.95,2.48,1.96,2.12,2.02,1.66,2.05,2.26,2.1,2.03,2.18,1.94,2.03,1.75,1.95,2.25,2.29,1.66,2.3,2.09,2.08,2,2.08,2.3,1.77,1.71,2.03,1.53,1.93,1.87,1.84,2.38,2.3,2.15,2.18,2.15,2.29,2.32,2.44,2.57,2.63,2.55,2.57,2.35,2.56,2.62,2.3,2.72,2.56,2.47,2.45,3.04,2.48,2.63,2.27,2.31,2.54,2.62,2.68,3.09,2.4
Apple juice,2 litres,2.79,2.59,2.78,2.86,2.83,2.96,2.84,2.76,2.66,2.88,2.66,2.91,2.67,2.69,2.86,2.88,2.84,2.96,2.75,2.91,2.94,3,3,3.03,2.83,3.02,2.98,2.98,3.04,3.11,2.9,3.21,2.58,2.89,3.26,2.66,3.03,3.12,3.17,3.1,2.95,3.1,3.23,3.24,3.49,3.71,3.49,3.12,3.06,3.18,3.3,3.15,3.37,3.33,3.27,3.22,3.32,3.33,3.33,3.27,3.26,3.48,3.31,3.31,3.44,3.4,3.28,3.33,3.52,3.35,3.56,3.48,3.49,3.49,3.91,3.76,4.02,4.02,3.95,3.86,4.03
Orange juice,2 litres,3.93,4.08,3.98,4.12,4.08,4.05,4.11,4.06,4.01,3.95,3.89,4.02,3.93,3.99,3.92,3.93,3.92,3.94,3.98,3.94,3.93,4.03,4.02,3.88,4.08,4.29,4.09,4.12,4.1,4.05,4.14,4,3.87,3.98,3.84,3.88,4.19,4.25,4.4,4.39,4.51,4.34,4.33,4.19,4.52,4.59,4.14,4.02,4.32,4.49,4.23,4.24,4.2,4.21,4.19,4.32,4.42,4.38,4.24,4.28,4.35,4.48,4.78,4.44,4.57,4.45,4.42,4.57,4.45,4.25,4.35,4.41,4.45,4.39,4.88,4.53,4.97,4.86,5.02,5.02,4.95
Roasted or ground coffee,340 grams,6.21,5.8,5.46,5.69,5.73,5.99,5.22,6.03,5.56,6.15,6.07,6.07,6.06,5.99,6.35,6.24,5.71,6.43,6.67,5.92,6.19,6.03,6.13,6.06,6.07,5.71,5.47,5.85,5.86,5.96,6.14,6.17,5.93,6.01,5.88,5.85,6.1,5.76,6.16,5.76,6.1,5.66,6.19,6.13,6.59,6.43,6.43,6,6.17,6.45,5.92,6.33,6.39,6.35,6.42,6.4,6.51,5.96,6.12,6.28,6.72,6.75,6.52,6.86,6.84,6.97,7.44,7.15,7.33,6.78,6.81,6.85,7.24,7.41,7.12,7.2,7.53,7.78,8.05,7.66,7.3
Tea,20 bags,3.67,3.77,3.64,3.8,3.63,3.68,3.61,3.61,3.58,3.55,3.6,3.61,3.64,3.62,3.53,3.63,3.71,3.71,3.87,3.67,3.79,3.63,3.42,3.52,3.56,3.47,3.41,3.52,3.66,3.67,3.78,3.6,3.59,3.41,3.65,3.66,3.67,3.46,3.6,3.69,3.81,3.6,3.75,4.14,4.11,3.94,3.58,3.76,3.62,3.83,3.69,3.56,3.65,3.89,4.01,3.91,3.96,3.99,3.92,3.98,3.92,3.96,4.03,4.08,3.99,4.23,4.43,4.4,4.44,4.64,4.28,4.43,4.54,4.5,4.4,4.6,4.71,4.61,4.9,4.8,4.73
Vegetable oil,3 liters,6.59,7,6.99,6.86,7.01,6.68,6.74,6.77,6.85,6.92,7.05,7.06,6.81,7.06,6.28,6.55,6.79,6.73,6.76,7.26,7.33,7.11,6.67,6.79,7.01,7.28,6.1,7.24,6.84,7.09,6.74,7.06,6.24,7.27,6.78,7.1,6.69,7.37,7.52,7.72,7.08,6.65,6.99,7.1,7.12,5.93,7.17,7.22,6.41,7.23,7.11,7.21,7.7,7.49,7.46,8.26,10.39,9.65,9.36,11.17,11.18,11.62,11,11.69,11.8,12.22,13.54,14.31,12.59,12.65,13.4,14.36,12.44,11.33,13,12.09,13.4,13.96,12.04,12.94,11.66
Canola oil,3 liters,8.83,10.43,11.2,11.23,10.8,10.49,10.7,10.51,10.34,10.36,9.89,10.73,9.98,10.1,10.36,10.2,10.21,10.8,10.15,10.19,10.18,9.65,9.83,10.18,8.84,9.57,9.56,9.23,9.52,10.04,10.08,10.09,10.25,10.09,10.47,9.52,9.16,9.35,9.97,9.75,9.23,9.47,9.3,9.87,10.19,9.45,10.58,9.08,9.67,9.39,9.09,9.33,10.35,10.17,10.25,10.55,11.61,11.58,12.91,12.62,13.22,13.8,14.54,15.38,15.66,15.95,15.82,15.27,16.5,17.12,17.59,16.74,15.47,17.24,16.67,16.65,17.31,17.5,16.25,14.82,14.98
Olive oil,1 litre,10.27,9.62,7.07,10.47,9.37,9.63,9.66,10.08,8.15,9.79,7.9,7.88,9.59,8.46,9.75,10.22,8.82,9.38,10.42,10.15,8.82,8.78,9.55,7.04,8.66,8.78,8.44,9.04,8.34,9.13,8.69,8.99,7.35,7.41,8.36,8.51,7.99,8.17,8.06,8.84,8.02,8.82,8.34,7.48,7.72,7.7,8.8,7.65,7.76,7.45,7.24,8.1,8.01,8.24,8.73,8.62,8.02,7.8,9.43,9.32,8.92,8.97,9.66,9.55,10.03,9.55,10.04,10.27,9.29,8.05,10.2,10.84,10.03,9.45,11.14,11.92,12.45,12.84,12.2,14.74,13.9
Baby food,128 mililiters,1.25,1.26,1.3,1.31,1.36,1.38,1.27,1.34,1.28,1.33,1.33,1.34,1.33,1.33,1.18,1.33,1.34,1.29,1.27,1.36,1.37,1.37,1.41,1.37,1.41,1.42,1.39,1.38,1.4,1.38,1.43,1.44,1.42,1.44,1.37,1.47,1.49,1.47,1.49,1.48,1.5,1.39,1.5,1.54,1.59,1.56,1.59,1.54,1.42,1.45,1.48,1.48,1.5,1.55,1.56,1.62,1.57,1.57,1.54,1.56,1.62,1.57,1.63,1.71,1.66,1.73,1.73,1.74,1.77,1.72,1.75,1.77,1.79,1.79,1.83,1.79,1.86,1.84,1.88,1.91,1.89
Infant formula,900 grams,26.74,26.29,27.41,26.36,25.64,26.87,26.6,26.07,26.32,26.81,26.91,24.95,24.9,24.45,25.53,25.9,26.34,27.27,27.36,27.49,27.76,27.59,27.38,27.83,28.91,27.88,28.17,28.39,28.08,27.1,27.03,27.01,28.01,28.6,28.3,29.05,29.55,28.62,29.71,27.81,29.24,28.87,29.39,28.52,27.17,27.14,28.82,28.08,30.33,31.71,30.69,31.46,30.26,31.06,31.51,32.13,31.11,29.08,27.11,31.24,32.24,28.53,31.48,31.98,34.98,32.69,35.8,34.23,33.99,36.63,36.17,36.45,38.03,37.96,40.12,42.7,44.35,44.61,40.91,42.53,41.9
Peanut butter,1 kilogram,3.58,4.46,4.2,3.84,4.17,3.52,4.24,4.2,4.24,4.42,4.65,4.94,3.83,4.84,4.86,4.6,4.47,4.76,4.47,4.72,4.5,4.38,4.54,4.64,4.78,4.57,4.82,5.24,4.84,5.19,5.14,4.87,4.45,4.65,4.68,4.58,4.85,4.82,4.68,5.09,4.91,4.55,4.86,4.65,4.43,4.55,4.45,4.94,4.53,5.27,5.01,4.87,4.65,4.49,4.59,4.62,5.06,5.24,5.05,4.9,4.84,5.13,5.21,5.3,5.4,5.56,5.32,5.63,5.4,5.47,5.48,5.61,5.5,5.85,6.34,6.32,6.17,6.72,6.29,6.24,6.24
Ketchup,1 litre,3.23,3.37,3.22,3.3,3.2,3.1,3.04,3.08,3.23,3.14,3.27,3.33,3.28,3.45,3.24,3.35,3.42,3.41,3.41,3.46,3.37,3.33,3.53,3.42,3.49,3.47,3.23,3.17,3.16,3.37,3.28,3.29,3.31,3.31,3.18,3.3,3.49,3.4,3.24,3.59,3.21,3.28,3.38,3.38,3.55,3.22,3.45,3.4,3.67,3.62,3.33,3.51,3.23,3.25,3.33,3.42,3.37,3.87,3.79,4.08,4,3.94,4.12,4.02,4.44,4.11,3.97,4.23,4.3,4.39,4.12,4.33,4.37,4.45,4.69,4.61,4.64,4.89,4.14,4.76,4.7
Mayonnaise,890 mililiters,3.78,3.98,3.92,3.98,3.82,3.65,3.79,3.66,3.88,3.7,3.96,3.99,3.96,3.99,3.98,4.19,3.62,3.76,3.91,4.24,4.16,4.04,4.2,3.69,4.42,4.33,3.78,3.85,3.87,4.08,3.93,3.96,4.3,3.96,3.79,3.75,4.44,4.1,3.84,4.4,3.83,3.89,4.03,4.03,4.29,3.84,4.39,4.11,4.51,4.6,3.97,4.39,4.05,4.11,4.32,4.57,4.4,5.05,5.25,5.15,4.98,4.85,5.32,5.13,5.31,5.75,5.12,5.77,5.55,5.95,5.23,5.54,5.61,6.02,6.25,5.93,5.92,6.24,6.34,5.97,6.02
Canned salmon,213 grams,2.77,2.6,2.6,3.06,3.1,2.39,3.03,2.63,2.84,2.31,2.67,2.95,2.87,2.51,1.5,2.87,2.81,2.9,3.09,2.9,2.97,2.6,2.95,3.4,3.59,4.01,3.95,3.43,2.76,4.36,3.62,3.82,4.81,4.98,3.12,4.14,3.93,3.83,4.58,3.92,4.75,4.17,4.99,4.69,4.79,4.84,4.22,4.47,4.5,4.73,4.79,4.38,3.89,4.38,4.93,3.94,3.82,4.68,4.14,4.45,4.97,4.59,4.61,5.08,3.93,4.55,4.86,4.14,4.39,4.12,4.76,4.26,4.18,4.22,4.96,4.67,4.86,4.51,4.87,4.89,4.74
Canned tuna,170 grams,1.35,1.64,1.44,1.49,1.58,1.68,1.36,1.45,1.7,1.55,1.64,1.91,1.6,1.92,1.57,1.55,1.6,1.74,1.71,1.58,1.7,1.59,1.76,1.91,1.67,1.92,1.84,1.51,1.82,1.87,1.53,1.99,1.81,1.73,1.78,1.73,1.74,1.6,1.9,2,1.83,1.53,1.67,1.57,1.89,1.96,1.86,1.98,1.49,1.72,1.7,1.48,1.71,1.74,1.7,1.77,1.61,1.84,1.5,1.92,1.95,1.91,1.77,1.87,1.94,2.04,1.94,2.09,1.85,2.02,1.81,2.16,1.78,2,1.97,1.99,1.98,2.08,1.98,2.15,2.15
Canned baked beans,398 mililiters,1.27,1.32,1.26,1.28,1.25,1.25,1.32,1.22,1.28,1.34,1.34,1.34,1.23,1.34,1.24,1.38,1.29,1.28,1.32,1.19,1.24,1.25,1.18,1.29,1.24,1.33,1.38,1.31,1.33,1.33,1.25,1.39,1.36,1.27,1.19,1.3,1.31,1.39,1.41,1.65,1.46,1.33,1.38,1.2,1.41,1.33,1.51,1.41,1.42,1.44,1.23,1.29,1.34,1.34,1.22,1.22,1.44,1.51,1.59,1.64,1.65,1.64,1.46,1.66,1.74,1.6,1.72,1.4,1.7,1.83,1.73,1.74,1.83,1.93,1.74,1.92,1.87,1.76,1.88,1.96,1.99
Canned tomatoes,796 mililiters,1.35,1.27,1.35,1.26,1.42,1.56,1.52,1.3,1.55,1.22,1.44,1.37,1.22,1.2,1.34,1.28,1.36,1.37,1.22,1.24,1.39,1.38,1.35,1.66,1.41,1.5,1.49,1.51,1.27,1.56,1.34,1.61,1.7,1.48,1.45,1.59,1.43,1.43,1.68,1.56,1.62,1.88,1.83,1.66,1.83,1.81,1.37,1.62,1.33,1.65,1.66,1.61,1.72,1.58,1.51,1.75,1.64,1.68,1.42,1.71,1.47,1.51,1.53,1.56,1.54,1.73,1.84,2.03,1.7,1.83,1.64,2.01,1.8,2.05,1.93,1.93,2.15,2.28,2.18,2.18,2
Canned soup,284 mililiters,0.79,0.85,0.91,0.83,1.24,1.16,0.93,0.82,0.83,0.84,0.93,1.22,0.87,0.8,0.88,0.79,1.23,1.18,0.83,0.77,0.82,1.11,0.77,1.36,0.78,1.07,0.9,1.33,1.31,1.23,0.96,0.73,0.77,1.05,0.9,1.36,0.95,0.95,1.11,1.47,1.43,1.35,1.27,0.72,0.87,1.24,0.98,1.3,1.25,1.37,1.27,0.81,0.98,1.04,0.84,0.9,0.94,1.39,1.05,1.47,1.06,1.17,1.4,1.35,1.3,1.5,1.53,0.96,1.35,1.65,1.14,1.76,1.29,1.66,1.6,1.87,1.53,1.51,1.73,1.19,1.4
Canned beans and lentils,540 mililiters,1.27,1.26,1.31,1.36,1.33,1.4,1.37,1.31,1.33,1.3,1.32,1.32,1.29,1.3,1.27,1.31,1.24,1.26,1.32,1.21,1.29,1.44,1.41,1.42,1.42,1.43,1.48,1.54,1.5,1.5,1.46,1.5,1.5,1.42,1.39,1.49,1.42,1.49,1.53,1.46,1.39,1.49,1.48,1.44,1.55,1.52,1.53,1.35,1.37,1.38,1.42,1.48,1.46,1.43,1.46,1.45,1.48,1.45,1.53,1.53,1.49,1.57,1.63,1.66,1.72,1.67,1.67,1.79,1.78,1.69,1.71,1.8,1.87,1.9,1.87,1.98,1.91,1.97,2.01,1.81,1.77
Canned corn,341 mililiters,1.11,1.05,1.06,1.07,1.09,1.05,1.07,1.09,1.08,1.09,1.09,1.05,1.08,1.03,1.01,1.07,1.09,1.14,1.06,1.11,1.11,1.12,1.12,1.08,1.16,1.18,1.18,1.19,1.2,1.21,1.21,1.3,1.24,1.17,1.3,1.21,1.31,1.22,1.26,1.36,1.42,1.48,1.55,1.45,1.45,1.44,1.35,1.19,1.28,1.39,1.42,1.41,1.41,1.34,1.38,1.4,1.33,1.22,1.36,1.13,1.4,1.44,1.36,1.19,1.47,1.53,1.55,1.76,1.82,1.34,1.55,1.21,1.41,1.88,1.52,1.46,1.74,1.77,1.83,1.8,1.55
Canned peach,398 mililiters,2.09,2.11,2.03,2.04,2.15,2.06,2.09,1.95,2.07,2.07,2.03,1.95,2.19,2.09,2.15,2.23,2.19,2.21,2.36,2.31,2.32,2.07,2.01,2.1,2.13,1.97,2.01,2,2.19,2.23,2.26,2.24,2.15,2.24,2.13,2.33,2.31,2.14,2.45,2.22,2.41,2.29,2.32,2.39,2.33,2.4,2.31,2.5,2.37,2.38,2.41,2.35,2.4,2.44,2.31,2.4,2.27,2.31,2.32,2.3,2.38,2.34,2.39,2.38,2.46,2.54,2.58,2.64,2.64,2.61,2.57,2.44,2.74,2.91,3.26,3,2.95,2.97,2.88,2.87,2.93
Canned pear,398 mililiters,2.03,2.08,2.01,2.02,2.04,1.94,2.01,1.9,2.01,2.05,2.01,1.97,2.09,2.05,2.11,2.15,2.15,2.18,2.26,2.01,2.03,2.05,1.98,2.04,2.05,2.03,2,1.94,2.14,2.16,2.07,2.09,2.13,2.27,2.18,2.3,2.25,2.16,2.46,2.25,2.54,2.34,2.38,2.44,2.38,2.37,2.34,2.56,2.4,2.42,2.46,2.38,2.42,2.47,2.41,2.47,2.31,2.32,2.32,2.35,2.38,2.39,2.41,2.39,2.41,2.53,2.59,2.67,2.63,2.59,2.58,2.5,2.75,2.86,2.69,2.75,2.8,2.95,2.89,2.95,3.02
Dried lentils,900 grams,3.15,3.32,3.25,3.48,3.7,3.51,3.6,3.46,3.56,3.5,3.54,3.43,3.53,3.43,3.45,3.57,3.46,3.38,3.35,3.18,3.26,3.02,3.2,3.24,3.07,3.19,3.21,3.06,3.18,3.21,3.05,3.25,3.44,3.33,3,3.23,3.24,3.25,3.36,3.24,3.23,3.14,3.24,3.09,3.45,3.68,3.33,3.4,3.22,3.28,3.28,3.47,3.46,3.53,3.44,3.51,3.42,3.48,3.54,3.41,3.51,3.4,3.44,3.68,3.48,3.58,3.69,3.62,3.92,3.79,3.86,4,4.08,3.91,3.94,3.98,4.02,4.06,3.98,4,4.02
Dry beans and legumes,900 grams,3.16,3.21,3.23,3.43,3.53,3.53,3.43,3.34,3.32,3.24,3.3,3.19,3.32,3.32,3.32,3.39,3.35,3.29,3.14,3.09,3.07,2.94,3.04,3.1,2.99,3.04,3.09,3.13,3.09,3.09,3.04,3.11,3.19,3.2,3.3,3.32,3.41,3.33,3.35,3.46,3.24,3.29,3.18,3.19,3.58,3.6,3.3,3.37,3.19,3.29,3.26,3.31,3.29,3.3,3.33,3.29,3.25,3.09,3.11,3.06,3.35,3.38,3.36,3.44,3.32,3.37,3.51,3.43,3.47,3.23,3.31,3.41,3.44,3.46,3.45,3.35,3.46,3.52,3.5,3.42,3.41
Tofu,350 grams,2.02,2.05,1.98,1.91,1.95,1.94,1.95,1.97,1.93,1.94,1.97,1.98,1.95,2,2,1.93,1.95,2.46,2.38,2.19,2.14,2.12,2.1,2.14,2.3,2.18,2.3,2.18,2.17,2.13,2.12,2.08,2.04,2.01,2.01,2,2.07,2.03,2.24,2.15,2.33,2.15,2.15,2.1,2.08,2.1,2.12,2.13,2.19,2.33,2.31,2.23,2.24,2.64,2.28,2.22,2.45,2.54,2.57,2.54,2.65,2.92,3,2.73,2.81,2.86,2.82,2.9,3.04,3.05,3.12,2.86,2.87,2.98,2.85,2.76,2.78,2.85,2.84,2.83,2.75
Hummus,227 grams,3.59,3.57,3.48,3.43,3.45,3.49,3.45,3.56,3.61,3.48,3.25,3.37,3.26,3.53,3.47,3.29,3.55,3.55,3.64,3.54,3.45,3.33,3.46,3.38,3.23,3.52,3.64,3.43,3.32,3.55,3.49,3.59,3.6,3.56,3.31,3.29,3.41,3.46,3.53,3.37,3.24,3.42,3.49,3.43,3.58,3.55,3.48,3.45,3.43,3.52,3.49,3.43,3.5,3.44,3.42,3.49,3.46,3.46,3.42,3.49,3.43,3.38,3.38,3.48,3.61,3.65,3.68,3.85,3.85,3.77,3.71,3.68,3.52,3.85,3.96,4,3.9,3.98,4.04,4.1,4.03
Salsa,418 mililiters,3.15,2.95,3.29,3.23,3.25,3.29,3.35,3.36,3.37,3.32,3.17,3.1,3.02,2.95,3.32,3.23,3.29,3.28,3.18,3.23,3.24,3.25,3.03,3.18,3.19,3.25,3.25,3.31,3.23,3.45,3.39,3.44,3.49,3.51,3.4,3.62,3.5,3.48,3.55,3.53,3.54,3.58,3.63,3.73,3.61,3.61,3.46,3.48,3.6,3.67,3.69,3.62,3.61,3.71,3.67,3.68,3.64,3.66,3.69,3.62,3.83,3.86,3.92,3.87,4,4.03,4.07,4.05,4.19,4.21,4.28,4.29,4.41,4.48,4.52,4.81,4.8,4.74,4.83,4.86,4.77
Pasta sauce,650 mililiters,1.95,2.04,1.99,2.27,1.87,2.23,2.13,1.99,1.95,1.8,2.15,2.15,1.95,1.71,2.13,2.11,2.08,1.96,1.96,1.93,2.11,2.06,1.98,2.61,1.86,1.89,2.2,2.22,2.07,2.2,2.16,2.27,2.05,2.19,2.06,2.47,2.17,2.1,2.46,2.32,2.57,2.49,2.02,2.42,2.16,2.16,2.1,2.47,2.22,2.36,2.59,1.98,2.53,2.28,2.42,2.14,2.21,2.76,2.39,2.67,2.36,2.26,2.35,2.41,2.37,2.76,2.88,2.53,3.02,3.16,2.42,3.08,2.88,2.89,3.15,2.32,2.96,2.87,2.98,3.33,2.38
Salad dressing,475 mililiters,2.67,2.74,2.62,2.77,2.49,2.55,2.49,2.39,2.56,2.58,2.58,2.8,2.78,2.63,2.64,2.53,2.34,2.4,2.48,2.59,2.52,2.69,2.71,2.44,2.97,2.85,2.7,2.77,2.6,2.58,2.58,2.6,2.63,2.54,2.54,2.56,2.69,2.8,2.79,2.77,2.53,2.89,2.89,2.81,2.78,2.57,2.75,2.79,2.8,2.82,2.8,2.98,2.7,2.95,3.23,3.21,3.27,3.11,3.26,3.5,3.25,3.39,3.48,3.63,3.44,3.35,3.54,3.39,3.59,3.36,3.45,3.34,3.54,3.79,3.85,3.68,3.69,3.47,3.59,3.71,3.7
Almonds,200 grams,4.73,4.69,5.4,4.91,5.01,6.34,6.54,5.39,4.34,5.29,5.61,4.88,4.89,4.97,4.85,4.99,5.84,5.44,6.07,6.07,5.76,4.86,5.28,4.86,5.38,5.44,5.8,5.03,5.72,5.74,5.92,6.16,5.45,5.19,5.16,5.35,5.1,4.96,5.39,5.56,5.56,5.66,5.75,5.95,6,5.7,5.1,4.74,4.4,4.88,5.23,5.45,5.5,5.68,5.77,5.81,5.6,5.38,5.27,5.39,5.62,5.4,5.4,5.23,5.23,5.76,5.43,5.64,5.84,5.63,5.49,5.36,5.79,5.6,5.38,5.31,5.4,5.7,5.75,5.24,4.92
Peanuts,450 grams,3.76,3.42,3.93,3.85,3.71,3.74,3.87,3.52,3.98,4.08,3.29,3.44,3.24,3.08,3.7,3.36,3.92,3.79,3.66,3.45,3.62,3.23,3.16,3.1,3.24,2.97,3.03,3.36,3.17,3.23,3.44,3.22,2.98,3.16,2.61,3.08,3.25,2.96,3.04,3.17,2.87,3.1,3.19,3.36,4.05,4.12,3.43,3.25,3.21,2.66,3.41,3.4,2.7,3.19,3.26,3.35,3.43,3.42,3.15,3.34,3.58,3.45,3.45,3.42,3.26,3.08,3.14,3.34,3.51,3.28,3.76,3.45,3.59,3.62,3.76,3.63,3.66,3.48,3.78,3.8,3.94
Sunflower seeds,400 grams,4.79,4.52,4.39,4.38,4.41,4.52,4.63,4.6,4.93,4.96,4.99,4.8,4.73,4.72,4.82,4.4,4.66,4.68,4.6,4.78,4.55,4.71,4.84,4.7,4.58,3.86,4.87,4.77,4.59,4.49,4.65,4.59,4.72,4.62,4.87,4.91,4.47,4.67,4.7,4.58,4.68,4.72,4.51,4.5,4.97,5.16,4.67,4.58,4.72,4.59,4.68,4.46,4.64,4.42,4.62,4.62,4.23,4.6,4.46,4.36,4.35,4.45,4.55,4.48,4.55,4.69,4.67,4.53,4.76,4.81,4.54,4.73,4.56,4.9,5.27,4.87,5.15,4.98,5.32,5.26,4.76
Deodorant,85 grams,5.01,4.79,4.95,5.23,5.05,4.9,4.88,4.83,4.58,5.08,4.71,4.87,4.94,4.98,4.96,5.14,5.31,5.02,5,4.84,4.94,5.13,4.81,5.1,5.07,5.02,4.97,5.45,5.05,4.96,5.1,5.12,4.9,4.92,4.93,4.86,5.36,4.94,5.1,5.28,5,5.16,5.27,5.1,5.4,5.4,5.14,5.32,5.12,5.14,5.3,5.55,5.35,5.48,5.69,5.83,5.83,6.09,6.06,6.01,5.93,5.74,5.95,6.09,6.13,6.43,6.56,6.7,6.37,6.43,6.4,6.28,6.9,6.53,6.67,7.28,7.32,7.1,7.06,7.15,7.09
Toothpaste,100 mililiters,2.66,2.84,2.96,2.85,2.91,3.07,2.9,2.89,2.73,2.8,2.93,2.93,2.83,2.68,3.08,2.63,2.88,2.78,3.04,2.8,2.82,3.07,2.92,2.97,2.91,2.88,3.1,3.24,3.03,3.2,3.29,3,3.15,3.23,3.38,3.42,2.87,3.22,3.13,3.33,3.65,3.11,3.39,3.32,3.38,3.68,3.42,3.44,2.82,3.23,3.58,3.33,3.48,3.45,3.53,3.6,3.61,3.59,3.73,3.66,3.16,3.73,3.62,3.84,3.9,4,4.04,4.15,4.29,4.04,3.97,4.11,3.7,4.19,3.79,3.96,4.06,4.04,4.24,4,4.37
Shampoo,400 mililiters,5.18,4.95,5.14,5.26,5.23,5.16,5.33,5.17,5.13,5.31,5.15,5.26,5.13,5.05,5.15,5.11,5.2,5.2,5.31,5.28,5.02,5.23,5.22,5.28,5.27,4.97,5.21,5.3,5.03,4.97,5.36,5.02,4.72,5.19,4.98,4.65,5.25,4.93,5.27,5.17,5.16,5.26,4.87,5.11,5.54,5.52,5.31,5.42,5.08,5.04,5.19,5.41,5.47,5.54,5.18,5.48,5.66,5.75,5.84,5.85,5.94,5.23,5.58,5.61,5.99,5.98,5.68,5.96,5.96,6.33,6.05,6.08,6.21,5.74,6.22,6.12,6.63,6.68,6.87,6.69,6.67
Laundry detergent,4.43 Liters,8.53,13.44,15.16,7.45,9.49,13.77,8.11,10.53,7.16,9.95,13.64,8.11,11.17,7.32,12.95,10.21,8.74,9.28,13.05,12.61,12.41,8.81,12.09,14.11,11.79,13.37,13.23,13.29,11.73,11.64,12.83,12.5,11.88,12.73,11.39,12.18,12.44,13.88,14.06,13.5,13.22,14.29,13.63,11.69,12.05,12.2,13.27,13.2,13.25,13.75,12.88,12.14,12.78,13.2,13.87,13.42,12.56,13.39,12.51,14.05,14.34,14.83,15.96,15.42,16.75,15.03,15.03,15.66,15.27,14.65,15.05,15.65,15.02,17.24,14.34,16.93,15.38,17.46,15.52,16.25,16.51

        `;


var csvData1 = `
Product,Unit of Measurement,Jan-2017,Feb-2017,Mar-2017,Apr-2017,May-2017,Jun-2017,Jul-2017,Aug-2017,Sep-2017,Oct-2017,Nov-2017,Dec-2017,Jan-2018,Feb-2018,Mar-2018,Apr-2018,May-2018,Jun-2018,Jul-2018,Aug-2018,Sep-2018,Oct-2018,Nov-2018,Dec-2018,Jan-2019,Feb-2019,Mar-2019,Apr-2019,May-2019,Jun-2019,Jul-2019,Aug-2019,Sep-2019,Oct-2019,Nov-2019,Dec-2019,Jan-2020,Feb-2020,Mar-2020,Apr-2020,May-2020,Jun-2020,Jul-2020,Aug-2020,Sep-2020,Oct-2020,Nov-2020,Dec-2020,Jan-2021,Feb-2021,Mar-2021,Apr-2021,May-2021,Jun-2021,Jul-2021,Aug-2021,Sep-2021,Oct-2021,Nov-2021,Dec-2021,Jan-2022,Feb-2022,Mar-2022,Apr-2022,May-2022,Jun-2022,Jul-2022,Aug-2022,Sep-2022,Oct-2022,Nov-2022,Dec-2022,Jan-2023,Feb-2023,Mar-2023,Apr-2023,May-2023,Jun-2023,Jul-2023,Aug-2023,Sep-2023
Beef stewing cuts,per kilogram,13.57,14.24,14.07,13.10,13.75,13.99,14.53,14.67,14.73,13.94,13.05,14.18,13.40,11.73,13.36,12.42,14.01,16.21,13.10,14.82,11.89,11.39,11.43,13.98,11.77,11.26,11.72,12.66,14.45,15.70,14.21,15.74,14.46,11.48,13.33,14.87,13.92,13.14,15.17,14.70,16.50,18.80,17.79,16.98,13.94,13.47,15.50,13.67,14.55,15.43,14.95,15.19,15.74,16.60,16.96,17.27,15.65,16.01,16.37,17.24,14.37,16.89,16.75,17.53,17.61,18.78,19.43,17.86,14.69,18.74,16.78,14.83,16.44,16.46,15.43,18.02,19.08,19.39,18.58,19.93,17.63
Beef striploin cuts,per kilogram,16.51,19.92,18.49,26.41,20.96,19.02,19.83,19.18,26.36,26.41,16.35,13.64,16.29,17.65,22.66,17.94,18.05,20.76,26.99,15.89,20.89,16.46,18.27,15.93,18.61,16.94,17.37,15.84,19.90,18.63,16.83,16.56,18.96,18.87,21.17,15.50,17.09,15.86,17.92,18.77,26.45,30.24,23.70,22.66,27.68,24.65,23.17,17.10,29.78,21.94,22.63,31.04,21.40,23.67,24.34,24.78,24.96,26.48,26.67,24.40,25.32,23.41,26.70,25.89,24.56,23.85,24.41,25.20,23.22,27.81,22.44,18.62,29.17,21.31,23.49,26.04,24.57,26.40,37.21,41.80,27.03
Beef top sirloin cuts,per kilogram,12.09,9.95,15.80,15.96,14.33,14.36,15.05,13.21,14.77,13.78,13.00,13.23,17.14,13.00,11.39,14.27,13.52,13.09,13.55,12.97,12.34,13.31,12.39,9.71,13.19,11.84,16.82,16.66,16.96,13.83,13.43,13.82,13.39,13.36,12.79,17.17,14.66,13.88,14.03,12.74,20.11,19.21,15.93,15.64,12.25,13.79,14.99,12.75,13.33,13.80,15.29,13.14,14.49,17.45,15.60,16.87,15.50,17.65,19.88,13.40,14.74,18.27,19.74,15.66,15.64,18.27,14.29,16.36,18.47,14.81,14.52,14.48,15.28,17.31,16.57,20.88,19.77,21.76,20.14,25.94,20.57
Beef rib cuts,per kilogram,24.63,24.87,25.12,18.99,25.65,18.74,26.86,17.90,21.12,15.91,25.64,13.62,25.80,24.91,15.68,26.54,20.49,17.04,18.66,17.70,24.19,15.54,23.70,15.76,19.92,22.13,27.09,17.18,20.51,18.33,18.29,27.14,27.94,14.35,19.51,15.48,19.29,22.65,29.25,18.46,22.86,26.62,20.49,22.29,30.86,27.32,31.26,18.41,25.29,21.18,19.24,20.89,28.43,29.95,33.86,33.24,31.27,22.95,31.16,33.27,31.34,33.91,33.74,35.47,21.99,26.27,27.64,26.57,32.85,21.88,28.93,23.35,31.95,33.84,26.17,25.45,27.16,27.05,36.22,28.37,32.33
Ground beef,per kilogram,8.13,7.91,8.12,8.67,8.89,8.98,9.71,9.35,8.29,8.07,7.60,7.79,7.28,8.88,7.77,7.46,8.69,7.73,8.85,8.69,8.16,8.69,6.91,7.63,7.98,7.94,7.87,8.04,8.38,8.80,8.70,8.52,8.47,8.75,8.74,9.34,9.06,9.29,9.71,10.16,12.49,12.58,10.28,9.26,9.66,9.60,9.45,9.79,8.60,9.04,8.89,8.63,8.83,8.76,8.84,9.74,10.02,9.51,10.97,10.47,11.12,9.96,10.35,9.99,10.51,9.65,10.45,11.01,10.93,9.67,9.69,10.28,9.99,9.86,10.09,10.20,11.02,11.09,11.34,12.06,11.52
Pork loin cuts,per kilogram,5.92,6.59,6.67,6.49,7.71,6.97,7.78,6.60,6.81,7.22,6.28,6.21,5.29,6.85,7.65,7.37,6.34,8.35,7.35,6.41,6.97,5.87,6.92,6.63,6.77,7.49,6.89,8.10,7.64,7.50,8.03,7.48,6.78,6.46,6.37,7.29,6.49,7.52,7.54,7.48,7.57,7.70,7.18,7.91,8.45,7.63,8.41,7.30,7.17,6.75,6.76,7.13,7.96,7.24,7.70,7.40,7.91,8.07,7.01,9.18,8.90,8.03,7.74,9.24,8.01,8.05,7.11,8.23,8.08,7.27,7.10,8.56,8.46,7.73,8.13,8.34,8.70,7.70,8.24,8.61,9.10
Pork rib cuts,per kilogram,5.88,8.35,6.33,7.08,7.31,6.70,8.15,8.12,9.73,6.80,6.13,8.42,8.39,6.57,7.45,7.92,8.48,7.14,6.60,7.13,7.02,7.15,6.30,7.79,7.97,7.26,7.84,8.13,7.42,7.30,8.68,8.12,7.13,6.94,5.88,6.79,7.59,6.94,7.60,8.88,8.03,8.95,8.70,7.97,9.41,10.29,10.67,7.56,7.81,7.15,7.93,8.57,10.48,11.37,12.87,12.39,11.10,11.55,11.88,9.15,10.53,9.99,10.02,9.61,9.99,10.86,11.04,9.02,9.10,9.97,8.97,9.81,8.54,8.45,8.79,8.81,8.94,9.34,7.94,8.88,9.58
Pork shoulder cuts,per kilogram,6.01,4.77,4.91,5.17,6.29,6.18,6.22,6.29,4.18,3.57,3.36,5.47,6.96,5.49,7.49,5.87,5.42,8.48,8.05,8.14,7.82,5.84,5.44,5.01,5.53,5.80,6.23,6.27,8.21,8.22,8.36,7.98,7.61,6.97,5.55,6.97,7.31,6.08,7.31,7.19,7.72,7.48,6.67,6.11,6.35,5.88,7.25,5.88,7.26,6.96,5.79,5.62,6.86,7.37,7.37,6.74,7.78,5.91,7.02,7.52,6.52,6.30,6.39,6.74,7.18,6.73,7.47,6.71,8.10,7.90,6.66,6.79,7.38,6.94,6.49,7.77,8.06,8.18,8.34,8.70,8.92
Whole chicken,per kilogram,5.76,4.83,5.20,5.90,5.49,5.11,5.59,5.91,4.96,5.35,4.80,6.71,5.67,4.73,4.69,5.41,4.88,4.69,4.33,4.51,4.83,4.86,4.68,6.88,5.13,6.20,5.38,6.35,4.82,4.88,4.65,4.43,4.73,4.93,5.01,4.67,4.97,4.84,5.01,5.22,4.70,4.84,5.09,5.24,4.76,5.92,4.60,5.47,4.74,5.08,4.91,5.06,5.14,5.26,5.71,7.05,5.62,5.96,5.80,6.69,5.69,5.66,5.90,5.55,4.89,5.56,5.16,6.03,6.09,5.82,5.89,6.43,5.65,6.49,6.59,6.02,6.21,6.44,6.63,6.04,6.42
Chicken breasts,per kilogram,12.05,11.06,12.37,12.96,11.13,10.47,10.63,12.21,12.31,11.65,9.85,11.01,13.65,11.76,11.12,11.31,12.25,10.75,10.84,10.50,11.59,11.63,12.96,12.22,12.95,10.70,11.32,11.55,11.81,11.73,13.43,13.34,12.58,12.26,12.78,13.09,12.05,13.50,13.05,13.25,11.85,11.79,11.57,10.86,12.28,12.83,13.60,11.99,12.73,13.07,12.57,11.62,12.39,11.53,12.47,12.30,13.02,15.38,12.98,13.19,13.36,13.61,12.68,14.19,13.35,12.58,13.67,12.93,13.11,12.73,14.77,13.44,13.51,13.57,13.74,15.23,14.48,14.51,15.21,14.31,13.81
Chicken thigh,per kilogram,8.59,7.14,7.38,7.66,6.85,6.22,6.51,7.32,6.64,7.85,6.83,8.76,6.11,6.37,6.37,5.63,5.05,5.20,6.68,7.63,6.78,8.05,6.97,7.16,6.41,6.40,6.54,6.80,5.97,6.90,6.26,7.51,6.32,6.24,7.14,7.26,6.88,8.62,7.05,7.27,6.37,5.80,6.86,6.00,6.94,6.10,6.68,7.29,6.70,8.32,6.75,7.34,6.58,7.22,7.36,6.96,7.97,7.48,7.90,7.85,7.66,8.18,7.70,8.42,7.20,7.09,7.53,7.25,8.16,9.83,8.03,7.85,7.61,8.71,8.15,7.90,9.36,9.06,8.98,8.31,7.99
Chicken drumsticks,per kilogram,7.92,6.75,6.60,6.95,6.47,5.65,6.00,6.54,6.03,7.12,5.97,7.75,5.47,5.88,5.93,5.31,4.69,4.91,6.12,7.05,6.57,7.20,6.60,6.68,5.92,6.06,6.02,6.29,5.56,6.32,6.02,6.55,5.85,5.57,6.42,6.64,6.07,7.59,6.28,6.91,6.21,5.65,6.47,5.71,6.23,5.43,5.73,6.44,5.73,7.15,5.73,6.15,5.56,5.91,6.46,6.13,6.86,6.11,6.46,6.82,7.20,7.47,6.90,7.34,6.39,6.13,6.66,7.09,6.99,7.78,7.00,7.20,6.71,7.69,6.74,6.30,6.89,8.31,7.24,6.94,6.55
Bacon,per kilogram,8.12,9.88,11.88,11.08,9.70,10.78,10.64,12.74,11.60,10.80,9.50,9.80,9.88,10.14,11.02,10.16,10.88,10.72,10.98,11.88,12.12,11.04,10.90,10.58,10.72,11.26,10.50,9.72,11.02,10.84,11.88,11.54,11.94,10.40,11.16,11.76,10.26,10.86,12.16,11.10,10.88,10.28,11.12,11.52,11.40,11.58,10.76,11.34,11.42,11.06,11.50,11.60,12.22,12.74,13.12,12.26,13.48,13.36,12.60,14.48,12.58,13.12,12.98,13.46,13.48,13.08,13.62,13.72,14.38,13.88,13.52,14.26,13.36,13.28,12.00,13.38,13.14,13.42,13.38,13.64,13.68
Wieners,per kilogram,5.62,5.54,5.62,4.94,5.32,5.10,5.02,5.06,5.50,6.00,5.94,6.42,5.68,5.44,5.98,5.28,5.62,5.54,5.70,6.04,6.54,6.14,6.06,7.38,5.56,5.62,6.28,6.18,5.56,5.88,6.34,6.30,6.28,6.74,6.50,7.62,6.62,5.48,6.46,6.68,6.92,5.98,6.98,7.30,6.64,6.92,6.86,7.40,5.30,7.38,6.90,6.68,6.96,7.08,6.88,7.52,6.82,6.54,6.84,8.54,6.68,7.08,7.34,8.36,7.92,7.84,7.54,7.86,8.12,7.00,7.36,8.16,6.56,7.68,6.86,6.60,7.94,7.94,7.48,7.86,7.06
Salmon,per kilogram,20.53,20.77,21.30,20.25,21.11,20.80,20.55,20.14,20.05,19.91,19.82,19.50,20.06,19.93,20.11,20.32,20.28,20.43,21.19,20.77,19.92,20.27,21.16,20.19,20.96,20.85,21.13,20.48,20.49,20.54,20.40,20.62,20.13,19.93,20.76,19.90,20.36,22.15,22.87,22.16,22.46,22.31,21.30,20.61,21.37,21.62,22.38,18.55,21.56,21.32,21.80,21.33,21.82,21.99,22.34,22.35,22.21,22.43,22.22,21.46,23.58,23.39,23.58,23.65,25.83,26.01,26.57,26.29,25.66,22.89,23.71,22.41,24.63,25.01,25.97,24.38,27.17,27.74,28.03,26.52,26.67
Shrimp,grams,6.30,6.63,6.87,6.66,6.74,8.09,7.36,7.11,7.51,6.73,6.80,7.34,6.35,6.99,7.35,6.84,7.02,8.48,7.47,6.73,6.61,6.70,6.98,7.53,6.67,6.59,6.68,6.58,7.36,6.94,6.62,6.94,6.98,6.81,6.80,6.95,7.00,6.61,6.54,6.56,6.94,6.42,6.23,6.57,6.96,6.74,6.89,6.80,6.14,6.59,6.16,6.71,6.91,6.56,6.62,6.72,6.90,7.50,7.55,7.72,7.30,8.05,7.54,7.84,8.31,7.98,7.80,7.77,7.53,7.80,7.30,8.22,7.83,7.45,7.81,7.59,7.75,7.79,7.69,7.81,8.16
Milk,1 liter,2.79,2.81,2.82,2.82,2.82,2.82,2.81,2.80,2.80,2.81,2.82,2.82,2.81,2.82,2.80,2.80,2.79,2.81,2.82,2.84,2.94,2.98,2.96,2.96,2.98,2.98,2.98,2.97,2.95,2.96,2.94,2.95,2.95,2.95,2.97,2.97,3.00,3.00,3.06,3.02,3.01,3.00,3.01,3.01,3.04,3.05,3.04,3.05,3.08,3.16,3.16,3.15,3.15,3.15,3.15,3.13,3.14,3.16,3.16,3.17,3.16,3.31,3.34,3.35,3.34,3.35,3.34,3.34,3.47,3.45,3.46,3.46,3.45,3.56,3.59,3.58,3.55,3.59,3.58,3.56,3.56
Milk(2),per liter,1.88,1.89,1.89,1.89,1.88,1.87,1.88,1.88,1.87,1.86,1.87,1.87,1.87,1.88,1.86,1.87,1.87,1.86,1.87,1.86,1.85,1.86,1.85,1.85,1.84,1.85,1.85,1.84,1.84,1.85,1.85,1.85,1.84,1.84,1.84,1.85,1.86,1.88,1.89,1.89,1.90,1.90,1.91,1.91,1.93,1.93,1.92,1.90,1.90,1.94,1.95,1.96,1.96,1.96,1.97,1.97,1.96,1.96,1.96,1.97,1.96,2.09,2.11,2.11,2.11,2.13,2.25,2.26,2.38,2.35,2.36,2.38,2.37,2.46,2.48,2.47,2.48,2.49,2.50,2.49,2.48
Soy milk,per liter,3.98,3.96,4.07,3.99,3.88,4.07,4.13,3.90,3.97,3.86,4.07,3.89,3.78,3.85,3.90,3.67,3.77,3.70,3.88,3.63,3.58,3.69,3.78,3.84,3.67,3.97,4.00,3.76,3.94,3.90,3.89,3.84,3.83,3.77,3.77,4.02,3.84,3.84,3.98,3.81,4.08,3.84,3.90,3.97,3.97,4.10,3.78,3.96,3.78,3.96,3.92,3.79,4.05,4.19,3.99,4.04,3.96,3.77,3.70,4.04,3.84,3.99,4.18,4.11,4.31,4.37,4.36,4.22,4.34,3.92,4.44,4.34,4.65,4.44,4.34,4.74,4.44,4.64,4.33,4.51,4.75
Eggs,dozen,3.40,3.43,3.52,3.47,3.33,3.28,3.63,3.47,3.41,3.56,3.34,3.49,3.09,3.61,3.36,3.50,3.37,3.48,3.53,3.67,3.52,3.38,3.47,3.16,3.45,3.57,3.29,3.26,3.45,3.43,3.33,3.45,3.59,3.59,3.51,3.32,3.64,3.36,3.30,3.94,3.96,3.97,4.01,4.06,4.05,4.08,4.07,4.06,4.05,4.10,4.23,4.24,4.26,4.26,3.59,4.34,3.77,4.37,4.08,4.47,4.26,4.24,4.28,4.75,4.85,4.53,5.02,5.04,5.09,5.12,4.56,4.79,4.43,4.79,4.20,5.01,5.06,5.09,5.16,4.87,4.65
Nut milk,per liter,3.85,3.95,3.91,3.88,3.96,3.99,4.01,3.88,3.95,3.88,3.99,3.88,3.83,3.76,3.76,3.63,3.77,3.68,3.83,3.70,3.64,3.70,3.76,3.78,3.66,3.86,3.89,3.80,3.87,3.91,3.93,3.73,3.74,3.80,3.79,3.90,3.81,3.86,3.98,3.88,3.95,3.89,3.90,3.95,3.93,4.04,3.93,4.03,3.88,4.00,3.97,3.86,4.03,4.12,4.02,4.01,3.99,3.85,3.80,4.03,3.93,4.00,4.08,4.11,4.26,4.39,4.26,4.31,4.34,4.38,4.38,4.36,4.60,4.42,4.40,4.70,4.44,4.73,4.36,4.45,6.00
Cream,1 liter,4.56,4.51,4.92,5.02,4.66,4.64,4.72,4.72,4.91,4.87,4.79,4.95,4.79,4.93,4.72,4.69,4.96,4.86,4.80,4.97,4.93,5.12,5.10,5.14,5.15,4.90,4.86,4.92,4.70,4.74,4.92,4.94,4.94,4.86,4.83,5.04,4.80,5.14,5.00,5.05,5.12,5.25,5.27,5.18,5.33,5.35,5.12,5.06,5.13,5.09,4.96,4.99,5.19,5.14,5.43,5.53,5.49,5.21,5.26,5.48,5.37,5.20,5.25,5.72,5.83,5.66,5.52,5.46,5.73,5.49,5.44,5.41,5.67,5.72,5.82,5.56,5.81,6.11,6.03,5.79,6.03
Butter,per kilogram,11.12,10.93,10.90,9.69,11.78,11.54,10.00,11.54,9.32,10.29,10.31,11.65,11.63,11.43,8.96,10.00,11.52,9.71,9.45,9.93,8.79,10.42,9.54,10.40,11.08,9.91,10.53,9.34,10.15,9.41,10.22,9.60,9.12,9.52,8.83,9.63,9.38,10.57,10.18,10.35,10.73,10.40,9.60,9.03,10.73,11.67,10.93,11.65,9.96,11.28,9.76,11.39,11.56,11.85,11.41,12.05,10.79,11.52,10.57,11.78,11.48,12.53,12.33,12.18,13.04,13.57,13.06,12.36,13.17,12.38,13.15,14.78,13.46,13.92,13.39,14.38,14.30,13.70,14.03,13.11,16.70
Margarine,per kilogram,4.76,4.70,4.48,4.73,4.88,4.48,4.76,4.74,5.08,5.14,4.76,4.55,4.56,4.83,4.43,4.96,4.94,4.62,4.82,4.96,4.72,4.52,5.01,5.07,4.53,5.12,5.07,5.15,5.04,5.04,4.98,5.26,4.94,4.93,4.49,4.67,4.75,4.59,4.94,4.94,4.85,4.83,4.59,4.99,5.25,5.06,4.85,4.83,4.79,5.12,4.92,5.37,5.41,5.52,5.48,5.63,5.53,5.53,5.80,5.60,5.99,5.90,6.77,6.98,6.82,7.34,7.44,7.97,7.66,7.75,7.87,8.05,7.96,7.55,7.99,7.96,8.02,8.29,8.60,8.39,7.44
Block cheese,per kilogram,12.02,12.38,11.98,10.60,11.58,12.02,11.70,11.90,11.04,10.92,11.48,10.64,11.04,11.60,10.50,11.86,11.70,11.66,11.40,12.20,11.56,10.76,10.30,10.42,11.24,11.28,12.12,10.92,11.58,11.64,12.04,11.60,11.60,10.80,11.66,10.72,11.84,11.48,12.08,12.54,11.94,12.32,12.14,11.68,11.38,11.52,11.44,12.08,11.98,12.38,11.56,12.10,12.52,13.04,12.40,12.62,12.60,12.28,12.24,11.96,12.82,13.14,13.80,13.04,13.66,13.54,12.82,13.68,13.42,13.04,13.30,12.58,13.66,13.18,13.24,13.30,13.16,13.72,13.72,13.52,7.94
Yogurt,per kilogram,5.88,6.24,6.36,6.40,6.42,6.26,6.42,6.54,6.36,6.68,6.40,6.86,6.10,6.34,6.12,6.44,6.28,6.32,6.52,6.30,6.16,6.38,6.64,6.52,6.48,6.54,6.78,6.40,6.46,6.54,6.32,6.28,6.38,6.38,6.34,6.24,6.30,6.28,6.42,6.36,6.32,6.58,6.40,6.64,6.76,6.76,6.84,6.52,6.38,6.46,6.52,6.68,6.60,6.60,6.90,6.94,6.98,6.92,6.94,6.80,6.86,6.76,7.02,7.22,7.28,7.48,7.42,7.30,7.16,7.16,7.50,7.56,7.54,7.50,7.56,7.66,7.60,7.66,8.00,7.78,10.38
Apples,per kilogram,5.37,5.28,5.16,5.43,5.29,5.48,5.40,5.51,5.23,4.70,4.74,4.68,5.17,5.14,5.10,5.30,5.40,5.58,5.49,5.50,5.32,4.55,5.38,5.50,5.69,5.48,5.63,5.51,5.75,5.85,6.10,6.31,5.84,5.48,5.79,5.74,5.88,5.69,6.05,5.67,6.00,6.02,6.05,6.27,5.57,5.84,6.10,6.30,6.23,5.87,6.22,6.30,6.47,6.39,6.21,6.45,6.37,5.99,6.28,6.55,6.28,6.39,6.11,6.28,6.00,6.39,6.89,7.15,7.02,6.42,7.07,6.78,6.16,6.97,7.03,6.56,6.88,6.97,7.15,7.48,7.06
Oranges,per kilogram,4.16,4.05,4.25,4.59,4.85,5.06,4.23,4.57,4.25,3.82,4.24,4.48,4.62,3.57,4.38,4.06,4.26,4.29,4.17,4.20,3.98,3.83,5.06,4.87,4.43,4.44,4.96,4.55,4.79,4.30,4.59,4.36,3.97,4.47,4.81,5.00,4.34,4.11,4.66,4.86,4.95,5.34,4.95,4.30,4.55,4.74,4.51,5.18,4.51,4.83,4.35,4.03,5.13,5.13,5.01,4.97,5.19,5.19,5.03,5.31,4.71,5.07,5.37,5.22,5.19,4.12,5.35,5.55,6.03,6.22,6.27,5.62,5.80,5.51,5.65,5.76,5.88,6.06,5.80,6.10,6.00
Oranges,per kilogram,5.29,5.65,5.32,5.38,6.49,6.63,6.12,5.81,5.09,5.17,6.08,5.91,5.70,5.29,5.87,5.36,6.20,6.24,6.18,5.63,5.32,5.22,6.48,6.18,5.95,5.94,5.75,5.66,5.91,5.51,5.86,5.85,5.39,5.30,5.76,5.63,4.59,5.23,5.28,5.46,5.83,6.37,6.14,5.96,5.58,6.11,5.75,6.38,5.12,5.52,5.64,5.55,5.45,6.02,6.02,6.15,5.32,5.67,5.50,6.12,5.73,6.84,5.93,6.70,6.54,6.27,6.81,6.95,6.73,6.00,7.24,7.27,6.83,6.89,6.26,7.18,7.26,7.73,7.63,7.84,6.67
Bananas,per kilogram,2.11,2.15,2.15,2.14,2.16,2.16,2.14,2.14,2.13,2.13,2.07,2.10,2.12,2.17,2.16,2.16,2.16,2.15,2.15,2.12,2.10,2.06,2.05,2.03,2.05,2.08,2.09,2.09,2.08,2.10,2.06,2.04,2.06,2.07,2.06,2.05,2.09,2.12,2.07,2.06,2.09,2.10,2.05,2.04,2.11,2.14,2.08,2.04,2.09,2.09,2.07,2.06,2.08,2.07,2.05,2.01,2.06,2.01,2.02,2.08,2.14,2.07,2.12,2.17,2.18,2.16,2.14,2.15,2.15,2.18,2.15,2.15,2.17,2.17,2.16,2.22,2.18,2.19,2.17,2.16,2.18
Pears,per kilogram,5.32,5.38,5.36,4.85,5.10,5.21,5.21,5.05,4.81,4.39,4.82,4.88,5.17,4.92,5.29,5.21,5.37,5.19,4.96,4.79,5.47,5.11,4.72,5.27,5.46,5.14,5.31,5.14,5.30,5.64,4.85,4.91,4.75,5.45,5.21,5.58,5.56,5.88,5.86,6.02,6.05,5.83,5.61,5.62,6.03,6.04,5.83,6.00,5.91,5.77,6.21,6.03,6.01,5.65,5.91,6.06,6.25,6.48,6.50,6.76,6.52,6.34,6.56,6.36,6.33,6.47,6.57,7.20,7.14,6.52,7.00,7.17,6.96,7.08,6.98,6.92,6.77,6.44,6.78,7.28,6.89
Lemons,unit,1.10,1.14,1.17,1.16,1.17,1.20,1.17,1.09,1.04,1.01,0.96,1.07,1.01,1.00,1.05,1.03,0.97,1.01,1.02,1.06,1.04,0.93,0.98,0.84,1.04,1.03,0.99,0.97,0.99,1.02,0.99,1.01,1.00,0.97,1.01,1.02,0.95,0.91,1.04,1.05,1.10,1.08,1.08,1.12,1.09,1.10,1.09,1.06,1.04,1.00,0.98,0.99,1.01,1.03,1.10,1.01,1.02,0.99,0.99,1.03,0.94,1.04,1.02,1.02,1.04,1.01,0.97,1.03,1.13,1.15,1.13,1.13,1.12,1.17,1.13,1.19,1.17,1.26,1.25,1.31,1.14
Limes,unit,0.76,0.85,0.89,0.90,0.90,0.87,0.81,0.82,0.82,0.70,0.69,0.80,0.56,0.82,0.87,0.87,0.90,0.87,0.89,0.86,0.85,0.76,0.80,0.83,0.67,0.75,0.81,0.89,0.90,0.90,0.90,0.89,0.80,0.82,0.79,0.87,0.82,0.79,0.88,0.84,0.86,0.85,0.82,0.86,1.00,0.99,0.96,0.95,0.88,0.85,0.86,0.90,0.92,0.95,0.99,0.94,1.00,0.95,0.86,0.97,0.87,1.13,1.28,1.56,1.57,1.15,1.07,1.06,1.07,1.05,1.13,1.11,0.94,1.04,1.07,1.25,1.46,1.49,1.36,1.36,1.36
Grapes,per kilogram,9.21,7.53,7.00,7.10,7.92,5.91,6.35,5.67,6.27,6.20,6.62,6.81,8.58,6.68,6.08,6.57,7.32,6.40,7.54,7.35,6.65,6.66,5.91,6.69,6.99,6.90,6.98,6.08,7.50,7.07,5.83,6.17,5.99,6.10,5.93,6.63,6.70,6.50,6.80,7.28,7.90,7.14,7.51,7.37,7.32,7.08,8.00,7.22,7.77,7.33,7.91,7.98,9.09,8.36,8.11,7.96,7.28,7.23,7.15,8.01,8.26,9.42,8.82,8.21,9.04,8.43,8.70,8.20,7.41,7.19,8.39,8.73,9.04,9.15,8.81,8.23,11.37,9.60,8.21,7.83,8.67
Cantaloupe,unit,3.36,3.02,3.01,3.31,3.18,3.63,3.58,2.90,2.99,3.39,3.13,3.37,3.90,3.27,2.92,3.62,3.27,3.53,3.25,3.18,3.14,2.48,4.04,3.41,3.53,3.07,3.56,3.77,3.50,4.28,4.15,3.17,3.39,3.71,3.74,3.69,3.58,3.51,3.58,3.83,4.05,4.04,4.01,3.38,3.30,4.55,4.36,3.57,4.17,4.33,3.64,3.81,3.72,3.57,3.85,3.41,3.57,3.84,4.60,4.15,4.30,4.41,4.23,4.90,5.16,4.95,4.75,3.96,4.91,4.70,5.23,4.83,4.96,5.42,5.12,5.16,5.28,5.22,4.95,3.79,4.20
Strawberries,per kilogram,10.09,8.90,9.32,7.69,7.84,8.33,9.10,9.34,8.33,8.41,10.42,12.33,10.09,8.26,8.30,10.22,7.40,8.30,8.72,8.04,7.97,7.80,10.37,14.76,11.76,9.91,7.47,8.68,8.41,9.03,8.63,8.15,8.74,9.60,11.01,13.11,10.53,8.26,9.96,9.07,8.30,7.78,9.60,11.19,11.10,12.64,13.55,13.06,9.98,11.12,7.84,9.16,10.84,9.34,9.60,11.08,10.35,10.79,13.70,14.80,12.89,10.51,8.83,10.86,10.59,11.23,11.50,10.81,11.32,13.48,15.68,15.84,12.47,11.87,9.80,12.40,10.04,9.96,11.15,12.58,11.65
Avocado,unit,2.06,1.85,2.12,2.29,2.28,2.08,2.16,2.28,2.13,1.97,1.45,1.68,1.38,1.66,1.88,2.01,1.86,1.79,1.62,1.67,1.76,1.46,1.51,1.75,1.69,1.70,1.57,1.92,2.05,2.14,2.13,1.97,1.82,1.78,1.92,1.98,1.91,1.91,1.79,1.94,2.10,2.03,2.10,1.89,1.97,1.72,1.71,1.39,1.53,1.59,1.77,1.75,1.74,1.86,2.13,1.90,1.84,1.78,1.86,1.88,1.66,2.04,2.36,2.21,2.61,2.48,2.21,1.95,1.56,1.85,1.94,1.86,1.80,1.62,1.71,1.83,1.80,1.90,1.96,2.06,1.87
Potatoes,per kilogram,1.08,1.05,1.12,1.02,1.18,1.29,1.61,1.39,1.28,1.06,1.05,1.20,0.97,1.16,1.18,1.03,1.06,1.28,1.54,1.41,1.15,1.16,1.16,1.12,1.19,1.28,1.08,1.22,1.34,1.34,1.46,1.41,1.34,1.01,1.24,0.95,1.16,1.35,1.32,1.41,1.49,1.47,1.37,1.35,1.43,1.46,1.30,0.85,1.04,1.26,1.22,1.38,1.50,1.36,1.30,1.35,1.25,1.26,1.26,1.35,1.36,1.35,1.30,1.35,1.46,1.42,1.63,1.51,1.47,1.26,1.46,1.31,1.49,1.43,1.46,1.56,1.63,1.71,1.57,1.71,1.57
Potatoes,per kilogram,3.74,3.82,3.93,3.98,4.58,4.54,4.55,4.57,4.21,4.14,4.39,4.13,4.40,4.01,3.85,3.79,3.90,4.07,4.15,4.10,4.19,4.17,4.13,4.12,4.22,4.05,4.18,4.11,4.21,4.91,4.80,4.59,4.97,4.72,4.79,4.63,4.85,4.75,4.49,4.60,4.76,4.76,4.92,4.85,4.45,4.48,4.48,4.41,4.71,4.45,4.43,4.55,4.93,4.40,5.03,5.05,5.10,5.07,5.25,4.71,4.71,4.96,4.83,4.90,5.17,5.61,5.71,5.64,5.58,5.51,5.77,5.29,5.37,5.44,5.38,5.13,5.57,5.51,5.77,5.69,5.78
Sweet potatoes,per kilogram,4.29,4.61,4.89,4.34,4.61,4.67,4.82,4.99,4.88,3.98,4.66,3.50,4.62,4.81,3.85,4.70,5.00,5.13,4.96,5.17,4.82,4.32,4.82,4.13,4.47,4.49,5.16,4.22,5.17,4.79,4.83,4.92,5.21,4.68,4.96,4.39,5.05,4.77,5.03,4.87,5.35,5.29,5.29,5.02,5.00,4.04,4.62,4.20,4.55,4.88,4.93,4.94,4.97,4.55,5.13,4.68,4.53,3.87,4.39,3.88,4.05,4.53,4.62,4.22,4.55,4.68,4.78,4.76,4.49,4.26,4.74,4.12,4.89,4.79,4.68,4.46,5.01,4.92,5.06,5.35,5.12
Tomatoes,per kilogram,5.60,5.34,5.14,4.75,4.92,4.93,4.84,4.40,4.50,4.71,4.94,6.03,6.92,6.10,5.85,5.00,4.73,4.47,4.77,4.33,4.21,4.21,5.04,6.15,6.63,5.68,5.59,5.21,4.77,4.46,4.80,4.58,4.36,4.72,5.91,6.54,7.51,7.52,7.63,6.68,5.73,6.42,6.76,6.48,7.12,7.07,7.12,7.33,7.77,7.38,6.56,5.15,4.77,5.09,5.24,5.22,5.37,5.29,6.39,6.90,6.78,6.81,6.31,5.48,5.50,5.32,6.09,5.82,5.89,5.29,7.86,8.46,8.42,8.08,7.19,6.57,6.47,5.98,6.43,6.15,6.11
Cabbage,grams,2.20,2.13,2.20,2.13,2.43,2.56,2.42,2.29,2.33,2.17,2.29,2.08,2.20,2.19,2.23,2.40,2.33,2.42,2.40,2.30,2.27,2.33,2.24,2.25,2.56,2.54,2.22,2.63,2.93,3.14,3.11,2.90,2.53,2.22,2.34,2.12,2.45,2.40,2.19,2.17,2.62,2.87,2.97,2.78,2.75,2.53,2.44,2.44,2.53,2.81,2.40,2.61,2.69,2.70,2.64,2.52,2.33,2.24,2.31,2.42,2.40,2.63,2.49,2.47,2.41,2.55,2.86,2.50,2.63,2.72,2.90,2.82,2.69,2.94,2.87,2.86,2.99,3.15,2.92,2.82,2.91
Carrots,per kilogram,3.06,3.23,3.30,3.14,3.09,3.81,3.84,3.54,2.89,2.95,2.90,3.12,3.05,2.72,3.65,3.59,4.01,4.00,3.54,3.31,2.98,2.35,2.90,2.77,2.78,2.79,3.22,3.40,4.03,4.58,4.46,3.86,3.07,3.05,3.01,2.64,2.89,2.74,2.82,3.24,3.86,4.17,4.60,4.22,3.51,3.56,3.80,2.82,3.69,3.53,3.63,3.87,4.42,4.30,4.21,3.80,3.53,3.06,3.21,3.38,3.44,3.54,3.55,4.10,4.39,4.71,4.64,4.51,4.15,2.90,3.64,3.82,4.14,4.40,4.09,4.32,4.56,4.68,4.57,4.16,4.19
Onions,per kilogram,5.51,5.27,5.26,5.10,5.08,5.04,5.18,5.10,5.05,5.00,4.90,5.06,5.17,5.10,5.08,5.00,5.03,5.08,5.19,5.31,5.12,4.83,4.86,5.05,4.84,5.05,5.12,5.21,5.34,5.72,5.80,5.79,5.11,4.91,4.86,4.89,4.78,4.85,4.89,4.93,4.57,4.79,5.15,4.99,4.78,5.09,5.12,5.39,5.07,5.20,5.14,4.61,4.86,4.85,5.25,5.52,5.21,5.19,5.32,5.45,4.87,5.38,5.58,5.90,6.08,6.09,6.05,5.99,5.77,5.75,5.54,5.87,5.83,5.88,5.82,5.76,5.61,5.81,6.15,6.12,6.06
Onions,per kilogram,3.61,3.65,3.60,3.75,3.74,3.85,4.27,4.26,3.51,3.61,3.41,3.66,3.48,3.10,3.55,3.54,3.58,3.82,4.11,3.97,3.56,2.97,3.22,3.14,3.24,3.23,3.71,3.61,4.06,4.44,4.61,4.62,3.65,3.64,3.57,3.12,3.34,3.11,3.16,3.49,3.78,4.13,4.19,4.13,3.89,4.04,4.23,3.19,4.10,3.97,4.16,4.02,4.60,4.07,4.20,4.73,4.13,3.63,3.77,3.87,3.94,4.35,4.37,4.78,5.23,5.29,5.32,5.24,5.06,3.43,4.34,4.43,4.71,4.92,4.71,4.79,4.89,4.92,5.09,4.81,4.81
Celery,unit,3.32,2.99,3.08,2.97,3.66,3.97,3.69,3.11,2.74,2.60,2.89,3.13,3.35,3.33,3.19,2.77,3.02,3.21,3.30,3.05,3.03,2.74,3.04,3.43,3.01,3.56,3.77,4.71,5.29,5.57,4.26,3.20,3.04,3.14,3.30,3.53,3.60,3.32,3.40,3.31,3.50,3.43,3.37,3.12,3.14,3.45,3.49,3.42,3.64,3.71,3.43,3.30,3.42,3.46,3.19,2.93,2.58,2.94,3.52,3.61,3.54,3.71,3.63,3.50,3.74,3.85,3.54,3.11,3.11,3.46,4.20,4.62,5.10,4.80,4.84,4.76,4.66,4.88,4.22,3.62,3.43
Cucumber,unit,2.19,1.96,2.12,2.00,1.95,1.89,1.92,1.80,1.80,1.90,1.95,2.27,2.30,2.27,1.85,1.58,2.01,2.10,1.86,2.10,1.98,1.92,1.93,2.02,2.34,2.22,1.97,1.68,1.77,1.76,1.71,1.87,1.94,2.07,2.15,2.26,2.32,2.36,2.03,1.92,1.91,1.89,1.96,2.01,2.07,1.96,2.23,2.13,2.37,2.34,1.94,1.65,1.68,1.84,2.05,1.98,1.83,1.91,2.17,2.19,2.07,2.29,1.99,1.62,2.04,1.99,2.09,1.86,2.04,1.97,2.35,2.22,2.43,2.49,2.37,2.11,2.11,1.92,2.04,2.07,2.02
Mushrooms,per kilogram,10.70,9.47,10.35,10.00,10.48,10.00,10.09,10.70,10.26,9.60,9.25,9.52,9.82,9.12,9.82,10.66,10.62,10.66,10.57,10.40,10.88,10.00,9.74,9.74,10.09,10.44,9.87,10.84,9.65,11.01,10.66,11.01,11.06,10.48,11.37,10.62,10.40,10.22,10.75,11.45,11.50,11.45,11.23,11.85,12.69,12.25,11.06,11.63,11.72,11.63,11.94,11.76,11.28,12.29,12.56,12.56,12.29,12.03,12.25,12.56,12.82,12.51,12.29,12.38,13.26,12.64,13.57,12.95,13.39,12.73,13.39,12.78,13.39,13.13,13.35,12.73,12.82,13.26,13.92,13.57,13.22
Iceberg lettuce,unit,2.57,2.60,2.57,3.35,3.35,3.00,2.72,2.17,2.12,2.62,2.87,2.98,2.86,2.84,2.75,2.76,2.73,2.53,2.45,2.56,2.57,2.48,2.80,3.45,3.00,2.95,3.03,2.89,2.91,2.77,2.38,2.43,2.28,2.73,3.23,3.14,3.18,3.14,3.31,3.36,3.18,3.24,2.78,2.49,2.64,3.24,3.47,3.38,3.49,3.57,3.30,2.99,3.12,3.00,2.48,2.44,2.61,3.17,4.30,3.58,3.12,3.24,3.76,3.77,3.35,3.34,2.58,2.56,2.95,3.69,4.82,4.93,4.72,4.23,3.74,3.86,4.31,3.61,3.21,3.20,3.31
Romaine lettuce,unit,2.97,3.27,3.23,3.69,3.76,2.64,2.33,2.30,2.36,2.46,2.87,2.78,2.71,3.14,2.96,3.03,2.92,2.53,2.23,2.42,2.36,2.84,2.99,3.76,3.13,3.42,3.34,3.14,3.21,3.26,2.47,2.47,2.71,3.01,3.25,3.47,3.34,3.04,3.40,3.39,3.57,3.46,2.78,2.47,2.79,3.72,3.83,3.71,3.93,3.92,3.52,3.51,3.27,2.73,2.20,2.16,2.40,2.84,3.85,3.81,3.58,3.81,4.22,4.35,3.89,3.28,2.28,2.44,2.97,3.96,4.93,4.75,4.72,3.98,4.18,4.34,4.43,3.40,2.89,2.62,2.79
Broccoli,unit,2.80,2.67,2.71,2.79,3.21,2.92,2.61,2.52,2.35,2.66,2.36,3.15,3.23,2.67,2.87,2.98,3.04,2.97,2.85,2.29,2.27,2.47,2.80,2.98,2.75,3.05,2.86,2.79,3.00,3.07,2.81,2.64,2.92,2.74,3.36,2.79,3.27,3.17,3.22,3.20,3.21,3.48,3.09,2.92,2.95,3.15,3.62,3.37,3.53,3.33,3.25,3.28,3.28,3.20,2.77,2.78,2.91,3.09,3.52,3.56,3.54,3.76,3.19,3.67,3.20,3.72,3.20,3.21,3.33,3.51,3.90,3.62,4.32,4.27,4.34,4.41,4.57,3.96,3.55,3.12,3.39
Peppers,per kilogram,7.56,7.15,7.37,7.18,7.36,7.52,7.62,7.25,7.19,7.29,8.23,8.63,8.97,8.20,8.76,8.35,8.06,8.74,8.60,8.26,7.27,7.85,8.79,9.25,9.03,9.06,9.53,8.64,7.75,8.82,8.74,6.44,6.70,7.31,8.36,8.22,8.45,8.83,9.27,8.65,8.77,9.04,9.98,7.96,8.49,9.21,9.43,9.38,9.68,9.90,8.95,7.30,8.07,8.40,8.78,7.78,7.82,7.93,9.02,8.52,8.87,8.77,8.33,8.70,8.89,9.33,9.10,7.93,7.41,8.09,10.01,10.16,10.23,10.15,10.23,9.43,9.52,9.52,9.35,8.50,8.43
Squash,kilograms,3.82,3.93,4.11,4.21,4.55,4.80,5.26,5.03,3.65,3.22,3.57,3.27,4.31,4.66,4.78,4.79,4.84,4.91,5.14,4.58,3.66,3.41,3.77,3.96,4.67,4.59,4.66,4.93,5.85,5.77,6.04,5.78,4.12,3.79,4.05,3.98,4.95,4.90,4.90,5.30,5.57,6.20,6.35,5.91,3.93,3.66,3.93,3.78,4.93,5.20,5.03,5.19,5.06,4.99,4.95,4.53,3.93,3.91,4.18,4.38,4.55,5.32,5.30,4.74,5.37,5.67,5.86,5.64,4.54,4.32,4.84,4.89,5.28,6.12,6.60,6.63,6.81,6.84,6.82,6.01,4.49
Salad greens,per kilogram,33.03,32.46,32.82,32.11,32.61,32.96,33.17,32.25,32.04,31.62,31.20,29.58,33.24,30.92,30.99,31.34,32.25,33.10,33.45,30.63,33.24,31.27,33.17,31.90,28.94,29.93,31.48,30.70,32.25,31.27,30.35,30.77,31.55,30.56,30.56,28.10,31.90,29.58,31.41,31.27,30.77,31.76,30.77,29.65,33.24,33.03,32.75,27.61,31.41,31.97,32.54,31.27,31.55,32.54,33.59,33.59,31.20,31.27,34.08,31.34,31.34,32.18,33.03,31.83,35.56,35.56,33.38,32.61,34.23,33.87,35.49,31.76,34.72,31.20,33.73,32.82,34.93,33.31,33.73,34.58,30.99
Meatless burgers,per kilogram,17.30,17.26,17.70,17.08,17.43,17.83,18.19,17.57,17.88,17.74,17.08,18.67,17.83,17.74,17.57,17.26,18.01,18.10,18.27,18.58,18.36,18.89,18.27,18.50,18.81,18.05,19.69,19.96,29.38,25.49,26.95,26.46,25.58,25.97,23.23,22.96,21.59,21.55,23.89,25.62,25.00,26.28,25.66,24.82,25.27,25.75,24.65,24.78,24.42,24.07,24.56,21.37,24.25,25.49,25.40,25.27,25.09,25.31,25.88,26.06,23.67,23.81,23.89,25.09,24.07,23.98,25.18,26.42,25.84,26.28,27.30,28.94,24.56,26.77,26.50,26.37,26.55,26.86,27.30,27.70,26.99
Frozen french fried potatoes,per kilogram,2.64,2.56,2.71,2.67,2.77,2.73,2.73,2.75,2.76,2.71,2.69,2.71,2.52,2.59,2.63,2.73,2.69,2.72,2.80,2.76,2.71,2.77,2.71,2.76,2.89,2.81,2.80,2.93,3.01,3.03,2.99,3.04,3.13,3.16,3.13,3.09,3.11,2.89,3.15,3.12,3.08,3.17,2.97,3.07,3.17,3.29,3.25,3.16,3.05,3.16,3.12,3.17,3.16,3.20,3.23,3.21,3.27,3.32,3.28,3.40,3.23,3.37,3.24,3.52,3.57,3.60,3.64,3.76,3.88,3.85,3.75,3.73,3.84,4.13,4.37,4.29,4.31,4.13,4.35,4.41,4.39
Frozen green beans,per kilogram,4.64,4.28,5.25,5.00,5.72,5.61,5.59,5.59,5.25,5.07,4.92,4.95,4.96,4.84,4.75,5.00,4.71,5.16,5.53,4.97,5.03,5.15,5.40,5.29,5.64,5.24,5.17,5.29,5.44,5.45,5.60,5.13,5.27,5.17,5.33,5.28,5.28,5.04,5.21,5.63,5.79,5.77,5.65,5.65,5.07,5.28,4.92,4.80,4.76,5.55,5.60,5.64,5.69,5.64,5.61,5.64,5.25,5.33,5.55,5.40,5.68,5.73,5.73,5.47,5.76,5.57,5.87,6.07,5.95,5.72,5.88,5.47,5.89,6.16,6.32,5.92,6.41,6.19,6.39,6.41,6.05
Frozen broccoli,per kilogram,6.38,6.36,6.46,5.14,6.88,6.64,7.12,6.58,5.62,6.32,5.98,6.08,6.40,5.70,5.64,6.18,5.44,5.70,6.66,5.98,6.12,6.42,6.08,5.58,6.38,5.78,6.40,5.72,6.70,6.78,6.72,5.94,6.70,6.00,6.12,5.72,5.64,6.30,6.94,7.14,7.16,7.28,7.48,7.26,6.86,6.72,6.82,6.10,6.14,6.84,6.86,6.88,7.36,7.06,7.38,7.22,6.62,6.58,7.06,6.60,7.06,7.16,7.58,6.72,7.34,6.98,7.22,7.46,7.58,7.22,7.62,6.38,7.48,7.86,7.88,7.38,7.80,7.88,7.86,8.04,7.76
Frozen corn,per kilogram,3.87,3.88,4.12,3.53,4.36,4.09,4.37,4.19,3.80,4.00,3.83,3.80,3.84,3.67,3.60,3.81,3.53,3.83,4.16,3.41,3.96,4.04,4.08,3.91,4.25,3.91,4.03,3.92,4.32,4.28,4.36,4.05,4.35,4.07,4.15,4.15,4.08,4.08,4.24,4.52,4.56,4.59,4.63,4.48,4.15,4.17,4.11,3.80,3.80,4.52,4.47,4.51,4.57,4.52,4.55,4.48,4.20,4.17,4.44,4.29,4.55,4.49,4.61,4.24,4.48,4.39,4.55,4.56,4.64,4.57,4.72,4.31,4.49,4.83,4.99,4.63,5.00,4.89,4.96,5.17,4.81
Frozen mixed vegetables,per kilogram,4.64,4.49,4.84,4.36,5.09,4.85,5.12,4.60,4.60,4.49,4.45,4.59,4.41,4.53,4.35,4.51,4.25,4.57,4.95,4.64,4.56,4.80,5.00,4.41,4.75,4.55,4.63,4.68,4.77,4.87,4.92,4.75,4.99,4.69,5.01,4.61,4.75,4.59,4.84,5.25,5.31,5.25,5.28,5.17,4.93,4.95,4.80,4.56,4.49,4.97,4.72,5.05,5.33,5.21,5.32,5.16,4.77,4.89,5.13,5.03,5.08,5.24,5.44,4.87,5.12,5.21,5.25,5.41,5.52,5.40,5.39,5.12,5.32,5.57,5.65,5.20,5.77,5.73,5.85,5.89,5.85
Frozen peas,per kilogram,3.93,3.97,4.17,3.59,4.41,4.17,4.48,4.21,3.87,3.96,3.87,3.84,3.81,3.72,3.59,3.83,3.56,3.95,4.23,4.04,4.00,4.05,4.17,3.93,4.23,3.97,4.16,4.01,4.31,4.40,4.37,4.15,4.40,4.17,4.20,4.15,4.21,4.09,4.27,4.49,4.51,4.53,4.65,4.52,4.13,4.13,4.05,3.84,3.85,4.45,4.29,4.40,4.52,4.37,4.40,4.35,4.09,4.16,4.37,4.27,4.47,4.43,4.57,4.13,4.07,4.11,4.36,4.65,4.60,4.67,4.85,4.65,4.64,4.89,5.01,4.81,5.01,4.97,5.08,5.24,4.84
Frozen pizza,per kilogram,9.54,9.92,9.05,10.18,9.28,10.74,9.97,9.44,9.41,9.67,10.54,9.90,9.90,9.44,10.28,10.13,9.59,10.49,10.87,10.72,9.77,10.64,10.85,10.62,10.82,11.05,11.56,9.95,10.46,10.41,10.64,10.64,9.72,9.77,10.26,10.59,10.15,11.64,10.28,11.03,11.56,11.51,11.15,11.54,10.87,11.31,10.90,11.10,11.31,11.36,10.54,10.31,11.33,11.05,11.64,11.18,10.77,11.67,10.95,10.90,11.59,11.41,10.49,10.69,11.23,10.95,11.72,10.77,10.92,11.77,12.49,9.74,11.95,11.72,11.44,12.10,11.46,12.69,12.90,13.10,12.69
Frozen spinach,per kilogram,5.77,5.77,5.73,5.90,6.30,6.43,6.43,6.27,6.23,5.37,5.53,6.50,5.87,6.43,5.60,5.50,6.43,5.80,6.57,5.73,6.60,5.60,5.90,6.37,5.93,6.53,6.37,6.63,6.37,6.10,6.60,6.40,5.97,5.63,6.13,6.33,6.53,6.63,6.67,6.50,6.53,6.47,6.60,6.40,5.77,5.37,6.13,6.00,5.80,6.07,6.13,6.53,6.53,6.43,6.77,6.77,6.63,6.47,6.47,6.93,6.93,6.90,7.07,7.07,7.17,6.80,6.97,7.70,8.30,7.93,8.03,7.77,7.47,8.33,8.53,7.77,8.07,8.20,8.03,8.10,8.40
Frozen strawberries,per kilogram,6.93,8.18,7.37,8.60,7.47,8.07,7.10,7.97,6.97,7.40,7.37,7.10,7.30,6.55,7.07,7.22,7.13,6.45,6.78,6.98,7.13,7.42,8.08,6.82,7.30,7.30,7.28,6.83,7.62,7.28,6.70,6.80,7.42,6.88,7.50,6.42,7.27,7.17,7.52,7.88,7.95,7.80,7.02,7.20,7.65,7.95,7.57,6.92,7.23,7.35,7.52,7.48,7.57,7.10,7.40,7.40,7.40,7.38,8.02,8.35,7.92,8.17,7.90,8.02,8.17,8.18,8.47,8.57,8.77,7.52,8.02,7.63,9.05,9.17,8.77,8.72,8.37,7.85,8.53,8.63,7.80
White bread,per kilogram,4.59,4.59,4.53,4.49,4.70,4.67,4.65,4.64,4.81,4.76,4.61,4.70,4.56,4.55,4.56,4.41,4.43,4.44,4.33,4.31,4.34,4.53,4.49,4.30,4.73,4.73,4.68,4.37,4.65,4.89,4.79,4.87,4.90,4.89,4.61,4.87,4.86,4.92,4.86,4.79,4.84,4.89,4.83,4.83,4.90,4.86,4.79,4.84,4.56,4.71,4.77,4.67,4.89,4.52,4.79,4.81,4.81,4.89,4.93,5.23,4.96,5.07,5.29,5.48,5.51,5.48,5.72,5.63,5.73,5.79,5.72,5.78,5.69,5.75,5.76,5.82,5.97,6.01,6.00,5.90,5.97
Flatbread and pita,per kilogram,8.78,8.56,8.22,7.92,8.30,8.28,8.62,8.12,8.40,8.42,8.54,7.48,8.26,8.06,7.68,7.72,7.90,7.94,7.48,7.64,8.20,8.08,8.12,7.60,7.82,7.62,7.32,7.68,7.30,7.24,7.04,7.16,7.44,7.00,7.74,7.52,7.20,7.32,7.74,7.40,7.10,7.18,6.80,6.94,7.64,7.52,7.78,7.22,7.22,7.16,7.22,7.42,7.14,7.20,7.18,7.46,7.56,7.54,7.86,8.02,7.58,7.92,7.84,8.18,8.40,8.32,8.52,8.94,9.02,8.96,9.54,9.60,9.56,9.74,9.76,9.80,10.06,10.00,9.90,10.02,10.10
Crackers and crisp breads,per kilogram,11.15,12.15,12.55,11.85,12.15,11.90,12.25,11.00,12.20,10.55,10.85,10.25,11.25,12.05,11.65,12.15,11.85,12.10,12.60,12.10,12.50,12.65,12.05,11.20,13.80,12.65,11.80,12.05,13.55,12.70,13.25,12.65,12.85,12.60,12.75,11.15,12.40,13.00,12.35,12.55,12.95,12.70,12.35,12.70,12.90,13.20,12.70,11.80,13.10,12.65,12.25,13.00,12.70,12.70,12.95,13.10,12.80,12.65,12.85,13.10,13.65,13.15,14.25,13.45,14.20,14.20,14.75,14.80,15.15,14.20,15.70,15.00,15.85,15.55,15.25,15.50,15.25,15.35,16.00,16.10,15.95
Cookies and sweet biscuits,per kilogram,7.83,8.23,8.90,8.83,8.53,7.90,8.77,8.70,9.10,9.03,8.67,8.43,7.90,8.57,8.87,8.67,8.90,8.67,8.90,8.97,9.13,9.23,8.73,9.13,9.90,9.47,8.97,8.57,9.40,9.57,10.03,9.77,9.37,9.70,9.77,9.47,9.33,9.70,9.53,9.33,9.80,10.17,9.80,10.07,10.17,10.37,9.90,10.10,10.13,10.03,9.83,9.90,10.13,10.10,9.93,10.13,10.07,9.80,9.57,9.50,10.23,10.70,10.10,10.57,10.53,10.27,10.97,11.37,11.50,11.60,10.33,10.93,11.00,11.57,11.90,12.40,12.07,11.37,12.30,12.20,11.47
Dry or fresh pasta,per kilogram,4.22,4.16,4.40,4.64,4.06,4.28,4.46,4.12,5.04,4.66,4.78,4.78,4.24,4.18,4.90,4.08,4.92,4.48,3.78,4.62,4.56,4.54,4.54,5.38,4.28,4.38,4.04,4.62,5.12,4.36,4.90,4.38,4.18,5.04,5.26,4.76,4.76,4.48,4.82,5.20,5.50,5.88,4.92,4.32,4.90,4.70,5.08,5.02,4.60,5.06,5.44,4.64,5.54,4.54,4.70,4.24,5.76,5.42,5.64,6.02,5.42,6.06,6.96,6.14,6.50,6.74,7.02,6.64,7.48,7.32,6.00,7.58,6.50,7.50,8.16,8.02,7.36,7.12,7.06,8.34,7.40
Brown rice,per kilogram,5.34,5.10,5.34,5.41,5.48,5.62,5.46,5.61,5.46,5.19,5.31,5.38,5.13,5.39,5.54,5.38,5.44,5.43,5.64,5.56,5.49,5.29,5.28,5.03,5.39,5.30,5.23,5.38,5.43,5.11,5.39,5.22,5.13,5.40,5.74,5.79,6.09,5.84,6.00,6.08,6.26,6.21,6.10,5.62,5.79,6.14,6.01,6.36,5.78,6.13,6.09,5.63,5.74,5.70,6.13,5.82,5.63,5.68,5.98,5.73,5.76,6.03,5.92,5.54,5.61,6.01,6.39,6.48,6.47,6.68,6.77,6.44,6.23,6.74,6.59,6.24,6.54,6.66,6.27,6.41,6.11
White rice,per kilogram,4.47,4.47,4.59,4.64,4.61,4.80,4.60,4.84,4.71,4.65,4.71,4.82,4.59,4.72,4.77,4.63,4.80,4.73,4.85,4.80,4.92,4.78,4.57,4.43,4.79,4.65,4.56,4.64,4.67,4.59,4.72,4.60,4.60,4.72,4.91,5.15,5.03,4.97,5.05,5.14,5.27,5.27,5.24,5.03,5.28,5.33,5.19,5.26,5.16,5.19,5.19,5.00,5.07,5.08,5.28,5.03,4.88,5.11,5.26,5.10,5.21,5.55,5.48,5.15,5.30,5.44,5.67,5.48,5.74,5.87,5.95,5.63,5.47,5.77,5.75,5.81,5.60,5.53,5.68,5.63,5.62
Cereal,per kilogram,8.28,8.40,8.75,8.68,8.53,8.38,8.73,8.30,8.33,8.55,8.17,8.58,8.08,8.15,8.25,8.10,8.40,8.38,8.48,8.05,8.05,8.30,8.40,8.80,8.58,8.53,8.42,8.38,8.53,8.33,8.55,8.15,8.33,8.58,8.10,8.33,8.38,8.10,8.40,8.85,8.73,8.42,8.73,8.75,8.73,8.68,8.68,8.50,8.58,8.70,8.65,8.58,9.02,9.05,9.05,8.87,8.90,9.13,9.20,9.25,9.23,9.88,10.63,10.52,10.25,10.15,10.30,10.55,10.48,10.75,10.63,11.10,10.73,11.00,11.03,11.13,11.15,11.20,11.45,11.00,11.05
Wheat flour,per kilogram,2.40,2.04,1.96,2.14,2.25,1.87,1.94,2.20,1.85,2.15,1.59,2.09,2.24,1.65,1.84,2.20,2.01,2.10,1.92,2.25,1.66,1.92,1.57,2.01,2.30,2.22,1.75,1.82,1.78,1.89,2.04,2.35,1.67,1.76,2.35,1.68,2.30,2.06,2.17,2.34,2.66,2.62,2.62,2.50,2.55,2.25,2.39,2.37,2.31,2.43,1.80,1.69,2.29,1.81,2.29,2.37,1.75,2.13,2.38,1.80,1.79,2.10,2.16,2.53,2.75,2.16,2.46,2.26,2.75,2.88,2.60,2.65,2.74,2.58,2.88,2.61,2.83,2.40,3.01,2.70,2.69
White sugar,per kilogram,1.02,1.09,1.13,1.17,1.29,0.95,1.34,1.32,0.95,1.04,1.11,1.15,0.98,1.19,1.03,1.21,1.05,0.95,1.25,1.10,0.98,1.24,0.98,1.06,1.01,0.83,1.03,1.13,1.05,1.02,1.09,0.97,1.02,0.88,0.98,1.13,1.15,0.83,1.15,1.05,1.04,1.00,1.04,1.15,0.89,0.86,1.02,0.77,0.97,0.94,0.92,1.19,1.15,1.08,1.09,1.08,1.15,1.16,1.22,1.29,1.32,1.28,1.29,1.18,1.28,1.31,1.15,1.36,1.28,1.24,1.23,1.52,1.24,1.32,1.14,1.16,1.27,1.31,1.34,1.55,1.20
Apple juice,per liter,1.40,1.30,1.39,1.43,1.42,1.48,1.42,1.38,1.33,1.44,1.33,1.46,1.34,1.35,1.43,1.44,1.42,1.48,1.38,1.46,1.47,1.50,1.50,1.52,1.42,1.51,1.49,1.49,1.52,1.56,1.45,1.61,1.29,1.45,1.63,1.33,1.52,1.56,1.59,1.55,1.48,1.55,1.62,1.62,1.75,1.86,1.75,1.56,1.53,1.59,1.65,1.58,1.69,1.67,1.64,1.61,1.66,1.67,1.67,1.64,1.63,1.74,1.66,1.66,1.72,1.70,1.64,1.67,1.76,1.68,1.78,1.74,1.75,1.75,1.96,1.88,2.01,2.01,1.98,1.93,2.02
Orange juice,per liter,1.97,2.04,1.99,2.06,2.04,2.03,2.06,2.03,2.01,1.98,1.95,2.01,1.97,2.00,1.96,1.97,1.96,1.97,1.99,1.97,1.97,2.02,2.01,1.94,2.04,2.15,2.05,2.06,2.05,2.03,2.07,2.00,1.94,1.99,1.92,1.94,2.10,2.13,2.20,2.20,2.26,2.17,2.17,2.10,2.26,2.30,2.07,2.01,2.16,2.25,2.12,2.12,2.10,2.11,2.10,2.16,2.21,2.19,2.12,2.14,2.18,2.24,2.39,2.22,2.29,2.23,2.21,2.29,2.23,2.13,2.18,2.21,2.23,2.20,2.44,2.27,2.49,2.43,2.51,2.51,2.48
Roasted or ground coffee,per kilogram,18.26,17.06,16.06,16.74,16.85,17.62,15.35,17.74,16.35,18.09,17.85,17.85,17.82,17.62,18.68,18.35,16.79,18.91,19.62,17.41,18.21,17.74,18.03,17.82,17.85,16.79,16.09,17.21,17.24,17.53,18.06,18.15,17.44,17.68,17.29,17.21,17.94,16.94,18.12,16.94,17.94,16.65,18.21,18.03,19.38,18.91,18.91,17.65,18.15,18.97,17.41,18.62,18.79,18.68,18.88,18.82,19.15,17.53,18.00,18.47,19.76,19.85,19.18,20.18,20.12,20.50,21.88,21.03,21.56,19.94,20.03,20.15,21.29,21.79,20.94,21.18,22.15,22.88,23.68,22.53,21.47
Tea,20 bags,3.67,3.77,3.64,3.80,3.63,3.68,3.61,3.61,3.58,3.55,3.60,3.61,3.64,3.62,3.53,3.63,3.71,3.71,3.87,3.67,3.79,3.63,3.42,3.52,3.56,3.47,3.41,3.52,3.66,3.67,3.78,3.60,3.59,3.41,3.65,3.66,3.67,3.46,3.60,3.69,3.81,3.60,3.75,4.14,4.11,3.94,3.58,3.76,3.62,3.83,3.69,3.56,3.65,3.89,4.01,3.91,3.96,3.99,3.92,3.98,3.92,3.96,4.03,4.08,3.99,4.23,4.43,4.40,4.44,4.64,4.28,4.43,4.54,4.50,4.40,4.60,4.71,4.61,4.90,4.80,4.73
Vegetable oil,per liter,2.20,2.33,2.33,2.29,2.34,2.23,2.25,2.26,2.28,2.31,2.35,2.35,2.27,2.35,2.09,2.18,2.26,2.24,2.25,2.42,2.44,2.37,2.22,2.26,2.34,2.43,2.03,2.41,2.28,2.36,2.25,2.35,2.08,2.42,2.26,2.37,2.23,2.46,2.51,2.57,2.36,2.22,2.33,2.37,2.37,1.98,2.39,2.41,2.14,2.41,2.37,2.40,2.57,2.50,2.49,2.75,3.46,3.22,3.12,3.72,3.73,3.87,3.67,3.90,3.93,4.07,4.51,4.77,4.20,4.22,4.47,4.79,4.15,3.78,4.33,4.03,4.47,4.65,4.01,4.31,3.89
Canola oil,per liter,2.94,3.48,3.73,3.74,3.60,3.50,3.57,3.50,3.45,3.45,3.30,3.58,3.33,3.37,3.45,3.40,3.40,3.60,3.38,3.40,3.39,3.22,3.28,3.39,2.95,3.19,3.19,3.08,3.17,3.35,3.36,3.36,3.42,3.36,3.49,3.17,3.05,3.12,3.32,3.25,3.08,3.16,3.10,3.29,3.40,3.15,3.53,3.03,3.22,3.13,3.03,3.11,3.45,3.39,3.42,3.52,3.87,3.86,4.30,4.21,4.41,4.60,4.85,5.13,5.22,5.32,5.27,5.09,5.50,5.71,5.86,5.58,5.16,5.75,5.56,5.55,5.77,5.83,5.42,4.94,4.99
Olive oil,1 liter,10.27,9.62,7.07,10.47,9.37,9.63,9.66,10.08,8.15,9.79,7.90,7.88,9.59,8.46,9.75,10.22,8.82,9.38,10.42,10.15,8.82,8.78,9.55,7.04,8.66,8.78,8.44,9.04,8.34,9.13,8.69,8.99,7.35,7.41,8.36,8.51,7.99,8.17,8.06,8.84,8.02,8.82,8.34,7.48,7.72,7.70,8.80,7.65,7.76,7.45,7.24,8.10,8.01,8.24,8.73,8.62,8.02,7.80,9.43,9.32,8.92,8.97,9.66,9.55,10.03,9.55,10.04,10.27,9.29,8.05,10.20,10.84,10.03,9.45,11.14,11.92,12.45,12.84,12.20,14.74,13.90
Baby food,per liter,9.77,9.84,10.16,10.23,10.63,10.78,9.92,10.47,10.00,10.39,10.39,10.47,10.39,10.39,9.22,10.39,10.47,10.08,9.92,10.63,10.70,10.70,11.02,10.70,11.02,11.09,10.86,10.78,10.94,10.78,11.17,11.25,11.09,11.25,10.70,11.48,11.64,11.48,11.64,11.56,11.72,10.86,11.72,12.03,12.42,12.19,12.42,12.03,11.09,11.33,11.56,11.56,11.72,12.11,12.19,12.66,12.27,12.27,12.03,12.19,12.66,12.27,12.73,13.36,12.97,13.52,13.52,13.59,13.83,13.44,13.67,13.83,13.98,13.98,14.30,13.98,14.53,14.38,14.69,14.92,14.77
Infant formula,per kilogram,29.71,29.21,30.46,29.29,28.49,29.86,29.56,28.97,29.24,29.79,29.90,27.72,27.67,27.17,28.37,28.78,29.27,30.30,30.40,30.54,30.84,30.66,30.42,30.92,32.12,30.98,31.30,31.54,31.20,30.11,30.03,30.01,31.12,31.78,31.44,32.28,32.83,31.80,33.01,30.90,32.49,32.08,32.66,31.69,30.19,30.16,32.02,31.20,33.70,35.23,34.10,34.96,33.62,34.51,35.01,35.70,34.57,32.31,30.12,34.71,35.82,31.70,34.98,35.53,38.87,36.32,39.78,38.03,37.77,40.70,40.19,40.50,42.26,42.18,44.58,47.44,49.28,49.57,45.46,47.26,46.56
Peanut butter,per kilogram,3.58,4.46,4.20,3.84,4.17,3.52,4.24,4.20,4.24,4.42,4.65,4.94,3.83,4.84,4.86,4.60,4.47,4.76,4.47,4.72,4.50,4.38,4.54,4.64,4.78,4.57,4.82,5.24,4.84,5.19,5.14,4.87,4.45,4.65,4.68,4.58,4.85,4.82,4.68,5.09,4.91,4.55,4.86,4.65,4.43,4.55,4.45,4.94,4.53,5.27,5.01,4.87,4.65,4.49,4.59,4.62,5.06,5.24,5.05,4.90,4.84,5.13,5.21,5.30,5.40,5.56,5.32,5.63,5.40,5.47,5.48,5.61,5.50,5.85,6.34,6.32,6.17,6.72,6.29,6.24,6.24
Ketchup,1 liter,3.23,3.37,3.22,3.30,3.20,3.10,3.04,3.08,3.23,3.14,3.27,3.33,3.28,3.45,3.24,3.35,3.42,3.41,3.41,3.46,3.37,3.33,3.53,3.42,3.49,3.47,3.23,3.17,3.16,3.37,3.28,3.29,3.31,3.31,3.18,3.30,3.49,3.40,3.24,3.59,3.21,3.28,3.38,3.38,3.55,3.22,3.45,3.40,3.67,3.62,3.33,3.51,3.23,3.25,3.33,3.42,3.37,3.87,3.79,4.08,4.00,3.94,4.12,4.02,4.44,4.11,3.97,4.23,4.30,4.39,4.12,4.33,4.37,4.45,4.69,4.61,4.64,4.89,4.14,4.76,4.70
Mayonnaise,per liter,4.25,4.47,4.40,4.47,4.29,4.10,4.26,4.11,4.36,4.16,4.45,4.48,4.45,4.48,4.47,4.71,4.07,4.22,4.39,4.76,4.67,4.54,4.72,4.15,4.97,4.87,4.25,4.33,4.35,4.58,4.42,4.45,4.83,4.45,4.26,4.21,4.99,4.61,4.31,4.94,4.30,4.37,4.53,4.53,4.82,4.31,4.93,4.62,5.07,5.17,4.46,4.93,4.55,4.62,4.85,5.13,4.94,5.67,5.90,5.79,5.60,5.45,5.98,5.76,5.97,6.46,5.75,6.48,6.24,6.69,5.88,6.22,6.30,6.76,7.02,6.66,6.65,7.01,7.12,6.71,6.76
Canned salmon,per kilogram,13.00,12.21,12.21,14.37,14.55,11.22,14.23,12.35,13.33,10.85,12.54,13.85,13.47,11.78,7.04,13.47,13.19,13.62,14.51,13.62,13.94,12.21,13.85,15.96,16.85,18.83,18.54,16.10,12.96,20.47,17.00,17.93,22.58,23.38,14.65,19.44,18.45,17.98,21.50,18.40,22.30,19.58,23.43,22.02,22.49,22.72,19.81,20.99,21.13,22.21,22.49,20.56,18.26,20.56,23.15,18.50,17.93,21.97,19.44,20.89,23.33,21.55,21.64,23.85,18.45,21.36,22.82,19.44,20.61,19.34,22.35,20.00,19.62,19.81,23.29,21.92,22.82,21.17,22.86,22.96,22.25
Canned tuna,per kilogram,7.94,9.65,8.47,8.76,9.29,9.88,8.00,8.53,10.00,9.12,9.65,11.24,9.41,11.29,9.24,9.12,9.41,10.24,10.06,9.29,10.00,9.35,10.35,11.24,9.82,11.29,10.82,8.88,10.71,11.00,9.00,11.71,10.65,10.18,10.47,10.18,10.24,9.41,11.18,11.76,10.76,9.00,9.82,9.24,11.12,11.53,10.94,11.65,8.76,10.12,10.00,8.71,10.06,10.24,10.00,10.41,9.47,10.82,8.82,11.29,11.47,11.24,10.41,11.00,11.41,12.00,11.41,12.29,10.88,11.88,10.65,12.71,10.47,11.76,11.59,11.71,11.65,12.24,11.65,12.65,12.65
Canned baked beans,per liter,3.19,3.32,3.17,3.22,3.14,3.14,3.32,3.07,3.22,3.37,3.37,3.37,3.09,3.37,3.12,3.47,3.24,3.22,3.32,2.99,3.12,3.14,2.96,3.24,3.12,3.34,3.47,3.29,3.34,3.34,3.14,3.49,3.42,3.19,2.99,3.27,3.29,3.49,3.54,4.15,3.67,3.34,3.47,3.02,3.54,3.34,3.79,3.54,3.57,3.62,3.09,3.24,3.37,3.37,3.07,3.07,3.62,3.79,3.99,4.12,4.15,4.12,3.67,4.17,4.37,4.02,4.32,3.52,4.27,4.60,4.35,4.37,4.60,4.85,4.37,4.82,4.70,4.42,4.72,4.92,5.00
Canned tomatoes,per liter,1.70,1.60,1.70,1.58,1.78,1.96,1.91,1.63,1.95,1.53,1.81,1.72,1.53,1.51,1.68,1.61,1.71,1.72,1.53,1.56,1.75,1.73,1.70,2.09,1.77,1.88,1.87,1.90,1.60,1.96,1.68,2.02,2.14,1.86,1.82,2.00,1.80,1.80,2.11,1.96,2.04,2.36,2.30,2.09,2.30,2.27,1.72,2.04,1.67,2.07,2.09,2.02,2.16,1.98,1.90,2.20,2.06,2.11,1.78,2.15,1.85,1.90,1.92,1.96,1.93,2.17,2.31,2.55,2.14,2.30,2.06,2.53,2.26,2.58,2.42,2.42,2.70,2.86,2.74,2.74,2.51
Canned soup,per liter,2.78,2.99,3.20,2.92,4.37,4.08,3.27,2.89,2.92,2.96,3.27,4.30,3.06,2.82,3.10,2.78,4.33,4.15,2.92,2.71,2.89,3.91,2.71,4.79,2.75,3.77,3.17,4.68,4.61,4.33,3.38,2.57,2.71,3.70,3.17,4.79,3.35,3.35,3.91,5.18,5.04,4.75,4.47,2.54,3.06,4.37,3.45,4.58,4.40,4.82,4.47,2.85,3.45,3.66,2.96,3.17,3.31,4.89,3.70,5.18,3.73,4.12,4.93,4.75,4.58,5.28,5.39,3.38,4.75,5.81,4.01,6.20,4.54,5.85,5.63,6.58,5.39,5.32,6.09,4.19,4.93
Canned beans and lentils,per liter,2.35,2.33,2.43,2.52,2.46,2.59,2.54,2.43,2.46,2.41,2.44,2.44,2.39,2.41,2.35,2.43,2.30,2.33,2.44,2.24,2.39,2.67,2.61,2.63,2.63,2.65,2.74,2.85,2.78,2.78,2.70,2.78,2.78,2.63,2.57,2.76,2.63,2.76,2.83,2.70,2.57,2.76,2.74,2.67,2.87,2.81,2.83,2.50,2.54,2.56,2.63,2.74,2.70,2.65,2.70,2.69,2.74,2.69,2.83,2.83,2.76,2.91,3.02,3.07,3.19,3.09,3.09,3.31,3.30,3.13,3.17,3.33,3.46,3.52,3.46,3.67,3.54,3.65,3.72,3.35,3.28
Canned corn,per liter,3.26,3.08,3.11,3.14,3.20,3.08,3.14,3.20,3.17,3.20,3.20,3.08,3.17,3.02,2.96,3.14,3.20,3.34,3.11,3.26,3.26,3.28,3.28,3.17,3.40,3.46,3.46,3.49,3.52,3.55,3.55,3.81,3.64,3.43,3.81,3.55,3.84,3.58,3.70,3.99,4.16,4.34,4.55,4.25,4.25,4.22,3.96,3.49,3.75,4.08,4.16,4.13,4.13,3.93,4.05,4.11,3.90,3.58,3.99,3.31,4.11,4.22,3.99,3.49,4.31,4.49,4.55,5.16,5.34,3.93,4.55,3.55,4.13,5.51,4.46,4.28,5.10,5.19,5.37,5.28,4.55
Canned peach,per liter,5.25,5.30,5.10,5.13,5.40,5.18,5.25,4.90,5.20,5.20,5.10,4.90,5.50,5.25,5.40,5.60,5.50,5.55,5.93,5.80,5.83,5.20,5.05,5.28,5.35,4.95,5.05,5.03,5.50,5.60,5.68,5.63,5.40,5.63,5.35,5.85,5.80,5.38,6.16,5.58,6.06,5.75,5.83,6.01,5.85,6.03,5.80,6.28,5.95,5.98,6.06,5.90,6.03,6.13,5.80,6.03,5.70,5.80,5.83,5.78,5.98,5.88,6.01,5.98,6.18,6.38,6.48,6.63,6.63,6.56,6.46,6.13,6.88,7.31,8.19,7.54,7.41,7.46,7.24,7.21,7.36
Canned pear,per liter,5.10,5.23,5.05,5.08,5.13,4.87,5.05,4.77,5.05,5.15,5.05,4.95,5.25,5.15,5.30,5.40,5.40,5.48,5.68,5.05,5.10,5.15,4.97,5.13,5.15,5.10,5.03,4.87,5.38,5.43,5.20,5.25,5.35,5.70,5.48,5.78,5.65,5.43,6.18,5.65,6.38,5.88,5.98,6.13,5.98,5.95,5.88,6.43,6.03,6.08,6.18,5.98,6.08,6.21,6.06,6.21,5.80,5.83,5.83,5.90,5.98,6.01,6.06,6.01,6.06,6.36,6.51,6.71,6.61,6.51,6.48,6.28,6.91,7.19,6.76,6.91,7.04,7.41,7.26,7.41,7.59
Dried lentils,per kilogram,3.50,3.69,3.61,3.87,4.11,3.90,4.00,3.84,3.96,3.89,3.93,3.81,3.92,3.81,3.83,3.97,3.84,3.76,3.72,3.53,3.62,3.36,3.56,3.60,3.41,3.54,3.57,3.40,3.53,3.57,3.39,3.61,3.82,3.70,3.33,3.59,3.60,3.61,3.73,3.60,3.59,3.49,3.60,3.43,3.83,4.09,3.70,3.78,3.58,3.64,3.64,3.86,3.84,3.92,3.82,3.90,3.80,3.87,3.93,3.79,3.90,3.78,3.82,4.09,3.87,3.98,4.10,4.02,4.36,4.21,4.29,4.44,4.53,4.34,4.38,4.42,4.47,4.51,4.42,4.44,4.47
Dry beans and legumes,per kilogram,3.51,3.57,3.59,3.81,3.92,3.92,3.81,3.71,3.69,3.60,3.67,3.54,3.69,3.69,3.69,3.77,3.72,3.66,3.49,3.43,3.41,3.27,3.38,3.44,3.32,3.38,3.43,3.48,3.43,3.43,3.38,3.46,3.54,3.56,3.67,3.69,3.79,3.70,3.72,3.84,3.60,3.66,3.53,3.54,3.98,4.00,3.67,3.74,3.54,3.66,3.62,3.68,3.66,3.67,3.70,3.66,3.61,3.43,3.46,3.40,3.72,3.76,3.73,3.82,3.69,3.74,3.90,3.81,3.86,3.59,3.68,3.79,3.82,3.84,3.83,3.72,3.84,3.91,3.89,3.80,3.79
Tofu,per kilogram,5.77,5.86,5.66,5.46,5.57,5.54,5.57,5.63,5.51,5.54,5.63,5.66,5.57,5.71,5.71,5.51,5.57,7.03,6.80,6.26,6.11,6.06,6.00,6.11,6.57,6.23,6.57,6.23,6.20,6.09,6.06,5.94,5.83,5.74,5.74,5.71,5.91,5.80,6.40,6.14,6.66,6.14,6.14,6.00,5.94,6.00,6.06,6.09,6.26,6.66,6.60,6.37,6.40,7.54,6.51,6.34,7.00,7.26,7.34,7.26,7.57,8.34,8.57,7.80,8.03,8.17,8.06,8.29,8.69,8.71,8.91,8.17,8.20,8.51,8.14,7.89,7.94,8.14,8.11,8.09,7.86
Hummus,per kilogram,15.81,15.73,15.33,15.11,15.20,15.37,15.20,15.68,15.90,15.33,14.32,14.85,14.36,15.55,15.29,14.49,15.64,15.64,16.04,15.59,15.20,14.67,15.24,14.89,14.23,15.51,16.04,15.11,14.63,15.64,15.37,15.81,15.86,15.68,14.58,14.49,15.02,15.24,15.55,14.85,14.27,15.07,15.37,15.11,15.77,15.64,15.33,15.20,15.11,15.51,15.37,15.11,15.42,15.15,15.07,15.37,15.24,15.24,15.07,15.37,15.11,14.89,14.89,15.33,15.90,16.08,16.21,16.96,16.96,16.61,16.34,16.21,15.51,16.96,17.44,17.62,17.18,17.53,17.80,18.06,17.75
Salsa,per liter,7.54,7.06,7.87,7.73,7.78,7.87,8.01,8.04,8.06,7.94,7.58,7.42,7.22,7.06,7.94,7.73,7.87,7.85,7.61,7.73,7.75,7.78,7.25,7.61,7.63,7.78,7.78,7.92,7.73,8.25,8.11,8.23,8.35,8.40,8.13,8.66,8.37,8.33,8.49,8.44,8.47,8.56,8.68,8.92,8.64,8.64,8.28,8.33,8.61,8.78,8.83,8.66,8.64,8.88,8.78,8.80,8.71,8.76,8.83,8.66,9.16,9.23,9.38,9.26,9.57,9.64,9.74,9.69,10.02,10.07,10.24,10.26,10.55,10.72,10.81,11.51,11.48,11.34,11.56,11.63,11.41
Pasta sauce,per liter,3.00,3.14,3.06,3.49,2.88,3.43,3.28,3.06,3.00,2.77,3.31,3.31,3.00,2.63,3.28,3.25,3.20,3.02,3.02,2.97,3.25,3.17,3.05,4.02,2.86,2.91,3.38,3.42,3.18,3.38,3.32,3.49,3.15,3.37,3.17,3.80,3.34,3.23,3.78,3.57,3.95,3.83,3.11,3.72,3.32,3.32,3.23,3.80,3.42,3.63,3.98,3.05,3.89,3.51,3.72,3.29,3.40,4.25,3.68,4.11,3.63,3.48,3.62,3.71,3.65,4.25,4.43,3.89,4.65,4.86,3.72,4.74,4.43,4.45,4.85,3.57,4.55,4.42,4.58,5.12,3.66
Salad dressing,per liter,5.62,5.77,5.52,5.83,5.24,5.37,5.24,5.03,5.39,5.43,5.43,5.89,5.85,5.54,5.56,5.33,4.93,5.05,5.22,5.45,5.31,5.66,5.71,5.14,6.25,6.00,5.68,5.83,5.47,5.43,5.43,5.47,5.54,5.35,5.35,5.39,5.66,5.89,5.87,5.83,5.33,6.08,6.08,5.92,5.85,5.41,5.79,5.87,5.89,5.94,5.89,6.27,5.68,6.21,6.80,6.76,6.88,6.55,6.86,7.37,6.84,7.14,7.33,7.64,7.24,7.05,7.45,7.14,7.56,7.07,7.26,7.03,7.45,7.98,8.11,7.75,7.77,7.31,7.56,7.81,7.79
Almonds,per kilogram,23.65,23.45,27.00,24.55,25.05,31.70,32.70,26.95,21.70,26.45,28.05,24.40,24.45,24.85,24.25,24.95,29.20,27.20,30.35,30.35,28.80,24.30,26.40,24.30,26.90,27.20,29.00,25.15,28.60,28.70,29.60,30.80,27.25,25.95,25.80,26.75,25.50,24.80,26.95,27.80,27.80,28.30,28.75,29.75,30.00,28.50,25.50,23.70,22.00,24.40,26.15,27.25,27.50,28.40,28.85,29.05,28.00,26.90,26.35,26.95,28.10,27.00,27.00,26.15,26.15,28.80,27.15,28.20,29.20,28.15,27.45,26.80,28.95,28.00,26.90,26.55,27.00,28.50,28.75,26.20,24.60
Peanuts,per kilogram,8.36,7.60,8.73,8.56,8.24,8.31,8.60,7.82,8.84,9.07,7.31,7.64,7.20,6.84,8.22,7.47,8.71,8.42,8.13,7.67,8.04,7.18,7.02,6.89,7.20,6.60,6.73,7.47,7.04,7.18,7.64,7.16,6.62,7.02,5.80,6.84,7.22,6.58,6.76,7.04,6.38,6.89,7.09,7.47,9.00,9.16,7.62,7.22,7.13,5.91,7.58,7.56,6.00,7.09,7.24,7.44,7.62,7.60,7.00,7.42,7.96,7.67,7.67,7.60,7.24,6.84,6.98,7.42,7.80,7.29,8.36,7.67,7.98,8.04,8.36,8.07,8.13,7.73,8.40,8.44,8.76
Sunflower seeds,per kilogram,11.98,11.30,10.97,10.95,11.03,11.30,11.58,11.50,12.33,12.40,12.48,12.00,11.83,11.80,12.05,11.00,11.65,11.70,11.50,11.95,11.37,11.77,12.10,11.75,11.45,9.65,12.17,11.92,11.48,11.23,11.63,11.48,11.80,11.55,12.17,12.28,11.17,11.67,11.75,11.45,11.70,11.80,11.27,11.25,12.42,12.90,11.67,11.45,11.80,11.48,11.70,11.15,11.60,11.05,11.55,11.55,10.58,11.50,11.15,10.90,10.87,11.13,11.37,11.20,11.37,11.73,11.67,11.33,11.90,12.02,11.35,11.83,11.40,12.25,13.17,12.17,12.88,12.45,13.30,13.15,11.90
Deodorant,per kilogram,58.94,56.35,58.24,61.53,59.41,57.65,57.41,56.82,53.88,59.76,55.41,57.29,58.12,58.59,58.35,60.47,62.47,59.06,58.82,56.94,58.12,60.35,56.59,60.00,59.65,59.06,58.47,64.12,59.41,58.35,60.00,60.24,57.65,57.88,58.00,57.18,63.06,58.12,60.00,62.12,58.82,60.71,62.00,60.00,63.53,63.53,60.47,62.59,60.24,60.47,62.35,65.29,62.94,64.47,66.94,68.59,68.59,71.65,71.29,70.71,69.76,67.53,70.00,71.65,72.12,75.65,77.18,78.82,74.94,75.65,75.29,73.88,81.18,76.82,78.47,85.65,86.12,83.53,83.06,84.12,83.41
Toothpaste,per liter,26.60,28.40,29.60,28.50,29.10,30.70,29.00,28.90,27.30,28.00,29.30,29.30,28.30,26.80,30.80,26.30,28.80,27.80,30.40,28.00,28.20,30.70,29.20,29.70,29.10,28.80,31.00,32.40,30.30,32.00,32.90,30.00,31.50,32.30,33.80,34.20,28.70,32.20,31.30,33.30,36.50,31.10,33.90,33.20,33.80,36.80,34.20,34.40,28.20,32.30,35.80,33.30,34.80,34.50,35.30,36.00,36.10,35.90,37.30,36.60,31.60,37.30,36.20,38.40,39.00,40.00,40.40,41.50,42.90,40.40,39.70,41.10,37.00,41.90,37.90,39.60,40.60,40.40,42.40,40.00,43.70
Shampoo,per liter,12.95,12.38,12.85,13.15,13.08,12.90,13.33,12.92,12.83,13.27,12.88,13.15,12.83,12.62,12.88,12.78,13.00,13.00,13.27,13.20,12.55,13.08,13.05,13.20,13.17,12.42,13.02,13.25,12.58,12.42,13.40,12.55,11.80,12.98,12.45,11.63,13.13,12.33,13.17,12.92,12.90,13.15,12.17,12.78,13.85,13.80,13.27,13.55,12.70,12.60,12.98,13.53,13.67,13.85,12.95,13.70,14.15,14.38,14.60,14.62,14.85,13.08,13.95,14.03,14.98,14.95,14.20,14.90,14.90,15.83,15.12,15.20,15.52,14.35,15.55,15.30,16.58,16.70,17.18,16.73,16.67
Laundry detergent,per liter,2.13,3.36,3.79,1.86,2.37,3.44,2.03,2.63,1.79,2.49,3.41,2.03,2.79,1.83,3.24,2.55,2.19,2.32,3.26,3.15,3.10,2.20,3.02,3.53,2.95,3.34,3.31,3.32,2.93,2.91,3.21,3.13,2.97,3.18,2.85,3.05,3.11,3.47,3.52,3.38,3.31,3.57,3.41,2.92,3.01,3.05,3.32,3.30,3.31,3.44,3.22,3.04,3.20,3.30,3.47,3.36,3.14,3.35,3.13,3.51,3.59,3.71,3.99,3.86,4.19,3.76,3.76,3.92,3.82,3.66,3.76,3.91,3.76,4.31,3.59,4.23,3.85,4.37,3.88,4.06,4.13




`;