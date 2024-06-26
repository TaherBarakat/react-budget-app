import { Modal, Button, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetsContext";
import { currencyFormatter } from "./utils";
export default function ViewExpensesModal({ handleClose, budgetId }) {
     const { getBudgetExpenses, budgets, deleteBudget, deleteExpenses } =
          useBudgets();
     const expenses = getBudgetExpenses(budgetId);
     const budget =
          UNCATEGORIZED_BUDGET_ID === budgetId
               ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
               : budgets.find((budget) => budget.id === budgetId);

     return (
          <Modal show={budgetId != null} onHide={handleClose}>
               <>
                    <Modal.Header closeButton>
                         <Stack direction="horizontal" gap={2}>
                              <div> Expenses - {budget?.name} </div>
                              {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                   <Button
                                        variant="outline-danger"
                                        onClick={() => {
                                             // console.log(budgetId);
                                             deleteBudget(budgetId);
                                             // handleClose();
                                        }}
                                   >
                                        Delete
                                   </Button>
                              )}
                         </Stack>
                    </Modal.Header>
                    <Modal.Body>
                         <Stack direction="vertical" gap={3}>
                              {expenses.map((expense) => (
                                   <Stack
                                        direction="horizontal"
                                        key={expense.id}
                                        gap={2}
                                   >
                                        <div className="me-auto fs-4 ">
                                             {expense.description}
                                        </div>
                                        <div className=" fs-5 ">
                                             {currencyFormatter.format(
                                                  expense.amount
                                             )}
                                        </div>
                                        <Button
                                             onClick={() =>
                                                  deleteExpenses(expense.id)
                                             }
                                             size="sm"
                                             variant="outline-danger"
                                        >
                                             &times;
                                        </Button>
                                   </Stack>
                              ))}
                         </Stack>
                    </Modal.Body>
               </>
          </Modal>
     );
}
