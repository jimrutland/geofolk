import { IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonHeader, IonInput, IonItem, IonTextarea } from "@ionic/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentStoryState } from "../RecoilStates/Story";
import { showingExistingStoryCard } from "../RecoilStates/StoryCardState";

const ExistingStoryCard = () => {
    const currentStory = useRecoilValue(currentStoryState);
    const setShowExistingStoryCard = useSetRecoilState(showingExistingStoryCard);

    return (
        <IonCard id="storyCard">
          <IonHeader>
            <IonCardTitle> {currentStory.title} </IonCardTitle>
          </IonHeader>
          <IonCardContent>
              <IonItem id="storyText" color="light">
                <IonTextarea 
                  readonly
                  value={currentStory.storyText}
                  rows={10}></IonTextarea>
              </IonItem>
              <IonButtons>
                <IonButton slot="end" onClick={() => { setShowExistingStoryCard(false)}}> Exit </IonButton>
              </IonButtons>
          </IonCardContent>        
        </IonCard>
    );
}
export default ExistingStoryCard;