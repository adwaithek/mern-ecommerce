import React from 'react'
import AdminMenu from '../../../components/Adminmenu/Adminmenu'
import Layout from '../../../components/Layout/layout/Layout'

function Users() {
  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
                <div className="col-md-9">
                    <AdminMenu/>
                </div>
            </div>
         
        </div>
    </Layout>
  )
}

export default Users