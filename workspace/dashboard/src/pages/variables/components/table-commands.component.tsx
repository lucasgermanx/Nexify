import { useEffect, useState } from 'react';

import { StyledTable } from '@/pages/coupons/style/table-component.style';

const TableCommandsComponent = ({ commands }:any) => {
  const [showCommands, setShowCommands] = useState<any>()

  useEffect(() => {
    setShowCommands(JSON.parse(commands))
}, [commands]);

    return (
        <StyledTable>
        <thead>
          <tr>
            <th>Comando</th>
            <th>Argumento </th>
            <th>Status</th>
          </tr>
        </thead>  
        <tbody>
          {showCommands?.map((item: any) => (
            <>
              <tr key={item.command}>
                <td>{item.command}</td>
                <td>{item.command_value}</td>    
                <td>{item.status_payment}</td>                             
              </tr>
            </>
          ))}
        </tbody>
      </StyledTable>
    );
};

export default TableCommandsComponent;
