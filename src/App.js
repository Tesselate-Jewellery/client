import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import ExampleComponent from "./pages/ExampleComponent";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/example" element={<ExampleComponent />} />
        <Route path="/protected" element={<ProtectedRoute />} />
      </Routes>
    </div>
  );
}

export default App;