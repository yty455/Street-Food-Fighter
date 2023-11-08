import { useEffect, useState } from 'react';
import kakaosearchApi from '@/apis/kakaoSearchAPI';

type SearchResult = {
  place_name: string;
  address_name: string;
  x: string;
  y: string;
};

export const useKakaoSearchHook = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        const data = await kakaosearchApi(query);
        setResults(data || []);
      } else {
        setResults([]);
      }
    };

    const timerId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  return results;
};

export default useKakaoSearchHook;
