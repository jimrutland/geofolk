import React, { useState } from 'react';
import GoogleMapReact, { MapOptions, ClickEventValue, Coords } from 'google-map-react';
import { IonIcon } from '@ionic/react';
import { pencilSharp } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { shouldRemoveCurrentMarker } from '../RecoilStates/MarkerState';
import { addingStoryState } from '../RecoilStates/StoryCardState';
import { defaultMapOptions } from './MapOptions';

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