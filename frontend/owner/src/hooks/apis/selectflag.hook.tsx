import SelectFlagAPI from '@/apis/flag/SelectFlagAPI';

const useSelectFlagHook = () => {
  const callAPI = async (data: any) => {
    try {
      const response = await SelectFlagAPI(data);
      return response;
    } catch (error) {
      console.error('API 호출 실패:', error);
      return null;
    }
  };

  return callAPI;
};

export default useSelectFlagHook;
