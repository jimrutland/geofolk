import { IonContent, IonHeader, IonPage } from '@ionic/react';
import React from 'react';
import Map from '../components/Map';
import './Home.css';
import Toolbar from '../components/Toolbar';
import ActionMenu from '../components/ActionMenu';
import { menuController } from "@ionic/core";
import { useRecoilValue } from 'recoil';
import { showingExistingStoryCard, showingNewStoryCard } from '../RecoilStates/StoryCardState';
import { currentStoryState } from '../RecoilStates/Story';
import NewStoryCard from '../components/NewStoryCard';
import ExistingStoryCard from '../components/ExistingStoryCard';

const Home: React.FC = () => {
  const showNewStoryCard = useRecoilValue(showingNewStoryCard);
  const showExistingStoryCard = useRecoilValue(showingExistingStoryCard);
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
        {(showNewStoryCard) ? <NewStoryCard /> : null}
        {(showExistingStoryCard) ? <ExistingStoryCard /> : null}
      </IonContent>
    </IonPage>
  );
};

export default Home;
