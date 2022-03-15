import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        // TODO: handle error here
      });
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();

    // send back to order page
    setOrderPhase("inProgress");
  }

  return (
    <Container>
      {orderNumber === null ? (
        "Loading"
      ) : (
        <Col style={{ textAlign: "center" }}>
          <h1>Thank you!</h1>
          <h2>Your order number is {orderNumber}</h2>
          <p>as per our terms and conditions, nothing will happen now </p>
          <Button onClick={() => handleClick()}>Create new order</Button>
        </Col>
      )}
    </Container>
  );
}
