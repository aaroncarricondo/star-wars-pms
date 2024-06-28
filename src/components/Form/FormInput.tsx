import { HTMLProps } from "react";

import { Input } from "../Input";
import { Space } from "../Space";
import { FormLabel } from "./FormLabel";

type FormInputProps = {
  label: string;
  name: string;
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
