
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Booking from "./components/Booking/Booking";
import Hero from "./components/Hero/Hero";
import Room from "./components/Room/Room";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={
          <>
        <Navbar/>
        <Hero/>
        <Room/>
        <Services/>
        <Footer/>
        </>
        } />
        <Route path="/auth/login" element={
          <>
          <Navbar/>
          <Login/>
          </>
          } />
          <Route path="/auth/signup" element={
          <>
          <Navbar/>
          <Signup/>
          </>
          } />
        <Route path="/services" element={
          <>
          <Navbar/>
          <Services/>
          </>
          } />
          <Route path="/contact" element={
          <>
          <Navbar/>
          <Contact/>
          </>
          } />
          <Route path="/about" element={
          <>
          <Navbar/>
          <About/>
          </>
          } />
          <Route path="/booking" element={
          <>
          <Navbar/>
          <Booking/>
          </>
          } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;