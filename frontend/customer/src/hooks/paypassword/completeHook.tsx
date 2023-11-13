import { useRouter } from 'next/navigation';
import useCurPasswordStore from '@/stores/curpwdStore';
import usePwdPageStore from '@/stores/pwdpageStore';
import usePasswordStore from '@/stores/passwordStore';
import useRegisterPageStore from '@/stores/registerStore';
import { user } from '@/temp/user';
import useBucketStore from '@/stores/bucketStore';
import { useVendorStore } from '@/stores/curvendoridStore';
import OrderAPI from '@/apis/vendor/OrderAPI';

const useCompleteHandler = (slug: string) => {
  const router = useRouter();
  const { currentPassword, resetCurrentPassword } = useCurPasswordStore();
  const { curPwdPage, setCurPwdPage } = usePwdPageStore();
  const { setPassword, resetPasswords, wantPwd } = usePasswordStore();
  const setRegisterValue = useRegisterPageStore((state) => state.setRegisterValue);
  const paypassword = useRegisterPageStore((state) => state.paypassword);

  const handleComplete = async () => {
    const currentPassword = useCurPasswordStore.getState().currentPassword;

    if (slug == 'change') {
      if (curPwdPage === 1) {
        if (currentPassword === user.paymentPassword) {
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
          // 변경 비밀번호로 api호출 (이후 코드 추가)
        }
      }
    }

    // 회원가입할때,
    if (slug == 'register') {
      if (curPwdPage === 1) {
        setPassword(1, currentPassword);
        setRegisterValue('paypassword', currentPassword);
        setCurPwdPage(3);
      } else if (curPwdPage === 3) {
        setPassword(3, currentPassword);
        if (paypassword === currentPassword) {
          router.push('/success');
          resetPasswords();
          console.log('비밀번호 입력 성공.');
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
        if (currentPassword === user.paymentPassword) {
          setPassword(1, currentPassword);
          // 다른 경로로 이후에 변경
          // router.push('/ordercheck');
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
