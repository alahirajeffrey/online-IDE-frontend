import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Problems from "./components/Problems";
import Solution from "./components/Solution";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:problemId" element={<Solution />} />
      </Routes>
    </Router>
  );
}

export default App;
