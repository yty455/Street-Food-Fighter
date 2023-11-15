import { useRouter } from 'next/navigation';
import useCurPasswordStore from '@/stores/curpwdStore';
import usePwdPageStore from '@/stores/pwdpageStore';
import usePasswordStore from '@/stores/passwordStore';
import useRegisterPageStore from '@/stores/registerStore';
import SignUpAPI from '@/apis/user/SignUpAPI';
import usePayPwdStore from '@/stores/userpwdStore';

const useCompleteHandler = (slug: string) => {
  const router = useRouter();
  const { currentPassword, resetCurrentPassword } = useCurPasswordStore();
  const { curPwdPage, setCurPwdPage } = usePwdPageStore();
  const { setPassword, resetPasswords, wantPwd } = usePasswordStore();
  const setRegisterValue = useRegisterPageStore((state) => state.setRegisterValue);
  const { email, password, passwordCheck, nickname, phone, paymentPassword, region1, region2, region3, region4, socialId, fcmToken } =
    useRegisterPageStore();

  const handleComplete = async () => {
    const currentPassword = useCurPasswordStore.getState().currentPassword;
    const { payPassword } = usePayPwdStore();

    if (slug == 'change') {
      if (curPwdPage === 1) {
        if (currentPassword === payPassword) {
          setCurPwdPage(2);
          setPassword(1, currentPassword);
        } else {
          alert('Incorrect password.');
          resetCurrentPassword();
        }
      } else if (curPwdPage === 2) {
        setCurPwdPage(3);
        setPassword(2, currentPassword);
      } else if (curPwdPage === 3) {
        setPassword(3, currentPassword);
        if (wantPwd === currentPassword) {
          router.back();
          resetPasswords();
          alert('Password changed successfully.');
        } else {
          resetCurrentPassword();
          // 변경 비밀번호로 api호출
        }
      }
    }

    // 회원가입할때,
    if (slug == 'register') {
      if (curPwdPage === 1) {
        setPassword(1, currentPassword);
        setRegisterValue('paymentPassword', currentPassword);
        setCurPwdPage(3);
      } else if (curPwdPage === 3) {
        setPassword(3, currentPassword);
        if (paymentPassword === currentPassword) {
          const data = {
            email,
            password,
            passwordCheck,
            nickname,
            phone,
            paymentPassword,
            region1,
            region2,
            region3,
            region4,
            fcmToken,
            imageUrl: '',
          };
          console.log('요청 데이터', data);
          const result = await SignUpAPI(data);
          // console.log(result);
          if (result?.data.success) {
            router.push('/success');
          } else {
            console.log(result);
            alert('회원가입에 실패했습니다.');
          }
          // resetPasswords();
          setCurPwdPage(1);
        } else {
          resetCurrentPassword();
        }
      }
    }
    // 결제할 때,
    if (slug == 'pay') {
      setCurPwdPage(1);
      if (curPwdPage === 1) {
        if (currentPassword === payPassword) {
          setPassword(1, currentPassword);
          router.push('/ordercheck');
        } else {
          alert('Incorrect password.');
          resetCurrentPassword();
        }
      }
    }
  };

  const resetHandler = () => {
    resetCurrentPassword();
  };

  return { handleComplete, resetHandler };
};

export default useCompleteHandler;
