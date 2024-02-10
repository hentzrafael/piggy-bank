/**
* @jest-environment jsdom
*/
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
        query: { username: "teste" },
    }),
  }));

describe("Testing HomePage component", () => {
  it("should have a greeting", () => {
    render(<HomePage data={[]} username={"teste"} />);
    const welcome = document.getElementById("name-text");
    expect(welcome).toHaveTextContent("Welcome, teste!");
  });

  it("should have a transfer button when there are accounts", () => {
    render(<HomePage data={[
      {
        id: "long-uuid",
        balance: 0,
        name: "teste",
        userId: "long-uuid",
      }
    ]} username={"teste"} />);
    const button = document.getElementById("transfer-button");
    expect(button).toBeDefined();
  });

  it("shouldn't have a transfer button when there are accounts", () => {
    render(<HomePage data={[]} username={"teste"} />);
    const button = document.getElementById("transfer-button");
    expect(button).toBeNull();
  });
});