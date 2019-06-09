import { Message } from '@/storage/message';
import { MessageList } from '@/storage/list';


test('message remove', () => {
    const msgs = new Array<Message>();
    for (let i = 0; i < 10; i++) {
        msgs.push(new Message(String(i)));
    }
    let ml = new MessageList('No Name', [msgs[0], msgs[1]]);
    ml.remove([0]);
    expect(ml.list).toEqual(new MessageList('NoName', [msgs[1]]).list);

    ml = new MessageList('NoName', [msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([1, 3]);
    expect(ml.list).toEqual(new MessageList('NoName', [msgs[0], msgs[2]]).list);

    ml = new MessageList('NoName', [msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 1, 3]);
    expect(ml.list).toEqual(new MessageList('NoName', [msgs[2]]).list);

    ml = new MessageList('NoName', [msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 1, 2, 3]);
    expect(ml.list).toEqual(new MessageList('NoName').list);

    ml = new MessageList('NoName', [msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 0, 0, 10]);
    expect(ml.list).toEqual(new MessageList('NoName', [msgs[1], msgs[2], msgs[3]]).list);

    ml = new MessageList('NoName', [msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 2, 10]);
    expect(ml.list).toEqual(new MessageList('NoName', [msgs[1], msgs[3]]).list);
},
);
