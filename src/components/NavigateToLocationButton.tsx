import { IonButton, IonIcon } from "@ionic/react";
import { Coords } from "google-map-react";
import { laptop, navigateSharp } from "ionicons/icons";
import React from "react";
import { useSetRecoilState } from "recoil";
import { userLocation } from "../RecoilStates/UserLocation";
import { zoom } from "../RecoilStates/Zoom";

const NavigateToLocationButton = () => {
    const setUserLocation = useSetRecoilState(userLocation);
    const setZoomLevel = useSetRecoilState(zoom);
    function navigateToCurrentLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position: Position) => {
                const userLocation: Coords = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                setUserLocation(userLocation);
                setZoomLevel(17);
              },
              () => {
                console.log("User denied access.");
              }
            );
          } else {
            console.log("Browser does not support geolocation.");
          }
    }

    return (
        <IonButton
            id="navigateButton" 
            slot="icon-only"
            color="dark"
            onClick={navigateToCurrentLocation}>
            <IonIcon icon={navigateSharp}></IonIcon>
        </IonButton>
    );
}
export default NavigateToLocationButton;