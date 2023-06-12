import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useCreateWallet } from "../hooks/useCreateWallet.js";
import { useNavigate } from "react-router-dom";

//images
import dy from "../photo/dy.jpg";
import equb from "../photo/equb.png";
import joined from "../photo/new.jpeg";

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
  const [joinedEqubs, setJoinedEqubs] = useState([]);
  const [showCreateWalletModal, setShowCreateWalletModal] = useState(false);
  const [showCreateEqubModal, setShowCreateEqubModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEqubs, setFilteredEqubs] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    // fetching wallet info from database

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

    //fetch all equbs

    const fetchEqubs = async () => {
      try {
        const response = await fetch("/api/equb/all", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbsData = await response.json();

        if (searchQuery) {
          const filteredEqubsData = equbsData.filter((equb) =>
            equb.equb_name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredEqubs(filteredEqubsData);
        } else {
          const recentEqubs = equbsData.slice(0, 4); // Get the first 4 recent equbs
          setEqubs(recentEqubs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // fetch joined equbs

    const fetchJoinedEqubs = async () => {
      try {
        const response = await fetch(`/api/equb/joined/${user.user_id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbsData = await response.json();
        if (response.ok) {
          setJoinedEqubs(equbsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchWalletInfo();
      fetchEqubs();
      if (joinedEqubs.length === 0) {
        fetchJoinedEqubs();
      }
    }
  }, [user, joinedEqubs,searchQuery]);

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

  const redirectToJoinedEqubPage = (equbId) => {
    navigate(`/equb/${equbId}`);
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
              className=" bg-lime-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-lime-700 w-[140px] justify-self-end"
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

      <div className="main-top mt-[20px] flex flex-row justify-between">
        {/* <div className="left content-center justify-center max-h-[250px] p-[5px]">
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
        </div> */}
        <div className="middle mt-2 flex flex-col">
          <div className="equb-create-button  grid grid-cols[700px_200px] justify-center mb-4 mt-1 bg-cover ">
            {/* <img
              src={equb}
              alt="create equb "
              className="w-[800px] h-[400px] rounded-lg contrast-100 saturate-150"
            /> */}
            <div className="text-gray-800 font-semibold text-4xl mb-4 mt-16 self-center">
              Create your Own Equb Group Here And Empower Your Future!
            <button
              onClick={handleOpenCreateEqubModal}
              className=" bg-lime-500 text-xl  p-2 rounded-full hover:bg-lime-700 hover:text-2xl hover:text-white  bottom-2"
            >
              Create Equb
            </button>
            </div>
          </div>
        </div>
        <div className="right mt-10 mr-0 flex items-start justify-end">
          {wallet ? (
            <Wallet wallet={wallet} />
          ) : (
            // <div className="wallet-create-button  bg-gradient-to-t from-lime-300 to-gray-100 bg-opacity-5 shadow-lg shadow-gray-400 rounded-lg px-12 py-14">
            <button
              onClick={handleOpenCreateWalletModal}
              className=" text-black font-semibold rounded-lg  p-2 shadow-lg shadow-gray-300  w-[160px]"
            >
              <FontAwesomeIcon
                icon={faWallet}
                size="5x"
                className="text-lime-500 hover:text-lime-700 duotone"
              />
              <p>Create Wallet</p>
            </button>
            // </div>
          )}
        </div>
      </div>
      <div className="main-middle mx-24  mb-32 mt-20">
        <div className="justify-center">
          <div className="popular-equbs  grid grid-rows[50px_200px] mt-4 ">
            <div className="finding-equb w-full flex flex-col justify-center mt-6 mb-6">
              <div className="home-greet flex items-baseline justify-center mb-2 gap-1">
                <h2 className="text-fuchsia-800 text-4xl">
                  Hi {user.firstname},
                </h2>
                <p className="text-xl">Let's Find You An Equb</p>
              </div>
              <div className="search-bar flex justify-center gap-0 content-center items-center">
                <input
                  type="text"
                  placeholder="Insert Equb Name Here "
                  className="my-0 hover:border-fuchsia-800 w-[400px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="3x"
                  className="text-fuchsia-700 hover:text-fuchsia-900 ml-4"
                />
                {/* <button className="bg-fuchsia-800 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[80px]">
                search
              </button> */}
              </div>
            </div>
            <h2 className="text-4xl mb-10 text-center text-black font-sans mt-6">
              Popular Equbs
            </h2>
            <div className="equb-slider justify-center my-4 ml-40">
              <EqubSlider slides={searchQuery ? filteredEqubs : equbs} />
            </div>
          </div>
        </div>

        <div className="main-equbs flex flex-col gap-10">
          <h2 className="text-lime-500 font-normal text-6xl flex items-center justify-start mt-10 ">
            Joined Equbs
          </h2>
          <div className="joined-equbs h-auto bg-white grid grid-cols-2 gap-10 rounded-xl">
            <div className="relative">
              {/* <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-95"
                style={{ backgroundImage: `url(${equb})` }}
              ></div> */}
            </div>
            <div className="flex flex-col">
              <JoinedEqubs
                joinedEqubs={joinedEqubs}
                onClickJoinedEqub={redirectToJoinedEqubPage}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
