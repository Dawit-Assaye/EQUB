import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useCreateWallet } from "../hooks/useCreateWallet.js";

//images
import dy from "../photo/dy.jpg";
import equb from "../photo/equb.png";
import joined from "../photo/joined.jpeg";

//components
// import EqubSlides from "../components/subComponents/EqubSlides.js";
import EqubSlider from "../components/EqubSlider.js";
import Wallet from "../components/Wallet.jsx";
import Modal from "../components/Modal.jsx";
import EqubForm from "../components/EqubForm.jsx";
import JoinedEqubs from "../components/JoinedEqubs.jsx";
import PendingEqubs from "../components/PendingEqubs.jsx";

const Home = () => {
  const { user } = useAuthContext();
  const [equbs, setEqubs] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [showCreateWalletModal, setShowCreateWalletModal] = useState(false);
  const [showCreateEqubModal, setShowCreateEqubModal] = useState(false);

  //fetching data from the wallet form
  const [walletFormValues, setWalletFormValues] = useState({
    bankName: "",
    accountNumber: "",
    pinNumber: "",
  });

  const { createWallet, error, message } = useCreateWallet();

  const handleCreateWallet = async (e) => {
    e.preventDefault();
    await createWallet(
      walletFormValues.bankName,
      walletFormValues.accountNumber,
      walletFormValues.pinNumber
    );
  };

  // fetching wallet info from database
  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const response = await fetch("/api/equber/wallet/info", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (response.ok) {
          const walletData = await response.json();
          setWallet(walletData);
        } else {
          console.error("Failed to fetch wallet info");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchWalletInfo();
    }
  }, [user]);
  console.log("Wallet info", wallet);

  //fetching equbs in the database
  useEffect(() => {
    const fetchEqubs = async () => {
      try {
        const response = await fetch("/api/equb/all", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbsData = await response.json();
        setEqubs(equbsData);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchEqubs();
    }
  }, [user]);

  if (!user) {
    console.log("need to log in buddy");
    return;
  }

  //handler functions

  const handleOpenCreateWalletModal = () => {
    setShowCreateWalletModal(true);
  };

  const handleCloseCreateWalletModal = () => {
    setShowCreateWalletModal(false);
  };

  const handleOpenCreateEqubModal = () => {
    setShowCreateEqubModal(true);
  };

  const handleCloseCreateEqubModal = () => {
    setShowCreateEqubModal(false);
  };

  // console.log(user.wallet_id);

  return (
    <main>
      {/* modal */}
      {showCreateWalletModal && (
        <Modal onClose={handleCloseCreateWalletModal}>
          <form
            className="flex flex-col items-center"
            onSubmit={handleCreateWallet}
          >
            {/* Wallet creation form fields */}
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={walletFormValues.bankName}
              onChange={(e) =>
                setWalletFormValues((prevState) => ({
                  ...prevState,
                  bankName: e.target.value,
                }))
              }
            />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={walletFormValues.accountNumber}
              onChange={(e) =>
                setWalletFormValues((prevState) => ({
                  ...prevState,
                  accountNumber: e.target.value,
                }))
              }
            />
            <input
              type="password"
              name="pinNumber"
              placeholder="PIN Number"
              value={walletFormValues.pinNumber}
              onChange={(e) =>
                setWalletFormValues((prevState) => ({
                  ...prevState,
                  pinNumber: e.target.value,
                }))
              }
            />
            <button
              type="submit"
              className=" bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[140px] justify-self-end 
            "
            >
              Create Wallet
            </button>
          </form>
        </Modal>
      )}

      {showCreateEqubModal && (
        <Modal onClose={handleCloseCreateEqubModal}>
          <EqubForm />
        </Modal>
      )}

      <div className="main-top mt-[20px] grid grid-cols-[250px_minmax(700px,_1fr)_250px] gap-4">
        <div className="left content-center justify-center max-h-[250px] p-[5px]">
          <div className="user-profile flex flex-col">
            <div className="flex justify-center">
              <img
                src={dy}
                alt="User profile "
                className="h-[150px] w-[150px] rounded-full shadow-lg shadow-black justify-self-center "
              />
            </div>
            <div className="h-[80px] flex flex-col justify-center mt-4">
              <div className=" flex flex-col justify-center items-center">
                <p className="username  text-xl w-[140px] h-10 font-semibold ml-4">
                  {user.firstname} {user.lastname}
                </p>
              </div>
              <div className="user-info flex flex-col justify-center items-center ">
                <p className="font-light text-md text-gray-500">
                  Job: {user.job}
                </p>
                <p className="font-light text-md text-gray-500">
                  Resident city: {user.city}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="middle mt-2 flex flex-col">
          <div className="equb-create-button relative flex justify-center mb-4 mt-1 bg-cover ">
            <img
              src={equb}
              alt="create equb "
              className="w-[800px] h-[400px] rounded-lg contrast-100 saturate-150"
            />
            <div className="absolute text-black font-semibold text-4xl top-">
              Create your Own Equb Group !
            </div>
            <button
              onClick={handleOpenCreateEqubModal}
              className="absolute bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[140px] bottom-2"
            >
              Create Equb
            </button>
          </div>
          <div className="finding-equb w-full flex flex-col justify-center mt-14">
            <div className="home-greet flex items-baseline justify-center mb-2 gap-1">
              <h2 className="text-green-500 text-4xl">Hi {user.firstname},</h2>
              <p className="text-xl">Let's Find You An Equb</p>
            </div>
            <div className="search-bar flex justify-center gap-0 content-center items-center">
              <input
                type="text"
                placeholder="Insert Equb Name Here "
                className="my-0 hover:border-green-400 w-[400px]"
              />
              <button className="bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[80px]">
                search
              </button>
            </div>
          </div>
        </div>
        <div className="right grid grid-rows-[150px_150px] gap-10 mt-10">
          {wallet ? (
            <Wallet wallet={wallet} />
          ) : (
            <div className="wallet-create-button  bg-gradient-to-t from-green-300 to-indigo-300 bg-opacity-5 shadow-lg shadow-gray-400 rounded-lg px-12 py-14">
              <button
                onClick={handleOpenCreateWalletModal}
                className=" bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[160px]"
              >
                Create Wallet
              </button>
            </div>
          )}

          {/* <div className="joined-equbs shadow-lg shadow-gray-400 rounded-lg p-4">
            <h2 className="text-green-500 font-semibold">Joined Equbs</h2>
            <ul>
              <li>Equb Name 1</li>
              <li>Equb Name 2</li>
              <li>Equb Name 3</li>
            </ul>
          </div>
          <div className="pending-equbs shadow-lg shadow-gray-400 rounded-lg p-4">
            <h2 className="text-green-500 font-semibold">Pending Equbs</h2>
            <ul>
              <li>Equb Name 1</li>
              <li>Equb Name 2</li>
              <li>Equb Name 3</li>
            </ul>
          </div> */}
        </div>
      </div>
      <div className="main-middle mx-24  mb-32">
        <div className="justify-center">
          <div className="popular-equbs  grid grid-rows[50px_200px] mt-24">
            <h2 className="text-4xl mb-10 text-center text-black font-sans">
              Popular Equbs
            </h2>
            <div className="equb-slider justify-center my-4 ml-40">
              <EqubSlider slides={equbs} />
            </div>
          </div>
        </div>

        <div className="main-equbs flex flex-col gap-10">
          <div className="joined-equbs h-96 bg-white grid grid-cols-2 gap-10 mt-10 shadow-lg shadow-green-300">
            <div className="relative">
              <div
                className="absolute inset-0 bg-cover filter blur-[1px]"
                style={{ backgroundImage: `url(${joined})` }}
              ></div>
              <h2 className="text-green-700 font-semibold text-7xl absolute inset-0 flex items-center justify-center z-10 animate-bounce">
                Joined Equbs
              </h2>
            </div>
            <div className="flex flex-col">
              <JoinedEqubs />
            </div>
          </div>
          <div className="pending-equbs h-96 bg-white grid grid-cols-2 gap-10 pt-10 shadow-lg shadow-green-300 ">
            <div className="flex flex-col">
              {/* <PendingEqubs equbs={equbs} /> */}
            </div>
            <div className="relative">
              <div
                className="absolute inset-0 bg-cover filter blur-[1px] "
                style={{ backgroundImage: `url(${joined})` }}
              ></div>
              <h2 className="text-green-500 font-light text-7xl absolute inset-0 flex items-center justify-center z-10">
                Pending Equbs
              </h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
