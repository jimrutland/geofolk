import { IonContent, IonHeader, IonPage, IonToast } from '@ionic/react';
import React from 'react';
import Map from '../components/Map';
import './Home.css';
import Toolbar from '../components/Toolbar';
import ActionMenu from '../components/ActionMenu';
import { menuController } from "@ionic/core";
import { useRecoilState, useRecoilValue } from 'recoil';
import { showingExistingStoryCard, showingNewStoryCard } from '../RecoilStates/StoryCardState';
import NewStoryCard from '../components/NewStoryCard';
import ExistingStoryCard from '../components/ExistingStoryCard';
import { GeoDatabaseWrapper } from '../database/DatabaseWrapper';
import firebase from 'firebase';
import * as geofirestore from 'geofirestore';
import { displayMessage, showToast } from '../RecoilStates/Message';

const Home: React.FC = () => {
  const showNewStoryCard = useRecoilValue(showingNewStoryCard);
  const showExistingStoryCard = useRecoilValue(showingExistingStoryCard);
  const message = useRecoilValue(displayMessage);
  const [showToastMessage, setShowToastMessage] = useRecoilState(showToast);
  const db = getDatabase();
  
  function getDatabase(): GeoDatabaseWrapper {
    const firestore = firebase.firestore();
    const geoFirestore = geofirestore.initializeApp(firestore);
    return new GeoDatabaseWrapper(geoFirestore);
  }

  function toggleMenu(): void {
    menuController.toggle();
  }

  return (
    <IonPage>
      <IonHeader>
        <Toolbar openMenu={toggleMenu}></Toolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Map database={db}/>
        <ActionMenu toggleMenu={toggleMenu}/>
        {(showNewStoryCard) ? <NewStoryCard database={db} /> : null}
        {(showExistingStoryCard) ? <ExistingStoryCard /> : null}
        <IonToast
          isOpen={showToastMessage}
          onDidDismiss={() => setShowToastMessage(false)}
          message={message.message}
          color={message.type}
          duration={4000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
