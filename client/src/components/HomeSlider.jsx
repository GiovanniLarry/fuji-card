import { useState, useEffect } from 'react';
import './HomeSlider.css';

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/hero-1.png', // Placeholder, user will provide
      title: 'Pre-Order Start!!',
      subtitle: 'M4 Ninja Spinner',
      info: 'Releasing on March 13!',
      buttonText: 'ORDER NOW!',
      link: '/products?search=ninja'
    },
    // Add more slides if needed
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="home-slider">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.image})` }}
        >
          <div className="slide-content">
            <div className="glass-box">
              <p className="pre-order-tag">{slide.title}</p>
              <h2 className="slide-main-title">{slide.subtitle}</h2>
              <p className="release-info">{slide.info}</p>
              <a href={slide.link} className="order-btn-mockup">
                {slide.buttonText}
              </a>
            </div>
          </div>
        </div>
      ))}
      
      <div className="slider-dots">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
