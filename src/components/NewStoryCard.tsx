import { IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonHeader, IonInput, IonItem, IonTextarea } from "@ionic/react";
import React, { SyntheticEvent } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GeoDatabaseWrapper } from "../database/DatabaseWrapper";
import { DocumentInformation } from "../models/Database";
import { Story } from "../models/Story";
import { ToastMessage } from "../models/ToastMessage";
import { shouldRemoveCurrentMarker } from "../RecoilStates/MarkerState";
import { displayMessage, showToast } from "../RecoilStates/Message";
import { currentStoryState, currentStoryText, currentStoryTitle } from "../RecoilStates/Story";
import { showingNewStoryCard } from "../RecoilStates/StoryCardState";

interface NewStoryCardProps {
  database: GeoDatabaseWrapper;
}

const NewStoryCard = (props: NewStoryCardProps) => {
  const setShowNewStoryCard = useSetRecoilState(showingNewStoryCard);
  const setRemoveCurrentMarker = useSetRecoilState(shouldRemoveCurrentMarker);
  const [newStoryText, setNewStoryText ]= useRecoilState(currentStoryText);
  const [newStoryTitle, setNewStoryTitle ]= useRecoilState(currentStoryTitle);
  const [newStory, setNewStory] = useRecoilState(currentStoryState);
  const setMessage = useSetRecoilState(displayMessage);
  const setShowToastMessage = useSetRecoilState(showToast);
  
  function setStoryText(event: CustomEvent): void {
    setNewStoryText(event.detail.value);
  }

  function setStoryTitle(event: CustomEvent): void {
    setNewStoryTitle(event.detail.value);
  }

  function saveStory(): void {
    if (!newStoryTitle || !newStoryText) {
      setMessage(new ToastMessage("Both a Title and Story are required.", "light"));
      setShowToastMessage(true);
    } else {
      const storyToBeSaved = new Story(
        newStory.coordinates,
        newStoryText,
        newStoryTitle,
        newStory.userId,
        newStory.g
      );
      setNewStory(storyToBeSaved);
      props.database.add(new DocumentInformation("stories", ""), storyToBeSaved);
    } 
  }

  return (
      <IonCard id="storyCard">
        <IonHeader>
          <IonCardTitle> Share Your Folktale </IonCardTitle>
        </IonHeader>
        <IonCardContent>
          <form>
            <IonItem color="light">
              <IonInput 
                placeholder="Enter the name of your tale..."
                value={newStoryTitle}
                onIonChange={setStoryTitle}></IonInput>
            </IonItem>
            <IonItem id="storyText" color="light">
              <IonTextarea 
                placeholder="Tell us your tale..."
                value={newStoryText}
                onIonChange={setStoryText}
                rows={8}></IonTextarea>
            </IonItem>
            <IonButtons>
              <IonButton 
                slot="start" 
                color="success"
                onClick={saveStory}> Submit </IonButton>
              <IonButton slot="end" onClick={() => {
                  setShowNewStoryCard(false);
                  setRemoveCurrentMarker(true);
              }}> Cancel </IonButton>
            </IonButtons>
          </form>
        </IonCardContent>        
      </IonCard>
    );
}
export default NewStoryCard;