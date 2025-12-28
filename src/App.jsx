import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "/images/logo.png";

// services 
import service1 from "/images/service1.jpeg";
import service2 from "/images/service2.png";
import service3 from "/images/service3.jpg";
import service4 from "/images/service4.png";
import service5 from "/images/service5.jpg";

// water fountains
import fountain1 from "/images/fountain1.png";
import fountain2 from "/images/fountain2.png";
import fountain3 from "/images/fountain3.png";
import fountain4 from "/images/fountain4.jpeg";

import fountain11 from "/videos/fountain11.mov";
import fountain22 from "/videos/fountain22.MOV";
import fountain33 from "/videos/fountain33.MOV";
import fountain44 from "/videos/fountain44.MP4"


// sprinkler
import sprinkler1 from "/images/sprinkler1.jpeg";
import sprinkler2 from "/images/sprinker2.jpeg";
import sprinkler3 from "/images/sprinkler3.jpeg";

import sprinkler11 from "/videos/sprinkler11.mp4";
import sprinkler22 from "/videos/sprinkler22.mp4";
import sprinkler33 from "/videos/sprinkler33.mp4";
import sprinkler44 from "/videos/sprinkler44.MOV"

// solar panel
import solar11 from "/videos/solar11.mp4"

// drip irrigation 
import drip from "/images/drip irrigation.jpeg";
// swimming pools and ponds
import swim11 from "/videos/swim11.MOV"
import pool1 from "/images/pool1.jpg"
import pool11 from "/videos/pool11.mp4"
import pool22 from "/videos/pool22.mp4"


