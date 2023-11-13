import { useState, useEffect } from 'react';
import StatsAPI from '@/apis/close/StatsAPI';
import { AccountStats } from '@/types/stats.type';

const useStatsHook = () => {
  const [accounts, setAccounts] = useState<AccountStats>({
    menuStatsList: [],
    totalPrice: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await StatsAPI();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return accounts;
};

export default useStatsHook;
