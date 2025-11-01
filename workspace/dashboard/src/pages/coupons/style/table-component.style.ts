import { Button, Table } from "react-bootstrap";

import styled from "styled-components";

export const StyledTable = styled(Table)`
  border: none;
  color: rgba(255, 255, 255, 0.8);
  
  th,
  td {
    border: none;
    font-size: 13px;
    padding: 10px;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
  th {
    font-size: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  tbody tr {
    background-color: transparent;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }
  }
  .checkbox-cell {
    width: 50px;
  }
  .toggle-cell,
  .edit-cell,
  .delete-cell {
    width: 100px;
  }
`;

export const StyledButton = styled(Button)`
  margin-right: 5px;
  border-style: none;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 500;
  outline: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  border-radius:20px;
`;