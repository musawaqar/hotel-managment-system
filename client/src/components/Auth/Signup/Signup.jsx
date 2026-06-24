import {useState, useEffect} from 'react';
import "./Login.css";
import hotelImg  from "../assets/hotel.jpg";
import axios from "axios";



export default function Signup() {
  const [signupData, setSignupData] = useState({
    useName:"",
    email:"",
    password:"",
    role:"customer"
  });


  const handleSignup = async() => {
    try {
      const response = await axios.post(process.env.BACKEND_URL, {userName, email, password, role});
    } catch (error) {
      console.error("Error While Signup, ", error);
    }
  }
  return (
    <div className='container'>
          <div className="login-box">
      <h2 className='headings'>Wellcome To Transylvania</h2>
      <h4 className='headings'>Please Enter Your Username</h4>
      <input className='text' type="text" placeholder='Enter your Username'/>
      <h4 className='headings'>Please enter your email</h4>
      <input className='text' type="email" placeholder='Enter your email' />
      <h4 className='headings'>Please enter your Password</h4>
      <input className='text' type="password" placeholder='Enter your password' />
      <button>Sign up</button>
</div>
    </div>
  )
}
