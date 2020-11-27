import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const initMapbox = () => {

  // MAP -----------------------------------------------------------------------
  const mapElement = document.getElementById('map');

  // MARKERS -----------------------------------------------------------------
  const fitMapToMarkers = (map, markers) => {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
    map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  };

  // MAP -----------------------------------------------------------------------
  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/nindiss/ckhz2yl98095b19omglv8mb54'
    });


    // MARKERS -----------------------------------------------------------------

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map);
    });

    const startingMarker = JSON.parse(mapElement.dataset.startingMarker);
    var el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el)
        .setLngLat([ startingMarker.lng, startingMarker.lat ])
        .addTo(map);


    fitMapToMarkers(map, markers);
    map.setCenter([startingMarker.lng, startingMarker.lat]);

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }));
  }

};

// EXPORTS ---------------------------------------------------------------------
export { initMapbox };