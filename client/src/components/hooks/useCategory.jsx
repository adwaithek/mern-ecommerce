import React, { useEffect,useState } from 'react'

import axios from 'axios'
 

function useCategory() {
    const [categories,setCategories]=useState([])


    //get  category
const getCategories=async()=>{
    try{
        const {data}=await axios.get('/api/v1/category/get-category');
        setCategories(data?.category)

    }catch(error){
        console.log(error)
    }
}

useEffect(()=>{
    getCategories();
},[])

  return categories;
}

export default useCategory