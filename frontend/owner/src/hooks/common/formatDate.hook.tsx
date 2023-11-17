const useFormatDate = () => {
  // 날짜를 'YYYY / MM / DD' 형식으로 변환하는 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year} / ${month} / ${day}`;
  };

  // 24시간 형식의 시간을 받아서 AM/PM 형식으로 변환하는 함수
  const formatTime24To12 = (time24: string): string => {
    const [hours24, minutes] = time24.split(':');
    const hours = parseInt(hours24, 10);
    const suffix = hours >= 12 ? '오후' : '오전';
    const hours12 = ((hours + 11) % 12) + 1;
    return `${suffix} ${hours12.toString().padStart(2, '0')}:${minutes}`;
  };

  return { formatDate, formatTime24To12 };
};

export default useFormatDate;
