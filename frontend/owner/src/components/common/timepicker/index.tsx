import { TimePickerContainer, TimePickerInput, Label } from './Timepicker.styled';

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TimePicker = ({ label, value, onChange }: TimePickerProps) => {
  return (
    <TimePickerContainer>
      <Label>{label}</Label>
      <TimePickerInput type="time" style={{ color: 'black' }} value={value} onChange={(e: any) => onChange(e.target.value)} />
    </TimePickerContainer>
  );
};

export default TimePicker;
