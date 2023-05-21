// import { useEffect,useState } from "react";
// import { useAuthContext } from "../hooks/useAuthContext.js";
// import { useFetchJoinedEqubs } from "../hooks/useFetchJoinedEqubs.js";

const JoinedEqubs = ({ onClickJoinedEqub ,joinedEqubs}) => {
  // const { user } = useAuthContext();
  // const { joinedEqubs, fetchJoinedEqubs } = useFetchJoinedEqubs();
  // console.log("user from authContext",user);
  const handleJoinedEqubClick = (equbId) => {
    onClickJoinedEqub(equbId);
  };


  return (
    <ul className="w-full pl-32 mt-6">
    {joinedEqubs.map((equb) => (
      <li
       onClick={() => handleJoinedEqubClick(equb._id)}
        key={equb._id}
        className="w-3/4 flex items-center justify-between shadow-lg rounded-full my-2 px-6 h-20 bg-lime-500 text-gray-800 font-semibold transition-delay duration-300 hover:bg-lime-700 hover:ml-10 hover:w-full "
      >
        <div className="text-lg">{equb.equb_name}</div>
        <div className="text-gray-200 ">{equb.type},Rounds {equb.max_round}</div>
      </li>
    ))}
  </ul>
  );
};

export default JoinedEqubs;
