import { Story } from "./Story";

export class DocumentInformation {
    public collectionName: string;
    public documentId: string;

    constructor(collectionName: string, documentId: string) {
        this.collectionName = collectionName;
        this.documentId = documentId;
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