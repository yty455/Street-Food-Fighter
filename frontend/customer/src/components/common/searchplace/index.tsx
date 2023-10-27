import { useState } from 'react';
import { ModalOverlay, List, SearchTop, TopTitle, SearchBar, SearchText, Place, BoldText, LightText, NoResult } from './Searchplace.styled';
import useKakaoSearchHook from '@/hooks/searchplaceHook';

const SearchPlace = ({ onClose, onSelectPlace }: any) => {
  const [query, setQuery] = useState('');
  const results = useKakaoSearchHook(query);

  return (
    <ModalOverlay>
      <div style={{ padding: '20px' }}>
        <SearchTop>
          <div onClick={onClose}>
            <img src="/images/top/back.png" style={{ width: '30px' }} />
          </div>
          <TopTitle> 주소 검색</TopTitle>
        </SearchTop>
        <SearchBar>
          <img src="/images/orderfunding/search.png" style={{ width: '30px' }} />
          <SearchText value={query} onChange={(e: any) => setQuery(e.target.value)} placeholder="지번, 도로명, 건물명으로 검색" />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} style={{ border: 'none' }}>
              <img src="/images/orderfunding/erase.png" style={{ width: '25px' }} />
            </button>
          )}
        </SearchBar>
      </div>
      <List>
        {results.length > 0 ? (
          results.map((result, index) => (
            <Place key={index} onClick={() => onSelectPlace(result.x, result.y)}>
              <BoldText>{result.place_name}</BoldText>
              <LightText>{result.address_name}</LightText>
            </Place>
          ))
        ) : (
          <NoResult>
            <BoldText> 이렇게 검색해보세요 !</BoldText>
            <div>
              <LightText> - 도로명 + 건물번호</LightText>
              <LightText> - 지역명 + 번지</LightText>
              <LightText> - 건물명, 아파트명</LightText>
            </div>
          </NoResult>
        )}
      </List>
    </ModalOverlay>
  );
};
export default SearchPlace;
