import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBudgets } from "./context/BudgetsContext";
import { UNCATEGORIZED_BUDGET_ID } from "./context/BudgetsContext";
export default function AddBudgetModal({ handleClose, show, defaultBudgetId }) {
     const { addExpenses, budgets } = useBudgets();
     function handleSubmit(event) {
          event.preventDefault();
          addExpenses({
               description: descriptionRef.current.value,
               amount: parseFloat(amountRef.current.value),
               budgetId: budgetIdRef.current.value,
          });
          handleClose();
     }
     const descriptionRef = useRef();
     const amountRef = useRef();
     const budgetIdRef = useRef();
     return (
          <Modal show={show} onHide={handleClose}>
               <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                         <Modal.Title>New Expense</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form.Group className="mb-3" controlId="description">
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                   ref={descriptionRef}
                                   type="text"
                                   required
                              ></Form.Control>
                         </Form.Group>
                         <Form.Group className="mb-3" controlId="amount">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                   ref={amountRef}
                                   type="number"
                                   required
                                   min={0}
                                   step={0.01}
                              ></Form.Control>
                         </Form.Group>
                         <Form.Group className="mb-3" controlId="budgetId">
                              <Form.Label>Budget</Form.Label>
                              <Form.Select
                                   defaultValue={defaultBudgetId}
                                   ref={budgetIdRef}
                              >
                                   <option id={UNCATEGORIZED_BUDGET_ID}>
                                        Uncategorized
                                   </option>
                                   {budgets.map((budget) => (
                                        <option
                                             key={budget.id}
                                             value={budget.id}
                                        >
                                             {budget.name}
                                        </option>
                                   ))}
                              </Form.Select>
                         </Form.Group>
                         <div className="d-flex justify-content-end ">
                              <Button variant="primary" type="submit">
                                   Add
                              </Button>
                         </div>
                    </Modal.Body>
               </Form>
          </Modal>
     );
}
