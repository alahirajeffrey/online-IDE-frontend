import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import MonacoEditor from "react-monaco-editor";
import Select from "react-select";
import { languageOptions } from "../constants/languageOptions";
import Message from "../components/Message";

const Solution = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [sourceCode, setSourceCode] = useState("");
  const [submissionResult, setSubmissionResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BE_BASE_URL}/api/v1/problems/${problemId}`
        );
        setProblem(response.data.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [problemId]);

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };

  const handleEditorChange = (newValue) => {
    setSourceCode(newValue);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_BE_BASE_URL}/api/v1/submissions`,
        {
          problemId: problemId,
          languageId: language.id,
          sourceCode: btoa(sourceCode),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmissionResult(response.data.data.result);

      if (response.data.data.result === "PASSED") {
        setTimeout(() => {
          navigate("/problems");
        }, 3000);
      }
    } catch (error) {
      window.alert(
        `Error submitting solution: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#1E3A8A" : "white",
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#4A5568",
      borderColor: "#4A5568",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-4xl">
        {submissionResult && (
          <Message title="Submission Result" message={`${submissionResult}`} />
        )}
        {problem && !submissionResult && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              {problem.title}
            </h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p>{problem.description}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Example</h2>
                <p>{problem.example}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Expected Output</h2>
                <p>{problem.expectedOutput}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Input</h2>
                <p>{problem.input}</p>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-4">
              <Select
                options={languageOptions}
                value={language}
                onChange={handleLanguageChange}
                className="mb-4"
                styles={customStyles}
              />
              <MonacoEditor
                width="100%"
                height="400"
                language={language.value}
                theme="vs-dark"
                value={sourceCode}
                onChange={handleEditorChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white"
            >
              Submit Solution
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Solution;
