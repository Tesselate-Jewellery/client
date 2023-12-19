import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="home-container">
      {/* Browse Section */}
      <section>
        <img src="url_to_opal_image" alt="Australian Opal" />
        <p>Locally sourced Australian Opals, handcrafted to your specifications</p>
        <Link to="/gallery">
          <button>Browse More</button>
        </Link>
      </section>

      {/* Meet Your Makers Section */}
      <section>
        <h2>Meet Your Makers</h2>
        <img src="url_to_jewellers_image" alt="Jewellers" />
        <p>Discover the talented jewellers behind Tesselate.</p>
        <Link to="/about">
          <button>Learn More</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;