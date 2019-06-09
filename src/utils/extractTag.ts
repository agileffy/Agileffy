export default function extractTag(content: string) {
    const pat = /(#(\w+))/g;
    const tags = content.match(pat);
    return tags;
}
