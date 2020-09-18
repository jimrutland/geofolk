import { Story } from "./Story";

export class DocumentInformation {
    public collectionName: string;
    public documentId: string;

    constructor(collectionName: string, documentId: string) {
        this.collectionName = collectionName;
        this.documentId = documentId;
    }
}

export interface Database {
    add(document: DocumentInformation, value: Story, merge: boolean): Promise<Story>;
    delete(document: DocumentInformation): Promise<void>;
    getStoriesNearPoint(collectionName: string, center: firebase.firestore.GeoPoint, radius: number): Promise<Story[]>
}