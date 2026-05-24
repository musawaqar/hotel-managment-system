
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Booking from "./components/Booking/Booking";
import Hero from "./components/Hero/Hero";
import Room from "./components/Room/Room";
import Footer from "./components/Footer/Footer";
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
        <Route path="/Services" element={
          <>
          <Navbar/>
          <Services/>
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