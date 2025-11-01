import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
`;

const TableData = styled.td`
  padding: 10px;
  border-top: 1px solid #dee2e6;
`;

const TableCart = () => {
  return (
    <TableContainer>
      <StyledTable className="table">
        <thead>
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Idade</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableData>João</TableData>
            <TableData>joao@example.com</TableData>
            <TableData>25</TableData>
          </tr>
          <tr>
            <TableData>Maria</TableData>
            <TableData>maria@example.com</TableData>
            <TableData>30</TableData>
          </tr>
          <tr>
            <TableData>Carlos</TableData>
            <TableData>carlos@example.com</TableData>
            <TableData>22</TableData>
          </tr>
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default TableCart;
