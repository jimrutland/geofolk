import React from 'react';
import { IonContent, IonList, IonMenu, IonHeader, IonToolbar, IonTitle, IonIcon, IonLabel, IonItem, IonButtons, IonButton } from '@ionic/react';
import { addSharp } from 'ionicons/icons';

interface ActionMenuProperties {
  setIsAddingStory(isAdding: boolean): void;
}

const ActionMenu = (props: ActionMenuProperties) => {

  return (
    <IonMenu side="start" menuId="custom" contentId="main-content">
      <IonContent id="main-content">
        <IonButton color="black" expand="full" onClick={() => { props.setIsAddingStory(true)}}>
          <IonLabel>Add A Story</IonLabel>
          <IonIcon
            slot="end"
            class="menuIcon"
            size="large" 
            icon={addSharp} 
            color="white" />
        </IonButton>
      </IonContent>
    </IonMenu>
  );
}
export default ActionMenu;