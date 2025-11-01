import { Form } from "react-bootstrap";
import styled from "styled-components";

const SelectControl = styled.select`
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  box-shadow: none !important;

`;

const LabelInput = styled.label`
  font-size: 14px;
`;

const SelectGroup = ({ label, disabled, useForm, options, onChange, defaultValue }: any) => {
  return (
    <Form.Group>
      {label && <LabelInput>{label}</LabelInput>}
      <SelectControl
        className="form-control"
        value={defaultValue}
        disabled={disabled}
        onChange={onChange}
        {...useForm}
      >
        {options &&
          options?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </SelectControl>
    </Form.Group>
  );
};

export default SelectGroup;
