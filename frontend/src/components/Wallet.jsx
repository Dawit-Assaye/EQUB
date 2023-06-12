import { useState } from "react";
import { useDeposit } from "../hooks/useDeposit";
import { useWithdraw } from "../hooks/useWithdraw";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns,faMoneyBillTransfer,faSackDollar, faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

function Wallet(props) {
  const { wallet } = props;
  const { deposit } = useDeposit();
  const { withdraw } = useWithdraw();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleOpenDepositModal = () => {
    setShowDepositModal(true);
  };

  const handleOpenWithdrawModal = () => {
    setShowWithdrawModal(true);
  };

  const handleDeposit = async () => {
    // Handle deposit logic here
    await deposit(
      depositAmount,
      wallet.accountNumber,
      wallet._id,
    );
    console.log(`Deposit amount: ${depositAmount}`);
    // Reset the deposit amount and close the modal
    setDepositAmount("");
    setShowDepositModal(false);
  };

  const handleWithdraw = async () => {
    // Handle withdrawal logic here
    await withdraw(
      withdrawAmount,
      wallet.accountNumber,
      wallet._id,
    );
    console.log(`Withdrawal amount: ${withdrawAmount}`);
    // Reset the withdrawal amount and close the modal
    setWithdrawAmount("");
    setShowWithdrawModal(false);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
  };

  return (
    <div className="my-wallet shadow-2xl rounded-lg p-4 h-[180px] w-[260px]">
  <h2 className="text-fuchsia-800 font-semibold">My Wallet</h2>
  <p className="wallet-balance">
  <FontAwesomeIcon icon={faSackDollar} className="mr-2 text-fuchsia-700" />
    Current balance: {wallet.balance} ETB
  </p>
  <p className="text-gray-600">
  <FontAwesomeIcon icon={faMoneyBillTransfer} className="mr-2 text-fuchsia-700" />
    Total Rotated: {wallet.totalRotated} ETB
  </p>
  <p className="text-gray-600">
  <FontAwesomeIcon icon={faBuildingColumns} className="mr-2 text-fuchsia-700" />
    Bank account: {wallet.accountNumber}
  </p>
  <div className="flex justify-between mt-4">
    <button
      className="bg-lime-500 text-white text-sm p-2 rounded-lg shadow-md hover:bg-lime-700 w-24"
      onClick={handleOpenDepositModal}
    >
      <FontAwesomeIcon icon={faArrowAltCircleUp} className="mr-2" />
      Deposit
    </button>
    <button
      className="bg-fuchsia-800 text-white rounded-lg shadow-md text-sm hover:bg-fuchsia-950 w-24"
      onClick={handleOpenWithdrawModal}
    >
      <FontAwesomeIcon icon={faArrowAltCircleDown} className="mr-2" />
      Withdraw
    </button>
  </div>

    {showDepositModal && (
        <div className="inset-0 flex items-center justify-center fixed z-10">
          <div className="fixed inset-0 bg-black opacity-25"></div>
        <div className="modal-content bg-white w-72 rounded-lg shadow-lg p-4 relative z-20">
          <h2 className="absolute top-2 left-[-20px] bg-lime-500 text-white skew-x-12 shadow-xl">Deposit</h2>
          <h2 className="text-2xl mb-4 mt-4">Deposit Amount</h2>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter amount"
          />
          <div className="flex justify-end">
            <button
              className="bg-lime-500 text-white rounded-lg shadow-md p-2 hover:bg-lime-700 mr-2"
              onClick={handleDeposit}
            >
              Deposit
            </button>
            <button
              className="bg-gray-300 text-gray-700 rounded-lg shadow-md p-2 hover:bg-gray-400"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    {showWithdrawModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="modal-content bg-white w-72 rounded-lg shadow-lg p-4 relativez-20">
          <h2 className="absolute top-2 left-[-20px] bg-fuchsia-700 text-white skew-x-12 shadow-xl">Withdraw</h2>
          <h2 className="text-2xl mb-4 mt-4">Withdraw Amount</h2>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter amount"
          />
          <div className="flex justify-end">
            <button
              className="bg-fuchsia-800 text-white rounded-lg shadow-md p-2 hover:bg-fuchsia-950 mr-2"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
            <button
              className="bg-gray-300 text-gray-700 rounded-lg shadow-md p-2 hover:bg-gray-400"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default Wallet;
