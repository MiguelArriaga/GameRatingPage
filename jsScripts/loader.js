function loadFileData(filename) {
    var xhttp = new XMLHttpRequest();
    var temp_data = ""
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            temp_data = xhttp.responseText;
        }
    };
    xhttp.open("GET", filename, false);
    xhttp.send();

    return temp_data
}

function loadPipeSeperatedValues(filename) {
    var PSVData = {}
    var separator = "|"
    var fileData = loadFileData(filename)
    var lines = fileData.split("\n").map(e => { return e.trim(); });

    var columnNames = lines[0].split(separator);
    PSVData._columnNames = columnNames
    var IDCol = columnNames[0]

    for (var i = 1; i < lines.length; i++) {
        var lineData = lines[i].trim().split(separator).map(e => { return e.trim(); });
        if (lineData == "") { continue; }
        var lineDataDict = {}
        for (var c = 0; c < columnNames.length; c++) {
            lineDataDict[columnNames[c]] = lineData[c].trim()
        }
        PSVData[lineDataDict[IDCol]] = lineDataDict;
    }
    console.log(PSVData)
    return PSVData
}



function loadRatings() {
    gameRatings = loadPipeSeperatedValues("csvData/Games.csv")
    RatingCriteria = loadPipeSeperatedValues("csvData/Criteria.csv")
    Definitions = loadPipeSeperatedValues("csvData/Definitions.csv")

    generateGameList();
    displayRating(Object.keys(gameRatings)[0]);
}



function generateGameList() {
    for (var gameId in gameRatings) {
        if (gameId.startsWith("_")) { continue; }
        var game = gameRatings[gameId];
        var listItem = document.createElement("li");
        listItem.setAttribute("onclick", "displayRating(" + gameId + ")");
        listItem.innerHTML = game.GameName;
        document.getElementById("game-list").appendChild(listItem);
    }
}
