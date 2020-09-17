import { GeolocationPosition } from "@capacitor/core";

export class DocumentInformation {
    public collectionName: string;
    public documentId: string;

    constructor(collectionName: string, documentId: string) {
        this.collectionName = collectionName;
        this.documentId = documentId;
    }
}

export class Story { 
    public coordinates: firebase.firestore.GeoPoint;
    public storyText: string;
    public title: string;
    public userId: string;
    public g: any;

    constructor(coordinates: firebase.firestore.GeoPoint, storyText: string, title: string, userId: string, g: any) {
        this.coordinates = coordinates;
        this.storyText = storyText;
        this.title = title;
        this.userId = userId;
        this.g = g;
    }
}

export class WhereStatement {
    public field: string;
    public operator: string;
    public value: string;

    constructor(field: string, operator: string, value: string) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }
}

export interface Database {
    add(document: DocumentInformation, value: Story, merge: boolean): Promise<Story>;
    delete(document: DocumentInformation): Promise<void>;
    getStoriesNearPoint(collectionName: string, center: firebase.firestore.GeoPoint, radius: number): Promise<Story[]>
}