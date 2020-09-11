import React from 'react';
import { IonContent, IonList, IonMenu, IonHeader, IonToolbar, IonTitle, IonIcon, IonLabel, IonItem, IonButtons, IonButton } from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { useRecoilState } from 'recoil';
import { addingStoryState } from '../RecoilStates/StoryCardState';

interface ActionMenuProperties {
  toggleMenu(): void;
}

const ActionMenu = (props: ActionMenuProperties) => {
  const [isAddingStory, setIsAddingStory] = useRecoilState(addingStoryState);
  function closeWindowAndEnableAddMarker() {
    props.toggleMenu();
    setIsAddingStory(true);
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