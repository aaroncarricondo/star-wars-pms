import ReactSelect, { Props as ReactSelectProps } from "react-select";
import { useTheme } from "styled-components";

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
  const theme = useTheme();

  return (
    <Space $direction="column" $gap="small">
      <FormLabel htmlFor={name} $required={required}>
        {label}
      </FormLabel>
      <ReactSelect
        name={name}
        required={required}
        {...restProps}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            border: "none",
            borderRadius: 0,
            borderColor: `${theme.colors.text} !important`,
            borderBottomWidth: theme.border.width,
            borderBottomStyle: "solid",
            boxShadow: "none",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: theme.colors.text,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: theme.colors.background,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? theme.colors.highlight
              : "transparent",
          }),
          multiValue: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: theme.colors.headerBackground,
          }),
          multiValueLabel: (baseStyles) => ({
            ...baseStyles,
            color: theme.colors.text,
          }),
        }}
      />
    </Space>
  );
}
