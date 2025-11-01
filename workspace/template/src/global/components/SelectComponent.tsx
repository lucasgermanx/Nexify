import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledSelect = styled(Form.Select)`
  font-size: 16px;
  padding: 10px;
  background-color: #1A1B21 !important;
  color:white;
  border: none;
  border-radius: 20px;
  margin-top: 5%;
  font-size: 13px;
`;


const SelectComponent = ({ options, onChange }:any) => {
  return (
    <StyledSelect onChange={onChange} defaultValue={options.length > 0 ? options[0].value : ""}>
      {options.map((option:any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectComponent;
