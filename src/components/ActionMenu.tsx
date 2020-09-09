import React from 'react';
import { IonContent, IonList, IonMenu, IonHeader, IonToolbar, IonTitle, IonIcon, IonLabel, IonItem, IonButtons } from '@ionic/react';
import { addSharp } from 'ionicons/icons';

const ActionMenu = () => {

  return (
    <IonMenu side="start" contentId="main-content">
      <IonContent>
        <IonList id="main-content">
          <IonItem>
            <IonButtons>
              <IonIcon
                size="large" 
                icon={addSharp} 
                color="white"></IonIcon>
            </IonButtons>
            <IonLabel class="menuItems">Add A Story</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
export default ActionMenu;