import { useAuthContext } from "../hooks/useAuthContext.js";
import "./Home.css"

//components


const Home = () => {
  const { user } = useAuthContext();
if (!user){
  console.log('need to log in buddy')
  return
}
  return (
    <div className="home">
     <h1>Home</h1>
    </div>
  );
};

export default Home;
