import PouchDB from 'pouchdb';
class StorageDatabase {
    public msgdb: PouchDB.Database;
    public lstdb: PouchDB.Database;
    public tagdb: PouchDB.Database;

    constructor() {
        this.msgdb = new PouchDB('msg');
        this.lstdb = new PouchDB('lst');
        this.tagdb = new PouchDB('tag');

        // this.db.put(new Message("This is your first message").toDoc()).then(() => {
        //     return this.db.put(new Message("And this is the second!").toDoc());
        // }).then(() => {
        //     return this.db.put(new Message("You know **third time is a charm!**").toDoc());
        // });
    }
}

const db = new StorageDatabase();

export { db, StorageDatabase };
