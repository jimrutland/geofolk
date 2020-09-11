import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonItem, IonItemDivider, IonButtons, IonButton} from '@ionic/react';
import React, { useState } from 'react';
import Map from '../components/Map';
import './Home.css';
import Toolbar from '../components/Toolbar';
import ActionMenu from '../components/ActionMenu';
import { menuController } from "@ionic/core";
import { useRecoilState, atom } from 'recoil';
import { addingStoryState } from '../RecoilStates/StoryCardState';
import { shouldRemoveCurrentMarker } from '../RecoilStates/MarkerState';

const Home: React.FC = () => {
  const [isAddingStory, setIsAddingStory] = useRecoilState(addingStoryState);
  const [mapCursor, setMapCursor] = useState("");
  const [showStoryCard, setShowStoryCard] = useState(false);
  const [removeCurrentMarker, setRemoveCurrentMarker] = useRecoilState(shouldRemoveCurrentMarker);

  function toggleMenu() {
    menuController.toggle();
  }

  return (
    <IonPage>
      <IonHeader>
        <Toolbar openMenu={toggleMenu}></Toolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Map 
          setShowStoryCard={setShowStoryCard}
          mapCursor={mapCursor}
          />
        <ActionMenu toggleMenu={toggleMenu}/>
        {showStoryCard ? 
        <IonCard id="storyCard">
          <IonHeader>
            <IonCardTitle> Share Your Folktale </IonCardTitle>
          </IonHeader>
          <IonCardContent>
              <IonItem>
                <IonInput placeholder="Enter the name of your tale..."></IonInput>
              </IonItem>
              <IonItem>
                <IonTextarea 
                  placeholder="Tell us your tale..."
                  rows={8}></IonTextarea>
              </IonItem>
              <IonButtons>
                <IonButton slot="start"> Submit </IonButton>
                <IonButton slot="end" onClick={() => {
                    setShowStoryCard(false);
                    setRemoveCurrentMarker(true);
                }}> Cancel </IonButton>
              </IonButtons>
          </IonCardContent>        
        </IonCard>
        : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;
