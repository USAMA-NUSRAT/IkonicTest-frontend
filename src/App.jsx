import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Product from "./pages/AddProduct";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/login" element={<SignIn />} />;
        <Route path="/signup" element={<SignUp />} />;
        <Route path="/addproduct" element={<Product />} />;
      </Routes>
    </>
  );
}

export default App;
