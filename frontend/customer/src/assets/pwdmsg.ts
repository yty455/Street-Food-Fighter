export type PwdPageKey = 1 | 2 | 3;

interface PasswordMessages {
  [key: string]: string;
}

export const passwordMessages: PasswordMessages = {
  1: '결제 비밀번호를 입력해주세요!',
  2: '변경할 비밀번호를 입력해주세요!',
  3: '한번 더 입력해주세요!',
};
