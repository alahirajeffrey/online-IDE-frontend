import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "./Message"; // Make sure this import is correct based on your file structure

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_BASE_URL}/api/v1/auth/login`,
        formData
      );
      if (response.data.statusCode === 200) {
        localStorage.setItem("token", response.data.data.accessToken);
        navigate("/problems"); // Redirect to problems screen
      }
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : error.message
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000); // 1 second delay
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative">
      {errorMessage && (
        <div className="absolute top-0 left-0 right-0">
          <Message title="Error" message={errorMessage} />
        </div>
      )}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
