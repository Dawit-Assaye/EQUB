import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState,useEffect } from "react";
import "./App.css"

//font awesome


//pages and components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Visit from "./pages/Visit";

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
      <div  style={{ position: navbarPosition, top: 0, width: "100%" }}>
      <Navbar/>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" 
          element={user ? <Home/> :<Navigate to="/visit"/>}
          // element={user ? <Home /> : <Navigate to="/login"/> }
          />
          <Route path="/visit" element={!user ? <Visit/> : <Navigate to="/"/>}
          />
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}
          />
          <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}
          />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;