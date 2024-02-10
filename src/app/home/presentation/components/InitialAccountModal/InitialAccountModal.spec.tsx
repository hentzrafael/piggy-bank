/**
* @jest-environment jsdom
*/
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InitialAccountModal from "./InitialAccountModal";

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue(
        {
            push: jest.fn(),
            query: { username: "long-uuid" },
        }),
}));

describe("Testing InitialAccountModal component", () => {
    it("should have two inputs of type number", () => {
        render(<InitialAccountModal />);
        const savingsInput = screen.getByPlaceholderText("Savings Account");
        const checkingsInput = screen.getByPlaceholderText("Checkings Account");
        expect(savingsInput).toHaveAttribute("type", "number");
        expect(checkingsInput).toHaveAttribute("type", "number");
    });
});