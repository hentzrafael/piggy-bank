import { fetchAllAcounts, transferBetweenAccounts } from "@/app/home/application/home.service";
import { Account } from "@/app/home/domain/account";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    }, []);

    const handleInputChange = (e: any) => {
        setValue(parseFloat(e.target.value));
    };

    const handleModalClose = async () => {
        console.log(origin, destination, value);
        if (value) {
            if (origin === destination) {
                alert('Origin and destination must be different');
            } else {
                await transferBetweenAccounts(origin, destination, value);
                router.reload()
            }
        }
        onClose(value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h1 className="text-lg font-bold mb-4 text-black">Enter the amount to transfer</h1>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 rounded-lg p-2 mb-4"
                    style={{ color: 'black' }}
                />
                <h1 className="text-lg font-bold mb-4 text-black">Enter the origin account</h1>
                <select className="w-full border-gray-300 rounded-lg p-2 mb-4 text-black" value={origin} onChange={(e) => setOrigin(e.target.value)}>
                    {options.map((option, index) => (
                        <option key={index} value={option.id} onClick={() => setOrigin(option.id)}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <h1 className="text-lg font-bold mb-4 text-black">Enter the destination account</h1>
                <select className="w-full border-gray-300 rounded-lg p-2 mb-4 text-black" value={destination} onChange={(e) => setDestination(e.target.value)}>
                    {options.map((option, index) => (
                        <option key={index} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
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
