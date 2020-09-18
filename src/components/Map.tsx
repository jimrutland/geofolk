import React, { useState } from 'react';
import GoogleMapReact, { ClickEventValue } from 'google-map-react';
import { IonButton, IonImg } from '@ionic/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { shouldRemoveCurrentMarker } from '../RecoilStates/MarkerState';
import { addingStoryState, showingExistingStoryCard, showingNewStoryCard } from '../RecoilStates/StoryCardState';
import { defaultMapOptions } from '../configs/MapOptions';
import NavigateToLocationButton from './NavigateToLocationButton';
import { userLocation } from '../RecoilStates/UserLocation';
import { zoom } from '../RecoilStates/Zoom';
import { GeoDatabaseWrapper } from '../database/DatabaseWrapper';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { currentStoryState } from '../RecoilStates/Story';
import { Story } from '../models/Story';

const Marker = ({ children }: any) => children;

interface MapProps {
    database: GeoDatabaseWrapper;
}

const Map = (props: MapProps) => {
    const [center, setCenter] = useRecoilState(userLocation);
    const zoomLevel = useRecoilValue(zoom);
    const [stories, setStories] = useState([] as Story[]);
    const [removeCurrentMarker, setRemoveCurrentMarker] = useRecoilState(shouldRemoveCurrentMarker);
    const [isAddingStory, setIsAddingStory] = useRecoilState(addingStoryState);
    const setShowNewStoryCard = useSetRecoilState(showingNewStoryCard);
    const setShowExistingStoryCard = useSetRecoilState(showingExistingStoryCard);
    const [currentStory, setCurrentStory] = useRecoilState(currentStoryState);
    const [mapOptions, setMapOptions] = useState(defaultMapOptions);
    const user = firebase.auth().currentUser;

    function addStory(event: ClickEventValue): void {
        if (isAddingStory) {
            const { lat, lng } = event;
            const userId = (user) ? user.uid : "";
            const newStory = new Story(new firebase.firestore.GeoPoint(lat, lng), "", "", userId, null);
            setStories([
                ...stories,
                newStory
            ]);
            setCurrentStory(newStory);
            setShowNewStoryCard(true);
            setShowExistingStoryCard(false);
            setCenter({ lat, lng });
            setIsAddingStory(false);
        }
    }

    function displayStoryCard(selectedStory: Story): void {
        setCurrentStory(selectedStory);
        const showExistingCard = !!selectedStory.g;
        setShowExistingStoryCard(showExistingCard);
        setShowNewStoryCard(!showExistingCard);
    }

    async function onInitialLoad(): Promise<void> {
        const centerPoint = new firebase.firestore.GeoPoint(center.lat, center.lng);
        findStories(centerPoint);
    }

    function setDragEndCenter(event: any): void {
        const centerPoint = {lat: event.center.lat(), lng: event.center.lng()};
        setCenter(centerPoint);
        findStories(new firebase.firestore.GeoPoint(centerPoint.lat, centerPoint.lng));
    }

    async function findStories(centerPoint: firebase.firestore.GeoPoint): Promise<void> {
        const foundStories = await props.database.getStoriesNearPoint("stories", centerPoint, 1000);
        setStories(foundStories);
    }

    React.useEffect(() => {
        setMapOptions({
            ...mapOptions,
            draggableCursor: (isAddingStory) ? "pointer" : ""
        });
    }, [isAddingStory]);

    React.useEffect(() => {
        if (removeCurrentMarker) {
            setStories(stories.filter(story => story !== currentStory));
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
                onDragEnd={setDragEndCenter}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={() => onInitialLoad()}
                >
                {stories.map((story, index) => {
                    return (<Marker 
                                key={index} 
                                lat={story.coordinates.latitude} 
                                lng={story.coordinates.longitude}>
                            {<IonButton 
                                size="small"
                                shape="round"
                                style={{ minWidth: "40px", maxWidth: "40px" }}
                                color="dark"
                                onClick={() => { displayStoryCard(story); }}>
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