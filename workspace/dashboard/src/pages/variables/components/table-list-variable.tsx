import { StyledButton, StyledTable } from "@/pages/coupons/style/table-component.style";
import { MdCreate, MdOutlineDeleteOutline } from "react-icons/md";
import { ModalListCommandsAction, VariableActions } from "../actions/variable.actions";

import { ButtonTransparent } from "@/assets/Style/GlobalStyle";
import FormGroup from "@/global/components/form-group.component";
import { NotFoundList } from "@/global/components/NotFound-List";
import PaginationComponent from "@/global/components/pagination.component";
import { useState } from "react";
import { ModalUpdateVariableActions } from "../actions/variables-update.actions";
import { ModalListCommands } from "./modal-list-commands.component";
import { ModalUpdateVariable } from "./modal-update-variable";

export const TableListVariableComponent = () => {
 const {variables, paginationFilter, register, handlePageChange, ProviderDeleteVariable} = VariableActions()
 const {showModalUpdateAction, closeModalUpdateAction, showModalUpdateVariable,} = ModalUpdateVariableActions();
 const {showModalListCommandsAction, closeModalListCommandsAction, showModalListCommand,} = ModalListCommandsAction()
 const [variableUpdate, setVariableUpdate] = useState()
 const [showCommands, setShowCommands] = useState();

 const handleVariableModal = (variable:any) => {
  setVariableUpdate(variable)
  showModalUpdateAction()
 }

 const handleShowModalListCommand = (commands:any) => {
  setShowCommands(commands)
  showModalListCommandsAction()
 }
 
  return (
    <div>
      <div>
        <div className="w-25 mb-4">
          <FormGroup
            label="Pesquisar uma variável"
            placeholder="Pesquise algumas das suas variáveis"
            className="mt-5"
            useForm={{ ...register("value", { required: true }) }}
          />
        </div>
      </div>
      <StyledTable>
        <thead>
          <tr>
            <th>Referência</th>
            <th>Variável</th>
            <th>Comandos</th>
            <th>Opção</th>
            <th className="edit-cell">Editar</th>
            <th className="delete-cell">Deletar</th>
          </tr>
        </thead>
        <tbody>
          {variables?.map((variables: any) => (
            <>
              <tr key={variables.variable_reference}>
                <td>{variables.variable_reference}</td>
                <td>{variables.variable}</td>
                <td><ButtonTransparent style={{fontSize:"13px"}} onClick={(()=>{handleShowModalListCommand(variables.commands)})}>Clique aqui para ver mais</ButtonTransparent></td>
                <td>{variables.option_name}</td>              
                <td className="edit-cell">
                  <StyledButton variant="success" onClick={()=>{handleVariableModal(variables)}}>
                    <MdCreate />
                  </StyledButton>
                </td>
                <td className="delete-cell">
                  <StyledButton variant="danger" onClick={(()=>{ProviderDeleteVariable(variables.variable_reference)})}>
                    <MdOutlineDeleteOutline />
                  </StyledButton>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </StyledTable>
      
      {variables?.length == 0 || variables == undefined ? (<NotFoundList title="Lamentamos informar que não encontramos nenhuma variável disponível."/>) : ''}

      {variableUpdate ? <>
        <ModalUpdateVariable variable={variableUpdate} showModal={showModalUpdateVariable} handleCloseModal={closeModalUpdateAction}/>
      </> : ''}

      {
        showCommands ? <><ModalListCommands commands={showCommands} showModal={showModalListCommand} handleCloseModal={closeModalListCommandsAction}/></> : ''
      }
      <div className="d-flex justify-content-center">
        <PaginationComponent
          paginationCount={paginationFilter?.paginationCount}
          hasMoreResults={paginationFilter?.hasMoreResults}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </div>

    </div>
  );
};
