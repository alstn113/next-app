export const slugify = (text: string): string => {
  return text
    .trim()
    .replace(/[^0-9|a-z|A-Z|ㄱ-힣]/g, '')
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};
