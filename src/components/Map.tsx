import React, { useState } from 'react';
import GoogleMapReact, { MapOptions, ClickEventValue, Coords } from 'google-map-react';
import { IonButton, IonIcon, IonImg } from '@ionic/react';
import { pencilSharp } from 'ionicons/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { shouldRemoveCurrentMarker } from '../RecoilStates/MarkerState';
import { addingStoryState, showingStoryCard } from '../RecoilStates/StoryCardState';
import { defaultMapOptions } from './MapOptions';
import { Capacitor } from '@capacitor/core';

const Marker = ({ children }: any) => children;

interface MapProperties {
    mapCursor: string;
}

const Map = (props: MapProperties) => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 } as Coords);
    const [zoom, setZoom] = useState(11);
    const [markers, setMarkers] = useState([] as Coords[]);
    const [removeCurrentMarker, setRemoveCurrentMarker] = useRecoilState(shouldRemoveCurrentMarker);
    const [isAddingStory, setIsAddingStory] = useRecoilState(addingStoryState);
    const setShowStoryCard = useSetRecoilState(showingStoryCard);
    
    let currentMarker = {} as Coords;

    const [mapOptions, setMapOptions] = useState(defaultMapOptions);

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
            setShowStoryCard(true);
            setCenter({lat: event.lat, lng: event.lng});
            setIsAddingStory(false);
        }
    }

    function displayStoryCard(): void {
        setShowStoryCard(true);
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
                    return (<Marker 
                                key={index} 
                                lat={marker.lat} 
                                lng={marker.lng}>
                            {<IonButton 
                                size="small"
                                shape="round"
                                style={{ minWidth: "40px", maxWidth: "40px" }}
                                color="dark"
                                onClick={displayStoryCard}>
                                <IonImg src="assets/icon/write.png" style={{minWidth: "24px"}} />
                            </IonButton>}
                    </Marker>);
                })}
            </GoogleMapReact>
        </div>
    );
}

export default Map;