import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import EqubCreationRequests from "../components/EqubCreationsRequests.jsx"
import EqubJoinRequests from "../components/EqubJoinRequests.jsx"

//images
import dy from "../photo/dy.jpg";
// import equb from "../photo/equb.png";

function AdminHome() {
  const { user } = useAuthContext()
  const [activeButton, setActiveButton] = useState('');
  // const [showSearchBar, setShowSearchBar] = useState(true);
  

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // setShowSearchBar(false); // hide search bar when a button is clicked
  };

  return (
    <div className="main grid grid-cols-[250px_950px]">
      
      <div className="admin-left content-center justify-center max-h-full  bg-gray-800 pt-20">
        <div className="user-profile flex flex-col">
          <div className="flex justify-center">
            <img
              src={dy}
              alt="User profile"
              className="h-[150px] w-[150px] rounded-full shadow-md shadow-black justify-self-center "
            />
          </div>
          <div className="h-[80px] flex flex-col justify-center mt-4">
            <div className=" flex flex-col justify-center items-center"><p className="username  text-xl text-purple-700 w-[140px] h-10 font-semibold ml-4 ">
              {user.firstname} {user.lastname}
              </p>
              </div>
           
          </div>
        </div>
        <div className="admin-buttons flex flex-col py-4  justify-center w-full">
          <button  onClick={() => handleButtonClick('creation')}  className={`bg-${activeButton === 'creation' ? 'white':'gray-800'}  text-${activeButton === 'creation' ? 'black':'white'} p-2 w-full border-t-[1px] border-b-[1px] border-b-gray-400 text-xl font-semibold transition duration-300   hover:bg-gray-900`}>Equb creation requests</button>
          <button  onClick={() => handleButtonClick('joining')}  className={`bg-${activeButton === 'joining' ? 'white':'gray-800'}  text-${activeButton === 'joining' ? 'black':'white'} p-2 w-full border-b-[1px] border-b-gray-400 text-xl font-semibold transition duration-300   hover:bg-gray-900`}>Equb joinig requests</button>
          <button  onClick={() => handleButtonClick('payWinner')}  className={`bg-${activeButton === 'payWinner' ? 'white':'gray-800'}  text-${activeButton === 'payWinner' ? 'black':'white'} p-2 w-full border-b-[1px] border-b-gray-400 text-xl font-semibold transition duration-300   hover:bg-gray-900`}>Paywinner requests</button>
          <button  onClick={() => handleButtonClick('equbers')}  className={`bg-${activeButton === 'equbers' ? 'white':'gray-800'}  text-${activeButton === 'equbers' ? 'black':'white'} p-2 w-full border-b-[1px] border-b-gray-400 text-xl font-semibold transition duration-300   hover:bg-gray-900`}>All Equbs</button>
          <button  onClick={() => handleButtonClick('equbs')}  className={`bg-${activeButton === 'equbs' ? 'white':'gray-800'}  text-${activeButton === 'equbs' ? 'black':'white'} p-2 w-full border-b-[1px] border-b-gray-400 text-xl font-semibold transition duration-300   hover:bg-gray-900`}>All Equbers</button>
      </div>
      </div>
      
      <div className="admin-right pt-16 pl-6">
        <div className="admin-bottom pl-20 pt-4">
        {activeButton === 'creation' && <EqubCreationRequests/>}
        {activeButton === 'joining' && <EqubJoinRequests />}
        {/* {activeButton === 'payWinner' && <PayWinner />}
        {activeButton === 'equbs' && <Equbs />}
        {activeButton === 'equbers' && <Eqbers />} */}

      </div>
      </div>
    </div>
    

  )
}

export default AdminHome