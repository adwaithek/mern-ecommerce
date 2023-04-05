import { useNavigate,Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./login.css";
import { useAuth } from "../../context/auth";


function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [auth,setAuth]=useAuth()
  


  const navigate = useNavigate()
  const location=useLocation()
 

  const handleChange = (e) => {
  };

   const handleClick=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("/api/v1/auth/login",{

        email,password
      });
      if(res && res.data.success){
        alert(res.data && res.data.message);
        setAuth({
          ...auth,user:res.data.user,token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data))
        navigate(location.state || '/')
      }else{
        alert(res.data.message)
      }
    }catch(error){
      console.log(error);
      alert("something went wrong")
    }

   }

  
   


 return(
   <div className="bg">
   <div className="wrapper">
       <form className="login" onSubmit={handleClick}>
         <p className="title">Login</p>
         <input  type="email" autoFocus value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="username"  placeholder="email"  required />
         {/* <i style={{color:"black"}}  className="fa fa-user " /> */}
         <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} id="password" className="password"  placeholder="Password" required />
         
         {/* <i className="fa fa-key" /> */}
         <a >Dont have a account ?</a><span><Link to="/register" >Register here</Link></span>
         <button>
           <i className="spinner" />
           <span    className="">Log in</span>
         </button>
       </form>
       <p />
     </div>
     </div>
   );
 }


 export default Login;