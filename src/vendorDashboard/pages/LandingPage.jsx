import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFranchise from '../components/forms/AddFranchise';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFranchise, setShowAddFranchise] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const [showLogOut, setShowLogOut] = useState(false);
  const [showAddFranchiseButton, setShowAddFranchiseButton] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (!!loginToken) {
      setShowLogOut(true);
      setShowWelcome(true)
    }
  }, []);

  useEffect(() => {
    const vendorFranchiseName = localStorage.getItem('vendorFranchiseName');
    const franchiseId = localStorage.getItem('franchiseId')
    if (vendorFranchiseName || franchiseId) {
      setShowAddFranchiseButton(false);
      setShowWelcome(true)
    }
  }, []);

  const logOutHandler = () => {
    confirm('Are you sure to logout?');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('franchiseId');
    localStorage.removeItem('vendorFranchiseName');
    setShowLogOut(false);
    setShowAddFranchiseButton(true);
    setShowWelcome(false)
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFranchise(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    
  };

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFranchise(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const handleAddFranchise = () => {
    if (showLogOut) {
      setShowAddFranchise(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert('Please login first');
      setShowLogin(true);
    }
  };

  const handleAddProduct = () => {
    if (showLogOut) {
      setShowAddProduct(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFranchise(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert('Please login first');
      setShowLogin(true);
    }
  };

  const handleWelcome = () => {
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFranchise(false);
    setShowAddProduct(false);
    setShowAllProducts(false);
  };

  const handleAllProducts = () => {
    if (showLogOut) {
      setShowAllProducts(true);
      setShowWelcome(false);
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFranchise(false);
      setShowAddProduct(false);
    } else {
      alert('Please login first');
      setShowLogin(true);
    }
  };

  return (
    <div>
      <section className="landingSection">
        <NavBar
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />
        <div className="collectionSection">
          <SideBar
            handleAddFranchise={handleAddFranchise}
            handleAddProduct={handleAddProduct}
            handleAllProducts={handleAllProducts}
            showAddFranchiseButton={showAddFranchiseButton}
          />

          {showAddFranchise && showLogOut && <AddFranchise />}
          {showLogin && <Login handleWelcome={handleWelcome} />}
          {showRegister && <Register handleLogin={handleLogin} />}
          {showAddProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
