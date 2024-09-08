
    // Your Mapbox access token
    mapboxgl.accessToken =mapToken;
    
    // Initialize the map
    const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
        center:Listing.geometry.coordinates, // starting position [lng, lat] (New York City)
        zoom: 8// starting zoom level
    });


    const marker = new mapboxgl.Marker({ color: 'red', })
    .setLngLat(Listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25}) .setHTML(
        `<h2>${Listing.location}</h2><p>Exact Location will Be Provided!`
    )
   )
    .addTo(map);
    



