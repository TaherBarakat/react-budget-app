import { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBudgets } from "./context/BudgetsContext";
export default function AddBudgetModal({ handleClose, show }) {
     const { addBudget } = useBudgets();
     function handleSubmit(event) {
          event.preventDefault();
          addBudget({
               name: name.current.value,
               max: parseFloat(max.current.value),
          });
          handleClose();
     }
     const name = useRef();
     const max = useRef();
     return (
          <Modal show={show} onHide={handleClose}>
               <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                         <Modal.Title>New Budget</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form.Group className="mb-3" controlId="name">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                   ref={name}
                                   type="text"
                                   required
                              ></Form.Control>
                         </Form.Group>
                         <Form.Group className="mb-3" controlId="name">
                              <Form.Label>Max Spending</Form.Label>
                              <Form.Control
                                   ref={max}
                                   type="number"
                                   required
                                   min={0}
                                   step={0.01}
                              ></Form.Control>
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
