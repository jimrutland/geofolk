import React from "react";
import './Login.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseUIConfig } from "../configs/FirebaseConfig";
import { IonLabel } from "@ionic/react";

interface LoginProps {
  auth(): firebase.auth.Auth;
}

const Login = (props: LoginProps) => {
  const uiConfig = firebaseUIConfig;
  return (
    <div id="loginContainer">
      <IonLabel>GeoFolk</IonLabel>
      <StyledFirebaseAuth
        className="loginModal"
        uiConfig={uiConfig}
        firebaseAuth={props.auth()} />
    </div>
  );
};

export default Login;
