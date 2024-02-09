import '@/core/styles/globals.css';
import { Account } from '../../domain/account';
import { AccountCard } from '../components/AccountCard/AccountCard';
import { useState } from 'react';
import { TransferModal } from '../components/TransferModal/TransferModal';
import InitialAccountModal from '../components/InitialAccountModal/InitialAccountModal';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify";


export default function HomePage({ data, username }: { data: Account[], username: string }) {
  const accounts: Account[] = data;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ToastContainer autoClose={1000}/>
      <Image src="/investment.svg" alt="Finance image" width={400} height={300} />
      <hr></hr>
      <h1 className="text-3xl font-bold mb-4 text-secondary mt-5">Welcome, {username}!</h1>
      <p>Here, you can control the balance of your accounts and transfer money between them.</p>
      { accounts.length > 0 && <div className="grid grid-cols-2 gap-4 p-4 w-3/4 h-1/6">
        {accounts.map((account, index) => (
          <AccountCard {...account} key={index} />
        ))}
      </div>}
      {accounts.length > 0  && <button
        className='bg-primary hover:bg-secondary transition-colors text-white font-bold py-2 px-4 rounded'
        onClick={() => setModalIsOpen(true)}>
        Transfer</button>}
      <div>
      </div>
      {accounts.length === 0 && <InitialAccountModal />}
      {modalIsOpen && <TransferModal onClose={() =>  setModalIsOpen(false)} username={username} />}
    </div>
  );
}
