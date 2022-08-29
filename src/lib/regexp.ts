export const isValidUsername = {
  regexp: /^(?=.*[a-z|A-Z])(?=.*[0-9])[a-z|A-Z|0-9]{8,15}$/,
  message: '숫자와 영문을 포함한 8~15글자여야 합니다.',
};
// The password is at least 8 characters long (?=.{8,}).
// The password has at least one uppercase letter (?=.*[A-Z]).
// The password has at least one lowercase letter (?=.*[a-z]).
// The password has at least one digit (?=.*[0-9]).
// The password has at least one special character ([^A-Za-z0-9]).

export const isValidPassword = {
  regexp: /^(?=.*[a-z|A-Z])(?=.*[0-9])[a-z|A-Z|0-9]{8,15}$/,
  message: '숫자와 영문을 포함한 8~15글자여야 합니다.',
};

// export const isValidUsername = {
//   regexp: /^[a-z|0-9]{5,20}$/,
//   message: '숫자나 영문으로 이루어진 5~20글자여야 합니다.',
// };
