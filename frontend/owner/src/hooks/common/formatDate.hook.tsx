const useFormatDate = () => {
  // 날짜를 'YYYY / MM / DD' 형식으로 변환하는 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year} / ${month} / ${day}`;
  };

  return formatDate;
};

export default useFormatDate;
