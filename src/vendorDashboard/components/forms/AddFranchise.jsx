import React , {useState} from 'react';
import { API_URL } from '../../data/ApiPath';
const AddFranchise = () => {
  const [franchiseName, setFranchiseName] = useState("");
  const [area , setArea] = useState("");
  const [category, setCategory] = useState("");
  const [region , setRegion] = useState([]);
  const [offer , setOffer] = useState([]);
  const [file , setFile] = useState(null);

  const handleCategoryChange = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter(item => item !== value));
    }else{
      setCategory([...category,value]);
    }
  }
  const handleRegionChange = (event)=>{
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter(item => item !== value));
    }
    else{
      setRegion([...region,value]);
      }
  }

  const handleImageUpload = (event) => {
    const fileSelect = event.target.files[0];
    setFile(fileSelect);
  };
  

  const handleFranchiseSubmit=async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.error("User not authenticated", error)
      }
      const formData = new FormData();
      formData.append('franchiseName', franchiseName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('franchiseLogo', file);

      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
        });
      const response = await fetch(`${API_URL}/franchise/add-franchise` ,{
        method: 'POST',
        headers: {
          'token': `${loginToken}`
          },
          body: formData
          
      })
      const data = await response.json();
      if(response.ok){
        console.log(data);
        alert("Franchese added successfully")
        setFranchiseName("");
        setArea("");
        setOffer("");
        setCategory([]);
        setRegion([]);
        setFile(null);

      }else if( data.message === "One Vendor can have only one franchise"){
        alert("One Vendor can have only one franchise");
        
      }else{
        alert("Error adding franchise");
        console.error("Error adding franchise")
      }
      const franchiseId = data.franchiseId
      console.log(franchiseId);
      localStorage.setItem('franchiseId' ,franchiseId)
      window.location.reload();
    } catch (error) {
      console.error("Error adding franchise", error)
    }
  }
  
  return (
    <div className='addFranchiseSection'>
      <form className='addFranchiseForm' onSubmit={handleFranchiseSubmit}>
        <h2 className='addFranchiseTitle'>Add Franchise</h2>
        
        <div className='formGroup'>
          <label htmlFor='franchiseName'>Franchise Name</label>
          <input type='text' id='franchiseName' name='franchiseName' value={franchiseName} onChange={(e)=>setFranchiseName(e.target.value)} placeholder='Enter Franchise name' required />
        </div>
        
        <div className='formGroup'>
          <label htmlFor='area'>Area</label>
          <input type='text' id='area' name='area' value={area} onChange={(e)=>setArea(e.target.value)}  placeholder='Enter area' required />
        </div>
        
        <div className='formGroup'>
          <label>Category</label>
          <div className='checkboxGroup'>
            <label className='checkboxLabel'>
              <input type='checkbox' checked={category.includes('veg')} onChange={handleCategoryChange} value="veg" />
              <span className='customCheckbox'></span>
              Veg
            </label>
            <label className='checkboxLabel'>
              <input type='checkbox' checked={category.includes('non-veg')} onChange={handleCategoryChange } value="non-veg" />
              <span className='customCheckbox'></span>
              Non-Veg
            </label>
          </div>
        </div>
        
        <div className='formGroup'>
          <label>Region</label>
          <div className='checkboxGroup'>
            <label className='checkboxLabel south'>
              <input type='checkbox' checked={region.includes('north-indian')} onChange={handleRegionChange} value="north-indian" />
              <span className='customCheckbox'></span>
              South Indian
            </label>
            <label className='checkboxLabel north'>
              <input type='checkbox'checked={region.includes('south-indian')} onChange={handleRegionChange}  value="south-indian" />
              <span className='customCheckbox'></span>
              North Indian
            </label>
            <label className='checkboxLabel chinese'>
              <input type='checkbox' checked={region.includes('chinese')} onChange={handleRegionChange}  value="chinese" />
              <span className='customCheckbox'></span>
              Chinese
            </label>
            <label className='checkboxLabel bakery'>
              <input type='checkbox' checked={region.includes('bakery')} onChange={handleRegionChange}  value="bakery" />
              <span className='customCheckbox'></span>
              Bakery
            </label>
          </div>
        </div>
        
        <div className='formGroup'>
          <label htmlFor='offer'>Offer</label>
          <input type='text' id='offer' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)} placeholder='Enter offer details' required />
        </div>
        
        <div className='formGroup'>
          <label htmlFor='image'>Image</label>
          <input type='file' id='image' name='franchiseLogo' onChange={handleImageUpload} required />
        </div>
        
        <button type='submit' className='addFranchiseButton'>Add Franchise</button>
      </form>
    </div>
  );
};

export default AddFranchise;
