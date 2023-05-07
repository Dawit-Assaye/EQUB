import { useAuthContext } from "../hooks/useAuthContext.js";

//images
import dy from "../photo/dy.jpg";
import equb from "../photo/equb.png";

//components
import EqubSlides from "../components/subComponents/EqubSlides.js";
import EqubSlider from "../components/EqubSlider.js";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuthContext();
  if (!user) {
    console.log("need to log in buddy");
    return;
  }
  let equbs = [
    { img: equb, name: "Edget", type: "Monthly", amount: 200, cycle: 20, id: 1 },
    { img: equb, name: "Edget", type: "Monthly", amount: 200, cycle: 20, id: 2 },
    { img: equb, name: "Edget", type: "Monthly", amount: 200, cycle: 20, id: 3 },
    { img: equb, name: "Edget", type: "Monthly", amount: 200, cycle: 20, id: 4 },
  ];

  return (
    <main>
    <div className="main-top mt-[20px] grid grid-cols-[200px_minmax(750px,_1fr)_250px] gap-4">
      <div className="left content-center justify-center max-h-[250px] p-[5px]">
        <div className="user-profile flex flex-col">
          <div className="flex justify-center">
            <img
              src={dy}
              alt="User profile picture"
              className="h-[150px] w-[150px] rounded-full shadow-lg shadow-black justify-self-center "
            />
          </div>
          <div className="h-[80px] flex flex-col justify-center mt-4">
            <p className="username  text-xl w-[140px] h-10 font-semibold ml-8">
              {user.firstname} {user.lastname}
            </p>
            <div className="user-info flex flex-col justify-center items-center ">
                <p className="font-light text-lg text-gray-500">Job: {user.job}</p>
                <p className="font-light text-gray-500">Resident city: {user.city}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="middle mt-2 flex flex-col">
        <div className="equb-create-button relative flex justify-center mb-4 mt-1 bg-cover">
          <img
            src={equb}
            alt="create equb photo"
            className="w-[800px] h-[400px] rounded-lg contrast-100 saturate-150"
          />
          <div className="absolute text-black font-semibold text-4xl top-">
            Create your Own Equb Group !
          </div>
          <button className="absolute bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[80px] bottom-2">
            create
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
              placeholder="Insert Equb ID Here "
              className="my-0 hover:border-green-400 w-[400px]"
            />
            <button className="bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[80px]">
              search
            </button>
          </div>
        </div>
      
      </div>
      <div className="right grid grid-rows-[150px_150px] gap-10 mt-10">
        <div className="my-wallet shadow-lg shadow-gray-400 rounded-lg p-4">
          <h2 className="text-green-500 font-semibold">My Wallet</h2>
          <p className="wallet-balance">Current balance: {user.balance}</p>
          <p>total deposit:</p>
          <div className="flex justify-between ">
            <button className="bg-green-500 text-white rounded-lg shadow-md shadow-black p-2 hover:bg-green-700 w-[80px]">
              Deposit
            </button>
            <button className="bg-pink-600 text-white rounded-lg shadow-md shadow-black p-0 hover:bg-pink-700 w-[80px]">
              Withdraw
            </button>
          </div>
        </div>
        <div className="joined-equbs shadow-lg shadow-gray-400 rounded-lg p-4">
          <h2 className="text-green-500 font-semibold">Joined Equbs</h2>
          <ul>
            <li>Equb Name 1</li>
            <li>Equb Name 2</li>
            <li>Equb Name 3</li>
          </ul>
        </div>
      </div>
      </div>
      <div className="main-middle">
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
      </div>
      </main>
  );
};

export default Home;
