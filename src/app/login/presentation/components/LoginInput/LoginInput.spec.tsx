/**
* @jest-environment jsdom
*/
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginInput } from "./LoginInput";

describe("Testing LoginInput component", () => {
  it("should have a correct input type", () => {
    render(<LoginInput type="text" placeholder="test" value="test" onChange={() => {}} />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute("type", "text");
  });

  it("should have a correct placeholder", () => {
    render(<LoginInput type="text" placeholder="test" value="test" onChange={() => {}} />);
    const input = document.querySelector('input');
    expect(input).toHaveAttribute("placeholder", "test");
  })

  it("should have a correct value", () => {
    render(<LoginInput type="text" placeholder="test" value="test" onChange={() => {}} />);
    const input = document.querySelector('input');
    expect(input).toHaveValue("test");
  })
});