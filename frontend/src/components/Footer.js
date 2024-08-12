import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Footer() {
    const navigate = useNavigate();

    const handleHomeClick = ()=>{
        navigate('/homepage');

        window.scrollTo({
            top : 0,
            behavior : 'smooth'
        });
    }


  return (
    <>
        <Navbar />
        <footer className="footer">
        <div className="footer-content">
            <div className="footer-section">
                <img src='/logo.png' alt='MART logo' />
            </div>

            <div className="footer-section">
            <h2>MART</h2>
            <ul>
                <li onClick={handleHomeClick} >Home</li>
                <li onClick={()=> navigate('/about')} >About</li>
                <li>Contact Us</li>
            </ul>
            </div>
            
            <div className="footer-section">
            <h2>Socials</h2>
            <ul>
                <li><LinkedInIcon /></li>
                <li><FacebookIcon /></li>
                <li><InstagramIcon /></li>
            </ul>
            </div>

            <div className="footer-section">
            <h2>Extra Links</h2>
            <ul>
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
            </ul>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            </div>
            <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Support</a>
            </div>
            <div className="copyright">
            © Copyright 2021, All Rights Reserved by Postcraft
            </div>
        </div>
        </footer>
    </>
  );
}

export default Footer;
