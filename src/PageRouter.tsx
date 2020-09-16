import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Route } from "react-router";
import { useRecoilValue } from "recoil";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { signedIn } from "./RecoilStates/Auth";

const PageRouter: React.FC = () => {
    const isSignedIn = useRecoilValue(signedIn);
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" component={(!isSignedIn) ? Login : Home} exact={true} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default PageRouter;