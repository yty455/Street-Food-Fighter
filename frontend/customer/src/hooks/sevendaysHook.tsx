import { useEffect, useState } from 'react';

const useDateOptions = () => {
  const [dateOptions, setDateOptions] = useState<Date[]>([]);

  useEffect(() => {
    const today = new Date();
    const options = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      options.push(date);
    }

    setDateOptions(options);
  }, []);

  const formatDate = (date: Date, needDayOfWeek: boolean) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

    return needDayOfWeek ? `${month}월 ${day}일 ${dayOfWeek}요일` : `${month}월 ${day}일`;
  };

  return { dateOptions, formatDate };
};

export default useDateOptions;
