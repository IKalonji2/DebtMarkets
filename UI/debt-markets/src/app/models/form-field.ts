interface BaseField {
  name: string;
  type: string;
  label: string;
  errorMessage: string;
  validators?: any[];
}

interface InputField extends BaseField {
  value: string;
}

export interface SelectField extends BaseField {
  options: { label: string; value: string }[];
}

export type FormField = InputField | SelectField;
