import React from 'react';
import { CheckboxContainer, Box, TextBox, P } from './Checkbox.styled';
import { CheckboxType } from './Checkbox.type';

const Checkbox = (props: CheckboxType) => {
  return (
    <>
      <CheckboxContainer>
        <Box {...props} type="checkbox" checked={props.checked} onChange={props.onChange} />
        <TextBox>
          <P {...props}>{props.text}</P>
          <P {...props}>{props.price}원</P>
        </TextBox>
      </CheckboxContainer>
    </>
  );
};

export default Checkbox;
