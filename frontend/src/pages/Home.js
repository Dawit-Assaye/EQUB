import { useAuthContext } from "../hooks/useAuthContext.js";

//images
import dy from "../photo/dy.jpg";
import equb from "../photo/equb.jpg";

//components
import EqubSlides from "../components/subComponents/EqubSlides.js"
import EqubSlider from "../components/EqubSlider.js";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuthContext();
  if (!user) {
    console.log("need to log in buddy");
    return;
  }

  let equbs = [
    { img: equb, name: "Edget", type: "weekly", amount: 200, cycle: 20, id: 1 },
  ];

  return (
    <main className="mt-[20px] grid grid-cols-[250px_minmax(750px,_1fr)_200px] gap-4">
      <div className="left content-center justify-center max-h-[250px] p-[5px]">
        <div className="user-profile grid grid-rows-[150px_35px]">
          <img
            src={dy}
            alt="User profile picture"
            className="h-[150px] w-[150px] rounded-full shadow-lg shadow-black justify-self-center"
          />
          <p className="username pl-16 text-lg w-full h-10 pt-4 justify-self-center font-semibold ">
            {user.firstname} {user.lastname}
          </p>
        </div>
      </div>
      <div className="middle mt-10">
        <div className="w-full flex flex-col justify-center">
          {" "}
          <div className="home-greet flex items-center justify-center ">
            <h2 className="text-green-500 text-2xl self-center">
              Hi {user.firstname},
            </h2>{" "}
            Let's Find You An Equb
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
        <div className="popular-equbs  grid grid-rows[50px_200px] mt-16">
          <h2 className="text-4xl mb-10 text-center text-black font-sans">
            Popular Equbs
          </h2>
          <div className="equb-slider flex justify-center my-4">
            <EqubSlider slides={equbs} />  
          </div>
        </div>
        <div className="equb-create-button">
          <img src={equb} alt="create equb photo" />
          <span>create</span>
        </div>
      </div>
      <div className="right">
        <div className="my-wallet">
          <h2>My Wallet</h2>
          <p className="wallet-balance">Current balance: {user.balance}</p>
          <p>total deposit:</p>
          <span>Deposit</span>
          <span>Withdraw</span>
        </div>
        <div className="joined-equbs">
          <h2>Joined Equbs</h2>
          <ul>
            <li>Equb Name 1</li>
            <li>Equb Name 2</li>
            <li>Equb Name 3</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Home;
