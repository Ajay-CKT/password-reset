import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../services/instance";

const Reset = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState({
    1: true,
    2: true,
  });
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/reset/${token}`, {
        newPassword,
        confirmPassword,
      });

      alert("Password has been changed");
      console.info("Password changed");
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error in changing the password", error);
      setMessage(error.message);
    }
  };
  return (
    <form className="flex flex-col gap-8">
      <h2 className="text-xl text-center">Reset Password</h2>
      <div className="flex items-center gap-4 w-full relative">
        <label htmlFor="newPassword" className="w-1/4">
          Password
        </label>
        <input
          type={hide[1] ? "password" : "text"}
          name="newPassword"
          id="newPassword"
          placeholder="enter your new password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 outline-none rounded-lg w-3/4 bg-gray-100"
        />
        <button
          onClick={(e) =>
            setHide((hide) => {
              e.preventDefault();
              return { ...hide, 1: !hide[1] };
            })
          }
          className="absolute right-1"
        >
          <img
            src={hide[1] ? "/hide.png" : "/view.png"}
            alt="hide-or-view-icon"
            className="w- full size-5"
          />
        </button>
      </div>
      <div className="flex items-center gap-4 w-full relative">
        <label htmlFor="confirmPassword" className="w-1/4">
          Confirm
        </label>
        <input
          type={hide[2] ? "password" : "text"}
          name="password"
          id="password"
          placeholder="confirm your new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 outline-none rounded-lg w-3/4 bg-gray-100"
        />
        <button
          onClick={(e) =>
            setHide((hide) => {
              e.preventDefault();
              return { ...hide, 2: !hide[2] };
            })
          }
          className="absolute right-1"
        >
          <img
            src={hide[2] ? "/hide.png" : "/view.png"}
            alt="hide-or-view-icon"
            className="w- full size-5"
          />
        </button>
      </div>
      <button
        onClick={handleReset}
        className="bg-blue-700 p-2 rounded-lg text-white hover:bg-blue-800"
      >
        Reset
      </button>
      <p className="font-mono text-sm text-center">{message}</p>
    </form>
  );
};

export default Reset;
