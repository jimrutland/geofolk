import { IonContent, IonHeader, IonPage} from '@ionic/react';
import React from 'react';
import Map from '../components/Map';
import './Home.css';
import Toolbar from '../components/Toolbar';
import ActionMenu from '../components/ActionMenu';
import { menuController } from "@ionic/core";

const Home: React.FC = () => {
  function toggleMenu() {
    menuController.open();
  }

  return (
    <IonPage>
      <IonHeader>
        <Toolbar openMenu={toggleMenu}></Toolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Map />
        <ActionMenu />
      </IonContent>
    </IonPage>
  );
};

export default Home;
