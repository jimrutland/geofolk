import React from 'react';
import { IonContent, IonList, IonMenu, IonHeader, IonToolbar, IonTitle, IonIcon, IonLabel, IonItem, IonButtons, IonButton } from '@ionic/react';
import { addSharp } from 'ionicons/icons';

interface ActionMenuProperties {
  setIsAddingStory(isAdding: boolean): void;
  toggleMenu(): void;
}

const ActionMenu = (props: ActionMenuProperties) => {
  
  function closeWindowAndEnableAddMarker() {
    props.toggleMenu();
    props.setIsAddingStory(true);
  }

  return (
    <IonMenu side="start" menuId="custom" contentId="main-content">
      <IonContent id="main-content">
        <IonButton color="black" expand="full" onClick={closeWindowAndEnableAddMarker}>
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