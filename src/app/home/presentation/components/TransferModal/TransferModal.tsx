import { fetchAllAcounts, transferBetweenAccounts } from "@/app/home/application/home.service";
import { Account } from "@/app/home/domain/account";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function TransferModal({ onClose, username }: { onClose: (value: number) => void, username: string }) {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [options, setOptions] = useState<Account[]>([]);

    useEffect(() => {
        const loadOptions = async () => {
            const { accounts } = await fetchAllAcounts(username);
            setOptions(accounts);
            setOrigin(accounts[0].id);
            setDestination(accounts[1].id);
        };
        loadOptions();
    });

    const handleInputChange = (e: any) => {
        setValue(parseFloat(e.target.value));
    };

    const handleModalClose = async () => {
        if (value) {
            if (origin === destination) {
                toast.info('Origin and destination must be different');
            } else {
                const { statusCode, message } = await transferBetweenAccounts(origin, destination, value);
                if (statusCode === 200) {
                    toast.success(message);
                } else {
                    toast.error(message);
                }
                setTimeout(() => {
                    router.reload()
                }, 1000)
            }
        }else{
            toast.info('Amount must be greater than 0');
        }
        onClose(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-15">
            <div className="bg-white p-8 rounded-lg">
                <h1 className="text-lg font-bold mb-4 text-black">Amount to transfer:</h1>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-lg p-2 mb-4"
                    style={{ color: 'black' }}
                />
                <h1 className="text-lg font-bold mb-4 text-black">Origin:</h1>
                <select className="w-full border-gray-300 rounded-lg p-2 mb-4 text-black" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                    {options.map((option, index) => (
                        <option key={index} value={option.id} onClick={() => setOrigin(option.id)}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <h1 className="text-lg font-bold mb-4 text-black">Destination:</h1>
                <select className="w-full border-gray-300 rounded-lg p-2 mb-4 text-black" value={destination} onChange={(e) => setDestination(e.target.value)}>
                    {options.map((option, index) => (
                        <option key={index} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
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
    );
}
