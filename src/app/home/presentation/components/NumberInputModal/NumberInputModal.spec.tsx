/**
* @jest-environment jsdom
*/
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import { NumberInputModal } from "./NumberInputModal";

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

describe("Testing NumberInputModal component", () => {
  it("should have an input of type number", () => {
    render(<NumberInputModal onClose={() => {}} type="inc" account="long-uuid"/>);
    const balance = document.getElementById("input-balance");
    expect(balance).toHaveStyle("color: black;");
    expect(balance).toHaveAttribute("type", "number");
  });
});