import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import "./Navbar.css";

const { Link } = require("react-router-dom");

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="nav">
        <Link to="/">
          <h1>EQUB</h1>
        </Link>
        <nav>{user &&(
          <div>
            <span>{user.username}</span>
            <button onClick={handleClick}>Logout</button>
          </div>
          )}
          {!user &&(
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
