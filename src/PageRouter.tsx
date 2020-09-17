import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useState } from "react";
import { Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import firebase from "firebase";
import { firebaseConfig } from "./configs/FirebaseConfig";
import 'firebase/firestore';

const PageRouter = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  firebase.auth().onAuthStateChanged((user: any) => {
    setIsSignedIn(!!user);
  });

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" exact={true} render={() => (isSignedIn) ? <Home /> : <Login authentication={firebase.auth} />} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default PageRouter;