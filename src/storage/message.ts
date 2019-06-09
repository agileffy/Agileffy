import { v1 as uuid } from 'uuid';
import Tag from './tag';
export default class Message {
    public content: string;
    public timestamp: number;
    public updateTime: number;
    public tags: string[];
    private id: string;
    constructor(
        content: string,
        id?: string,
        timestamp?: number,
        updateTime?: number,
        tags?: string[],
    ) {
        if (id) {
            this.id = id;
        } else {
            this.id = uuid();
        }
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
        if (tags) {
            this.tags = tags;
        } else {
            this.tags = [];
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
            tags: this.tags,
        };
    }
    public updateContent(newContent: string) {
        this.content = newContent;
        const d: Date = new Date();
        this.updateTime = d.getTime();
    }
    public setTags(tags: Tag[]) {
        this.tags = [];
        for (const tag of tags) {
            this.tags.push(tag.getID());
        }
    }
}
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import db from './db';
export class MessageStorageDatabase {
    private db: PouchDB.Database;
    constructor() {
        this.db = db.msgDB;
    }
    public putMsg(msg: Message) {
        const doc = msg.toDoc();
        this.db.put(doc);
    }
    public getAllMessages() {
        return this.db
            .allDocs<{
                _id: string;
                content: string;
                timestamp: number;
                updateTime: number;
                tags: string[];
            }>({ include_docs: true })
            .then((docs) => {
                const msgs: Array<Message | undefined> = [];
                for (const doc of docs.rows) {
                    const msgDoc = doc.doc;
                    msgs.push(
                        new Message(
                            msgDoc!.content,
                            msgDoc!._id,
                            msgDoc!.timestamp,
                            msgDoc!.updateTime,
                            msgDoc!.tags,
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
        this.db.get(msg.getID()).then((doc) => {
            return this.db.put({
                _id: msg.getID(),
                _rev: doc._rev,
                content: msg.content,
                updateTime: msg.updateTime,
                tag_id: msg.tags,
            });
        });
    }
    public getMsgByTag(tag: Tag) {
        return this.db
            .createIndex({
                index: {
                    fields: ['tags'],
                },
            })
            .then(() => {
                return this.db.find({
                    selector: {
                        tags: { $elemMatch: tag.getID() },
                    },
                });
            })
            .then((result) => {
                const msgs: Array<Message | undefined> = [];
                for (const doc of result.docs) {
                    const id: string = doc._id;
                    this.db
                        .get<{
                            _id: string;
                            content: string;
                            timestamp: number;
                            updateTime: number;
                            tags: string[];
                        }>(id)
                        .then((msgDoc) => {
                            msgs.push(
                                new Message(
                                    msgDoc!.content,
                                    msgDoc!._id,
                                    msgDoc!.timestamp,
                                    msgDoc!.updateTime,
                                    msgDoc!.tags,
                                ),
                            );
                        });
                }
                return new Promise((resolve) => {
                    if (msgs.length > 0) {
                        resolve(msgs);
                    }
                });
            });
    }
}
export const msgDB = new MessageStorageDatabase();
