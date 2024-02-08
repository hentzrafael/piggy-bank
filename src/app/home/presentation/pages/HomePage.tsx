import '@/core/styles/globals.css';
import { Account } from '../../domain/account';
import { AccountCard } from '../components/AccountCard/AccountCard';
import { useState } from 'react';
import { TransferModal } from '../components/TransferModal/TransferModal';
import InitialAccountModal from '../components/InitialAccountModal/InitialAccountModal';

export default function HomePage({ data, username }: { data: Account[], username: string }) {
  const accounts: Account[] = data;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>
      <div className="grid grid-cols-2 gap-4 p-4">
        {accounts.map((account, index) => (
          <AccountCard {...account} key={index} />
        ))}
      </div>
      {accounts.length > 0  && <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
        onClick={() => setModalIsOpen(true)}>
        Transfer</button>}
      <div>
      </div>
      {accounts.length === 0 && <InitialAccountModal />}
      {modalIsOpen && <TransferModal onClose={() =>  setModalIsOpen(false)} username={username} />}
    </div>
  );
}
