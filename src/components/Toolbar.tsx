import React from 'react';
import { IonToolbar, IonTitle, IonButtons, IonIcon } from '@ionic/react';
import { reorderThreeSharp } from 'ionicons/icons';
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