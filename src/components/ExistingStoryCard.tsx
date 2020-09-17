import { IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonHeader, IonInput, IonItem, IonTextarea } from "@ionic/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentStoryState } from "../RecoilStates/Story";
import { showingExistingStoryCard } from "../RecoilStates/StoryCardState";

const ExistingStoryCard = () => {
    const currentStory = useRecoilValue(currentStoryState);
    const showExistingStoryCard = useSetRecoilState(showingExistingStoryCard);
    
    return (
        <IonCard id="storyCard">
          <IonHeader>
            <IonCardTitle> {currentStory.title} </IonCardTitle>
          </IonHeader>
          <IonCardContent>
              <IonItem id="storyText" color="light">
                <IonTextarea 
                  readonly
                  autoGrow
                  value={currentStory.storyText}
                  rows={8}></IonTextarea>
              </IonItem>
              <IonButtons>
                <IonButton slot="end" onClick={() => { showExistingStoryCard(false)}}> Exit </IonButton>
              </IonButtons>
          </IonCardContent>        
        </IonCard>
    );
}
export default ExistingStoryCard;