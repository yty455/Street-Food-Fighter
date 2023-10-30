import React from 'react';
import { CheckboxContainer, Box, P } from './Checkbox.styled';
import { CheckboxType } from './Checkbox.type';

const Checkbox = (props: CheckboxType) => {
  return (
    <>
      <CheckboxContainer>
        <Box type="checkbox" {...props} />
        <P {...props}>{props.text}</P>
      </CheckboxContainer>
    </>
  );
};

export default Checkbox;
