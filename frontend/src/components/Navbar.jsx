import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { faRightFromBracket, faUserTie ,faHome} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import mainUser from "../photo/user.png"

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="w-full m-0 h-24 bg-white">
      <div className="nav w-full shadow-dark-300 shadow-lg mr-[30px] mb-[5px] py-2 flex items-center justify-between h-24">
        <div className='flex flex-row justify-between items-center gap-10'>
        <Link to="/">
          <h1 className="text-lime-500 text-[60px]">EQUB</h1>
        </Link>
        <Link to="/">
          <div className='flex flex-row gap-1 ml-12'>
        <FontAwesomeIcon icon={faHome} size="2x"  className="text-lime-500 hover:text-lime-700 duotone"/><h1 className="text-lime-500 text-[25px] font-bold hover:text-lime-700 ">Home</h1>
        </div>
        </Link>
        <Link to="/">
          <h1 className="text-lime-500 text-[25px] font-bold hover:text-lime-700">About</h1>
        </Link>
        </div>
        <nav className="flex items-center">
          {user && (
            <div className="loggedin flex items-center">
          
              <div className="relative group">
                <div
                  className="h-[40px] w-[40px] rounded-full mr-16 items-center justify-self-center flex flex-row cursor-pointer"
                  onClick={toggleDropdown}
                >
                 <h3 className="text-2xl font-semibold">{user.username}</h3> <img src={mainUser} alt="user" className='h-12 w-16 rounded-full '/>
                </div>
                {showDropdown && (
                  <div className="absolute z-10 right-0 mt-2 py-2 bg-white rounded shadow-lg">
                    <div className="px-4 py-2">
                      <p>{user.job}</p>
                      <p>{user.city}</p>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleClick}
                className="bg-white border-2 rounded-md py-[6px] px-[10px] border-fuchsia-800 text-fuchsia-800 ml-4 hover:bg-fuchsia-950 hover:text-white hover:border-fuchsia-950"
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="flex items-center space-x-2 mr-10">
              <Link
                to="/signup"
                className="bg-white border-2 rounded-md py-[6px] px-[10px] border-fuchsia-800 text-fuchsia-800 ml-2 hover:bg-fuchsia-950 hover:text-white hover:border-fuchsia-950"
              >
                Get started
              </Link>
              <Link to="/login" className="hover:text-fuchsia-800 hover:animate-[bounce_2s_ease-in-out_infinite] text-xl">
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
