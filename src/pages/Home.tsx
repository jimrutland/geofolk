import { IonContent, IonHeader, IonPage, IonCard, IonCardTitle, IonCardContent, IonInput, IonTextarea, IonItem, IonItemDivider, IonButtons, IonButton} from '@ionic/react';
import React, { useState } from 'react';
import Map from '../components/Map';
import './Home.css';
import Toolbar from '../components/Toolbar';
import ActionMenu from '../components/ActionMenu';
import { menuController } from "@ionic/core";
import { useRecoilState, atom } from 'recoil';
import { showingStoryCard } from '../RecoilStates/StoryCardState';
import StoryCard from '../components/StoryCard';

const Home: React.FC = () => {
  const [mapCursor, setMapCursor] = useState("");
  const [showStoryCard, setShowStoryCard] = useRecoilState(showingStoryCard);

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
          mapCursor={mapCursor}
          />
        <ActionMenu toggleMenu={toggleMenu}/>
        {showStoryCard ? 
         <StoryCard />
        : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;
