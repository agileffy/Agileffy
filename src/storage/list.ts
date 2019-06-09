import { v1 as uuid } from 'uuid';
import { Message, msgStore } from '@/storage/message';
import PouchDB from 'pouchdb';
import { db } from './db';

class MessageList {
    public static fromDoc(id: string, rev: string, idList: string[], name: string) {
        return msgStore.getMessages(idList).then((list) => {
            const lst = new MessageList(name, list);
            lst.id = id;
            lst.rev = rev;
            return lst;
        });
    }
    public list: Message[];

    private name: string;
    private id: string;
    private rev: string | undefined;

    constructor(name?: string, list?: Message[]) {
        this.id = uuid();
        if (name) {
            this.name = name;
        } else {
            this.name = 'Not Named';
        }

        if (list) {
            this.list = list;
        } else {
            this.list = new Array();
        }
    }
    public getID() {
        return this.id;
    }
    public toDoc(rev?: string) {
        const idList = new Array<string>();
        for (const msg of this.list) {
            idList.push(msg.getID());
        }
        const doc = {
            _id: this.id,
            _rev: rev || this.rev,
            name: this.name,
            list: idList,
        };
        return doc;
    }
    public extractSelected() {
        const newList = new Array();
        for (const msg of this.list) {
            if (msg.selected) {
                newList.push(msg);
            }
        }
        return new MessageList('new', newList);
    }
    public duplicate() {
        const newList = new Array();
        for (const msg of this.list) {
            const newMsg = new Message(msg.content);
            msgStore.putMsg(newMsg);
            newList.push(newMsg);
        }
        return new MessageList('new', newList);
    }
    public removeSelected() {
        const keepList = new Array();
        for (const msg of this.list) {
            if (!msg.selected) {
                keepList.push(msg);
            }
        }
        this.list = keepList;
    }
    public appendMsgList(mstLst: MessageList) {
        this.list = this.list.concat(mstLst.list);
    }
    public toMsg() {
        let content = '';
        for (const msg of this.list) {
            content += '\n\n' + msg.content;
        }
        // console.log(content);
        const newMsg = new Message(content);
        msgStore.putMsg(newMsg);
        return newMsg;
    }
    /* extractMsg uses idx to extract messages in the message list, it returns the extracted
    messages in a message list, and the original messages are removed from the message list
    */
    public extractMsg(idxes: number[]) {
        const newList = new Array();
        for (const i of idxes) {
            newList.push(idxes[i]);
        }
        this.remove(idxes);
        return newList;
    }
    /* push appends a new message to the message list */
    public push(msg: Message) {
        this.list.push(msg);
    }

    /* remove removes a list of messages from the original list by index */
    public remove(idxes: number[]) {
        const newList = new Array();
        idxes.sort((a, b) => a - b);
        let j = 0;
        for (let i = 0; i < this.list.length; i++) {
            while (j < idxes.length && idxes[j] < i) {
                j++;
            }
            if (idxes[j] !== i) {
                newList.push(this.list[i]);
            }
        }
        this.list = newList;
    }
}

class Document extends MessageList {

}

class MessagePile extends MessageList {

}

class MessageListStorage {
    private db: PouchDB.Database;
    constructor() {
        this.db = db.lstdb;
    }
    public getMsgList(id: string) {
        return this.db.get<{
            _id: string;
            _rev: string;
            name: string;
            list: string[];
        }>(id).then((doc) => {
            return MessageList.fromDoc(
                doc!._id,
                doc!._rev,
                doc!.list,
                doc!.name,
            );
        });
    }
    public putMsgList(msgList: MessageList) {
        const doc = msgList.toDoc();
        return this.db.put(doc);
    }
    public updateMsgList(msgLst: MessageList) {
        this.db
            .get(msgLst.getID())
            .then((doc) => {
                return this.db.put(msgLst.toDoc(doc._rev));
            });
    }
    public getAllList() {
        return this.db.allDocs<{
            _id: string;
            _rev: string;
            name: string;
            list: string[];
        }>({ include_docs: true }).then((docs) => {
            const msgLists: MessageList[] = [];
            return docs.rows.reduce(async (prev, nextRow) => {
                await prev;
                const doc = nextRow.doc;
                return MessageList.fromDoc(
                    doc!._id,
                    doc!._rev,
                    doc!.list,
                    doc!.name,
                ).then((lst) => {
                    msgLists.push(lst);
                });
            }, Promise.resolve()).then(() => {
                return msgLists;
            });
        });
    }
}

const lstStore = new MessageListStorage();

export { MessageList, MessageListStorage, lstStore };
