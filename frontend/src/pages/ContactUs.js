import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

function ContactUs() {
  return (
    <>
        <div className='contactus-container' >
        <Navbar />
        <ContactForm />
        
        </div>
        <Footer />
    </>
  )
}

export default ContactUs
