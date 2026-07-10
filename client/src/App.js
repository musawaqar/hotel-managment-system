
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Booking from "./components/Booking/Booking";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";
import ManageRooms from "./components/ManageRooms/ManageRooms";
import Rooms from "./components/Room/Rooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={
          <>
        <Navbar/>
        <Hero/>
        <Services/>
        <Footer/>
        </>
        } />
         <Route path="/rooms" element={
          <>
          <Navbar/>
          <Rooms/>
          <Footer/>
          </>
          } />
        <Route path="/auth/login" element={
          <>
          <Navbar/>
          <Login/>
          <Footer/>
          </>
          } />
          <Route path="/auth/signup" element={
          <>
          <Navbar/>
          <Signup/>
          <Footer/>
          </>
          } />
        <Route path="/services" element={
          <>
          <Navbar/>
          <Services/>
          <Footer/>

          </>
          } />
          <Route path="/contact" element={
          <>
          <Navbar/>
          <Contact/>
          <Footer/>
          </>
          } />
          <Route path="/about" element={
          <>
          <Navbar/>
          <About/>
          <Footer/>
          </>
          } />
          <Route path="/booking" element={
          <>
          <Navbar/>
          <Booking/>
          <Footer/>
          </>
          } />
          <Route path="/managerooms" element = {
            <>
            <Navbar/>
            <ManageRooms/>
            <Footer/>
            </>
          }
          />
      </Routes>
    </BrowserRouter>
  );
}
export default App;