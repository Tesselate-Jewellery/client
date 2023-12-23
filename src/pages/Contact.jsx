import React from 'react';
import '../styling/Contact.css'


const Contact = () => {

    return (
        <div className="contact-text">
            <div>
                <h1>CONTACT US</h1>
            </div>
            <div>
                <img src="/assets/contact_img.jpg" alt="contact-img" className="contact-img" />
                <p>Send us a message by emailing <strong>tesselatejewellery@gmail.com</strong></p>
                <p>We will get back to you as soon as possible.</p>
            </div>
        </div>
    );
};

export default Contact;