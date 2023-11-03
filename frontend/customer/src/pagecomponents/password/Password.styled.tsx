import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 340px);
  justify-content: center;
  gap: 50px;
  background-color: ${(props) => props.theme.colors.main};
`;
const Title = styled.div`
  font-size: 28px;
  width: 60%;
  text-align: center;
`;

export { Container, Title };
