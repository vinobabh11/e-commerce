export const shortDescription = (text) => {
    if (text.length <= 100) return text;
    return text.slice(0, 100).trim() + '...';
}
