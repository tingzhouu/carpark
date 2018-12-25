// calculate distance in km between 2 points
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}


// returns a lit of all nearest carparks
function findNearestCarparks(myPosition, listOfAllCarparks) {
  var listOfNearestCarParks = []

  // loops through all carparks in the list
  listOfAllCarparks.forEach(function(carpark) {
    var distancebetweenCarParks = distance(myPosition.lat, myPosition.lng, carpark.lat, carpark.lng);
    carpark.distance = distancebetweenCarParks;
    console.log(distancebetweenCarParks + " - " + carpark.car_park_no);
    console.log(listOfNearestCarParks);

    // only checks for car parks within 1km distance
    if (distancebetweenCarParks <= 1) {

      // adds carpark into the list if list does not have 3 carparks
      if (listOfNearestCarParks.length < 3) {
        listOfNearestCarParks.push(carpark);

      // checks if any carpark inside the list is further away from the current position and replaces that carpark.
      } else {
        var foundNearer = false;
        var counter = 0;
        var endPoint = listOfNearestCarParks.length;
        while (counter < endPoint && !foundNearer) {
          var carparkInList = listOfNearestCarParks[counter];
          if (carpark.distance < carparkInList.distance) {
            foundNearer = true;
            listOfNearestCarParks.splice(counter - 1, 1);
            listOfNearestCarParks.push(carpark);
          }
        }
      }


    }
  });
  console.log(listOfNearestCarParks + " --- ---");
  return listOfNearestCarParks;
}
