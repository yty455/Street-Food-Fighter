import { ModalOverlay, FilterBox, FilterTitle, CloseButton } from './Filter.styled';

const FilterComponent = ({ onClose }: any) => {
  return (
    <ModalOverlay>
      <FilterBox>
        <FilterTitle>카테고리</FilterTitle>
        <div>카테고리 목록 우르르</div>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </FilterBox>
    </ModalOverlay>
  );
};

export default FilterComponent;
