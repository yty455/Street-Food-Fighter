import { useRouter } from 'next/navigation';
import useCurPasswordStore from '@/stores/curpwdStore';
import usePwdPageStore from '@/stores/pwdpageStore';
import usePasswordStore from '@/stores/passwordStore';
import useRegisterPageStore from '@/stores/registerStore';
import SignUpAPI from '@/apis/user/SignUpAPI';
import usePayPwdStore from '@/stores/userpwdStore';
import OrderAPI from '@/apis/vendor/OrderAPI';
import FundingAPI from '@/apis/vendor/FundingAPI';
import { useNavStore } from '@/stores/curnavStore';
import { useVendorStore } from '@/stores/curvendoridStore';
import useBucketStore from '@/stores/bucketStore';
import { useRequestStore } from '@/stores/requestStore';
import useFlagIdStore from '@/stores/flagidStore';

const useCompleteHandler = (slug: string) => {
  const router = useRouter();
  const { currentPassword, resetCurrentPassword } = useCurPasswordStore();
  const { payPassword } = usePayPwdStore();
  const { curPwdPage, setCurPwdPage } = usePwdPageStore();
  const { setPassword, resetPasswords, wantPwd } = usePasswordStore();
  const setRegisterValue = useRegisterPageStore((state) => state.setRegisterValue);
  const { email, password, passwordCheck, nickname, phone, paymentPassword, region1, region2, region3, region4, socialId, fcmToken } =
    useRegisterPageStore();

  // 결제하기
  const { curnav } = useNavStore();
  const storedVendorId = useVendorStore((state) => state.vendorId);
  const bucket = useBucketStore((state) => state.bucket);
  const { finalRequest } = useRequestStore();
  const { flagId } = useFlagIdStore();

  const handleComplete = async () => {
    const currentPassword = useCurPasswordStore.getState().currentPassword;

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
          if (bucket) {
            // 결제 api
            const data1 = {
              bucketId: bucket.bucketId,
              storeId: storedVendorId,
              requirement: finalRequest,
            };
            const data2 = {
              bucketId: bucket.bucketId,
              storeId: storedVendorId,
              flagId: flagId,
              requirement: finalRequest,
            };
            if (curnav === 1) {
              const res = await OrderAPI(data1);
              // console.log('order...');
            } else {
              const res = await FundingAPI(data2);
              // console.log('funding...');
            }
          }
          router.push('/ordercheck');
        } else {
          alert('비밀번호가 틀렸습니다.');
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
