import React, { useState } from 'react';
import GoogleMapReact, { ClickEventValue, Coords } from 'google-map-react';
import { IonButton, IonImg } from '@ionic/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { shouldRemoveCurrentMarker } from '../RecoilStates/MarkerState';
import { addingStoryState, showingStoryCard } from '../RecoilStates/StoryCardState';
import { defaultMapOptions } from './MapOptions';
import NavigateToLocationButton from './NavigateToLocationButton';
import { userLocation } from '../RecoilStates/UserLocation';
import { zoom } from '../RecoilStates/Zoom';

const Marker = ({ children }: any) => children;

const Map = () => {
    const [center, setCenter] = useRecoilState(userLocation);
    const zoomLevel = useRecoilValue(zoom);
    const [markers, setMarkers] = useState([] as Coords[]);
    const [removeCurrentMarker, setRemoveCurrentMarker] = useRecoilState(shouldRemoveCurrentMarker);
    const [isAddingStory, setIsAddingStory] = useRecoilState(addingStoryState);
    const setShowStoryCard = useSetRecoilState(showingStoryCard);
    let currentMarker = {} as Coords;

    const [mapOptions, setMapOptions] = useState(defaultMapOptions);

    function addStory(event: ClickEventValue): void {
        if (isAddingStory) {
            const { lat, lng } = event;
            const markerCoord: Coords = { lat, lng };
            setMarkers([
                ...markers,
                markerCoord
            ]);
            currentMarker = markerCoord;
            setShowStoryCard(true);
            setCenter(markerCoord);
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
                zoom={zoomLevel}
                options={mapOptions}
                onClick={addStory}
                onDragEnd={setCenter}
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
            <NavigateToLocationButton />
        </div>
    );
}

export default Map;