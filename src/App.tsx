import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Ensure GSAP ticks reliably even if backgrounded or rAF is throttled
gsap.ticker.lagSmoothing(0)
if (typeof window !== 'undefined') {
  setInterval(() => {
    if (document.hidden) {
      gsap.ticker.tick()
    }
  }, 1000 / 60)
}

/* ───────── data ───────── */
const SKILLS = [
  {
    category: 'Programming',
    items: ['Python', 'C', 'C++'],
    icon: '⟨/⟩',
  },
  {
    category: 'Machine Learning',
    items: ['Scikit-learn', 'Regression', 'Classification', 'Clustering'],
    icon: '🧠',
  },
  {
    category: 'Visualization',
    items: ['Matplotlib', 'Seaborn', 'Plotly', 'Power BI'],
    icon: '📊',
  },
  {
    category: 'Database & Tools',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Excel', 'Jupyter Notebook', 'Google Colab'],
    icon: '🗄️',
  },
  {
    category: 'Other',
    items: ['EDA', 'Feature Engineering', 'Model Evaluation', 'Data Cleaning'],
    icon: '⚙️',
  },
]

const PROJECTS = [
  {
    title: 'AI Resume Analyser Pro',
    techs: ['Python', 'Streamlit', 'NLP (spaCy)', 'PyMuPDF', 'SQLite', 'Plotly', 'ML'],
    bullets: [
      'Multi-engine PDF parsing (PyMuPDF, pdfplumber, pdfminer) with NLP skill extraction',
      'Weighted skill scoring, ATS compatibility checker, interactive dashboard with 6 charts',
      'Course recommendation engine, Unicode normalization, fuzzy matching',
    ],
    num: '01',
  },
  {
    title: 'Sales Data Analysis',
    techs: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    bullets: [
      'Cleaned and analyzed sales data to identify key business trends.',
      'Built regression and classification models to predict sales outcomes using Scikit-learn.',
      'Visualized insights with Seaborn and Matplotlib to enhance data-driven strategies.',
    ],
    num: '02',
  },
  {
    title: 'Student Habits vs Academic Performance',
    techs: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'Jupyter'],
    bullets: [
      'EDA on 1,000 records, data cleaning, visualization (histograms, heatmaps, scatter plots)',
      'ML model comparison (Linear Regression, Decision Tree, Random Forest) via GridSearchCV',
      'RMSE/R² evaluation, feature engineering, insights extraction',
    ],
    num: '03',
  },
]

const CERTIFICATIONS = [
  { name: 'Python for Data Science', issuer: 'Tutedude' },
  { name: 'SQL for Data Analysis', issuer: 'Coursera' },
  { name: 'Machine Learning with Scikit-learn', issuer: 'Tutedude' },
]

const ACHIEVEMENTS = [
  'Completed 6+ ML/Data Science projects with focus on NLP, regression analysis, and predictive modeling',
  'Completed multiple Kaggle mini-projects on visualization and predictive modeling',
  'Built interactive ML web applications using Streamlit with real-time prediction capabilities',
  'Trained and evaluated 3 ML models using GridSearchCV hyperparameter tuning',
]

const SOFT_SKILLS = [
  'Analytical Thinking',
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Time Management',
]

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Education', 'Certifications', 'Contact']

