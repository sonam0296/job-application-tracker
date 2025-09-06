import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./component/Auth";
import { ProtectedRoute } from "./component/Protected";
import { Jobs } from "./component/Jobs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        {/* Auth Page (login/register toggle) */}
        <Route path="/auth" element={<Login />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
