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
        return doc;
    }
    public getAllMessages() {
        return this.db.allDocs({ include_docs: true }).then((docs) => {
            const msgs: Array<object | undefined> = [];
            for (const doc of docs.rows) {
                msgs.push(doc.doc);
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
}

const db = new StorageDatabase();


export default db;
