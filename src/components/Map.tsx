import React, { useState } from 'react';
import GoogleMapReact, { MapOptions, ClickEventValue, Coords } from 'google-map-react';
import { IonIcon } from '@ionic/react';
import { pencilSharp } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { shouldRemoveCurrentMarker } from '../RecoilStates/MarkerState';
import { addingStoryState } from '../RecoilStates/StoryCardState';

const Marker = ({ children }: any) => children;

interface MapProperties {
    setShowStoryCard(show: boolean): void;
    mapCursor: string;
}

const Map = (props: MapProperties) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 } as Coords);
    const [zoom, setZoom] = useState(11);
    const [markers, setMarkers] = useState([] as Coords[]);
    const [removeCurrentMarker, setRemoveCurrentMarker] = useRecoilState(shouldRemoveCurrentMarker);
    const [isAddingStory, setIsAddingStory] = useRecoilState(addingStoryState);
    let currentMarker = {} as Coords;

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

    function addStory(event: ClickEventValue): void {
        if (isAddingStory) {
            const markerCoord: Coords = {
                lat: event.lat,
                lng: event.lng
            };
            setMarkers([
                ...markers,
                markerCoord
            ]);
            currentMarker = markerCoord;
            props.setShowStoryCard(true);
            setCenter({lat: event.lat, lng: event.lng});
            setIsAddingStory(false);
        }
    }

    function displayStoryCard(): void {
        props.setShowStoryCard(true);
    }

    React.useEffect(() => {
        setMapOptions({
            ...mapOptions,
            draggableCursor: (isAddingStory) ? "pointer" : ""
        });
    }, [isAddingStory]);

    React.useEffect(() => {
        if (removeCurrentMarker) {
            setMarkers(markers.filter(marker => marker === currentMarker));
            setRemoveCurrentMarker(false);
        }
    }, [removeCurrentMarker]);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyC4NGd-0bVVXw6GwXHXhFlfh8-w9ck9S9k' }}
                center={center}
                zoom={zoom}
                options={mapOptions}
                onClick={addStory}
                >
                {markers.map((marker, index) => {
                    return (<Marker key={index} lat={marker.lat} lng={marker.lng}>
                            <IonIcon 
                                slot="icon-only" 
                                style={{fontSize: "24px", padding:"10px", backgroundColor: "black", borderRadius:"50px"}}
                                icon={pencilSharp}
                                onClick={displayStoryCard}>
                            </IonIcon>
                    </Marker>);
                })}
            </GoogleMapReact>
        </div>
    );
}

export default Map;