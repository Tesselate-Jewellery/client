import React from 'react';
import '../styling/About.css';

const About = () => {
    return (
        <div>
            <div className="about-container">
                <img src="/assets/workshop.jpg" alt="Behind Tesselate" className="about-img" />
                <h1>
                    MEET AISHA
                </h1>
                <p>
                    Aisha, a seasoned artisan at 45, has embarked on a 
                    transformative journey, co-founding Tesselate Jewellery. 
                    Her unwavering commitment to quality, sustainability, and 
                    enduring craftsmanship shapes the essence of Tesselate. With a 
                    rich background in the intricate art of jewelry making, Aisha's
                    passion was kindled in her youth, inspired by the cultural treasures 
                    of her heritage. Aisha's journey in the world of jewelry unfolded as she 
                    honed her skills over the past three decades, blending traditional 
                    craftsmanship with a contemporary touch. Drawing inspiration from her cultural 
                    roots, Aisha infuses each creation with a unique blend of heritage and modern 
                    design. Her journey mirrors the echoes of ancestral artistry, where the pursuit 
                    of excellence is a lifelong commitment.
                </p>
                <p>
                    Tesselate Jewellery, conceived in 2020, encapsulates 
                    the culmination of Aisha's artistic prowess. The inception 
                    of the brand unfolded during a reflective retreat to the Sapphire 
                    Coast in NSW, where the serene surroundings fueled Aisha's determination 
                    to turn her passion into a flourishing enterprise. Guided by her vision, 
                    she has meticulously cultivated Tesselate Jewellery, an emblem of artistry, 
                    sophistication, and timeless elegance.
                </p>
                <p>
                    In weaving the threads of her narrative, Aisha has discovered kindred 
                    spirits who share her vision for creating masterpieces. Together, they 
                    breathe life into Tesselate Jewellery, crafting pieces that resonate with 
                    the soul. As the brand blossoms, Aisha remains steadfast in her pursuit of 
                    creating not just jewelry but cherished heirlooms, each piece telling a story of 
                    heritage, passion, and the timeless allure of Tesselate.
                </p>
            </div>

            <div className="birthplace-container">
                <div className="birthplace-subtext">
                    <h1>ORIGIN</h1>
                    <p className="birthplace-text">
                        Born in the vibrant country of India, 
                        Aisha's journey unfolded against a backdrop of resilience 
                        and hope. From the narrow alleyways of adversity, 
                        her spirit soared with dreams that transcended the constraints 
                        of her humble beginnings. Aisha's fascination with opals, 
                        sparked at a tender age, became her guiding light amid the challenges 
                        of her upbringing. The luminescent hues of these precious stones mirrored 
                        the kaleidoscope of colors she encountered daily in the vibrant tapestry during her 
                        rough childhood.
                    </p>
                </div>
                <img src="/assets/town.jpg" alt="Birthplace" className="birthplace-img" />
            </div>
        </div>
    );
};

export default About;