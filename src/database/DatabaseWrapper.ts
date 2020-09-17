import * as geofirestore from 'geofirestore';
import { Database, DocumentInformation } from "../models/Database";
import { Story } from '../models/Story';

export class GeoDatabaseWrapper implements Database {
    private geoDb: geofirestore.GeoFirestore;

    constructor(db: geofirestore.GeoFirestore) {
        this.geoDb = db;
    }

    public async add(document: DocumentInformation, value: Story): Promise<Story> {
        try {
            await this.geoDb.collection(document.collectionName)
                .add(value);
            return value;
        } catch {
            throw new Error("Story upload unsuccessful");
        }
    }

    public delete(document: DocumentInformation): Promise<void> {
        return this.geoDb.collection(document.collectionName)
            .doc(document.documentId)
            .delete();
    }

    public async getStoriesNearPoint(collectionName: string, center: firebase.firestore.GeoPoint, radius: number): Promise<Story[]> {
        const documents = await this.geoDb.collection(collectionName)
            .near({
                center,
                radius
            })
            .get();
        return documents.docs.map(doc => {
            const data = doc.data() as Story;
            return new Story(data.coordinates, data.storyText, data.title, data.userId, data.g);
        });
    }
}