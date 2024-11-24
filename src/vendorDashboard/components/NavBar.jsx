
import React from 'react'

const NavBar = ({handleLogin , handleRegister ,showLogOut ,logOutHandler}) => {
  const franchiseName = localStorage.getItem('vendorFranchiseName');

  return (
    <div className="navSection">
      <div className="company">
        Vendor Dashboard
      </div>
      <div>
        <h2 className='franchiseName'>Franchise Name : {franchiseName}</h2>
      </div>
      <div className="userAuth">
        {!showLogOut ?<>
          <span onClick={handleLogin}>Login </span>
          <span onClick={handleRegister}>Register</span>
        </> :<span onClick={logOutHandler}>Logout</span> }
        
        

      </div>
    </div>
  )
}

export default NavBar