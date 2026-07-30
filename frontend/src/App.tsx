import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
  

}

export default App
