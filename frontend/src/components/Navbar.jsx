import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
// import "./Navbar.css";

const { Link } = require("react-router-dom");

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="w-full m-0 h-24 bg-white">
      <div className="nav  w-full shadow-dark-300 shadow-lg mr-[30px] mb-[5px] pl-[100px] py-2 flex items-center justify-between h-24">
        <Link to="/">
          <h1 className="text-green-500 text-[60px]">EQUB</h1>
        </Link>
        <nav className="flex items-center ">{user &&(
          <div className="loggedin flex items-center justify-between">
            <div className="greet flex items-center justify-between">welcome back <h3 className="ml-2 text-2xl font-semibold">{user.username}</h3></div>
            <button onClick={handleClick} className="bg-white border-2 rounded-md py-[6px] px-[10px] border-green-500 text-green-500 ml-2 hover:bg-green-700 hover:text-white hover:border-green-700" >Logout</button>
          </div>
          )}
          {!user &&(
          <div className="flex items-center space-x-2 mr-10 ">
              <Link to="/signup" className="hover:text-green-400 hover:animate-[bounce_2s_ease-in-out_infinite] text-xl">Signup</Link>
            <Link to="/login" className="hover:text-green-400 hover:animate-[bounce_2s_ease-in-out_infinite] text-xl">Login</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;