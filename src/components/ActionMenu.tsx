import React from 'react';
import { IonContent, IonMenu, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { useSetRecoilState } from 'recoil';
import { addingStoryState } from '../RecoilStates/StoryCardState';

interface ActionMenuProperties {
  toggleMenu(): void;
}

const ActionMenu = (props: ActionMenuProperties) => {
  const setIsAddingStory = useSetRecoilState(addingStoryState);
  
  function closeWindowAndEnableAddMarker(): void {
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