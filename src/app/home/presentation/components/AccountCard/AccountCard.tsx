import { depositInAccount, withdrawFromAccount } from "@/app/home/application/home.service";
import { Account } from "@/app/home/domain/account";
import { useRouter } from "next/router";
import { useState } from "react";
import { NumberInputModal } from "../NumberInputModal/NumberInputModal";



export function AccountCard(props: Account) {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"inc"|"dec">("inc");

  const handleModalClose = (value: number) => {
    setModalIsOpen(false);
  };

  return (
    <div key={props.id} className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-2 text-blue-500">{props.name} Account</h2>
      <p className="text-gray-700 font-bold">Balance: ${props.balance}</p>
      <div className='grid grid-cols-2 gap-3'>
        <button
          onClick={async () => {
            setModalType("inc");
            setModalIsOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Deposit</button>
        <button
          onClick={async () => {
            setModalType("dec");
            setModalIsOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">Withdraw</button>
          {modalIsOpen && <NumberInputModal onClose={handleModalClose} type={modalType} account={props.id}/>}
      </div>
    </div>
  );

};
