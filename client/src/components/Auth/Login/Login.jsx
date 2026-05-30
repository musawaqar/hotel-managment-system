import React from 'react'
import "./Login.css"
export default function Login() {
  return (
   <div className="container">
  <div className="login-box">
    <h1>Hotel Transylvania</h1>
    <h2>Wellcome Back!!</h2>

    <h3 className='headings'>Username</h3>
    <input className="text" type="text" placeholder="Enter your Username" />

    <h3 className='headings'>Password</h3>
    <input  className="text"type="text" placeholder="Enter Your Password" />
    <button>Login</button>

    <p>Dont have an Account?? SignUp</p>
  </div>
</div>
  )
}
