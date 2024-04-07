import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./BudgetCard";
function App() {
     return (
          <>
               <Container>
                    <Stack direction="horizontal" gap="2" className="mb-4">
                         <h1 className="me-auto">Budget</h1>
                         <Button variant="primary">Add Budget</Button>
                         <Button variant="outline-primary">Add Expanse</Button>
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
                         <BudgetCard
                              gray
                              name={"interr"}
                              max={1000}
                              amount={11100}
                         ></BudgetCard>
                    </div>
               </Container>
          </>
     );
}

export default App;
