// YE SAB sab se pehla wala home page pe add krna usko signle scroll page bnana hai 
// Navbar
// Hero section (first impression)
// About hotel
// Rooms preview
// Services
// Gallery
// Footer
import About from "./myComp/About";
import Booking from "./myComp/Booking";
import Contact from "./myComp/Contact";
import Footer from "./myComp/Footer";
import Hero from "./myComp/Hero";
import Login from "./myComp/Login";
import Navbar from "./myComp/Navbar";
import Room from "./myComp/Room";
import Services from "./myComp/Services";
import Signup from "./myComp/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={
          <>
        <Navbar />
        <Hero/>
        <Room/>
        <Services/>
        <Footer/>
        </>
        } />
        <Route path="/Services" element={
          <>
          <Navbar/>
          <Services />
          </>
          } />
          <Route path="/Contact" element={
          <>
          <Navbar/>
          <Contact/>
          </>
          } />
          <Route path="/About" element={
          <>
          <Navbar/>
          <About/>
          </>
          } />
          <Route path="/Booking" element={
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