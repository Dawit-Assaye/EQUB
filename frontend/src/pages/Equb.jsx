import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext.js";
// import { useFetchEqub } from "../hooks/useFetchEqub.js";

import Logo from "../photo/new.jpeg";

function Equb() {
  const { user } = useAuthContext();
  const { equbId } = useParams();
  const [equb, setEqub] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [payment, setPayment] = useState([])
  
  // const { equb, fetchEqub } = useFetchEqub(user, equbId);

  console.log("here is user", user);

  // //fetching equb data
  useEffect(() => {
    const fetchEqub = async () => {
      try {
        const response = await fetch(`/api/equb/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbData = await response.json();
        if (response.ok && equb.length === 0) {
          setEqub(equbData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (equb.length === 0) {
      fetchEqub();
    }
  }, [equb, user, equbId]);


    // Handle confirm button click
  const handleConfirmClick = async () => {
    // Perform fetch request or desired action
    
    try {
      const userId = user.user_id
  const response = await fetch(`/api/equb/pay`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json"  },
    body: JSON.stringify({
      userId: userId,
      equbId: equbId
    }),
  });
  
  const data = await response.json();
  
  // Handle response data
      if (response.ok) {
        setPayment(data)
      } else {
  
        alert(data.error);
      }
} catch (error) {
      console.error(error);
}

    setShowModal(false); // Close the modal after the action is performed
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto pb-20  flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center ">
        <img
          src={Logo}
          alt="User profile "
          className="h-[150px] w-[150px] rounded-full shadow-lg shadow-black justify-self-center "
        />
      </div>

      {/* Description */}
      <p className="text-center text-xl font-semibold text-lime-500 mt-8 ">
        {equb.equb_name}
      </p>
      <p className="font-medium text-lg text-gray-800">
        This equb had {equb.max_round} maximum round on the first place, and it
        is {equb.type} Equb.
      </p>

      {/* Card Section */}
      <div className="grid grid-cols-[250px_250px_250px] gap-6 mt-8 self-center justify-center">
        {/* PAY Contribution Card */}
        <div onClick={() => setShowModal(true)} className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-colors delay-50 hover:bg-lime-500 ">
          <h3 className="pay text-xl font-semibold text-gray-800">
            PAY Contribution
          </h3>
          <p className="text-gray-600 mt-2">
            Pay for this round
          </p>
        </div>

        {/* LOTTERY Attend Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-colors delay-50 hover:bg-fuchsia-500">
          <h3 className="text-xl font-semibold text-gray-800">
            LOTTERY Attend
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Equb Members Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-colors delay-50 hover:bg-teal-500">
          <h3 className="text-xl font-semibold text-gray-800">Equb Members</h3>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

         {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white shadow-lg rounded-lg p-6 relative z-20">
            {/* Dynamic text */}
            <p className="text-lg text-fuchsia-700">Are you sure you want to perform this action?</p>
            <p>
              You are about to pay <span className="font-semibold">{equb.amount}</span> for the <span className="font-semibold">{equb.equb_name}</span> equb.
            </p>
            <p>
              This payment will be made by <span className="font-semibold">{user.firstname} {user.lastname}</span> for the current round number <span className="font-semibold">{equb.current_round}</span>.
            </p>
      
            {/* Confirm and Cancel buttons */}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 bg-lime-500 text-white rounded-lg hover:bg-lime-700"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-950" 
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
          {payment && (
            <div className="message p-4 bg-gray-500 border border-lime-500 text-lime-500 rounded-md my-5">
              {payment.message}
            </div>
          )}
        </div>
)}
    </div>
  );
}

export default Equb;
