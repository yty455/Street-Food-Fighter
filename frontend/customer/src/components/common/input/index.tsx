import { InputContainer, StyledInput, InfoInput } from './Input.styled';

const Input = ({ value, onChange, placeholder, ...props }: any) => {
  return (
    <InputContainer>
      {props.use === 'info' ? (
        <InfoInput value={value} onChange={onChange} placeholder={placeholder} {...props}></InfoInput>
      ) : (
        <StyledInput value={value} onChange={onChange} placeholder={placeholder} {...props} />
      )}
    </InputContainer>
  );
};

export default Input;
