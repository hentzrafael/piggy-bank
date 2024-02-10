/**
* @jest-environment jsdom
*/
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { AccountCard } from "./AccountCard";

describe("Testing AccountCard component", () => {
  it("should render balance with correct value", () => {
    render(<AccountCard id={"long-uuid"} balance={15} name={"Savings"} userId={"long-uuid"} />);
    const balance = document.getElementById("balance-text");
    expect(balance).toHaveTextContent("Balance: $15");
  });
  
  it("should render name with correct value", () => {
    render(<AccountCard id={"long-uuid"} balance={15} name={"Savings"} userId={"long-uuid"} />);
    const name = document.getElementById("name-text");
    expect(name).toHaveTextContent("Savings Account");
  })
});