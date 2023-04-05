import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { Toaster } from "react-hot-toast";
import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/react-toastify'

function Layout({children}) {
  return (
    <div>
        <Header/>
        <main style={{minHeight:"90vh"}}>
        <Toaster />
            {children}
        </main>
        
        <Footer/>
    </div>
  )
}

export default Layout