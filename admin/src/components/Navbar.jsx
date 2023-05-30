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
    <header className="w-full m-0 h-24 bg-gray-800">
      <div className="nav  w-full shadow-dark-300 shadow-lg mr-[30px] mb-[5px] pl-[100px] py-2 flex items-center justify-between h-24">
        <Link to="/admin-home">
          <h1 className="text-purple-700 text-[60px]">EQUB</h1>
        </Link>
        <nav className="flex items-center ">
          {user && (
            <div className="loggedin flex items-center justify-between">
              <div className="greet flex items-center justify-between text-white">
                welcome back{" "}
                <h3 className="ml-2 text-2xl font-semibold text-purple-800">
                  {user.firstname}
                </h3>
              </div>
              <button
                onClick={handleClick}
                className="bg-white border-2 rounded-md py-[6px] px-[10px] border-purple-900 text-purple-900 ml-1 mr-6 hover:bg-purple-900 hover:text-white "
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="flex items-center space-x-2 mr-10 ">
              <Link
                to="/"
                className="hover:text-purple-700 hover:animate-[bounce_2s_ease-in-out_infinite] text-xl"
              >
                Login
              </Link>
              <Link
                to="/admin-signup"
                className="text-white rounded-md p-1 bg-purple-950 hover:animate-[bounce_2s_ease-in-out_infinite] text-xl"
              >
                Signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
