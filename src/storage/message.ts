class Message {
    public content: string;
    public timestamp: number;
    public updateTime: number;
    constructor(content: string, timestamp?: number, updateTime?: number) {
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
    public toDoc() {
        return {
            _id: String(this.timestamp), // should use UUID later
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