/* ───────── component ───────── */
function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  /* ── Custom cursor ── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current && cursorDotRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  /* ── Cursor grow effect on interactive elements ── */
  useEffect(() => {
    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card, .nav-link')
    const onEnter = () => cursorRef.current?.classList.add('cursor--hover')
    const onLeave = () => cursorRef.current?.classList.remove('cursor--hover')

    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => {
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  /* ── All GSAP animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ─── HERO ENTRANCE ─── */
      const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Navbar slide in
      masterTl.from('.navbar', {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
      })

      // Hero greeting
      masterTl.from('.hero-greeting', {
        y: 40,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')

      // Hero name — 2D smooth rise
      masterTl.from('.hero-name', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')

      // Hero title
      masterTl.from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')

      // Hero description
      masterTl.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')

      // Hero CTA buttons
      masterTl.from('.hero-cta a', {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
      }, '-=0.3')

      // Hero scroll indicator
      masterTl.from('.scroll-indicator', {
        y: 20,
        opacity: 0,
        duration: 0.5,
      }, '-=0.2')

      // Floating particles
      masterTl.from('.particle', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'back.out(2)',
      }, '-=0.6')

      /* ─── SCROLL PROGRESS BAR ─── */
      gsap.to('.scroll-progress-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })

      /* ─── SECTION TITLE ANIMATIONS ─── */
      gsap.utils.toArray<HTMLElement>('.section-label').forEach(label => {
        gsap.fromTo(label,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.section-heading').forEach(heading => {
        gsap.fromTo(heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      /* ─── ABOUT SECTION ─── */
      gsap.fromTo('.about-text',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 88%',
            once: true,
          },
        }
      )

      gsap.fromTo('.about-stat',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 88%',
            once: true,
          },
        }
      )

      /* ─── SKILLS SECTION ─── */
      gsap.fromTo('.skill-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 88%',
            once: true,
          },
        }
      )

      // Skill tags pop-in inside each card
      gsap.utils.toArray<HTMLElement>('.skill-card').forEach(card => {
        gsap.fromTo(card.querySelectorAll('.skill-pill'),
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      /* ─── PROJECTS SECTION ─── */
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        const direction = i % 2 === 0 ? -60 : 60
        gsap.fromTo(card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      /* ─── EDUCATION TIMELINE ─── */
      gsap.fromTo('.timeline-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.education-timeline',
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo('.timeline-card',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-card',
            start: 'top 85%',
            once: true,
          },
        }
      )

      /* ─── CERTIFICATIONS ─── */
      gsap.fromTo('.cert-card',
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.certs-grid',
            start: 'top 88%',
            once: true,
          },
        }
      )

      /* ─── ACHIEVEMENTS ─── */
      gsap.fromTo('.achievement-row',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.achievements-list',
            start: 'top 88%',
            once: true,
          },
        }
      )

      /* ─── SOFT SKILLS ─── */
      gsap.fromTo('.soft-pill',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.soft-pills',
            start: 'top 88%',
            once: true,
          },
        }
      )

      /* ─── CONTACT SECTION ─── */
      gsap.fromTo('.contact-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-card',
            start: 'top 88%',
            once: true,
          },
        }
      )

      gsap.fromTo('.contact-link-item',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-links',
            start: 'top 88%',
            once: true,
          },
        }
      )

      /* ─── PARALLAX FLOATING ELEMENTS ─── */
      gsap.utils.toArray<HTMLElement>('.float-shape').forEach(shape => {
        gsap.to(shape, {
          y: () => gsap.utils.random(-100, 100),
          x: () => gsap.utils.random(-50, 50),
          rotation: () => gsap.utils.random(-20, 20),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      /* ─── MARQUEE TEXT ─── */
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })

      /* ─── ACTIVE SECTION TRACKER ─── */
      const sectionIds = ['about', 'skills', 'projects', 'education', 'certifications', 'contact']
      sectionIds.forEach(id => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      })
    }, containerRef.current || undefined)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="portfolio-root">
      {/* ── CUSTOM CURSOR ── */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />

      {/* ── SCROLL PROGRESS ── */}
      <div className="scroll-progress" ref={progressRef}>
        <div className="scroll-progress-fill" />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="#home" className="nav-logo">
          <span className="logo-text">AAC</span>
          <span className="logo-dot" />
        </a>

        <ul className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'nav-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <button className={`hamburger ${menuOpen ? 'hamburger--active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home" ref={heroRef}>
        {/* floating particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`particle particle--${i}`} />
        ))}

        <div className="hero-inner">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">AHAD AHMED CHOUDHARY</h1>
          <p className="hero-title">
            <span className="title-highlight">Data Scientist</span>{' '}
            <span className="title-sep">&</span>{' '}
            <span className="title-highlight">ML Engineer</span>
          </p>
          <p className="hero-description">
            Transforming raw data into actionable insights through Python, ML &amp; visualization.
            Passionate about building intelligent systems that drive data-driven decisions.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn--primary">View Projects</a>
            <a href="#contact" className="btn btn--outline">Get In Touch</a>
          </div>
        </div>

        <div className="scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line">
            <div className="scroll-line-fill" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="marquee-content">
              PYTHON • MACHINE LEARNING • DATA SCIENCE • SQL • VISUALIZATION • PANDAS • SCIKIT-LEARN • POWER BI • NLP • DEEP LEARNING •&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="section-header">
          <span className="section-label">01</span>
          <h2 className="section-heading">About Me</h2>
        </div>
        <div className="section-body">
          <p className="about-text">
            Data Science enthusiast skilled in <strong>Python</strong>, <strong>SQL</strong>, and <strong>Machine Learning</strong>.
            Experienced in data preprocessing, visualization, and predictive modeling using Pandas, NumPy,
            Scikit-learn, and Matplotlib. Capable of transforming raw data into actionable insights to support
            data-driven decisions. Currently pursuing <strong>B.Tech in Computer Science</strong> (Specialization in Data Science)
            and seeking an entry-level Data Science or ML Engineer position.
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <span className="stat-number">6+</span>
              <span className="stat-label">ML Projects</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Tools & Libraries</span>
            </div>
            <div className="about-stat">
              <span className="stat-number">3+</span>
              <span className="stat-label">ML Models</span>
            </div>
          </div>
        </div>

        {/* floating shapes */}
        <div className="float-shape float-shape--1" />
        <div className="float-shape float-shape--2" />
      </section>

      {/* ── SKILLS ── */}
      <section className="section section--dark" id="skills">
        <div className="section-header">
          <span className="section-label">02</span>
          <h2 className="section-heading">Technical Skills</h2>
        </div>
        <div className="section-body">
          <div className="skills-grid">
            {SKILLS.map(skill => (
              <div className="skill-card" key={skill.category}>
                <span className="skill-icon">{skill.icon}</span>
                <h3 className="skill-card-title">{skill.category}</h3>
                <div className="skill-pills">
                  {skill.items.map(item => (
                    <span key={item} className="skill-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="section" id="projects">
        <div className="section-header">
          <span className="section-label">03</span>
          <h2 className="section-heading">Projects</h2>
        </div>
        <div className="section-body">
          {PROJECTS.map(project => (
            <div className="project-card" key={project.title}>
              <div className="project-num">{project.num}</div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-techs">
                  {project.techs.map(t => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
                <ul className="project-bullets">
                  {project.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="project-accent" />
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section section--dark" id="education">
        <div className="section-header">
          <span className="section-label">04</span>
          <h2 className="section-heading">Education</h2>
        </div>
        <div className="section-body">
          <div className="education-timeline">
            <div className="timeline-line">
              <div className="timeline-line-fill" />
            </div>
            <div className="timeline-card">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-date">Aug 2023 — June 2027</span>
                <h3 className="timeline-title">Bachelor of Technology (B.Tech)</h3>
                <p className="timeline-subtitle">Computer Science (Specialization in Data Science)</p>
                <p className="timeline-institution">Sushila Devi Bansal College of Engineering, Indore</p>
                <span className="timeline-badge">CGPA: 6.5</span>
                <div className="timeline-courses">
                  <h4>Relevant Courses</h4>
                  <p>Big Data, Data Science, Data Warehouse, ML, DL, DBMS, Probability &amp; Statistics, OOP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="section" id="certifications">
        <div className="section-header">
          <span className="section-label">05</span>
          <h2 className="section-heading">Certifications</h2>
        </div>
        <div className="section-body">
          <div className="certs-grid">
            {CERTIFICATIONS.map((cert, i) => (
              <div className="cert-card" key={i}>
                <div className="cert-icon">🏆</div>
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-shine" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS & SOFT SKILLS ── */}
      <section className="section section--dark" id="achievements">
        <div className="section-header">
          <span className="section-label">06</span>
          <h2 className="section-heading">Achievements & Soft Skills</h2>
        </div>
        <div className="section-body achievements-softskills">
          <div className="achievements-col">
            <h3 className="subsection-title">Achievements</h3>
            <div className="achievements-list">
              {ACHIEVEMENTS.map((a, i) => (
                <div className="achievement-row" key={i}>
                  <span className="achievement-bullet">▹</span>
                  <p>{a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="softskills-col">
            <h3 className="subsection-title">Soft Skills</h3>
            <div className="soft-pills">
              {SOFT_SKILLS.map(s => (
                <span key={s} className="soft-pill">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact">
        <div className="section-header">
          <span className="section-label">07</span>
          <h2 className="section-heading">Get In Touch</h2>
        </div>
        <div className="section-body">
          <div className="contact-card">
            <p className="contact-intro">
              I'm currently looking for entry-level <strong>Data Science</strong> or <strong>ML Engineer</strong> opportunities.
              Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            <div className="contact-links">
              <a href="mailto:ahadahmedchoudhary786@gmail.com" className="contact-link-item">
                <span className="contact-icon">✉️</span>
                <span className="contact-detail">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">ahadahmedchoudhary786@gmail.com</span>
                </span>
              </a>
              <a href="tel:+916264382228" className="contact-link-item">
                <span className="contact-icon">📱</span>
                <span className="contact-detail">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 6264382228</span>
                </span>
              </a>
              <a href="https://www.linkedin.com/in/ahad-ahmed-choudhary-738b3135a" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="contact-icon">🔗</span>
                <span className="contact-detail">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">ahad-ahmed-choudhary</span>
                </span>
              </a>
              <div className="contact-link-item contact-link-item--location">
                <span className="contact-icon">📍</span>
                <span className="contact-detail">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Indore, Madhya Pradesh</span>
                </span>
              </div>
            </div>
            <a href="mailto:ahadahmedchoudhary786@gmail.com" className="btn btn--primary btn--lg contact-btn">Say Hello 👋</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">AAC</span>
          <p className="footer-copy">&copy; {new Date().getFullYear()} Ahad Ahmed Choudhary. Built with React &amp; GSAP.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
