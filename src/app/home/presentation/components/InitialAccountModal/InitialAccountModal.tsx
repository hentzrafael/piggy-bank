import { createSavingsAndCheckingsAccounts } from '@/app/home/application/home.service';
import { useRouter } from 'next/router';
import { useState } from 'react';

const InitialAccountModal = () => {
  const router = useRouter();
  const { username } = router.query;
  const [showModal, setShowModal] = useState(true);
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-15">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h4 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Savings Balance
                    </h4>
                    <div className="mt-2 flex-col ">
                      <input 
                      type="number" 
                      placeholder="Savings Account" 
                      className="mt-1 p-2 border rounded-md mb-4" 
                      style={{color: 'black'}}
                      onChange={(e) => setSavingsValue(Number(e.target.value))}
                      value={savingsValue}
                      />
                      <hr />
                      <h4 className='text-lg leading-6 font-medium text-gray-900 mt-4'>Checkings Balance:</h4>
                      <input 
                      type="number" 
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
              <hr />
              <div className="sm:p-4 flex align-center">
                <button onClick={handleSave} className="w-full p-4 justify-center rounded-md border border-transparent bg-primary  text-white hover:bg-secondary ">
                  Save
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