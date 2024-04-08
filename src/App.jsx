import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./BudgetCard";
import AddBudgetModal from "./AddBudgetModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetsContext";
import AddExpenseModal from "./AddExpenseModal";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import ViewExpensesModal from "./ViewExpensesModal";
function App() {
     const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
     const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
     const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
          useState();
     const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
     const { budgets, expenses, getBudgetExpenses } = useBudgets();
     function openAddExpenseModal(budgetId) {
          setShowAddExpenseModal(true);
          setAddExpenseModalBudgetId(budgetId);
     }

     return (
          <>
               <Container>
                    <Stack direction="horizontal" gap="2" className="mb-4">
                         <h1 className="me-auto">Budget</h1>
                         <Button
                              variant="primary"
                              onClick={() => setShowAddBudgetModal(true)}
                         >
                              Add Budget
                         </Button>
                         <Button
                              variant="outline-primary"
                              onClick={openAddExpenseModal}
                         >
                              Add Expanse
                         </Button>
                    </Stack>
                    {(!budgets || budgets?.length === 0) &&
                         (!expenses || expenses?.length === 0) && (
                              <div className=" mt-5 d-flex  flex-column justify-content-center   pt-10 ">
                                   <p className="mt-5 fs-3">
                                        You don't have any budgets yet!
                                   </p>
                                   <p className=" fs-5">
                                        Click on the
                                        <span className="fw-bolder">
                                             {" "}
                                             Add Budget{" "}
                                        </span>
                                        button to create your first budget.
                                   </p>
                              </div>
                         )}
                    <div
                         style={{
                              display: "grid",
                              gridTemplateColumns:
                                   "repeat(auto-fill, minmax(300px, 1fr))",
                              gap: "1rem",
                              alignItems: "flex-start",
                         }}
                    >
                         {budgets.map((budget) => {
                              const amount = getBudgetExpenses(
                                   budget.id
                              ).reduce(
                                   (total, expense) => total + expense.amount,
                                   0
                              );
                              return (
                                   <BudgetCard
                                        key={budget.id}
                                        name={budget.name}
                                        max={budget.max}
                                        amount={amount}
                                        onAddExpenseClick={() => {
                                             openAddExpenseModal(budget.id);
                                        }}
                                        onViewExpensesClick={() => {
                                             setViewExpensesModalBudgetId(
                                                  budget.id
                                             );
                                        }}
                                   ></BudgetCard>
                              );
                         })}
                         <UncategorizedBudgetCard
                              onAddExpenseClick={openAddExpenseModal}
                              onViewExpensesClick={() => {
                                   setViewExpensesModalBudgetId(
                                        UNCATEGORIZED_BUDGET_ID
                                   );
                              }}
                         />
                         <TotalBudgetCard></TotalBudgetCard>
                    </div>
               </Container>
               <AddBudgetModal
                    show={showAddBudgetModal}
                    handleClose={() => setShowAddBudgetModal(false)}
               />
               <AddExpenseModal
                    defaultBudgetId={addExpenseModalBudgetId}
                    show={showAddExpenseModal}
                    handleClose={() => setShowAddExpenseModal(false)}
               />
               <ViewExpensesModal
                    budgetId={viewExpensesModalBudgetId}
                    handleClose={() => setViewExpensesModalBudgetId()}
               />
          </>
     );
}

export default App;
