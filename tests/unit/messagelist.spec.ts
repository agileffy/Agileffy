import Message from '@/storage/message';
import MessageList from '@/storage/list';


test('message remove', () => {
    const msgs = new Array<Message>();
    for (let i = 0; i < 10; i++) {
        msgs.push(new Message(String(i)));
    }
    let ml = new MessageList([msgs[0], msgs[1]]);
    ml.remove([0]);
    expect(ml).toEqual(new MessageList([msgs[1]]));

    ml = new MessageList([msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([1, 3]);
    expect(ml).toEqual(new MessageList([msgs[0], msgs[2]]));

    ml = new MessageList([msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 1, 3]);
    expect(ml).toEqual(new MessageList([msgs[2]]));

    ml = new MessageList([msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 1, 2, 3]);
    expect(ml).toEqual(new MessageList());

    ml = new MessageList([msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 0, 0, 10]);
    expect(ml).toEqual(new MessageList([msgs[1], msgs[2], msgs[3]]));

    ml = new MessageList([msgs[0], msgs[1], msgs[2], msgs[3]]);
    ml.remove([0, 2, 10]);
    expect(ml).toEqual(new MessageList([msgs[1], msgs[3]]));
})