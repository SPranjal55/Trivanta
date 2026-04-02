import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import StatsCounter from '../components/StatsCounter.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CourseCard from '../components/CourseCard.jsx';
import COURSES from '../utils/courses.js';
import TestimonialCarousel from '../components/TestimonialCarousel.jsx';
import SERVICES from '../utils/services.js';

export default function Home() {
  const featuredCourses = COURSES.slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section
        style={{
          minHeight: '100vh',
          background: 'var(--gradient-hero)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -80,
            background:
              'radial-gradient(circle at 75% 15%, rgba(232,106,23,0.10), rgba(232,106,23,0) 55%), radial-gradient(circle at 20% 85%, rgba(255,140,58,0.08), rgba(255,140,58,0) 55%), radial-gradient(circle at 55% 55%, rgba(243,108,33,0.06), rgba(243,108,33,0) 60%)',
            filter: 'blur(18px)',
            animation: 'floatBlob 10s ease-in-out infinite',
          }}
        />
        <div className="container hero-section" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  gap: 10,
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: 999,
                  border: '1px solid rgba(232,106,23,0.25)',
                  background: 'rgba(232,106,23,0.10)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <span style={{ color: 'var(--primary)' }}>●</span> Learn it. Build it. Scale it.
              </div>
              <h1
                className="page-title"
                style={{
                  margin: '18px 0 12px',
                  fontSize: 56,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                }}
              >
                Where Skills Meet Strategy
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1.8, margin: 0 }}>
                Master in-demand digital skills or let our experts do the work for you — your growth, your choice.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 26 }}>
                <NavLink to="/courses">
                  <Button variant="primary">Explore Courses</Button>
                </NavLink>
                <NavLink to="/services">
                  <Button variant="outline" style={{ border: '2px solid var(--primary)', color: 'var(--primary)' }}>
                    Hire Our Experts
                  </Button>
                </NavLink>
              </div>
            </div>
            <div style={{ marginTop: 44, display: 'flex', justifyContent: 'flex-start' }}>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  border: '1.5px solid var(--text-muted)',
                  background: 'rgba(255,255,255,0.65)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
                aria-label="Scroll to stats"
              >
                ⌄
              </motion.div>
            </div>
          </motion.div>

          <div className="hero-visual">
            <div className="hero-card hero-card-main">
              <div className="hero-card-header">
                <div className="hero-card-avatar">TK</div>
                <div>
                  <p className="hero-card-name">Tarun Kumar</p>
                  <p className="hero-card-role">UI/UX Design Course</p>
                </div>
                <div className="hero-card-badge">Pro</div>
              </div>

              <p className="hero-card-label">Course Progress</p>
              <div className="hero-progress-bar">
                <div className="hero-progress-fill" style={{ width: '72%' }} />
              </div>
              <p className="hero-progress-text">72% Complete — Keep going! 🔥</p>

              <div className="hero-mini-stats">
                <div className="hero-mini-stat">
                  <span className="hero-stat-num">14</span>
                  <span className="hero-stat-lbl">Lessons Done</span>
                </div>
                <div className="hero-mini-stat">
                  <span className="hero-stat-num">5</span>
                  <span className="hero-stat-lbl">Remaining</span>
                </div>
                <div className="hero-mini-stat">
                  <span className="hero-stat-num">4.9★</span>
                  <span className="hero-stat-lbl">Your Rating</span>
                </div>
              </div>
            </div>

            <div className="hero-float-badge hero-float-badge-1">
              <span className="hero-float-icon">🎓</span>
              <div>
                <p className="hero-float-num">10,000+</p>
                <p className="hero-float-txt">Students Enrolled</p>
              </div>
            </div>

            <div className="hero-float-badge hero-float-badge-2">
              <span className="hero-float-icon">⭐</span>
              <div>
                <p className="hero-float-num">4.9/5</p>
                <p className="hero-float-txt">Average Rating</p>
              </div>
            </div>

            <div className="hero-float-badge hero-float-badge-3">
              <span style={{ fontSize: '20px' }}>🎉</span>
              <div>
                <p className="hero-float-num">Priya just enrolled!</p>
                <p className="hero-float-txt">Web Development Course</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="section"
        style={{ paddingTop: 58, paddingBottom: 34, background: '#FFFFFF', borderBottom: '1px solid var(--border)' }}
      >
        <div className="container">
          <StatsCounter
            items={[
              { label: 'Students trained', value: 10000, suffix: '+', star: null },
              { label: 'Courses', value: 8, suffix: '' },
              { label: 'Instructors', value: 50, suffix: '+', star: null },
              { label: 'Rating', value: 4.9, suffix: '★' },
            ]}
          />
        </div>
      </section>

      {/* Value Proposition (compact) */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            style={{ padding: 22, overflow: 'hidden' }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 54,
                height: 54,
                borderRadius: 18,
                background: 'var(--gradient-cta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.10)',
                marginBottom: 14,
              }}
            >
              📚
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 22 }}>Learn With Us</div>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 10 }}>
              Enroll in expert-led courses and build job-ready skills at your own pace.
            </div>
            <div style={{ marginTop: 16 }}>
              <NavLink to="/courses">
                <Button variant="primary">Browse Courses</Button>
              </NavLink>
            </div>
          </motion.div>

          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.08 }}
            style={{ padding: 22, overflow: 'hidden' }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 54,
                height: 54,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #C9580E, #E86A17)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.10)',
                marginBottom: 14,
              }}
            >
              💼
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 22 }}>Hire Our Experts</div>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: 10 }}>
              Let Trivanta's certified team handle your digital needs end-to-end.
            </div>
            <div style={{ marginTop: 16 }}>
              <NavLink to="/services">
                <Button variant="primary">View Services</Button>
              </NavLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <SectionHeading
            title="Our Most Popular Courses"
            subtitle="Curated learning paths that map to real industry outcomes."
          />
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 18 }}>
            {featuredCourses.map((c) => (
              <CourseCard key={c.slug} {...c} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
            <NavLink to="/courses">
              <Button variant="outline">View All Courses</Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <SectionHeading
            title="Digital Services for Businesses & Individuals"
            subtitle="Get delivery you can measure. Strategy to execution—end-to-end."
          />
          <div className="home-services-grid" style={{ marginTop: 18 }}>
            {SERVICES.map((s) => (
              <motion.div
                key={s.id}
                className="glass service-card"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: 18,
                  borderRadius: 22,
                  border: '1px solid var(--border)',
                  background: '#FFFFFF',
                }}
              >
                <div className="service-card-image">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="service-card-icon-overlay">
                    <span>{s.icon}</span>
                  </div>
                </div>
                <div style={{ marginTop: 12, fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 18 }}>{s.name}</div>
                <div style={{ marginTop: 8, color: 'var(--text-secondary)', fontWeight: 750, fontSize: 13, lineHeight: 1.7 }}>
                  {s.description}
                </div>
                <div style={{ marginTop: 14 }}>
                  <NavLink to="/services">
                    <Button variant="outline">Learn more</Button>
                  </NavLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Trivanta */}
      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <SectionHeading title="Why Choose Trivanta" subtitle="A learning + delivery engine designed for outcomes." />
          <div className="why-choose-grid" style={{ marginTop: 18 }}>
            {[
              { icon: '🎯', title: 'Expert-Led Training', text: 'Structured guidance with measurable progress.' },
              { icon: '🛠️', title: 'Real-World Projects', text: 'Deliverables that look like real work.' },
              { icon: '🏆', title: 'Industry Certifications', text: 'Credibility built into the learning journey.' },
              { icon: '💬', title: 'Ongoing Mentorship', text: 'Feedback loops that keep you moving.' },
            ].map((f) => (
              <motion.div
                key={f.title}
                className="glass"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32 }}
                style={{ padding: 18, borderRadius: 22 }}
              >
                <div style={{ fontSize: 26 }}>{f.icon}</div>
                <div style={{ marginTop: 12, fontFamily: 'var(--font-heading)', fontWeight: 950 }}>{f.title}</div>
                <div style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 750, fontSize: 13 }}>
                  {f.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <SectionHeading title="What Learners Say" subtitle="Trusted feedback from people building real momentum." />
          <div style={{ marginTop: 18 }}>
            <TestimonialCarousel
              testimonials={[
                { name: 'Jordan Lee', role: 'Operations Manager', quote: 'The course structure made everything click. Clear deliverables and great pacing.' },
                { name: 'Maya Shah', role: 'Freelance Marketer', quote: 'I used the frameworks immediately and saw results in the first sprint.' },
                { name: 'Sam Turner', role: 'Startup Founder', quote: 'Practical and strategic. The mentorship helped me ship faster than expected.' },
                { name: 'Priya Nair', role: 'Product Analyst', quote: 'Excellent explanations and real-world examples. Strong learning outcomes.' },
                { name: 'Elena Rossi', role: 'Designer', quote: 'I loved how the program blended creativity with production-ready skills.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '70px 0', background: 'var(--gradient-cta)' }}>
        <div className="container">
          <div
            style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 26,
              padding: 24,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 18,
              alignItems: 'center',
              flexWrap: 'wrap',
              color: '#FFFFFF',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 1000, fontSize: 30 }}>Ready to start your journey?</div>
              <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.92)', fontWeight: 800, lineHeight: 1.7 }}>
                Choose learning or delivery—either way, Trivanta helps you move with confidence.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <NavLink to="/signup">
                <Button variant="primary">Start Learning</Button>
              </NavLink>
              <NavLink to="/contact">
                <Button variant="outline" style={{ border: '1.5px solid rgba(255,255,255,0.40)', color: '#FFFFFF' }}>
                  Talk to Us
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

