import Home from "./pages/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar now appears on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer /> {/* Footer now appears on all pages */}
    </Router>
  );
}

export default App;
