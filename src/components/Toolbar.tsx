import React from 'react';
import { IonToolbar, IonTitle, IonMenuButton, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { menu, reorderThreeSharp } from 'ionicons/icons';
interface ToolbarProps {
    openMenu(): void;
}
const Toolbar = (props: ToolbarProps) => {
    return (
        <IonToolbar>
            <IonButtons id="menuButton" slot="start">
                <IonIcon 
                    size="large" 
                    slot="start" 
                    icon={reorderThreeSharp} 
                    onClick={props.openMenu}/>
            </IonButtons>
            <IonTitle>GeoFolk</IonTitle>
        </IonToolbar>
    );
}

export default Toolbar;