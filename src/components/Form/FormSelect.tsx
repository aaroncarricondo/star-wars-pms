import ReactSelect, { Props as ReactSelectProps } from "react-select";

import { Space } from "../Space";
import { FormLabel } from "./FormLabel";

export type SelectOption<TValue = string> = {
  label: string;
  value: TValue;
};

type FormSelectProps = {
  label: string;
} & ReactSelectProps;

export function FormSelect({
  label,
  name,
  required,
  ...restProps
}: FormSelectProps) {
  return (
    <Space $direction="column" $gap="small">
      <FormLabel htmlFor={name} $required={required}>
        {label}
      </FormLabel>
      <ReactSelect name={name} required={required} {...restProps} />
    </Space>
  );
}
