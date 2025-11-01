import { Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import styled from 'styled-components';

const FormControl = styled(InputMask)`
  border-radius: 5px;
  position: relative;
  border: 1px solid #141414;
  background-color:#303030;
`;

const LabelInput = styled.label`
  font-size: 14px;
`;

const InputGroupComponent = (props: any) => {
  return (
    <Form.Group>
      <LabelInput>{props.label}</LabelInput>
      <FormControl
        className='form-control'
        mask={props.mask}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
        {...props.useForm}
      />
    </Form.Group>
  );
};

export default InputGroupComponent;
