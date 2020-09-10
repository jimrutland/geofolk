import { IonContent, IonHeader, IonPage} from '@ionic/react';
import React, { useState } from 'react';
import Map from '../components/Map';
import './Home.css';
import Toolbar from '../components/Toolbar';
import ActionMenu from '../components/ActionMenu';
import { menuController } from "@ionic/core";

const Home: React.FC = () => {
  const [isAddingStory, setIsAddingStory] = useState(false);
  async function toggleMenu() {
    await menuController.open();
  }

  return (
    <IonPage>
      <IonHeader>
        <Toolbar openMenu={toggleMenu}></Toolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Map isAddingStory={isAddingStory} setIsAddingStory={setIsAddingStory}/>
        <ActionMenu setIsAddingStory={setIsAddingStory}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