//default
import annal from "/videos/annal.mp4";
import about from "/videos/about.mp4";



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState({ src: fountain1, type: "image" });
  const [activeCategory, setActiveCategory] = useState("Water Fountains");

  const impactCardsRef = useRef(null);

  // ✅ Gallery data grouped by folder/category
  const galleryData = {
    "Water Fountains": [
      { src: fountain22, type: "video", title: "Fountain Show" },
      { src: fountain33, type: "video", title: "Fountain Show" },
      { src: fountain3, type: "image", title: "Outdoor Fountain Display" },
      { src: fountain44, type: "video", title: "Fountain Show" },
      // { src: fountain1, type: "image", title: "Decorative Garden Fountain" },
      { src: fountain4, type: "image", title: "Outdoor Fountain Display" },
      { src: fountain11, type: "video", title: "Interior Fountain Show" },
      { src: fountain2, type: "image", title: "Outdoor Fountain with light show" },
    ],
    "Water Sprinklers": [
      // { src: sprinkler33, type: "video", title: "Automatics Lawn Sprinkler" },
      { src: sprinkler22, type: "video", title: "Rotating Sprinkler" },
      { src: sprinkler1, type: "image", title: "Garden Sprinkler System" },
      { src: sprinkler11, type: "video", title: "Sprinkler System over the landscape" },
      { src: sprinkler2, type: "image", title: "Farm Sprinkler Setup" },
      { src: sprinkler33, type: "video", title: "Sprinkler System on garden" },
      { src: sprinkler44, type: "video", title: "Sprinkler System on garden" },
      { src: sprinkler3, type: "image", title: "Farm Sprinkler Setup" },
    ],
    "Solar Rooftop Panels": [
      { src: solar11, type: "video", title: "Solar panel on rooftop" },
    ],
    "Drip Irrigation Systems": [
      { src: drip, type: "image", title: "Drip irrigation system" },
      // { src: g3, type: "image", title: "Drip Setup for Greenhouse" },
    ],
    "Swimming Pools & Ponds": [
      { src: swim11, type: "video", title: "Interior Pool for home" },
      { src: pool11, type: "video", title: "Swimming Pool for home" },
      { src: pool1, type: "image", title: "Luxury Pool Design" },
      { src: pool22, type: "video", title: "Swimming Pool for home" },
    ],
  };

  // ✅ Automatically show first item in each category
  useEffect(() => {
    const firstItem = galleryData[activeCategory]?.[0];
    if (firstItem) setPreviewMedia(firstItem);
  }, [activeCategory]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const cardsContainer = impactCardsRef.current;
    if (!cardsContainer) return;
  
    let interval;
  
    const startAutoScroll = () => {
      if (window.innerWidth <= 768) {
        const card = cardsContainer.querySelector(".card");
        if (!card) return;
  
        const scrollAmount = card.offsetWidth + 16; // 16px gap
        let scrollPosition = 0;
  
        interval = setInterval(() => {
          scrollPosition += scrollAmount;
          if (scrollPosition >= cardsContainer.scrollWidth - cardsContainer.clientWidth) {
            scrollPosition = 0;
          }
          cardsContainer.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }, 3000); // change card every 3s
      }
    };
  
    startAutoScroll();
    window.addEventListener("resize", startAutoScroll);
  
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", startAutoScroll);
    };
  }, []);
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
        <a href="/">
          <img src={logo} alt="Annal Electricals Logo" className="logo" />
        </a>

          {/* <img src={logo} alt="Annal Electricals Logo" /> */}
          <span>Annal Electricals & Irrigation System</span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {["home", "Our Services", "Know Us", "Our Work", "contact"].map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                onClick={() => setIsMenuOpen(false)} // close menu on click
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </nav>

     {/* Hero Section */}
      <section className="hero" id="home" data-aos="fade-up">
        {/* 🎥 Background Video */}
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={annal} type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        {/* 🌑 Overlay for brightness control */}
        <div className="hero-overlay"></div>

        {/* 💬 Content */}
        <div className="hero-content">
          <h1>
            Innovative <span>Water & Power</span> Solutions
          </h1>
          <p>
          Transform your home or business with intelligent <strong>irrigation systems</strong>, 
           energy-efficient <strong>electrical solutions</strong>, and stunning <strong>water features</strong>.  
          </p>
          <p>
           Trusted across Mangalore, we have been the top service providers for leading builders, 
           delivering quality, reliability, and innovation in every project.          </p>
        </div>

        {/* 🌿 Impact Cards */}
        <div className="impact-cards" ref={impactCardsRef}>
        <div className="card" data-aos="fade-up">
            <h3>3000+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="100">
            <h3>15</h3>
            <p>Years of Experience</p>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="200">
            <h3>100%</h3>
            <p>Customer Satisfaction</p>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="300">
            <h3>24/7</h3>
            <p>Support Availability</p>
          </div>
        </div>
      </section>




      {/* Services Section */}
      <section className="services" id="Our Services" data-aos="fade-up">
        <h2>Our <span>Premium</span> Services</h2>
        <div className="services-grid">
          {[
            {
              title: "Automation in Irrigation",
              desc: "Reduces manpower and ensures efficient, hassle-free watering for your garden with advanced fog systems, drip irrigation, and automated sprinkler solutions.",
              src: service1,
            },
            {
              title: "Water Fountains",
              desc: "Where art meets engineering — crafting elegant water fountains that bring style, serenity, and precision to homes, gardens, and commercial spaces.",
              src: service2,
            },
         
            {
              title: "Swimming Pools",
              desc: "We craft pools that bring luxury, comfort, and lasting quality to your surroundings.",
              src: service3,
            },
           
            {
              title: "Electrical Works",
              desc: "We specialize in High Tension (HT) and Transformer Centre (TC) installations, combining expertise with a commitment to quality and reliability.",
              src: service4,
            },
            {
              title: "Rooftop Solar Panel",
              desc: "Harness the sun’s power with efficient solar rooftop panels for a cleaner, cost-saving energy future.",
              src: service5,
            },
          ].map((service, i) => (
            <div
              className="service-card"
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <img src={service.img} alt={service.title} className="service-img" />
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* About Section */}
        <section className="about" id="Know Us" data-aos="fade-up">
          {/* Fullscreen background video */}
          <video
            className="about-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={about} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay to dull video */}
          <div className="about-overlay-bg"></div>

          {/* Content */}
          <div className="about-overlay">
            <h2>About <span>Annal Electricals & Irrigation Systems</span></h2>

            <p>
              At Annal Electricals and Irrigation, we bring together innovation and sustainability to deliver smarter, greener, and more efficient solutions for residential, commercial, and agricultural projects.
            </p>
            <p>
              With years of hands-on experience and a deep passion for excellence, our team transforms ideas into reality creating reliable, high-quality systems that stand the test of time.
            </p>
            <p>    From concept to completion, we manage every detail with precision and care, ensuring seamless execution, superior craftsmanship, and lasting performance.
            </p>
              Whether you're a builder, homeowner, or developer, Annal Electricals and Irrigation is your trusted partner for solutions that blend technology, design, and sustainability powering progress the smart way.
          </div>
        </section>

        {/* Gallery Section - Categorized by Project Type */}
        <section className="gallery" id="Our Work" data-aos="fade-up">
          <h2 className="gallery-heading">
            Navigating <span>Our Masterpieces</span>
          </h2>
          <p className="gallery-subheading">
            Explore Our Smart Irrigation, Water Fountain, Solar, and Pool Projects
          </p>

          {/* Category Tabs */}
          <div className="gallery-categories">
            {[
              "Water Fountains",
              "Water Sprinklers",
              "Swimming Pools & Ponds",
              "Drip Irrigation Systems",
              "Solar Rooftop Panels",

            ].map((category) => (
              <button
                key={category}
                className={`category-btn ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="gallery-container">
            {/* Left: Main Preview */}
            <div className="gallery-main">
              {previewMedia?.type === "video" ? (
                <video
                  src={previewMedia.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="gallery-video"
                />
              ) : (
                <img src={previewMedia?.src} alt="Preview" />
              )}
            </div>

            {/* Right: Filtered Project Thumbnails */}
            <div className="gallery-list">
              {galleryData[activeCategory]?.map((item, i) => (
                <div
                  key={i}
                  className={`gallery-list-item ${
                    previewMedia?.src === item.src ? "active" : ""
                  }`}
                  onClick={() => setPreviewMedia(item)}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="thumb-video"
                    />
                  ) : (
                    <img src={item.src} alt={item.title} />
                  )}
                  <div className="gallery-info">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>




        {/* Gallery Section - Redesigned with Inline Preview (Images + Videos)

        
        <section className="gallery" id="Our Work" data-aos="fade-up">
          <h2 className="gallery-heading">
            Navigating <span>Our Masterpieces</span>
          </h2>
          <p className="gallery-subheading">
            Explore Our Smart Irrigation and Water Fountain Projects with Interactive Visualization
          </p>

          <div className="gallery-container">
            <div className="gallery-main">
              {previewMedia?.type === "video" ? (
                <video
                  src={previewMedia.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="gallery-video"
                />
              ) : (
                <img src={previewMedia?.src || g1} alt="Preview" />
              )}
            </div>

            <div className="gallery-list">
              {[
                { src: gv2, type: "video", title: "Sprinkler on Landscape" },
                { src: g6, type: "image", title: "Water Sprinkler for Farms"},
                { src: gv3, type: "video", title: "Water Fountain" },
                { src: g1, type: "image", title: "Water Fountain" },
                { src: g5, type: "image", title: "Water Sprinkler for Gardens"},
                { src: g2, type: "image", title: "Water Fountain"},
                
                { src: g3, type: "image", title: "Sprinkler" },
                { src: gv1, type: "video", title: "Water Fountain for Home" },
                { src: g4, type: "image", title: "Drip Irrigation" },
                { src: gv4, type: "video", title: "Water Sprinkler for Gardens"},
                
                


              ].map((item, i) => (
                <div
                  key={i}
                  className={`gallery-list-item ${
                    previewMedia?.src === item.src ? "active" : ""
                  }`}
                  onClick={() => setPreviewMedia(item)}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="thumb-video"
                    />
                  ) : (
                    <img src={item.src} alt="Gallery" />
                  )}

      
                  <div className="gallery-info">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}



        <footer className="footer" id="contact">
          <div className="footer-content">
            {/* Logo & Contact */}
            <div className="footer-logo">
              <img src={logo} alt="Annal Electricals Logo" className="footer-logo-img" />
              <p>
                <strong>Main Office:</strong> <a href="https://share.google/OBSYXuKMPofzOGlsT">📍 Kotimura 5th Cross, Kulshekar, Mangalore, Karnataka 575005</a>
              </p>
              <p><strong>📞</strong> <a href="tel:+919686612726">+91 9686612726</a></p>
              <p><strong>✉️</strong> <a href="mailto:annalelectricals@gmail.com">annalelectricals@gmail.com</a></p>

              <div className="social-icons">
              <a href="https://www.facebook.com/share/16WTJXpmVs/?mibextid=wwXIfr"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/annalelectricals"><i className="fab fa-instagram"></i></a>
              <a href="https://wa.me/919686612726"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>

            {/* Our Services */}
            <div className="footer-column">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#Our Services">Irrigation Systems</a></li>
                <li><a href="#Our Services">Electrical Works</a></li>
                <li><a href="#Our Services">Water Fountains</a></li>
                <li><a href="#Our Services">Swimming Pools</a></li>
                <li><a href="#Our Services">Garden Lighting</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#Know Us">About Us</a></li>
                <li><a href="#Our Services">Services</a></li>
                <li><a href="#Our Work">Gallery</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 Annal Electricals & Irrigation System. All Rights Reserved.</p>
          </div>
        </footer>



    </div>
  );
}

export default App;


