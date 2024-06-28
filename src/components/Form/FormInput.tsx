import { HTMLProps } from "react";

import { Space } from "../Space";
import { FormLabel } from "./FormLabel";
import { Input } from "./Input";

type FormInputProps = {
  label: string;
} & HTMLProps<HTMLInputElement>;

export const FormInput = ({
  label,
  name,
  required,
  ...restProps
}: FormInputProps) => {
  return (
    <Space $direction="column" $gap="small">
      <FormLabel htmlFor={name} $required={required}>
        {label}
      </FormLabel>
      <Input name={name} required={required} {...restProps} />
    </Space>
  );
};
