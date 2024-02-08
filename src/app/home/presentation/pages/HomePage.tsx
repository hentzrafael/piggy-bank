import '@/core/styles/globals.css';
import { Account } from '../../domain/account';

  export default function HomePage({data,username}:{data:Account[],username:string}) {
    const accounts: Account[] = data;
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
        <hr className='w-full' />
        <div className="grid grid-cols-2 gap-4 p-4">
          {accounts.map((account, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2 text-blue-500">{account.name} Account</h2>
              <p className="text-gray-700 font-bold">Balance: ${account.balance}</p>
              <div className='grid grid-cols-2 gap-3'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Deposit</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Withdraw</button>
              </div>
            </div>
          ))}
        </div>
        <div>
        </div>
      </div>
    );
  }
  