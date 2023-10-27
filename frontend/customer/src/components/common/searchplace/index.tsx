import React, { useEffect, useState } from 'react';
import { ModalOverlay, SearchTop, TopTitle, SearchBar, SearchText } from './Searchplace.styled';
import kakaosearchApi from '@/apis/kakaoSearchAPI';

type SearchResult = {
  place_name: string;
  address_name: string;
  x: string;
  y: string;
};

const SearchPlace = ({ onClose }: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 0) {
        const data = await kakaosearchApi(query);
        if (data) {
          console.log(data);
          setResults(data);
        } else {
          setResults([]);
        }
      }
    };

    const timerId = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  return (
    <ModalOverlay>
      <SearchTop>
        <div onClick={onClose}>
          <img src="/images/top/back.png" style={{ width: '30px' }} />
        </div>
        <TopTitle> 주소 검색</TopTitle>
      </SearchTop>
      <SearchBar>
        <img src="/images/orderfunding/search.png" style={{ width: '30px' }} />
        <SearchText value={query} onChange={(e: any) => setQuery(e.target.value)} placeholder="지번, 도로명, 건물명으로 검색" />
      </SearchBar>
      {results.map((result, index) => (
        <div key={index}>
          <div>{result.place_name}</div>
          <div>{result.address_name}</div>
        </div>
      ))}
    </ModalOverlay>
  );
};

export default SearchPlace;
