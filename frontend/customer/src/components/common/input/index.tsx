import { InputContainer, StyledInput, InfoInput, InfoLabel } from './Input.styled';

const Input = ({ value, onChange, placeholder, label, ...props }: any) => {
  return (
    <InputContainer>
      {props.use === 'info' ? (
        <>
          {label && <InfoLabel>{label}</InfoLabel>}
          <InfoInput value={value} onChange={onChange} placeholder={placeholder} {...props}></InfoInput>
        </>
      ) : (
        <StyledInput value={value} onChange={onChange} placeholder={placeholder} {...props} />
      )}
    </InputContainer>
  );
};

export default Input;
