import { Form } from 'react-bootstrap';


function InputSearchComponent(props:any) {
  return (
      <div className="input-group">
        <Form.Control type="text" placeholder={props.placeholder} {...props.useForm} style={{backgroundColor:"transparent", color:"#888b98", borderRadius:"50px", border:"1px solid #c1c1c1",}}/>
        {/* <Button style={{backgroundColor:"transparent", border:"0px"}} onClick={onClick}>{buttonText}</Button> */}
      </div>
  );
}

export default InputSearchComponent;
