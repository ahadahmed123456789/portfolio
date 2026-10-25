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
  const [sayHelloOpen, setSayHelloOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [quickForm, setQuickForm] = useState({ name: '', email: '', message: '' })

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        throw new Error('Clipboard not accessible')
      }
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        console.warn('Fallback copy error:', err)
      }
      document.body.removeChild(ta)
    }
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Inquiry from ${quickForm.name || 'Visitor'}`)
    const body = encodeURIComponent(
      `Hello Ahad,\n\n${quickForm.message}\n\nFrom: ${quickForm.name || 'Anonymous'} (${quickForm.email || 'No email provided'})`
    )
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ahadahmedchoudhary786@gmail.com&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

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
          <li className="nav-resume-item">
            <a
              href="/Ahad_Ahmed_Choudhary_Resume.pdf"
              download="Ahad_Ahmed_Choudhary_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume-btn"
              onClick={() => setMenuOpen(false)}
            >
              Resume 📄
            </a>
          </li>
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
            <a
              href="/Ahad_Ahmed_Choudhary_Resume.pdf"
              download="Ahad_Ahmed_Choudhary_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              Download Resume 📥
            </a>
            <button
              onClick={() => setSayHelloOpen(true)}
              className="btn btn--outline"
              type="button"
            >
              Say Hello 👋
            </button>
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

          <div className="about-resume-banner">
            <div className="about-resume-info">
              <span className="about-resume-icon">📄</span>
              <div>
                <h4 className="about-resume-title">Curriculum Vitae / Resume</h4>
                <p className="about-resume-desc">Comprehensive details of coursework, model evaluations, and achievements.</p>
              </div>
            </div>
            <a
              href="/Ahad_Ahmed_Choudhary_Resume.pdf"
              download="Ahad_Ahmed_Choudhary_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Download Resume (PDF) 📥
            </a>
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
              <div
                className="contact-link-item contact-link-item--copy"
                onClick={() => copyToClipboard('ahadahmedchoudhary786@gmail.com')}
                title="Click to copy email address"
              >
                <span className="contact-icon">✉️</span>
                <span className="contact-detail">
                  <span className="contact-label">Email {copiedEmail ? '— Copied! ✓' : '(Click to copy)'}</span>
                  <span className="contact-value">ahadahmedchoudhary786@gmail.com</span>
                </span>
                <span className="copy-badge">{copiedEmail ? 'Copied! ✓' : 'Copy'}</span>
              </div>
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

            <div className="contact-actions">
              <button
                type="button"
                onClick={() => setSayHelloOpen(true)}
                className="btn btn--primary btn--lg contact-btn"
              >
                Say Hello 👋
              </button>
              <a
                href="/Ahad_Ahmed_Choudhary_Resume.pdf"
                download="Ahad_Ahmed_Choudhary_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--lg"
              >
                Download Resume 📥
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAY HELLO MODAL ── */}
      {sayHelloOpen && (
        <div className="modal-backdrop" onClick={() => setSayHelloOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Let's Connect! 👋</h3>
                <p className="modal-subtitle">Choose your preferred way to say hello</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setSayHelloOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="modal-methods">
              {/* Option 1: Gmail Web (works 100% in any browser) */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ahadahmedchoudhary786@gmail.com&su=Hello%20Ahad!%20(From%20Portfolio)&body=Hi%20Ahad,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20connect%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="modal-method-btn modal-method-btn--gmail"
              >
                <span className="method-icon">📧</span>
                <div className="method-info">
                  <strong>Open in Gmail (Web)</strong>
                  <span>Direct browser compose — no app needed</span>
                </div>
                <span className="method-arrow">→</span>
              </a>

              {/* Option 2: Copy Email */}
              <button
                type="button"
                onClick={() => copyToClipboard('ahadahmedchoudhary786@gmail.com')}
                className="modal-method-btn modal-method-btn--copy"
              >
                <span className="method-icon">📋</span>
                <div className="method-info">
                  <strong>{copiedEmail ? 'Email Copied! ✓' : 'Copy Email Address'}</strong>
                  <span>ahadahmedchoudhary786@gmail.com</span>
                </div>
                <span className="method-badge">{copiedEmail ? 'Copied!' : 'Copy'}</span>
              </button>

              {/* Option 3: Default Mail App */}
              <a
                href="mailto:ahadahmedchoudhary786@gmail.com?subject=Hello%20Ahad!%20(From%20Portfolio)"
                className="modal-method-btn modal-method-btn--app"
              >
                <span className="method-icon">✉️</span>
                <div className="method-info">
                  <strong>Open Default Mail App</strong>
                  <span>Outlook, Apple Mail, Thunderbird</span>
                </div>
                <span className="method-arrow">→</span>
              </a>

              {/* Option 4: WhatsApp */}
              <a
                href="https://wa.me/916264382228?text=Hi%20Ahad,%20I%20saw%20your%20portfolio!"
                target="_blank"
                rel="noopener noreferrer"
                className="modal-method-btn modal-method-btn--wa"
              >
                <span className="method-icon">💬</span>
                <div className="method-info">
                  <strong>Chat on WhatsApp</strong>
                  <span>+91 6264382228</span>
                </div>
                <span className="method-arrow">→</span>
              </a>
            </div>

            {/* Quick message form */}
            <div className="modal-quick-form">
              <h4 className="quick-form-title">Or write a quick message:</h4>
              <form onSubmit={handleQuickSend}>
                <div className="quick-form-row">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={quickForm.name}
                    onChange={e => setQuickForm({ ...quickForm, name: e.target.value })}
                    className="modal-input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={quickForm.email}
                    onChange={e => setQuickForm({ ...quickForm, email: e.target.value })}
                    className="modal-input"
                    required
                  />
                </div>
                <textarea
                  placeholder="Your Message..."
                  rows={3}
                  value={quickForm.message}
                  onChange={e => setQuickForm({ ...quickForm, message: e.target.value })}
                  className="modal-textarea"
                  required
                />
                <button type="submit" className="btn btn--primary modal-submit-btn">
                  Send via Email →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

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
