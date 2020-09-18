export class ToastMessage {
    public message: string;
    public type: string;

    constructor(message: string, type: string) {
        this.message = message;
        this.type = type;
    }
}