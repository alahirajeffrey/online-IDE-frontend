import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BE_BASE_URL}/api/v1/problems?page=1&pageSize=10`
        );
        setProblems(response.data.data.problems);
      } catch (error) {
        window.alert(
          `Error logging in: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    };

    fetchProblems();
  }, []);

  const handleSolveClick = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Problems</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{problem.title}</h2>
              <p className="text-gray-400">{problem.description}</p>
            </div>
            <button
              className="self-end mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
              onClick={() => handleSolveClick(problem.id)}
            >
              SOLVE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problems;
