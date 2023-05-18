import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "./AdminLogin.css"

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email, password);
    await login(email, password);
  };

  return (
    <form className="login mt-40 mx-auto" onSubmit={handleSubmit}>
      <h3 className="text-purple-700">Admin Login</h3>
      
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
      <button disabled={isLoading} className="bg-purple-700">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AdminLogin
