import { IonContent, IonHeader, IonPage } from '@ionic/react';
import React from 'react';
import Map from '../components/Map';
import './Home.css';
import Toolbar from '../components/Toolbar';
import ActionMenu from '../components/ActionMenu';
import { menuController } from "@ionic/core";
import { useRecoilValue } from 'recoil';
import { showingStoryCard } from '../RecoilStates/StoryCardState';
import StoryCard from '../components/StoryCard';

const Home: React.FC = () => {
  const showStoryCard = useRecoilValue(showingStoryCard);

  function toggleMenu() {
    menuController.toggle();
  }

  return (
    <IonPage>
      <IonHeader>
        <Toolbar openMenu={toggleMenu}></Toolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Map />
        <ActionMenu toggleMenu={toggleMenu}/>
        { showStoryCard ? <StoryCard /> : null }
      </IonContent>
    </IonPage>
  );
};

export default Home;
