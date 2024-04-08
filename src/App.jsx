import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./BudgetCard";
import AddBudgetModal from "./AddBudgetModal";
import { useState } from "react";
import { useBudgets } from "./context/BudgetsContext";
import AddExpenseModal from "./AddExpenseModal";
function App() {
     const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
     const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
     const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
     const { budgets, getBudgetExpenses } = useBudgets();
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
                                             console.log("op");
                                             openAddExpenseModal(budget.id);
                                        }}
                                   ></BudgetCard>
                              );
                         })}
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
          </>
     );
}

export default App;
