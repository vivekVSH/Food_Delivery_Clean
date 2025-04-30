import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>This is the simple dummy text for the simle and effective wesite of you want change the this text you can  change IT AS PER your condition</p>
                <div className="footer-social-item">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </div>
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+91 7517033784</li>
                <li>handevivek942@gmail.com</li>
              </ul>
            </div>
        </div>
       <hr /> 
       <p className='footer-copyright'>Copyright 2025 © Food-Delivery.com - All Right Reserved</p>
    </div>
  )
}

export default footer
