export default function getTimeText(timestamp: number) {
    const d = new Date();
    const timeDelta = d.getTime() - timestamp;
    d.setTime(timestamp);
    const todayT =
        new Date().getHours() * 60 * 60 * 1000 +
        new Date().getMinutes() * 60 * 1000 +
        new Date().getSeconds() * 1000;
    const yestodayT = todayT + 24 * 60 * 60 * 1000;
    const weekT = todayT + 24 * 60 * 60 * 1000 * 5;
    if (timeDelta > weekT) {
        return d.toLocaleString();
    } else if (timeDelta > yestodayT) {
        const showDay = new Array('星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日');
        return showDay[d.getDay()] + ' ' + d.toLocaleTimeString();
    } else if (timeDelta > todayT) {
        return '昨天 ' + d.toLocaleTimeString();
    } else {
        return d.toLocaleTimeString();
    }
}

