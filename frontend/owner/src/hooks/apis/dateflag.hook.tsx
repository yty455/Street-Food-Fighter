import { useState, useEffect } from 'react';
import DateFlagAPI from '@/apis/flag/DateFlagAPI';

const useDateFlagHook = (date: any) => {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    const fetchFlags = async () => {
      const flagsData = await DateFlagAPI(date);
      if (flagsData && flagsData.response) {
        setFlags(flagsData.response);
      }
    };
    fetchFlags();
  }, [date]);

  return flags;
};

export default useDateFlagHook;
