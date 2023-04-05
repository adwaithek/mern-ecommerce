import React from "react";
import Layout from "../../../components/Layout/layout/Layout";
import UserMenu from "../../../components/Layout/usermenu/Usermenu";
import { useAuth } from "../../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
    <div className="container-flui m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9"  >
          <div className="card w-75 p-3">
          <img width={"130px"} style={{borderRadius:"50px"}} src="https://us.123rf.com/450wm/anatolir/anatolir2011/anatolir201105528/159470802-jurist-avatar-icon-flat-style.jpg?ver=6" alt="" />

            <h6 className="mt-4">Name :{auth?.user?.name}</h6>
            <h6>Email :{auth?.user?.email}</h6>
            
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
};

export default Dashboard;
