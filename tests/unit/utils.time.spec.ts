import getTimeText from '@/utils/time.ts';

test('Test on TimeText', () => {
    const d = new Date();
    d.setHours(6, 0, 0);
    const s1 = getTimeText(d.getTime());
    expect(s1).toBe(d.toLocaleTimeString());
    d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
    const s2 = getTimeText(d.getTime());
    expect(s2).toBe('昨天 ' + d.toLocaleTimeString());
    d.setTime(d.getTime() - 3 * 24 * 60 * 60 * 1000);
    const s3 = getTimeText(d.getTime());
    const showDay = new Array(
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日',
    );
    expect(s3).toBe(showDay[d.getDay()] + ' ' + d.toLocaleTimeString());
    d.setTime(d.getTime() - 30 * 24 * 60 * 60 * 1000);
    const s4 = getTimeText(d.getTime());
    expect(s4).toBe(d.toLocaleString());
});
