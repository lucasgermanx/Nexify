import { Form } from "react-bootstrap";

import InputMask from "react-input-mask";
import styled from "styled-components";

const FormControl = styled(InputMask)`
  border-radius: 5px;
  position: relative;
  border: 1px solid #e8e8e8;
  box-shadow: none !important;
  &:focus {
    border: 1px solid #303030 !important;
  }
  &:active {
    border: 1px solid #303030 !important;
  }

  &::placeholder {
    font-size: 0.8em; /* Defina o tamanho da fonte do placeholder aqui */
  }
`;

const LabelInput = styled.label`
  font-size: 14px;
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
