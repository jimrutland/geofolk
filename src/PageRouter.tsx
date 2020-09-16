import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { Dispatch, SetStateAction } from "react";
import { Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";

interface PageRouterProperties {
    auth(): firebase.auth.Auth;
    isSignedIn: boolean;
    setSignedIn: Dispatch<SetStateAction<boolean>>;
}

const PageRouter = (props: PageRouterProperties) => {
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/" exact={true} render={() => (props.isSignedIn) ? <Home /> : <Login auth={props.auth} />} />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default PageRouter;