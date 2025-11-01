import { Form } from "react-bootstrap";

import InputMask from "react-input-mask";
import styled from "styled-components";

const FormControl = styled(InputMask)`
  border-radius: 8px;
  position: relative;
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
  }
  
  &:active {
    border: 1px solid #ff8c00 !important;
  }

  &::placeholder {
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.3) !important;
  }
`;

const LabelInput = styled.label`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-bottom: 8px;
`;

const FormGroup = (props: any) => {
  return (
    <Form.Group>
      <LabelInput>{props.label}</LabelInput>
      <FormControl
        className="form-control mt-1"
        mask={props.mask}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        {...props.useForm}
      />
    </Form.Group>
  );
};

export default FormGroup;
