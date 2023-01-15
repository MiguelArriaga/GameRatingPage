function decodeCriterionDescription(criterionDescription) {
  var words = criterionDescription.split(" ");
  var decodedDescription = "";

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    if (word.endsWith("*")) {
      var encodedWord = word.slice(0, -1);
      var definition = Definitions[encodedWord];
      if (definition) {
        decodedDescription += "<span class='definition-word' title='" + definition.DefinitionDescription + "'>" + encodedWord + "</span> ";
      } else {
        decodedDescription += word + " ";
      }
    } else {
      decodedDescription += word + " ";
    }
  }

  return decodedDescription;
}

function displayRatingTable(gameId) {
  var gameData = gameRatings[gameId];
  document.getElementById("game-name").innerHTML = gameData.GameName;
  var gameHTML = "<table>"
  var criteriaRatings = {};
  for (criterion of gameRatings._columnNames) {
    if (['GameID', 'GameName'].includes(criterion)) { continue; }

    var rating = gameData[criterion];
    criteriaRatings[criterion] = rating;
    var criterionData = RatingCriteria[criterion]
    gameHTML += "<tr>";
    gameHTML += "<td>" + criterionData.CriterionName + "</td>";
    gameHTML += "<td>" + rating + "</td>";
    gameHTML += "<td class='criterion-description'>" + decodeCriterionDescription(criterionData.CriterionDescription) + "</td>";
    gameHTML += "</tr>";
  }

  gameHTML += "</table>";
  document.getElementById("rating").innerHTML = gameHTML;
  return criteriaRatings
}


function displayAdditionalDefinitions() {
  var defHTML = ""

  for (var defid in Definitions) {
    if (defid.startsWith("_")) { continue; }
    d = Definitions[defid]
    defHTML += d.DefinitionName + " - " + d.DefinitionDescription + "<br>"
  }
  document.getElementById("adefinitions").innerHTML = defHTML;
}



function displayRating(gameId) {
  var criteriaRatings = displayRatingTable(gameId)
  displayGlobalRating(criteriaRatings);
  displayAdditionalDefinitions();
}
