import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useFetchJoinedEqubs } from "../hooks/useFetchJoinedEqubs.js";

const JoinedEqubs = () => {
  const { user } = useAuthContext();
  const { joinedEqubs, fetchJoinedEqubs } = useFetchJoinedEqubs(user);
  
  useEffect(() => {
    fetchJoinedEqubs(); // Fetch the joined equbs when the component mounts
  }, [fetchJoinedEqubs]);

  return (
    <ul className="w-full pl-32">
    {joinedEqubs.map((equb) => (
      <li
        key={equb.id}
        className="w-9/12 flex items-center justify-between shadow-md rounded-lg my-2 px-6 h-20 bg-white text-gray-800 font-semibold hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="text-lg">{equb.equb_name}</div>
        <div className="text-green-700">Round {equb.max_round}</div>
      </li>
    ))}
  </ul>
  );
};

export default JoinedEqubs;
