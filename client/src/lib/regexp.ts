export const isValidUsername = {
  regexp: /^[a-z|0-9]{5,20}$/,
  message: '숫자나 영문으로 이루어진 5~20글자여야 합니다.',
};
export const isValidPassword = {
  regexp: /^[a-z|0-9]{8,20}$/,
  message: '숫자나 영문으로 이루어진 8~20글자여야 합니다.',
};
