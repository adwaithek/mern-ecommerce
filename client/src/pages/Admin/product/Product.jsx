import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Layout from '../../../components/Layout/layout/Layout'
import AdminMenu from '../../../components/Adminmenu/Adminmenu'
import { Link } from 'react-router-dom'
import './product.css'




function Product() {

  const [products,setProducts]=useState([])


const getAllProducts=async()=>{

  try{

    const {data}=await axios.get("/api/v1/product/get-product");
    setProducts(data.products)


  }catch(error){
    console.log(error);
    toast.error("Something went wrong")
  }

} 

useEffect(()=>{
  getAllProducts();
},[])


  return (
    <Layout>
    <div className="row dashboard container-fluid m-3 p-3 dashboard">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9 ">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="product-link"
            >
              <div className="card m-2" >
                <img
                style={{ width: "15rem",height:'14rem' }}
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 26)}...</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);
};
export default Product