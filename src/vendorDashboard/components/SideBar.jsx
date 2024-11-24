import React from 'react';

const SideBar = ({ handleAddFranchise, handleAddProduct 
  ,handleAllProducts , showAddFranchiseButton}) => {
  return (
    <div className="sideBarSection">
      <ul className="sideBarItems">
        {showAddFranchiseButton ? <li className="sideBarItem" 
        onClick={handleAddFranchise}> Add Franchise </li> : " " }
        
        <li className="sideBarItem" onClick={handleAddProduct}>Add Product</li>
        <li className="sideBarItem" onClick={handleAllProducts }>All Products</li>
        <li className="sideBarItem">User Details</li>
      </ul>
    </div>
  );
};

export default SideBar;
