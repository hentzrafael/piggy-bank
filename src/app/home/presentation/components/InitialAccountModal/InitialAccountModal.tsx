import { createSavingsAndCheckingsAccounts } from '@/app/home/application/home.service';
import { useRouter } from 'next/router';
import { useState } from 'react';

const InitialAccountModal = () => {
  const router = useRouter();
  const { username } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [savingsValue, setSavingsValue] = useState(0);
  const [checkingsValue, setCheckingsValue] = useState(0);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    await createSavingsAndCheckingsAccounts(username as string, 'Savings', savingsValue);
    await createSavingsAndCheckingsAccounts(username as string, 'Checkings', checkingsValue);
    router.reload();
    closeModal();
  };

  return (
    <div>
       <button onClick={openModal}>Open Modal</button>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Enter Savings and Checking Account Balances
                    </h3>
                    <div className="mt-2">
                      <input 
                      type="text" 
                      placeholder="Savings Account" 
                      className="mt-1 p-2 border rounded-md" 
                      style={{color: 'black'}}
                      onChange={(e) => setSavingsValue(Number(e.target.value))}
                      value={savingsValue}
                      />
                      <input 
                      type="text" 
                      placeholder="Checkings Account" 
                      style={{color: 'black'}}
                      className="mt-1 p-2 border rounded-md" 
                      onChange={(e) => setCheckingsValue(Number(e.target.value))}
                      value={checkingsValue}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={handleSave} className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Save
                </button>
                <button onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitialAccountModal;