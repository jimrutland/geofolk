import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const Map = (props: any) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC4NGd-0bVVXw6GwXHXhFlfh8-w9ck9S9k' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        </GoogleMapReact>
      </div>
    );
}

export default Map;