import { v1 as uuid } from 'uuid';
import Message from '@/storage/message';

class MessageList {
    public list: Message[];
    private id: string;
    constructor(list?: Message[]) {
        this.id = uuid();
        if (list) {
            this.list = list;
        } else {
            this.list = new Array();
        }
    }
    public getID() {
        return this.id;
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

export default MessageList;
