import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('fade-in-section')
      observer.observe(section)
    })

    // Cleanup
    return () => observer.disconnect()
  }, [])

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDelay: Math.random() * 20,
    animationDuration: 15 + Math.random() * 10
  }))

  return (
    <div className="portfolio">
      {/* Animated Particles */}
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      <nav className="navbar">
        <div className="nav-brand">AAC</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#certifications">Certifications</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-name">AHAD AHMED CHOUDHARY</h1>
          <p className="hero-title">Data Science Enthusiast</p>
          <div className="hero-contact">
            <a href="mailto:ahadahmed786921@gmail.com" className="contact-link">
              ahadahmed786921@gmail.com
            </a>
            <span className="contact-divider">|</span>
            <a href="tel:+916264382228" className="contact-link">
              +91 6264382228
            </a>
            <span className="contact-divider">|</span>
            <a href="https://www.linkedin.com/in/ahad-ahmed-choudhary-738b3135a" target="_blank" className="contact-link">
              LinkedIn
            </a>
          </div>
          <div className="hero-location">Indore, Madhya Pradesh</div>
        </div>
      </section>

      <section className="section" id="about">
        <h2 className="section-title">About Me</h2>
        <div className="section-content">
          <p className="about-text">
            Data Science enthusiast skilled in Python, SQL, and Machine Learning. Experienced in data preprocessing,
            visualization, and predictive modeling using Pandas, NumPy, Scikit-learn, and Matplotlib. Capable of
            transforming raw data into actionable insights to support data-driven decisions. Seeking an entry-level
            Data Science or ML Engineer position in a leading organization.
          </p>
        </div>
      </section>

      <section className="section" id="skills">
        <h2 className="section-title">Technical Skills</h2>
        <div className="section-content">
          <div className="skills-grid">
            <div className="skill-category">
              <h3 className="skill-category-title">Programming</h3>
              <div className="skill-tags">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Visualization</h3>
              <div className="skill-tags">
                <span className="skill-tag">Matplotlib</span>
                <span className="skill-tag">Seaborn</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Machine Learning</h3>
              <div className="skill-tags">
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">Regression</span>
                <span className="skill-tag">Classification</span>
                <span className="skill-tag">Clustering</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Database & Tools</h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">Excel</span>
                <span className="skill-tag">Jupyter Notebook</span>
                <span className="skill-tag">Google Colab</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Other</h3>
              <div className="skill-tags">
                <span className="skill-tag">EDA</span>
                <span className="skill-tag">Feature Engineering</span>
                <span className="skill-tag">Model Evaluation</span>
                <span className="skill-tag">Data Cleaning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="education">
        <h2 className="section-title">Education</h2>
        <div className="section-content">
          <div className="education-card">
            <h3 className="education-degree">Bachelor of Technology (B.Tech)</h3>
            <p className="education-specialization">Computer Science (Specialization in Data Science)</p>
            <p className="education-institution">Sushila Devi Bansal College of Engineering, Indore</p>
            <p className="education-duration">Aug 2023 - June 2027</p>
            <p className="education-cgpa">CGPA: 6.5</p>
            <div className="education-courses">
              <h4>Relevant Courses:</h4>
              <p>Data Structures, DBMS, Probability & Statistics, OOP, AI, ML</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <h2 className="section-title">Projects</h2>
        <div className="section-content">
          <div className="project-card">
            <h3 className="project-title">Sales Data Analysis</h3>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Pandas</span>
              <span className="tech-tag">Matplotlib</span>
              <span className="tech-tag">Seaborn</span>
              <span className="tech-tag">Scikit-learn</span>
            </div>
            <ul className="project-description">
              <li>Cleaned and analyzed sales data to identify key business trends.</li>
              <li>Built regression and classification models to predict sales outcomes using Scikit-learn.</li>
              <li>Visualized insights with Seaborn and Matplotlib to enhance data-driven strategies.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="certifications">
        <h2 className="section-title">Certifications</h2>
        <div className="section-content">
          <div className="certifications-list">
            <div className="certification-item">
              <h3 className="certification-name">Python for Data Science</h3>
              <p className="certification-issuer">Tutedude</p>
            </div>
            <div className="certification-item">
              <h3 className="certification-name">SQL for Data Analysis</h3>
              <p className="certification-issuer">Coursera</p>
            </div>
            <div className="certification-item">
              <h3 className="certification-name">Machine Learning with Scikit-learn</h3>
              <p className="certification-issuer">Tutedude</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="achievements">
        <h2 className="section-title">Achievements</h2>
        <div className="section-content">
          <div className="achievements-list">
            <div className="achievement-item">
              <p>Completed multiple Kaggle mini-projects on visualization and predictive modeling.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="soft-skills">
        <h2 className="section-title">Soft Skills</h2>
        <div className="section-content">
          <div className="soft-skills-tags">
            <span className="soft-skill-tag">Analytical Thinking</span>
            <span className="soft-skill-tag">Problem Solving</span>
            <span className="soft-skill-tag">Team Collaboration</span>
            <span className="soft-skill-tag">Communication</span>
            <span className="soft-skill-tag">Time Management</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Ahad Ahmed Choudhary. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
