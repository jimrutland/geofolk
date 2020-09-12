import { IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonHeader, IonInput, IonItem, IonTextarea } from "@ionic/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { shouldRemoveCurrentMarker } from "../RecoilStates/MarkerState";
import { showingStoryCard } from "../RecoilStates/StoryCardState";

const StoryCard = () => {
    const setShowStoryCard = useSetRecoilState(showingStoryCard);
    const setRemoveCurrentMarker = useSetRecoilState(shouldRemoveCurrentMarker);
    
    return (
        <IonCard id="storyCard">
          <IonHeader>
            <IonCardTitle> Share Your Folktale </IonCardTitle>
          </IonHeader>
          <IonCardContent>
              <IonItem color="light">
                <IonInput placeholder="Enter the name of your tale..."></IonInput>
              </IonItem>
              <IonItem id="storyText" color="light">
                <IonTextarea 
                  placeholder="Tell us your tale..."
                  rows={8}></IonTextarea>
              </IonItem>
              <IonButtons>
                <IonButton slot="start" color="success"> Submit </IonButton>
                <IonButton slot="end" onClick={() => {
                    setShowStoryCard(false);
                    setRemoveCurrentMarker(true);
                }}> Cancel </IonButton>
              </IonButtons>
          </IonCardContent>        
        </IonCard>
    );
}
export default StoryCard;