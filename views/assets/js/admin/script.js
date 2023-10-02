document.getElementById('chooseLocationButton').addEventListener('click', function() {
    // Initialize the Google Maps API.
    const mapOptions = {
        
      center: { lat: 40.4107727300833, lng: 49.87212276504186 }, // Default center
      zoom: 8, // Adjust the zoom level as needed
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    // Create a marker for the selected location.
    const marker = new google.maps.Marker({
      map: map,
      draggable: true, // Allow the marker to be dragged to select the location
    });
  
    // Add an event listener to the map for capturing clicks.
    google.maps.event.addListener(map, 'click', function(event) {
      const clickedLocation = {
        latitude: event.latLng.lat(),
        longitude: event.latLng.lng(),
      };
  
      // You can use the clickedLocation object in your code for further processing.
      console.log(clickedLocation);
      
      // Move the marker to the clicked location.
      marker.setPosition(event.latLng);
    });
  });