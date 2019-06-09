import { v1 as uuid } from 'uuid';
import PouchDB from 'pouchdb';
import { db } from './db';

class Message {
    public static fromDoc(id: string, rev: string, content: string, timestamp: number, updateTime: number) {
        const msg = new Message(content, timestamp, updateTime);
        msg.id = id;
        msg.rev = rev;
        return msg;
    }
    public content: string;
    public timestamp: number;
    public updateTime: number;
    public selected: boolean;
    private id: string;
    private rev: string | undefined;
    constructor(content: string, timestamp?: number, updateTime?: number) {
        this.id = uuid();
        this.content = content;
        this.selected = false;
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

class MessageStorage {
    private db: PouchDB.Database;
    constructor() {
        this.db = db.msgdb;
    }
    public newMsg(content: string) {
        const msg = new Message(content);
        const doc = msg.toDoc();
        this.db.put(doc);
        return msg;
    }
    public getMessages(idList: string[]) {
        const msgList: Message[] = [];
        return idList.reduce(async (prev, nextId) => {
            await prev;
            return this.getMsg(nextId).then((msg) => {
                msgList.push(msg);
            });
        }, Promise.resolve()).then(() => {
            return msgList;
        });
    }
    public getMsg(id: string) {
        return this.db.get<{
            _id: string,
            _rev: string,
            content: string,
            timestamp: number,
            updateTime: number,
        }>(id).then((doc) => {
            const msg = Message.fromDoc(doc._id, doc._rev, doc.content, doc.timestamp, doc.updateTime);
            return msg;
        });
    }
    public getAllMessages() {
        return this.db
            .allDocs<{
                _id: string,
                _rev: string,
                content: string;
                timestamp: number;
                updateTime: number;
            }>({ include_docs: true })
            .then((docs) => {
                const msgs: Array<Message | undefined> = [];
                for (const doc of docs.rows) {
                    const msgDoc = doc.doc;
                    msgs.push(
                        Message.fromDoc(
                            msgDoc!._id,
                            msgDoc!._rev,
                            msgDoc!.content,
                            msgDoc!.timestamp,
                            msgDoc!.updateTime,
                        ),
                    );
                }
                return new Promise((resolve) => {
                    if (msgs.length > 0) {
                        resolve(msgs);
                    }
                });
            });
        // return new Promise((resolve, reject) => {
        //     this.db.allDocs()
        // });
    }
    public updateMessage(msg: Message) {
        this.db
            .get(msg.getID())
            .then((doc) => {
                return this.db.put({
                    _id: msg.getID(),
                    _rev: doc._rev,
                    content: msg.content,
                    updateTime: msg.updateTime,
                });
            });
    }
}

const msgStore = new MessageStorage();

export { Message, MessageStorage, msgStore };
