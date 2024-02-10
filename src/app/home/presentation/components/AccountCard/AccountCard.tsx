import { Account } from "@/app/home/domain/account";
import { useState } from "react";
import { NumberInputModal } from "../NumberInputModal/NumberInputModal";


export function AccountCard(props: Account) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"inc"|"dec">("inc");
  const balanceColor = props.balance < 0 ? "text-red-600" : "text-green-600";
  const handleModalClose = (value: number) => {
    setModalIsOpen(false);
  };

  return (
    <div key={props.id} className="bg-white rounded-lg shadow-lg p-4 flex-col ">
      <h2 className="text-xl font-bold mb-2 text-primary text-center" id="name-text">{props.name} Account</h2>
      <hr />
      <p className={`text-lg font-bold p-4 text-center ${balanceColor}`} id="balance-text">Balance: ${props.balance}</p>
      <div className="flex justify-center p-4"/>
      <div className='grid grid-cols-2 gap-3'>
        <button
          onClick={async () => {
            setModalType("inc");
            setModalIsOpen(true);
          }}
          className="bg-primary hover:bg-secondary transition-colors text-white font-bold py-2 px-4 rounded mt-4">Deposit</button>
        <button
          onClick={async () => {
            setModalType("dec");
            setModalIsOpen(true);
          }}
          className="bg-primary hover:bg-secondary transition-colors text-white font-bold py-2 px-4 rounded mt-4">
            Withdraw</button>
          {modalIsOpen && <NumberInputModal onClose={handleModalClose} type={modalType} account={props.id}/>}
      </div>
    </div>
  );

};
