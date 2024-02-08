import { depositInAccount, withdrawFromAccount } from "@/app/home/application/home.service";
import { useRouter } from "next/router";
import { useState } from "react";

export function NumberInputModal({ onClose, type, account }: { onClose: (value: number) => void, type: "inc" | "dec", account: string }) {
    const router = useRouter();
    const [value, setValue] = useState(0);

    const handleInputChange = (e: any) => {
        setValue(parseFloat(e.target.value));
    };

    const handleModalClose = async () => {
        if (value) {
            if (type === "inc") {
                await depositInAccount(account, value);
            } else if (type === "dec") {
                await withdrawFromAccount(account, value);
            }
            
        }
        router.reload();
        onClose(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h1 className="text-lg font-bold mb-4 text-black">Enter a Number</h1>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-lg p-2 mb-4"
                    style={{ color: 'black' }}
                />
                <button
                    onClick={() => onClose(0)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Cancel
                </button>
                <button
                    onClick={handleModalClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    OK
                </button>
            </div>
        </div>
    );
}
