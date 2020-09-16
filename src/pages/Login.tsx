import React from "react";
import './Login.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseConfig } from "../configs/FirebaseConfig";
import { useSetRecoilState } from "recoil";
import { signedIn } from "../RecoilStates/Auth";
import { IonLabel } from "@ionic/react";

const Login: React.FC = () => {
  const firebaseApp = (firebase.apps.length) ? firebase.app() : firebase.initializeApp(firebaseConfig);
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    }
  };
  
  const setSignedIn = useSetRecoilState(signedIn);
  
  firebaseApp.auth().onAuthStateChanged((user) => {
    setSignedIn(!!user);
  });

  return (
    <div id="loginContainer">
      <IonLabel>GeoFolk</IonLabel>
      <StyledFirebaseAuth
        className="loginModal"
        uiConfig={uiConfig}
        firebaseAuth={firebaseApp.auth()}/>
      </div>
  );
};

export default Login;
