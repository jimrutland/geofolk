import React, { useState } from 'react';
import {RecoilRoot } from 'recoil';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import PageRouter from './PageRouter';
import { firebaseConfig } from './configs/FirebaseConfig';
import firebase from 'firebase';

const App: React.FC = () => {
  const firebaseApp = (firebase.apps.length) ? firebase.app() : firebase.initializeApp(firebaseConfig);
  const [isSignedIn, setSignedIn] = useState(!!firebase.auth().currentUser);
  firebaseApp.auth().onAuthStateChanged((user) => {
    setSignedIn(!!user);
  });
  return (
      <RecoilRoot>
        <PageRouter 
          auth={() => {
            return firebaseApp.auth()
          }} 
          isSignedIn={isSignedIn}
          setSignedIn={setSignedIn}/>
      </RecoilRoot>
    );
}
export default App;
