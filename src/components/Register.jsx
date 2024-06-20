import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "./Message"; // Make sure this import is correct based on your file structure

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DEVELOPER", // Default value
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, profileImage: "www.profile-pic.com" };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_BASE_URL}/api/v1/auth/register`,
        dataToSubmit
      );
      if (response.status === 201) {
        setMessage({ title: "Success", content: "Registration successful!" });
        setTimeout(() => {
          setMessage(null);
          navigate("/login");
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      setMessage({
        title: "Error",
        content: error.response ? error.response.data.message : error.message,
      });
      setTimeout(() => {
        setMessage(null);
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative">
      {message && (
        <div className="absolute top-0 left-0 right-0">
          <Message title={message.title} message={message.content} />
        </div>
      )}
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
              required
            >
              <option value="DEVELOPER">DEVELOPER</option>
              <option value="RECRUITER">RECRUITER</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
