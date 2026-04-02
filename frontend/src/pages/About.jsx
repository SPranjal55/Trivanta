import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button.jsx';
import { NavLink } from 'react-router-dom';

const values = [
  { icon: '🚀', title: 'Expert-Led Training', text: 'Learn with structured guidance and clear outcomes.' },
  { icon: '✅', title: 'Real-World Projects', text: 'Practice using deliverables that look like work.' },
  { icon: '🌍', title: 'Industry Certifications', text: 'Build confidence with credibility and proof.' },
  { icon: '💬', title: 'Ongoing Mentorship', text: 'Get feedback and support throughout your journey.' },
];

const team = [
  { name: 'Ava Thompson', role: 'Lead Instructor', href: 'https://www.linkedin.com' },
  { name: 'Noah Williams', role: 'Project Mentor', href: 'https://www.linkedin.com' },
  { name: 'Olivia Carter', role: 'Engineering Coach', href: 'https://www.linkedin.com' },
  { name: 'Mila Novak', role: 'Design Educator', href: 'https://www.linkedin.com' },
];

export default function About() {
  return (
    <main style={{ paddingTop: 86 }}>
      <section style={{ padding: '34px 0 22px' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <h1 className="page-title" style={{ fontSize: 40, margin: 0 }}>
              Who We Are
            </h1>
            <div
              className="glass"
              style={{
                padding: 20,
                borderRadius: 22,
                marginTop: 14,
                color: 'var(--text-secondary)',
                fontWeight: 800,
                lineHeight: 1.8,
              }}
            >
              “Trivanta is built for learners who want outcomes—and businesses that need digital execution. We help you
              build real capability, then scale it.”
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 18, alignItems: 'center' }}>
          <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 22 }}>Our Story</div>
            <div style={{ color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.85, fontWeight: 700 }}>
              We started with a simple belief: learning should create tangible progress. So we designed courses with
              real deliverables and paired them with done-for-you service teams.
            </div>
            <div style={{ color: 'var(--text-muted)', marginTop: 12, fontWeight: 800, lineHeight: 1.8 }}>
              From skill building to execution, Trivanta keeps strategy and delivery in the same room.
            </div>
          </div>

          <div
            className="glass"
            style={{
              padding: 0,
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <img
              alt="Team working"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=70"
              style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {values.map((v) => (
            <motion.div
              key={v.title}
              className="glass"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              style={{ padding: 18, borderRadius: 22 }}
            >
              <div style={{ fontSize: 26 }}>{v.icon}</div>
              <div style={{ marginTop: 10, fontFamily: 'var(--font-heading)', fontWeight: 950 }}>{v.title}</div>
              <div style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 700, fontSize: 13 }}>{v.text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 26 }}>Team</div>
          <div style={{ color: 'var(--text-secondary)', marginTop: 8, fontWeight: 800, lineHeight: 1.7 }}>
            Mentors and operators who care about outcomes.
          </div>

          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {team.map((m) => (
              <div key={m.name} className="glass" style={{ padding: 18, borderRadius: 22 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 999,
                    background: 'var(--gradient-cta)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 1000,
                  }}
                >
                  {m.name.split(' ').slice(0, 2).map((p) => p[0]).join('')}
                </div>
                <div style={{ marginTop: 14, fontFamily: 'var(--font-heading)', fontWeight: 950 }}>{m.name}</div>
                <div style={{ marginTop: 6, color: 'var(--text-muted)', fontWeight: 800, fontSize: 13 }}>{m.role}</div>
                <a href={m.href} target="_blank" rel="noreferrer" style={{ marginTop: 12, display: 'inline-flex', gap: 10, alignItems: 'center', color: 'var(--primary)', fontWeight: 950 }}>
                  <span aria-hidden="true">in</span> LinkedIn
                </a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 22 }}>
            <NavLink to="/contact">
              <Button variant="primary">Join Our Team</Button>
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}

