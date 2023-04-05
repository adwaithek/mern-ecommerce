 import React, { useEffect, useState } from 'react'
import AdminMenu from '../../../components/Adminmenu/Adminmenu'
import Layout from '../../../components/Layout/layout/Layout'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast'
import axios from 'axios';
import CategoryForm from '../../../components/form/CategoryForm';
import { Modal } from 'antd'



 function CreateCategory() {

const[categories,setCategories]=useState([])



const [name,setName]=useState("")
const [visible,setVisible]=useState(false)
const [selected,setSelected]=useState(null)
const [updatedName,setUpdatedName]=useState("")
//form
const handleSubmit = async (e)=>{
  e.preventDefault()
  try{
    const {data} = await axios.post("/api/v1/category/create-category",{name,})
    if(data?.success){
      toast.success(`${name} is created`);
      getAllCategory();
    }else{
      toast.error(data.message)
    }

  }catch(error){
    console.log(error)
    toast.error("something went wrong in input form")

  }
}




//getcatgry

const getAllCategory=async()=>{
    try{
        const {data}=await axios.get("/api/v1/category/get-category")
        if(data.success){
            setCategories(data.category)
        }

    }catch(error){
        console.log(error)
        toast.error('Something went wrong in getting category')
    }


}

useEffect(()=>{
 getAllCategory(); 
},[])





//  update catgry
const handleUpdate=async(e)=>{
  e.preventDefault()
  try{
    const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
    if(data.success){
    toast.success(`${updatedName} is updated`)
    setSelected(null)
    setUpdatedName("")
    setVisible(false)
    getAllCategory();
    }else{
      toast.error(data.message)
    }
  }catch(error){
    console.log(error)
    toast.error("something went wrong")
  }
}



//dlt catgry
const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/category/delete-category/${pId}`
    );
    if (data.success) {
      toast.success(`category is deleted`);

      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Somtihing went wrong");
  }
};

   return (
   

<Layout>
<div  className="container-fluid m-3 p-3 dashboard">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h4 className='ms-3'>Manage categories</h4>
                    <div className="p-3 ">
                      <CategoryForm   handleSubmit={handleSubmit}  value={name} setValue={setName} />
                    </div>
             
                <div>
              <table className="table">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
    {categories?.map(c=>(
      <>
      <tr>
        <td key={c._id}>{c.name}</td>

        <td>
          <button className='btn btn-primary ms-2' onClick={()=> {setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
          <button className='btn btn-danger ms-2' onClick={()=>{
            handleDelete(c._id)
          }}>Delete</button>

        </td>
        
        </tr>
        </>
    ))}
  
   
    
  </tbody>
</table>

                </div>
                <Modal onCancel={()=>setVisible(false )} footer={null}  visible={visible}>
                  <CategoryForm value={updatedName} setValue={setUpdatedName}  handleSubmit={handleUpdate}  />
                </Modal>
            </div>
         
        </div>
        </div>
</Layout>
   )
 }
 
 export default CreateCategory