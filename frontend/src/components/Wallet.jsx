import React from 'react'

function Wallet(props) {
    const {wallet}=props
  return (
    <div className="my-wallet shadow-lg shadow-gray-400 rounded-lg p-4">
          <h2 className="text-green-500 font-semibold">My Wallet</h2>
          <p className="wallet-balance">Current balance: {wallet.balance}</p>
          <p>Bank account:{wallet.accountNumber}</p>
          <div className="flex justify-between ">
            <button className="bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[80px]">
              Deposit
            </button>
            <button className="bg-pink-600 text-white rounded-lg shadow-md shadow-black p-0 hover:bg-pink-700 w-[80px]">
              Withdraw
            </button>
          </div>
        </div>
  )
}

export default Wallet