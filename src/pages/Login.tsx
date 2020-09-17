import React from "react";
import './Login.css';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseUIConfig } from "../configs/FirebaseConfig";
import { IonLabel } from "@ionic/react";

const Login = (props: any) => {
  const uiConfig = firebaseUIConfig;
  return (
    <div id="loginContainer">
      <IonLabel id="loginHeader">GeoFolk</IonLabel>
      <StyledFirebaseAuth
        className="loginModal"
        uiConfig={uiConfig}
        firebaseAuth={props.authentication()} />
    </div>
  );
};

export default Login;
