import { useEffect, useState, useRef, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useInView } from "react-intersection-observer";

// Assets
import logo from "/images/logo.png";
import fountain2 from "/images/fountain2.png";
import fountain3 from "/images/fountain3.png";
import fountain4 from "/images/fountain4.jpeg";
import fountain11 from "/videos/fountain11.mov";
import fountain22 from "/videos/fountain22.MOV";
import fountain33 from "/videos/fountain33.MOV";
import fountain44 from "/videos/fountain44.MP4";
import sprinkler1 from "/images/sprinkler1.jpeg";
import sprinkler2 from "/images/sprinker2.jpeg";
import sprinkler3 from "/images/sprinkler3.jpeg";
import sprinkler11 from "/videos/sprinkler11.mp4";
import sprinkler22 from "/videos/sprinkler22.mp4";
import sprinkler33 from "/videos/sprinkler33.mp4";
import sprinkler44 from "/videos/sprinkler44.MOV";
import solar11 from "/videos/solar11.mp4";
import drip from "/images/drip irrigation.jpeg";
import swim11 from "/videos/swim11.MOV";
import pool1 from "/images/pool1.jpg";
import pool11 from "/videos/pool11.mp4";
import pool22 from "/videos/pool22.mp4";
import annal from "/videos/annal.mp4";
import about from "/videos/about.mp4";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Water Fountains");
  const [previewMedia, setPreviewMedia] = useState({ src: fountain22, type: "video" });

  const impactCardsRef = useRef(null);

  const galleryData = useMemo(() => ({
    "Water Fountains": [
      { src: fountain22, type: "video", title: "Fountain Show" },
      { src: fountain33, type: "video", title: "Fountain Show" },
      { src: fountain3, type: "image", title: "Outdoor Fountain Display" },
      { src: fountain44, type: "video", title: "Fountain Show" },
      { src: fountain4, type: "image", title: "Outdoor Fountain Display" },
      { src: fountain11, type: "video", title: "Interior Fountain Show" },
      { src: fountain2, type: "image", title: "Outdoor Fountain with light show" },
    ],
    "Water Sprinklers": [
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
    ],
    "Swimming Pools & Ponds": [
      { src: swim11, type: "video", title: "Interior Pool for home" },
      { src: pool11, type: "video", title: "Swimming Pool for home" },
      { src: pool1, type: "image", title: "Luxury Pool Design" },
      { src: pool22, type: "video", title: "Swimming Pool for home" },
    ],
  }), []);

  useEffect(() => {
    const firstItem = galleryData[activeCategory]?.[0];
    if (firstItem) setPreviewMedia(firstItem);
  }, [activeCategory, galleryData]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const cardsContainer = impactCardsRef.current;
    if (!cardsContainer) return;
  
    let interval;
    const startAutoScroll = () => {
      if (window.innerWidth <= 768) {
        const card = cardsContainer.querySelector(".card");
        if (!card) return;
        const scrollAmount = card.offsetWidth + 16;
        let scrollPosition = 0;

        interval = setInterval(() => {
          scrollPosition += scrollAmount;
          if (scrollPosition >= cardsContainer.scrollWidth - cardsContainer.clientWidth) {
            scrollPosition = 0;
          }
          cardsContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }, 3000);
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
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" className="logo" />
          </a>
          <span>Annal Electricals & Irrigation System</span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {["home", "Our Services", "Know Us", "Our Work", "contact"].map((link) => (
            <li key={link}>
              <a href={`#${link}`} onClick={() => setIsMenuOpen(false)}>
                {link === "home" ? "Home" : link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>☰</div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home" data-aos="fade-up">
        <video className="hero-video" autoPlay loop muted playsInline preload="auto">
          <source src={annal} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Innovative <span>Water & Power</span> Solutions</h1>
          <p className="hero-subtitle">Transform your home or business with intelligent irrigation, energy-efficient electrical solutions, and stunning water features.</p>
          
          <div className="hero-highlights">
            <p className="highlight-text">Mangalore's Most Trusted Partner</p>
            <p className="service-areas">Serving: Mangalore | Udupi | Kundapura | Manipal | Puttur | Kerala | Chickmagalur | Madikeri | Bantwal | Bhatkal | Karkala</p>
          </div>
        </div>

        <div className="impact-cards" ref={impactCardsRef}>
          {[
            { val: "3000+", label: "Projects Completed" },
            { val: "15", label: "Years of Experience", delay: 100 },
            { val: "100%", label: "Customer Satisfaction", delay: 200 },
            { val: "24/7", label: "Support Availability", delay: 300 }
          ].map((card, i) => (
            <div className="card" key={i} data-aos="fade-up" data-aos-delay={card.delay || 0}>
              <h3>{card.val}</h3>
              <p>{card.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Authorized Dealer Section */}
      <section className="authorized-dealer" data-aos="fade-up">
        <div className="dealer-container">
          <span className="dealer-label">AUTHORIZED DEALERS</span>
          <div className="dealer-brand">
            <img 
              src="/images/rainbird-logo.png" 
              alt="Rain Bird Logo" 
              className="dealer-logo" 
            />
          </div>
          <p className="dealer-description">
            We provide world-class <strong>Automatic Controllers</strong> from <strong>Rain Bird</strong>, 
            ensuring your landscapes receive the most efficient and technologically advanced irrigation management.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="Our Services" data-aos="fade-up">
        <h2>Our   <span>Specialized</span> Solutions !</h2>
        <div className="services-grid">
          {[
            { title: "Automation in Irrigation", desc: "Reduces manpower with advanced fog systems, drip irrigation, and Rain Bird automated sprinklers.", img: "/images/drip irrigation.jpeg" },
            { title: "Water Fountains", desc: "Crafting elegant water fountains for homes, gardens, and commercial spaces.", img: "/images/fountain2.png" },
            { title: "Swimming Pools", desc: "Crafting pools that bring luxury, comfort, and lasting quality.", img: "/images/pool1.jpg" },
            { title: "Electrical Works", desc: "Specializing in HT and TC installations with a commitment to reliability.", img: "/images/service4.png" },
            { title: "Rooftop Solar Panel", desc: "Harness the sun’s power for a cleaner, cost-saving energy future.", img: "/images/service5.jpg" }
          ].map((service, i) => (
            <div className="service-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="service-card-inner">
                {/* Front Side: Text Content */}
                <div className="service-card-front">
                  <h3>{service.title}</h3>
                  <div className="title-spacer"></div> {/* Space after heading */}
                  <p>{service.desc}</p>
                </div>
                {/* Back Side: Image */}
                <div className="service-card-back">
                  <img src={service.img} alt={service.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="services" id="Our Services" data-aos="fade-up">
        <h2>Our <span>Premium</span> Services</h2>
        <div className="services-grid">
          {[
            { title: "Automation in Irrigation", desc: "Reduces manpower with advanced fog systems, drip irrigation, and Rain Bird automated sprinklers." },
            { title: "Water Fountains", desc: "Crafting elegant water fountains for homes, gardens, and commercial spaces." },
            { title: "Swimming Pools", desc: "Crafting pools that bring luxury, comfort, and lasting quality." },
            { title: "Electrical Works", desc: "Specializing in HT and TC installations with a commitment to reliability." },
            { title: "Rooftop Solar Panel", desc: "Harness the sun’s power for a cleaner, cost-saving energy future." }
          ].map((service, i) => (
            <div className="service-card" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* About Section */}
      <section className="about" id="Know Us" data-aos="fade-up" ref={aboutRef}>
        {aboutInView ? (
          <video className="about-video" autoPlay loop muted playsInline>
            <source src={about} type="video/mp4" />
          </video>
        ) : (
          <div className="about-video-placeholder" style={{ backgroundColor: '#1a1a1a', width: '100%', height: '100%', position: 'absolute' }} />
        )}
        <div className="about-overlay-bg"></div>
        <div className="about-overlay">
          <h2>About <span>Annal Electricals & Irrigation Systems</span></h2>
          <p>Based in <strong>Mangalore</strong>, we are the region's <strong>Trusted Name</strong> for innovation and sustainability in irrigation and electrical works.</p>
          <p>Servicing diverse regions including <strong>Udupi, Puttur, Kerala, Chickmagalur, Bhatkal, and Karkala</strong>, we manage every detail with precision and care.</p>
          <p>As <strong>Authorized Dealers for Rain Bird</strong>, we utilize industry-leading automatic controllers to deliver precision watering and superior craftsmanship.</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="Our Work" data-aos="fade-up">
        <h2 className="gallery-heading">Navigating <span>Our Masterpieces</span></h2>
        <div className="gallery-categories">
          {Object.keys(galleryData).map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-container">
          <div className="gallery-main">
            {previewMedia.type === "video" ? (
              <video key={previewMedia.src} src={previewMedia.src} autoPlay loop muted playsInline className="gallery-video" />
            ) : (
              <img src={previewMedia.src} alt="Preview" />
            )}
          </div>

          <div className="gallery-list">
            {galleryData[activeCategory]?.map((item, i) => (
              <div
                key={i}
                className={`gallery-list-item ${previewMedia.src === item.src ? "active" : ""}`}
                onClick={() => setPreviewMedia(item)}
              >
                {item.type === "video" ? (
                  <video 
                    src={item.src} 
                    muted 
                    preload="metadata" 
                    className="thumb-video" 
                    onMouseOver={(e) => e.target.play()} 
                    onMouseOut={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                  />
                ) : (
                  <img src={item.src} alt={item.title} />
                )}
                <div className="gallery-info"><h3>{item.title}</h3></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Footer Logo" className="footer-logo-img" />
            <p><strong>Main Office:</strong> <a href="https://maps.app.goo.gl/WZToMYWRYFkjCve49">Kotimura 5th Cross, Kulshekar, Mangalore, 575005</a></p>
            <p><strong>📞</strong> <a href="tel:+919686612726">+91 9686612726</a></p>
            <p><strong>✉️</strong> <a href="mailto:annalelectricals@gmail.com">annalelectricals@gmail.com</a></p>
            <div className="social-icons">
              <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com/annalelectricals"><i className="fab fa-instagram"></i></a>
              <a href="https://wa.me/919686612726"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#Our Services">Irrigation Systems</a></li>
              <li><a href="#Our Services">Electrical Works</a></li>
              <li><a href="#Our Services">Water Fountains</a></li>
              <li><a href="#Our Services">Swimming Pools</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#Know Us">About Us</a></li>
              <li><a href="#Our Work">Gallery</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Annal Electricals & Irrigation System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
