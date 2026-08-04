import Dashboard from "./pages/Dashboard"
import Signin from "./pages/Signin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./lib/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        </Routes>
      </Router>
    </>
  )
  

}

export default App
