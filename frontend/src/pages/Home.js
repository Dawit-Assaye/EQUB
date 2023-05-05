import { useAuthContext } from "../hooks/useAuthContext.js";
// import "./Home.css";
//images
import dy from "../photo/dy.jpg"
import equb from "../photo/equb.jpg"
//components
import EqubSlides from "../components/subComponents/EqubSlides.js";
import EqubSlider from "../components/EqubSlider.js";



const Home = () => {
  const { user } = useAuthContext();
  if (!user) {
    console.log("need to log in buddy");
    return;
  }
  
  let equbs = [{ img:equb, name: "Edget", type: "weekly", amount: 200, cycle: 20 ,id:1},
    { img: equb, name: "Hbret", type: "monthly", amount: 200, cycle: 20,id:2 },
    { img:equb, name: "Kasma", type: "weekly", amount: 200, cycle: 20 ,id:3}]
  
  return (
    <main>
      <div className="left">
        <div className="user-profile">
          <img src={dy} alt="User profile picture" />
          <p className="username">
            {user.firstname} {user.lastname}
          </p>
        </div>
      </div>
      <div className="middle">
        <div className="home-greet">
          <h2>Hi {user.firstname},</h2> Let's Find You An Equb</div>
        <div className="search-bar">
          <input type="text" placeholder="Insert Equb ID Here " />
          <span>search</span>
        </div>
        <div className="popular-equbs">
          <h2>Popular Equbs</h2>
          <div className="equb-slider ">
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
