import { v1 as uuid } from 'uuid';

class Message {
    public content: string;
    public timestamp: number;
    public updateTime: number;
    private id: string;
    constructor(content: string, timestamp?: number, updateTime?: number) {
        this.id = uuid();
        this.content = content;
        if (timestamp) {
            this.timestamp = timestamp;
        } else {
            const d: Date = new Date();
            this.timestamp = d.getTime();
        }
        if (updateTime) {
            this.updateTime = updateTime;
        } else {
            const d: Date = new Date();
            this.updateTime = d.getTime();
        }
    }
    public getID() {
        return this.id;
    }
    public toDoc() {
        return {
            _id: this.getID(),
            content: this.content,
            timestamp: this.timestamp,
            updateTime: this.updateTime,
        };
    }
    public updateContent(newContent: string) {
        this.content = newContent;
        const d: Date = new Date();
        this.updateTime = d.getTime();
    }
}
export default Message;
