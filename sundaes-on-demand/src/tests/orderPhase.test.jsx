import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("order phases for happy path", async () => {
  render(<App />);
  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "1");

  const mmsinput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.click(mmsinput);

  //find and click order button
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderButton);

  //check summary information based on order

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();
  //check summary option items

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("1 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("M&Ms")).toBeInTheDocument();

  //accept terms and conditions and click button to confirm order
  const termsAndConditions = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsAndConditions);

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmButton);

  //confirm order number on confirmation page

  const thankYou = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYou).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  //check that scoops and toppings subtotals have been reset

  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();

  //wait for items to appear to not get Testing Library warnings
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
