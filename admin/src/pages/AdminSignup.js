import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "./AdminLogin.css"

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [key, setKey] = useState('');

  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email, password,firstname,lastname);
    await signup(email, password,firstname,lastname,key);
  };

  return (
    <form className="login mx-auto mt-24 mb-20" onSubmit={handleSubmit}>
      <h3 className="text-purple-700 ">Admin Signup</h3>
      
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        id="email"
      />
      
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        id="pwd"
      />
      
      <input
        type="text"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
        placeholder="First name"
        id="first"
      />
       
      <input
        type="text"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
        placeholder="Last name"
        id="last"
      />
       
      <input
        type="text"
        onChange={(e) => setKey(e.target.value)}
        value={key}
        placeholder="Registeration code..."
        id="key"
      />
      <button className="bg-purple-700" disabled={isLoading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AdminLogin
