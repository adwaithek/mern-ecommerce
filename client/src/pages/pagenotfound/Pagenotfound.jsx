import React from 'react'
import Layout from '../../components/Layout/layout/Layout'
import { Link } from 'react-router-dom'
import './pnf.css'

function Pagenotfound() {
  return (
    <Layout>
 <div className="pnf">
    <h1 className="pnf-title">404</h1>
    <h2 className="pnf-heading">Page Not Found</h2>
    <Link to='/' className='pnf-btn'>Back to Home</Link>
 </div>
    </Layout>
   
  )
}

export default Pagenotfound