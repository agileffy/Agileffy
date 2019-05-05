class Message {
    public content: string;
    public timestamp: Date;
    constructor(content: string) {
        this.content = content;
        this.timestamp = new Date();
    }
    public toDoc() {
        return {
            _id: this.timestamp.toJSON(),
            content: this.content,
            timestamp: this.timestamp,
        };
    }
    public updateContent(newContent: string) {
        this.content = newContent;
    }
}
export default Message;
