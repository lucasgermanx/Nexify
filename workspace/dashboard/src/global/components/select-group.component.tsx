import { Form } from "react-bootstrap";
import styled from "styled-components";

const SelectControl = styled.select`
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #121212;
  color: #e2e8f0;
  box-shadow: none !important;
  transition: all 0.3s ease;

  &:focus {
    border: 1px solid #ff8c00 !important;
    background-color: #121212 !important;
    box-shadow: 0 0 0 0.2rem rgba(255, 140, 0, 0.25) !important;
    outline: none;
    color: #e2e8f0 !important;
  }

  option {
    background-color: #121212;
    color: #e2e8f0;
  }
`;

const LabelInput = styled.label`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-bottom: 8px;
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
