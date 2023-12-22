import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/Home.css';

const Home = () => {

  return (
    <div className="home-container">
      {/* Browse Section */}
      <section>
        <img src="/assets/browse_opal.jpg" alt="Australian Opal" className="opal-img"/>
        <p className="browse-text">Locally sourced Australian Opals, handcrafted to your specifications</p>
        <Link to="/gallery">
          <button>Browse More</button>
        </Link>
      </section>

      {/* Meet Your Makers Section */}
      <section>
        <div className="maker-section">
          <div>
            <img src="/assets/maker.jpg" alt="Jewellers" className="jeweller-img" />
          </div>
          <div className="jeweller-text">
            <p> Meet Aisha, the artist shaping the exquisite pieces at Tesselate. 
              Infusing her creations with a unique blend of passion and craftsmanship, Aisha 
              transforms each piece into a work of art, reflecting her dedication to bringing 
              beauty to life through the artistry of jewellery.
            </p>
            <Link to="/about">
              <button>Learn More</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ethical Opal Section */}
      <section>
        <div className="ethical-section">
          <div className="mine-text">
            <p>
            Our commitment to ethical practices is reflected in our 
            sourcing of opals from Australia, primarily Coober Pedy. 
            Mined with utmost care, these opals originate from a region 
            renowned for sustainable and responsible mining practices. 
            Our dedication to ethical sourcing ensures that each opal tells a 
            story of authenticity, quality, and environmental consciousness.
            </p>
          </div>
          <div>
            <img src="/assets/opal_mine.jpg" alt="opal_mine" className="mine-img" />
          </div>
        </div>
      </section>
      {/* Bottom Image section */}
      <section>
        <img src="/assets/opal_claw.jpg" alt="opal_claw" className="claw-img" />  
      </section>
    </div>
  );
};

export default Home;