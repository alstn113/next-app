import { customAlphabet } from 'nanoid';

export const slugify = (text: string): string => {
  return text
    .replace(/[^0-9a-zA-Zㄱ-힣\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
};

export const generateId = customAlphabet(
  '0123456789abcdefghijklmnopqrstuvwxyz',
  8,
);
