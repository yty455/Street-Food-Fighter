export interface CheckboxType {
  name?: string;
  value?: string;
  text?: string;
  size?: string;
  price?: number;
  checked: boolean;
  onChange: (e: any) => void;
}
