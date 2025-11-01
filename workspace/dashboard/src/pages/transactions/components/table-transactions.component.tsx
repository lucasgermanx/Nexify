import { StyledButton, StyledTable } from "@/pages/coupons/style/table-component.style";

import { formatReal } from "@/core/utils/format-to-real.utils";
import FormGroup from "@/global/components/form-group.component";
import { NotFoundList } from "@/global/components/NotFound-List";
import PaginationComponent from "@/global/components/pagination.component";
import { MdCreate } from "react-icons/md";
import { ModalUpdateTransactionAction } from "../actions/modal-update-transaction.action";
import { TransactionsActions } from "../actions/transactions.actions";
import { ModalUpdateTransaction } from "./modal-update-transaction.component";

export const TransactionsListComponent = () => {
  const { transactions, paginationFilter, handlePageChange, register } = TransactionsActions()
  const { showModalTransactionAction, closeModalTransactionAction, showUpdateTransactionModal } = ModalUpdateTransactionAction()
  return (
    <div>
      <div>
        <div className="w-25 mb-4">
          <FormGroup
            label="Pesquisar uma transação"
            placeholder="Pesquise por alguma transação (referência)"
            className="mt-5"
            useForm={{ ...register("value", { required: true }) }}
          />
        </div>
      </div>
        <StyledTable>
          <thead>
            <tr>
              <th>Transação</th>
              <th>Produto</th>
              <th>Comprador</th>
              <th>Preço pago</th>
              <th>Pedido entregue</th>
              <th>Atualização automática </th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction: any) => (
              <>
                <tr key={transaction.transaction_reference}>
                  <td>{transaction.transaction_reference}</td>
                  <td>{transaction.product.product_name}</td>
                  <td>{transaction.buyer}</td>
                  <td>{formatReal(transaction.price_paid)}</td>
                  <td>{transaction.order_delivered ? 'Entregue' : 'Não entregue'}</td>
                  <td>{transaction.automatic_update ? 'Atualização automatica' : "Desativada"}</td>
                  <td className="edit-cell">
                    <StyledButton variant="success" onClick={() => { showModalTransactionAction() }}>
                      <MdCreate />
                    </StyledButton>
                  </td>
                </tr>
                <ModalUpdateTransaction transactions={transaction} showModal={showUpdateTransactionModal} handleCloseModal={() => { closeModalTransactionAction() }} />
              </>
            ))}
          </tbody>
        </StyledTable>

      {transactions?.length == 0 || transactions == undefined ? (<NotFoundList title="Não encontramos nenhuma transação disponível." />) : ''}

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
