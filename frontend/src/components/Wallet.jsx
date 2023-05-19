import { useState } from "react";
import { useDeposit } from "../hooks/useDeposit";
import { useWithdraw } from "../hooks/useWithdraw";

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
    <div className="my-wallet shadow-2xl rounded-lg p-4 h-40">
    <h2 className="text-green-500 font-semibold">My Wallet</h2>
    <p className="wallet-balance">Current balance {wallet.balance} ETB</p>
    <p>Total Rotated {wallet.totalRotated} ETB</p>
    <p>Bank account {wallet.accountNumber}</p>
    <div className="flex justify-between mt-4">
      <button
        className="bg-green-500 text-white rounded-lg shadow-md p-2 hover:bg-green-700 w-24"
        onClick={handleOpenDepositModal}
      >
        Deposit
      </button>
      <button
        className="bg-pink-600 text-white rounded-lg shadow-md p-2 hover:bg-pink-700 w-24"
        onClick={handleOpenWithdrawModal}
      >
        Withdraw
      </button>
    </div>
    {showDepositModal && (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white w-72 rounded-lg shadow-lg p-4">
          <h2 className="text-2xl mb-4">Deposit Amount</h2>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter amount"
          />
          <div className="flex justify-end">
            <button
              className="bg-green-500 text-white rounded-lg shadow-md p-2 hover:bg-green-700 mr-2"
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
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white w-72 rounded-lg shadow-lg p-4">
          <h2 className="text-2xl mb-4">Withdraw Amount</h2>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter amount"
          />
          <div className="flex justify-end">
            <button
              className="bg-pink-600 text-white rounded-lg shadow-md p-2 hover:bg-pink-700 mr-2"
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
