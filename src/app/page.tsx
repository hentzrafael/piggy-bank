interface Account {
  type: string;
  balance: number;
}
export default function Home() {
  const accounts: Account[] = [
    { type: 'Checking', balance: 1000 },
    { type: 'Savings', balance: 5000 }
];
  return (
    <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">User's Account Listing</h1>
            <div className="grid grid-cols-2 gap-4">
                {accounts.map((account, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-bold mb-2 text-blue-500">{account.type} Account</h2>
                        <p className="text-gray-700">Balance: ${account.balance}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Deposit</button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Withdraw</button>
                    </div>
                ))}
            </div>
            <div>
            </div>
        </div>
  );
}
