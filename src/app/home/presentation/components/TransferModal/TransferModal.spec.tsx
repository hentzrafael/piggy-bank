/**
* @jest-environment jsdom
*/
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TransferModal } from "./TransferModal";
import { act } from "react-dom/test-utils";
import React from "react";

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue(
        {
            push: jest.fn(),
            query: { username: "long-uuid" },
        }),
}));

jest.mock('@/app/home/application/home.service', () => ({
    fetchAllAcounts: jest.fn().mockReturnValue(
        {
            accounts: [
                {
                    id: "long-uuid",
                    name: "Savings",
                    balance: 100
                },
                {
                    id: "long-uuid",
                    name: "Savings",
                    balance: 100
                }
            ]
        }
    )
}));

describe("Testing TransferModal component", () => {
    it("should have input of type number", () => {
        render(<TransferModal
            onClose={() => { }}
            username={"username"} />);
        const savingsInput = screen.getByPlaceholderText("Enter amount");
        expect(savingsInput).toHaveAttribute("type", "number");
    });
});