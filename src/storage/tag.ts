import { v1 as uuid } from 'uuid';
export default class Tag {
    public name: string;
    public createTime: number;
    private id: string;
    constructor(name: string, id?: string, createTime?: number) {
        if (id) {
            this.id = id;
        } else {
            this.id = uuid();
        }
        this.name = name;
        if (createTime) {
            this.createTime = createTime;
        } else {
            const d = new Date();
            this.createTime = d.getTime();
        }
    }
    public getID() {
        return this.id;
    }
    public toDoc() {
        return {
            _id: this.getID(),
            name: this.name,
            createTime: this.createTime,
        };
    }
}
import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);
import db from './db';
export class TagStorageDatabase {
    private db: PouchDB.Database;
    constructor() {
        this.db = db.tagDB;
    }
    public putTag(tag: Tag) {
        const doc = tag.toDoc();
        this.db.put(doc);
    }
    public getAllTags() {
        return this.db
            .allDocs<{ _id: string; name: string; createTime: number }>({
                include_docs: true,
            })
            .then((docs) => {
                const tags: Array<Tag | undefined> = [];
                for (const doc of docs.rows) {
                    const tagDoc = doc.doc;
                    tags.push(
                        new Tag(tagDoc!.name, tagDoc!._id, tagDoc!.createTime),
                    );
                }
                return new Promise((resolve) => {
                    if (tags.length > 0) {
                        resolve(tags);
                    }
                });
            });
    }
    public getTagByName(name: string) {
        return this.db
            .createIndex({
                index: {
                    fields: ['name'],
                },
            })
            .then(() => {
                return this.db.find({
                    selector: {
                        name: { $eq: name },
                    },
                });
            })
            .then((result) => {
                if (result.docs.length === 0) {
                    const newTag: Tag = new Tag(name);
                    this.putTag(newTag);
                    return new Promise((resolve) => {
                        resolve(newTag);
                    });
                } else {
                    const tags: Array<Tag | undefined> = [];
                    for (const doc of result.docs) {
                        const id: string = doc._id;
                        this.db
                            .get<{
                                _id: string;
                                name: string;
                                createTime: number;
                            }>(id)
                            .then((tagDoc) => {
                                tags.push(
                                    new Tag(
                                        tagDoc!.name,
                                        tagDoc!._id,
                                        tagDoc!.createTime,
                                    ),
                                );
                            });
                    }
                    return new Promise((resolve) => {
                        if (tags.length > 0) {
                            resolve(tags[0]);
                        }
                    });
                }
            });
    }
}
export const tagDB = new TagStorageDatabase();
