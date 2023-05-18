import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState,useEffect } from "react";
import "./App.css"

//components and pages
import AdminLogin from "./pages/AdminLogin"
import AdminSignup from "./pages/AdminSignup"
import AdminHome from "./pages/AdminHome"
import Navbar from "./components/Navbar";


//pages and components


function App() {
  const {user}=useAuthContext();

// //making sticky navbar
  // Add a state to keep track of the navbar's position
  const [navbarPosition, setNavbarPosition] = useState("absolute");

  // Add an event listener to check the scroll position of the page
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle the scroll event and update the navbar position
  const handleScroll = () => {
    const navbar = document.querySelector("nav");

    if (window.scrollY > 200) {
      setNavbarPosition("fixed");
      navbar.classList.add("sticky");
    } else {
      setNavbarPosition("absolute");
      navbar.classList.remove("sticky");
    }
  };

  return (
    <BrowserRouter>
      <div  style={{ position: navbarPosition, top: 0, width: "100%",zIndex: 100 }}>
      <Navbar/>
      </div>
      <div className="container w-full ">
        <Routes>
          <Route path="/" element={!user ? <AdminLogin/> : <Navigate to="/admin-home"/>}
          />
          <Route path="/admin-signup" element={!user ?< AdminSignup /> : <Navigate to="/admin-home" />}
          />
          <Route path="/admin-home" element={user ? <AdminHome /> : <Navigate to="/"/> }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
