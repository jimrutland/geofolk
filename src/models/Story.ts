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

    public isEqual(story: Story): boolean {
        return JSON.stringify(story) === JSON.stringify(this);
    }
}