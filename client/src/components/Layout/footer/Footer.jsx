import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

function Footer() {
  return (

    <div className='footer'>
      <p className="arr text-center">All Right Reserved &copy; INSTAMART</p>
      <p className="link text-center mt-1">
        <Link  to='/about'>About</Link> | <Link to='/contact' >Contact</Link> | <Link to='/policy' >Privacy Policy</Link>
         </p>
    </div>
  )
}

export default Footer