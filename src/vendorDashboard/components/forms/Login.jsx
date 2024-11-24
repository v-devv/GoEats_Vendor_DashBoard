import React , {useState} from 'react';
import { API_URL } from '../../data/ApiPath';

const Login = ({handleWelcome}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login` ,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password})
      })
      const data = await response.json();
      if(response.ok){
        alert("Login Success");
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken' , data.token)
        handleWelcome();
      }
      const vendorId = data.vendorId
      console.log(vendorId)
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      window.location.reload();
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFranchiseId = vendorData.vendorFranchiseId;
        console.log(vendorFranchiseId);
        const vendorFranchiseName = vendorData.vendor.franchise[0].franchiseName;
        console.log("My franchise name :" +vendorFranchiseName)
        localStorage.setItem('franchiseId' , vendorFranchiseId) 
        localStorage.setItem('vendorFranchiseName' , vendorFranchiseName)
        
      }
      
    } catch (error) {
      console.error(error);

    }
  }
  return (
    <div className='loginSection'>
      <form className='loginForm' onSubmit={loginHandler}>
        <h2 className='loginTitle'>Login</h2>
        
        <div className='formGroup'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' value={email} onChange={(e)=>setEmail( e.target.value)} name='email' placeholder='Enter your email' required />
        </div>
        
        <div className='formGroup'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' value={password} onChange={(e)=>setPassword( e.target.value)} name='password' placeholder='Enter your password' required />
        </div>
        
        <button type='submit' className='submitButton'>Login</button>
      </form>
    </div>
  );
}

export default Login;
