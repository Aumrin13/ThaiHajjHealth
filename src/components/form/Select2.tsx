import React from "react";
import ReactSelect, { Props as ReactSelectProps, SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface Select2Props {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  error?: boolean;
}

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: 44,
    borderRadius: 8,
    borderColor: state.isFocused ? '#2563eb' : (state.selectProps.error ? '#ef4444' : '#d1d5db'),
    boxShadow: state.isFocused ? '0 0 0 2px #2563eb22' : undefined,
    '&:hover': {
      borderColor: '#2563eb',
    },
    backgroundColor: 'var(--color-bg, white)',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'var(--color-text, #111827)',
  }),
};

const Select2: React.FC<Select2Props> = ({
  options,
  placeholder = "เลือกข้อมูล",
  onChange,
  className = "",
  defaultValue = "",
  error = false,
}) => {
  const defaultOpt = options.find((o) => o.value === defaultValue) || null;
  return (
    <ReactSelect
      options={options}
      placeholder={placeholder}
      defaultValue={defaultOpt}
      value={defaultOpt}
      onChange={(option: SingleValue<Option>) => onChange(option ? option.value : "")}
      className={className}
      styles={customStyles}
      isSearchable
      error={error}
      theme={theme => ({
        ...theme,
        borderRadius: 8,
        colors: {
          ...theme.colors,
          primary: '#2563eb',
          primary25: '#dbeafe',
          danger: '#ef4444',
          neutral20: error ? '#ef4444' : '#d1d5db',
        },
      })}
    />
  );
};

export default Select2;
