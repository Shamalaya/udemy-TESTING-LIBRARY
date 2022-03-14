import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  //make sure total starts out $0.00

  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update scoop subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  //make sure total starts out $0.00

  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  // add cherries topping
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  // add m&ms topping

  const mmsinput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.click(mmsinput);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  //remove cherries topping

  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

test("update Grandtotal", async () => {
  render(<Options optionType="toppings" />);

  //make sure total starts out $0.00

  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  // add cherries topping
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  // add m&ms topping

  const mmsinput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.click(mmsinput);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  //remove cherries topping and check subtotal

  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("0.00");
  });
});
