import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const GetId = ({ setSenderId }) => {
  const [inputId, setInputId] = useState("");
  return (
    <div className="getid-container">
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Input your id</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setInputId(e.target.value)}
              value={inputId}
            />
          </Form.Group>

          <Button variant="primary" onClick={() => setSenderId(inputId)}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default GetId;
