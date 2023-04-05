import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useSearch} from '../../context/Search'
import '../searchform/searchinput.css'

function SearchInput() {

    const navigate=useNavigate();
    const [values,setValues]=useSearch()

const handleSubmit=async(e)=>{

    e.preventDefault();
    try{
        const {data}=await axios.get(`/api/v1/product/search/${values.keyword}`)
        setValues({...values,results:data})
        navigate("/search")

    }catch(error){
        console.log(error );
    }

};

  return (
    <div>
<form className="d-flex" role="search"  onSubmit={handleSubmit}>
<input className="searchs form-control me-2" type="search" placeholder="Search here.."  aria-label="Search"  value={values.keyword} 
onChange={(e)=>setValues({...values,keyword:e.target.value})}
/>
<button    className="searchb  btn btn-outline-success " type="submit">
<p className='search'>Search</p>
</button>
</form>

    </div>
  )
}

export default SearchInput