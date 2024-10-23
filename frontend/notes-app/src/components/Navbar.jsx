import React, { useState } from 'react'
import ProfileInfo from './Cards/ProfileInfo'
import SearchBar from './SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {


  const [SearchQuery, setSearchQuery] =useState("");

  const navigate = useNavigate();
  const onLogout =()=>{

    localStorage.clear()
    navigate("/login");
  }

  const handleSearch = () =>{
    if(SearchQuery){
      onSearchNote(SearchQuery);
    }
  };

  const onClearSearch =() =>{
    setSearchQuery("");
    handleClearSearch();
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h1 className='text-xl font-medium text-black py-2'>NOTE-KEEPING</h1>

        <SearchBar value={SearchQuery} 
          onChange={({target})=>{
            setSearchQuery(target.value);
          }}

          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar