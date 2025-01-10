import { useState } from "react";
import instance from "../services/instance";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/login`, {
        email,
        password,
      });
      setMessage(response.data.message);
      console.info("Account log in succussful");
      alert("You have logged in");
      navigate("/");
    } catch (error) {
      console.error("Error in logging in", error);
      setMessage(error.message);
    }
  };
  return (
    <form className="flex flex-col gap-8 relative">
      <h2 className="text-xl text-center">Login</h2>
      <div className="flex items-center gap-4">
        <label htmlFor="email" className="w-1/4">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 outline-none rounded-lg w-3/4 bg-gray-100"
        />
      </div>
      <div className="flex items-center gap-4 w-full relative">
        <label htmlFor="password" className="w-1/4">
          Password
        </label>
        <input
          type={hide ? "password" : "text"}
          name="password"
          id="password"
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 outline-none rounded-lg w-3/4 bg-gray-100"
        />
        <button
          onClick={() => setHide((hide) => !hide)}
          className="absolute right-1"
        >
          <img
            src={hide ? "/hide.png" : "/view.png"}
            alt="hide-or-view-icon"
            className="w- full size-5"
          />
        </button>
      </div>
      <button
        onClick={handleLogin}
        className="bg-blue-700 p-2 rounded-lg text-white hover:bg-blue-800"
      >
        Log in
      </button>
      <Link to="/" className="absolute bottom-[-50px] ">
        <p className="text-blue-600 cursor-pointer hover:underline">
          forgot password..?
        </p>
      </Link>
      <p className="font-mono text-sm text-center">{message}</p>
    </form>
  );
};

export default Login;
