function Home() {
  return (
    <div className="home-page">

      {/* TOP CONTACT BAR */}
      <div className="top-bar">
        <div className="top-brand">⌂ Studyvault-CBU</div>

        <div className="top-phone">
          ☎ +260 771-179-560
        </div>

        <div className="top-links">
          <span>Facebook</span>
          <span>Twitter</span>
          <a href="#">Help</a>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav className="home-navbar">

        <div className="home-logo">
          <img
            src="/studyvault-logo.png"
            alt="StudyVault Logo"
          />
          <h1>STUDYVAULT</h1>
        </div>

        <div className="home-nav-links">
          <a href="/">HOME</a>
          <a href="/about">About Us</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </div>

      </nav>

      {/* HERO */}
      <section className="home-hero">

        <div className="hero-content">
            <p style={{ color: "red", fontSize: "30px" }}>
            TEST STUDENT
            </p>
        <h3>THE best website for studying</h3>

          <h1>
            STUDY
            <span>VAULT</span>
          </h1>
        </div>

        {/* STUDENT */}
        <img
  src="/A_young_woman_with_glasses_and_a_ponytail_is_holding_a_stack_of_books-removebg-preview.png"
  alt="Student holding books"
  style={{
    display: "block",
    width: "400px",
    height: "auto",
    position: "absolute",
    right: "20px",
    bottom: "0",
    zIndex: 9999
  }}
/>
      </section>

      {/* FEATURE CARDS */}
      <section className="home-features">

        <div className="feature-card">
          <h2>Study Materials</h2>
          <p>
            Access lecture notes, videos, tests, past papers
            and other learning materials.
          </p>
        </div>

        <div className="feature-card">
          <h2>Courses</h2>
          <p>
            Find your courses and explore the study materials
            available for each course.
          </p>
        </div>

        <div className="feature-card">
          <h2>Learn & Prepare</h2>
          <p>
            Prepare for your tests and examinations with useful
            resources all in one place.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;