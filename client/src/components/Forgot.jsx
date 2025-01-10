import { useState } from "react";
import instance from "../services/instance";
import { Link } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLink = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/auth/forgot", {
        email,
      });
      alert("Verification link sent");
      console.info("Reset password link sent to the mail id");
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending link", error);
      setMessage(error.message);
    }
  };
  return (
    <form className="flex flex-col gap-8">
      <h2 className="text-xl text-center">Forgot Password?</h2>
      <div className="flex items-center gap-4">
        <label htmlFor="email" className="w-1/4">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(() => e.target.value)}
          className="p-2 outline-none rounded-lg w-3/4 bg-gray-100"
          placeholder="enter your email"
        />
      </div>
      <button
        onClick={handleLink}
        className="bg-blue-700 p-2 rounded-lg text-white hover:bg-blue-800"
      >
        Send Verification code
      </button>
      <div className="flex flex-col items-center space-y-2 text-sm">
        <div className="flex items-center space-x-5">
          <p>Existing User..?</p>
          <Link to="/login" className="hover:underline hover:text-blue-700">
            login
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          <p>Dont have an account..?</p>
          <Link to="/register" className="hover:underline hover:text-blue-700">
            register
          </Link>
        </div>
      </div>
      <p className="font-mono text-sm text-center">{message}</p>
    </form>
  );
};

export default Forgot;
