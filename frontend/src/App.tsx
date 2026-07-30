import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
  

}

export default App
