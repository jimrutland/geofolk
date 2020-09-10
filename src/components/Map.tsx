import React, { useState } from 'react';
import GoogleMapReact, { MapOptions, ClickEventValue, Coords } from 'google-map-react';
import { IonIcon, IonButton } from '@ionic/react';
import { brushOutline, pencilSharp } from 'ionicons/icons';

export interface MarkerCoords {
    lat: number;
    lng: number;
}

const Marker = ({ children }: any) => children;

interface MapProperties {
    isAddingStory: boolean;
    setIsAddingStory(isAdding: boolean): void;
    mapCursor: string;
}

const Map = (props: MapProperties) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 } as Coords);
    const [zoom, setZoom] = useState(11);
    const [map, setMap] = useState({});
    const [maps, setMaps] = useState({});
    const [markers, setMarkers] = useState([] as Coords[]);

    const [mapOptions, setMapOptions] = useState({
        backgroundColor: 'gray',
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }]
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }]
            }
        ],
        draggableCursor: ""
    } as MapOptions);

    function addStory(event: ClickEventValue) {
        if (props.isAddingStory) {
            const markerCoord: MarkerCoords = {
                lat: event.lat,
                lng: event.lng
            };
            setMarkers([
                ...markers,
                markerCoord
            ]);
            setCenter({lat: event.lat, lng: event.lng});
            props.setIsAddingStory(false);
        }
    }

    React.useEffect(() => {
        setMapOptions({
            ...mapOptions,
            draggableCursor: (props.isAddingStory) ? "pointer" : ""
        });
    }, [props.isAddingStory]);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyC4NGd-0bVVXw6GwXHXhFlfh8-w9ck9S9k' }}
                defaultCenter={center}
                center={center}
                defaultZoom={zoom}
                zoom={zoom}
                options={mapOptions}
                onClick={addStory}
                >
                {markers.map((marker, index) => {
                    return (<Marker key={index} lat={marker.lat} lng={marker.lng}>
                            <IonIcon slot="icon-only" style={{fontSize: "24px", padding:"10px", backgroundColor: "black", borderRadius:"50px"}} icon={pencilSharp}></IonIcon>
                    </Marker>);
                })}
            </GoogleMapReact>
        </div>
    );
}

export default Map;