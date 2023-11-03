export type PwdPageKey = 1 | 2 | 3;

export const passwordMessages: { [key in PwdPageKey]: string } = {
  1: '변경할 비밀번호를 입력해주세요!',
  2: '한번 더 입력해주세요!',
  3: '결제 비밀번호를 입력해주세요!',
};
