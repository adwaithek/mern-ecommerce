import React from "react";
import AdminMenu from "../../../components/Adminmenu/Adminmenu";
import Layout from "../../../components/Layout/layout/Layout";
import { useAuth } from "../../../context/auth";
function Admindashboard(){


  const [auth] = useAuth();
  return (
   <Layout>
      <div className="container-fluid m-3 p-3 dashboard" style={{marginTop:"100px"}}>
        <div className="row">
          <div className="col-md-3">
          <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <img width={"130px"} style={{borderRadius:"50px"}} src="https://us.123rf.com/450wm/anatolir/anatolir2011/anatolir201105528/159470802-jurist-avatar-icon-flat-style.jpg?ver=6" alt="" />
              <h6 className="mt-3"> Admin Name : {auth?.user?.name}</h6>
              <h6> Admin Email : {auth?.user?.email}</h6>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
