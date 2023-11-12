import StoreInfoAPI from '@/apis/store/StoreInfoAPI';
import OwnerInfoAPI from '@/apis/ownerinfo/OwnerInfoAPI';
import OwnerInfoStore from '@/stores/ownerinfo/ownerInfoStore';

const useSetOwnerInfoHook = () => {
  const { setOwnerValue, setStoreValue, setLogin } = OwnerInfoStore();
  const setUserInfo = async (accessToken: any) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
    const ownerInfo = await OwnerInfoAPI(accessToken);
    const storeInfo = await StoreInfoAPI(accessToken);
    setOwnerValue(ownerInfo.response);
    setStoreValue(storeInfo.response);
    setLogin();
  };

  return setUserInfo;
};

export default useSetOwnerInfoHook;
