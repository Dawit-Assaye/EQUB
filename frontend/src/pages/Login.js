import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom';
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email, password);
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">Login</h3>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        id="email"
      />
      <label htmlFor="pwd">Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        id="pwd"
      />
      <button disabled={isLoading} className="bg-lime-500">Login</button>
      {error && <div className="error">{error}</div>}
      <p className="mt-4">
        New user?{" "}
        <Link to="/signup" className='text-lg font-semibold text-fuchsia-800'>Signup here</Link>
      </p>
    </form>
  );
};

export default Login
