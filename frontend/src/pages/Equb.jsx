import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext.js";
// import { useFetchEqub } from "../hooks/useFetchEqub.js";

import Logo from "../photo/new.jpeg"

function Equb() {
    const { user } = useAuthContext();
  const { equbId } = useParams();
  const [equb, setEqub] = useState([]);
  // const { equb, fetchEqub } = useFetchEqub(user, equbId);
  
    
    console.log("here is user",user);

    // //fetching equb data
  useEffect(() => {
      
    const fetchEqub = async () => {
      try {
        const response = await fetch(`/api/equb/${equbId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const equbData = await response.json();
        if (response.ok) {
          setEqub(equbData);
        }
      } catch (error) {
        console.error(error);
      }
    };
        if (equb.length === 0) {
            fetchEqub(); // Fetch the joined equbs only if the array is empty
        }
      }, [equb,user]);

  return (
    <div className="container mx-auto">
  {/* Logo */}
  <div className="flex items-center justify-center mt-8">
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
          <p className='font-medium text-lg text-gray-800'>This equb had {equb.max_round} maximum round on the first place, and it is { equb.type} Equb.</p>

  {/* Card Section */}
  <div className="grid grid-cols-3 gap-6 mt-8">
    {/* PAY Contribution Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer">
      <h3 className="text-xl font-semibold text-gray-800">PAY Contribution</h3>
      <p className="text-gray-600 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>

    {/* LOTTERY Attend Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer">
      <h3 className="text-xl font-semibold text-gray-800">LOTTERY Attend</h3>
      <p className="text-gray-600 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>

    {/* Equb Members Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" >
      <h3 className="text-xl font-semibold text-gray-800">Equb Members</h3>
      <p className="text-gray-600 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>
</div>

  )
}

export default Equb