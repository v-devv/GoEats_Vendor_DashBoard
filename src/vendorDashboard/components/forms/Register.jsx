import React , {useState} from 'react';
import { API_URL } from '../../data/ApiPath';

const Register = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("");
  const [loading , setLoading ] = useState(true);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register` ,{
        method: 'POST',
        headers:{
          'Content-Type' :'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      }
      ) 
      const data = await response.json();
      
      if(response.ok){
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor Register Success");
        handleLogin();
      }
    } catch (error) {
      console.error("Rister failed " ,error);
      alert("Registration failed")
    }
  }


  return (
    <div className='registerSection'>
      <form className='registerForm' onSubmit={handleSubmit}>
        <h2 className='registerTitle'>Register</h2>
        
        <div className='formGroup'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your username' required />
        </div>
        
        <div className='formGroup'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' required />
        </div>
        
        <div className='formGroup'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password ' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your password' required />
        </div>
        
        <button type='submit' className='submitButtonRegister'>Register</button>
      </form>
    </div>
  );
}

export default Register;
