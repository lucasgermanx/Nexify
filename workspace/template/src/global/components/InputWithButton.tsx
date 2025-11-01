import { Button, Form } from 'react-bootstrap';

import styled from 'styled-components';

const FormControl = styled(Form.Control)`
  border-radius: 5px;
  position: relative;
  border: 1px solid #141414;
  background-color:#121319;
  color: white;

  &:focus {
    color: white;
    background-color:#121319;
    border-color: #141414; /* Mantém a mesma cor da borda */
    box-shadow: none; /* Remove a sombra */
  }
`;

function InputWithButton({ buttonText, onClick, placeholder, onChange}:any) {
  return (
    <Form>
      <div className="input-group">
        <FormControl type="text" placeholder={placeholder} onChange={onChange}/>
        <Button style={{backgroundColor:"#FFA500", color:"white", border:"0px", fontSize:"13px"}} onClick={onClick}>{buttonText}</Button>
      </div>
    </Form>
  );
}

export default InputWithButton;
