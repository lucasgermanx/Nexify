import { StyledButton, StyledTable } from '@/pages/coupons/style/table-component.style';

import { MdOutlineDeleteOutline } from 'react-icons/md';

const VariaveisTable = ({ variablesSelected, onDelete }:any) => {
    return (
        <StyledTable>
        <thead>
          <tr>
            <th>Referência</th>
            <th>Variable</th>
            <th className="delete-cell">Remover</th>
          </tr>
        </thead>
        <tbody>
          {variablesSelected?.map((item: any) => (
            <>
              <tr key={item.variable_reference}>
                <td>{item.variable_reference}</td>
                <td>{item.variable}</td>
                
                <td className="delete-cell">
                  <StyledButton variant="danger" onClick={()=>{onDelete(item?.variable_reference)}}  >
                    <MdOutlineDeleteOutline />
                  </StyledButton>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </StyledTable>
    );
};

export default VariaveisTable;
