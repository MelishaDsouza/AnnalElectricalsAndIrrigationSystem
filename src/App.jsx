import { useEffect, useState, useRef, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { useInView } from "react-intersection-observer";

// Load FontAwesome asynchronously to prevent render blocking
if (typeof window !== 'undefined' && !document.getElementById('fa-style')) {
  const link = document.createElement('link');
  link.id = 'fa-style';
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  link.media = 'print';
  link.onload = function() { this.media = 'all'; };
  document.head.appendChild(link);
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Water Fountains");
  const [previewMedia, setPreviewMedia] = useState({ src: "/assets/videos/fountain-outdoor-annal-mangalore.mp4", type: "video" });

  const impactCardsRef = useRef(null);

  const galleryData = useMemo(() => ({
    "Water Fountains": [
      { src: "/assets/videos/fountain-outdoor-lights-mangalore.mp4", type: "video", title: "Outdoor Fountain Show" },
      { src: "/assets/videos/fountain-indoor-mangalore.mp4", type: "video", title: "Indoor Fountain on Glass" },
      { src: "/assets/videos/fountain-outdoor-annal-mangalore.mp4", type: "video", title: "Outdoor Fountain" },
      { src: "/assets/images/water-fountain-design-layout-mangalore.webp", type: "image", title: "Outdoor Fountain Design" },
      { src: "/assets/videos/fountain-outdoor-mangalore.mp4", type: "video", title: "Fountain Show on Penguins" },
      { src: "/assets/images/water-fountain-design-mangalore.webp", type: "image", title: "Outdoor Fountain Design" },
      { src: "/assets/images/water-fountain-mangalore.webp", type: "image", title: "Classic Outdoor Fountain " },
    ],
    "Water Sprinklers": [
      { src: "/assets/videos/sprinkler-garden-outdoor-mangalore.mp4", type: "video", title: "Sprinkler on Garden" },
      { src: "/assets/images/sprinklers-farm-mangalore.webp", type: "image", title: "Rotating Sprinkler System" },
      { src: "/assets/videos/sprinkler-outdoor-mangalore.mp4", type: "video", title: "Sprinkler System over the landscape" },
      { src: "/assets/images/sprinklers-mangalore.webp", type: "image", title: "Landscape Sprinkler Setup" },
      { src: "/assets/videos/sprinkler-outdoor-school-mangalore.mp4", type: "video", title: "Sprinkler System on garden" },
      { src: "/assets/videos/Sprinkler-garden-mangalore.mp4", type: "video", title: "Sprinkler System on garden" },
      { src: "/assets/images/sprinkler-garden-mangalore.webp", type: "image", title: "Farm Sprinkler Setup" },
    ],
    "Solar Rooftop Panels": [
      { src: "/assets/videos/solar-panel-mangalore.mp4", type: "video", title: "Solar panel on rooftop" },
    ],
    "Drip Irrigation Systems": [
      { src: "/assets/images/drip-irrigation-mangalore.webp", type: "image", title: "Drip irrigation system" },
    ],
    "Swimming Pools & Ponds": [
      { src: "/assets/videos/Indoor-swimming-pool-mangalore.mp4", type: "video", title: "Interior Pool for home" },
      { src: "/assets/videos/Swimming-pool-mangalore.mp4", type: "video", title: "Swimming Pool for home" },
      { src: "/assets/images/swimming-pool-mangalore.webp", type: "image", title: "Luxury Pool Design" },
      { src: "/assets/videos/swimming-pool-mangalore-outdoor.mp4", type: "video", title: "Swimming Pool for home" },
    ],
  }), []);

  useEffect(() => {
    const firstItem = galleryData[activeCategory]?.[0];
    if (firstItem) setPreviewMedia(firstItem);
  }, [activeCategory, galleryData]);

  useEffect(() => {
    // Initialize AOS immediately for better First Contentful Paint
    // Use 'replace' to avoid multiple initializations
    AOS.init({ 
      duration: 600, 
      once: true, 
      delay: 0, 
      offset: 30,
      disable: window.innerWidth < 480 ? 'mobile' : false // Disable on very small screens
    });
  }, []);

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const cardsContainer = impactCardsRef.current;
    if (!cardsContainer) return;
  
    let interval;
    let cardWidth = 0;
    let maxScroll = 0;
    let scrollPosition = 0;
    let isCalculated = false;
    
    const calculateDimensions = () => {
      if (isCalculated) return; // Avoid recalculation
      const card = cardsContainer.querySelector(".card");
      if (!card) return;
      
      // Use getBoundingClientRect to avoid forced layout thrashing
      cardWidth = card.getBoundingClientRect().width + 16;
      maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
      isCalculated = true;
    };
    
    const startAutoScroll = () => {
      if (window.innerWidth <= 768) {
        isCalculated = false; // Reset flag on resize
        calculateDimensions();
        scrollPosition = 0;

        clearInterval(interval);
        interval = setInterval(() => {
          scrollPosition += cardWidth;
          if (scrollPosition >= maxScroll) {
            scrollPosition = 0;
          }
          cardsContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }, 3000);
      }
    };
  
    const handleResize = () => {
      startAutoScroll();
    };
    
    startAutoScroll();
    window.addEventListener("resize", handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <a href="/" aria-label="Annal Electricals Home">
            <img src={"/assets/images/annal-electricals-logo-mangalore.webp"} alt="Annal Electricals Logo" className="logo" width="50" height="50" decoding="async" />
          </a>
          <span>Annal Electricals & Irrigation System</span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {["home", "Our Services", "Know Us", "Our Work", "contact"].map((link) => (
            <li key={link}>
              <a href={`#${link}`} aria-label={link === "home" ? "Home" : `Navigate to ${link}`} onClick={() => setIsMenuOpen(false)}>
                {link === "home" ? "Home" : link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <div className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation menu">☰</div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home" data-aos="fade-up">
        <video className="hero-video" autoPlay loop muted playsInline preload="metadata" fetchPriority="high" poster="/assets/images/hero-poster.jpg">
          <source src={"/assets/videos/annal-hero-mangalore.mp4"} type="video/mp4" />
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
              <h2>{card.val}</h2>
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
              src="/assets/images/rainbird-logo.webp" 
              alt="Rain Bird Logo - Authorized Dealer" 
              className="dealer-logo" 
              width="200"
              height="100"
              loading="lazy"
              decoding="async"
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
            { title: "Automation in Irrigation", desc: "Reduces manpower with advanced fog systems, drip irrigation, and Rain Bird automated sprinklers.", img: "/assets/images/drip-irrigation-mangalore.webp" },
            { title: "Water Fountains", desc: "Crafting elegant water fountains for homes, gardens, and commercial spaces.", img: "/assets/images/water-fountain-lights-mangalore.webp" },
            { title: "Swimming Pools", desc: "Crafting pools that bring luxury, comfort, and lasting quality.", img: "/assets/images/swimming-pool-mangalore.webp" },
            { title: "Electrical Works", desc: "Specializing in HT and TC installations with a commitment to reliability.", img: "/assets/images/hightension-mangalore.webp" },
            { title: "Rooftop Solar Panel", desc: "Harness the sun’s power for a cleaner, cost-saving energy future.", img: "/assets/images/solar-panels-mangalore.webp" }
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
                  <picture>
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      width="400" 
                      height="300" 
                      loading="lazy" 
                      decoding="async" 
                      srcSet={`${service.img.replace('.webp', '-mobile.webp')} 480w, ${service.img.replace('.webp', '-tablet.webp')} 768w, ${service.img} 1024w`}
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  </picture>
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
          <video 
            className="about-video" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
            poster="/assets/images/about-poster.jpg"
          >
            <source src={"/assets/videos/about.mp4"} type="video/mp4" />
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
          {Object.keys(galleryData).map((category, i) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-container">
          <div className="gallery-main">
            {previewMedia.type === "video" ? (
              <video 
                key={previewMedia.src} 
                src={previewMedia.src} 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="metadata" 
                className="gallery-video"
                poster={previewMedia.src.replace(/\.mp4$/, '-poster.jpg')}
              />
            ) : (
              <picture>
                <img 
                  src={previewMedia.src} 
                  alt={previewMedia.title || "Preview"} 
                  width="600" 
                  height="400" 
                  decoding="async"
                  srcSet={`${previewMedia.src.replace('.webp', '-mobile.webp')} 480w, ${previewMedia.src.replace('.webp', '-tablet.webp')} 768w, ${previewMedia.src} 1024w`}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, 70vw"
                />
              </picture>
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
                    preload="none"
                    poster={item.src.replace(/\.mp4$/, '-poster.jpg')}
                    className="thumb-video" 
                  />
                ) : (
                  <picture>
                    <source 
                      srcSet={`${item.src.replace('.webp', '-thumb.webp')} 1x, ${item.src.replace('.webp', '-thumb-2x.webp')} 2x`}
                      type="image/webp"
                    />
                    <img 
                      src={item.src.replace('.webp', '-thumb.webp')} 
                      alt={item.title} 
                      width="120" 
                      height="90" 
                      loading={i === 0 ? "eager" : "lazy"} 
                      decoding="async"
                    />
                  </picture>
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
            <img src={"/assets/images/annal-electricals-logo-mangalore.webp"} alt="Annal Electricals Footer Logo" className="footer-logo-img" width="80" height="80" loading="lazy" decoding="async" />
            <p><strong>Main Office:</strong> <a href="https://maps.app.goo.gl/WZToMYWRYFkjCve49" aria-label="View Annal Electricals on Google Maps">Kotimura 5th Cross, Kulshekar, Mangalore, 575005</a></p>
            <p><strong>📞</strong> <a href="tel:+919686612726" aria-label="Call +91 9686612726">+91 9686612726</a></p>
            <p><strong>✉️</strong> <a href="mailto:annalelectricals72@gmail.com" aria-label="Email Annal Electricals">annalelectricals72@gmail.com</a></p>
            <div className="social-icons">
              <a href="https://facebook.com" aria-label="Follow us on Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com/annalelectricals" aria-label="Follow us on Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://wa.me/919686612726" aria-label="Contact us on WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul>
              <li><a href="#Our Services" aria-label="View Irrigation Systems">Irrigation Systems</a></li>
              <li><a href="#Our Services" aria-label="View Electrical Works">Electrical Works</a></li>
              <li><a href="#Our Services" aria-label="View Water Fountains">Water Fountains</a></li>
              <li><a href="#Our Services" aria-label="View Swimming Pools">Swimming Pools</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home" aria-label="Go to Home section">Home</a></li>
              <li><a href="#Know Us" aria-label="Go to About Us section">About Us</a></li>
              <li><a href="#Our Work" aria-label="Go to Gallery section">Gallery</a></li>
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
