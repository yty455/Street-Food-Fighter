import { InputContainer, StyledInput } from './Input.styled';

const Input = ({ value, onChange, placeholder, ...props }: any) => {
  return (
    <InputContainer>
      <StyledInput value={value} onChange={onChange} placeholder={placeholder} size={props.size} {...props} />
    </InputContainer>
  );
};

export default Input;
