import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 40px;
`;

const Text = styled.div`
  font-size: 24px;
  text-align: center;
`;

const StyledButton = styled.div`
  width: 80vw;
  height: 45px;

  position: fixed;
  bottom: 20px;
`;

export { Container, Text, StyledButton };
