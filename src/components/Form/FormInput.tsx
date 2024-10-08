import { HTMLProps } from "react";

import { Space } from "../Layout/Space";
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
      <Input id={name} name={name} required={required} {...restProps} />
    </Space>
  );
};
