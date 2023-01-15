function calculateGlobalRating(criteriaRatings) {
    var totalRating = 0;
    var totalWeight = 0;
    var maxRating = 3;
  
    for (criterion of gameRatings._columnNames) {
      if (['GameID', 'GameName'].includes(criterion)) { continue; }
  
      var rating = criteriaRatings[criterion];
      var criterionData = RatingCriteria[criterion];
      var weight = parseFloat(criterionData.CriterionWeight);
      totalRating += rating * weight;
      totalWeight += weight*maxRating;
    }
  
    var globalRating = totalRating / totalWeight * 100;

    var globalRatingLabel = ""
    if (globalRating<33) {
      globalRatingLabel = "Good"
    } else if (globalRating<66) {
      globalRatingLabel = "Medium"
    } else {
      globalRatingLabel = "Bad"
    }


    return [globalRating, globalRatingLabel];
  }
  
  function displayGlobalRating(criteriaRatings) {
    var [globalRatingValue, globalRatingLabel] = calculateGlobalRating(criteriaRatings);
    // var globalRatingHTML = "<div id='global-rating'><br> Global Rating: " + globalRating.toFixed(2) + "</div>"
    // document.getElementById("global-rating-display").innerHTML = globalRatingHTML;


    var opts = {
      angle: 0, // The span of the gauge arc
      lineWidth: 0.34, // The line thickness
      radiusScale: 1, // Relative radius
      pointer: {
        length: 0.36, // // Relative to gauge radius
        strokeWidth: 0.057, // The thickness
        color: '#000000' // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      strokeColor: '#E0E0E0',  // to see which ones work best for you
      staticZones: [
        {strokeStyle: "#30B32D", min: 0, max: 33}, // Green
        {strokeStyle: "#FFDD00", min: 33, max: 66}, // Yellow
        {strokeStyle: "#F03E3E", min: 66, max: 100}  // Red
     ],
     highDpiSupport: true,     // High resolution support
    };
    var target = document.getElementById('canvas-gauge'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 100; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 36; // set animation speed (32 is default value) 
    gauge.set(globalRatingValue); // set actual value



    document.getElementById("global-rating-value").innerHTML = globalRatingValue.toFixed(0) + "   (" +globalRatingLabel + ")";

  }
  