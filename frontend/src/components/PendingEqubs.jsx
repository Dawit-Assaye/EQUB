import React from "react";

const PendingEqubs = ({ equbs }) => {
  return (
    <ul className="w-full pl-32">
      {equbs.map((equb) => (
        <li
          key={equb.id}
          className="w-9/12 flex items-center justify-between shadow-md shadow-slate-700 m-2 px-6 h-20 rounded-full font-semibold"
        >
          <div>{equb.equb_name}</div>
          <div className="text-green-700 pr-5">round {equb.max_round}</div>
        </li>
      ))}
    </ul>
  );
};

export default PendingEqubs;
