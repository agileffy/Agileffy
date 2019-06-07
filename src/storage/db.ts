import PouchDB from 'pouchdb';
import Message from './message';
class StorageDatabase {
    private db: PouchDB.Database;
    constructor() {
        this.db = new PouchDB('local');
        // this.db.put(new Message("This is your first message").toDoc()).then(() => {
        //     return this.db.put(new Message("And this is the second!").toDoc());
        // }).then(() => {
        //     return this.db.put(new Message("You know **third time is a charm!**").toDoc());
        // });
    }
    public newMsg(content: string) {
        const msg = new Message(content);
        const doc = msg.toDoc();
        this.db.put(doc);
        return msg;
    }
    public getAllMessages() {
        return this.db
            .allDocs<{
                content: string;
                timestamp: number;
                updateTime: number;
            }>({ include_docs: true })
            .then((docs) => {
                const msgs: Array<Message | undefined> = [];
                for (const doc of docs.rows) {
                    const msgDoc = doc.doc;
                    msgs.push(
                        new Message(
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

const db = new StorageDatabase();

export default db;
