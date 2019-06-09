import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import Message from './message';
import Tag from './tag';
class StorageDatabase {
    public db: PouchDB.Database;
    public tagDB: PouchDB.Database;
    public msgDB: PouchDB.Database;
    constructor() {
        this.db = new PouchDB('local');
        this.tagDB = new PouchDB('tag');
        this.msgDB = new PouchDB('message');
        // this.db.put(new Message("This is your first message").toDoc()).then(() => {
        //     return this.db.put(new Message("And this is the second!").toDoc());
        // }).then(() => {
        //     return this.db.put(new Message("You know **third time is a charm!**").toDoc());
        // });
    }
}

const db = new StorageDatabase();

export default db;

