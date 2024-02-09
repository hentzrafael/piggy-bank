import { depositInAccount, withdrawFromAccount } from "@/app/home/application/home.service";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export function NumberInputModal({ onClose, type, account }: { onClose: (value: number) => void, type: "inc" | "dec", account: string }) {
    const router = useRouter();
    const [value, setValue] = useState(0);

    const handleInputChange = (e: any) => {
        setValue(parseFloat(e.target.value));
    };

    const handleModalClose = async () => {
        let status;
        let toastMessage = "Success";
        if (value) {
            if (type === "inc") {
                const { statusCode, message } = await depositInAccount(account, value);
                status = statusCode;
                toastMessage = message;
            } else if (type === "dec") {
                const { statusCode, message } = await withdrawFromAccount(account, value);
                status = statusCode;
                toastMessage = message;
            }
            if (status == 200) {
                toast.success(toastMessage);
            } else {
                toast.error(toastMessage);
            }
            setTimeout(() => {
                router.reload()
            }, 1000);
        } else {
            toast.info('Value must be greater than 0');
        }

        
        onClose(value);
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <h1 className="text-lg font-bold mb-4 text-black">Value:</h1>
                    <input
                        type="number"
                        value={value}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-lg p-2 mb-4"
                        style={{ color: 'black' }}
                    />
                    <hr />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => onClose(0)}
                            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500">
                            Cancel
                        </button>
                        <button
                            onClick={handleModalClose}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
