import { Button, Table } from "react-bootstrap";

import styled from "styled-components";

export const StyledTable = styled(Table)`
  border: none;
  th,
  td {
    border: none;
    font-size: 13px;
    padding: 10px;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.6;
  }
  th {
    font-size: 12px;
    background-color: #f2f2f2;
    font-weight: 600;
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