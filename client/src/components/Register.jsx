import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../services/instance";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/register", { email, password });
      alert("Account created");
      console.info("Account created succusfully");
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error in creating account", error);
      setMessage(error.message);
    }
  };
  return (
    <form className="flex flex-col gap-8">
      <h2 className="text-xl text-center">Register</h2>
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
        onClick={handleCreate}
        className="bg-blue-700 p-2 rounded-lg text-white hover:bg-blue-800"
      >
        Create Account
      </button>
      <p className="font-mono text-sm text-center">{message}</p>
    </form>
  );
};

export default Register;
