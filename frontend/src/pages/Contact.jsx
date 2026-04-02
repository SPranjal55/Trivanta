import React, { useState } from 'react';
import api from '../utils/api.js';
import Button from '../components/Button.jsx';
import Loader from '../components/Loader.jsx';
import { validateEmail, validateRequired } from '../utils/validators.js';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // {type, message}

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = () => {
    if (!validateRequired(form.name)) return 'Full Name is required.';
    if (!validateEmail(form.email)) return 'Please enter a valid email.';
    if (!validateRequired(form.subject)) return 'Subject is required.';
    if (!validateRequired(form.message)) return 'Message is required.';
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return showToast('error', err);

    setLoading(true);
    try {
      await api.post('/contact.php', {
        type: 'contact',
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      showToast('success', 'Message sent successfully!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      showToast('error', error?.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ paddingTop: 86 }}>
      <section className="container" style={{ padding: '34px 0 22px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h1 className="page-title" style={{ fontSize: 40, margin: 0 }}>
            Contact
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.7 }}>
            Have questions? Tell us what you’re building and we’ll respond soon.
          </p>
        </motion.div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 18 }}>
          <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14 }}>
              <div>
                <label style={labelStyle}>
                  Full Name <span style={{ color: 'var(--primary)' }}> *</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Email <span style={{ color: 'var(--primary)' }}> *</span>
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                  placeholder="you@example.com"
                  type="email"
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  style={inputStyle}
                  placeholder="+1 555 0123"
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Subject <span style={{ color: 'var(--primary)' }}> *</span>
                </label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  style={inputStyle}
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Message <span style={{ color: 'var(--primary)' }}> *</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, minHeight: 130, resize: 'vertical' }}
                  placeholder="Write your message..."
                  required
                />
              </div>

              <Button type="submit" variant="primary" disabled={loading} style={{ padding: '14px 16px' }}>
                {loading ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <Loader size={16} /> Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <div className="glass" style={{ padding: 18, borderRadius: 22 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 950, fontSize: 18 }}>Get in touch</div>
              <div style={{ marginTop: 14, display: 'grid', gap: 14 }}>
                <div style={contactInfoItemStyle}>
                  <div style={contactIconStyle}>📍</div>
                  <div>
                    <div style={contactLabelStyle}>Our Location</div>
                    <div style={contactValueStyle}>Trivanta Headquarters, Ludhiana, Punjab, India</div>
                  </div>
                </div>

                <div style={contactInfoItemStyle}>
                  <div style={contactIconStyle}>📞</div>
                  <div>
                    <div style={contactLabelStyle}>Call Us</div>
                    <a href="tel:+916283535200" style={{ ...contactValueStyle, color: 'var(--primary)', textDecoration: 'none' }}>
                      +91-6283535200
                    </a>
                  </div>
                </div>

                <div style={contactInfoItemStyle}>
                  <div style={contactIconStyle}>✉️</div>
                  <div>
                    <div style={contactLabelStyle}>Email Us</div>
                    <a href="mailto:support@trivanta.com" style={{ ...contactValueStyle, color: 'var(--primary)', textDecoration: 'none' }}>
                      support@trivanta.com
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 950, marginBottom: 8 }}>Social</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={socialStyle}>LinkedIn</a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={socialStyle}>Instagram</a>
                  <a href="https://www.youtube.com" target="_blank" rel="noreferrer" style={socialStyle}>YouTube</a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" style={socialStyle}>X</a>
                </div>
              </div>
            </div>

            <div className="contact-map-wrapper">
              <iframe
                title="Trivanta Headquarters - Ludhiana"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.89613326489!2d75.7360663281249!3d30.900964600000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a5b%3A0x5c6d8e3f5a9b1234!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          style={{
            position: 'fixed',
            top: 18,
            right: 18,
            zIndex: 3000,
            borderRadius: 16,
            padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: toast.type === 'success' ? 'rgba(232,106,23,0.12)' : 'rgba(255,107,107,0.12)',
            color: toast.type === 'success' ? 'var(--primary)' : '#ff6b6b',
            fontWeight: 950,
            boxShadow: '0 18px 60px rgba(0,0,0,0.4)',
            maxWidth: 360,
          }}
        >
          {toast.message}
        </motion.div>
      ) : null}
    </main>
  );
}

const labelStyle = {
  display: 'block',
  fontWeight: 900,
  fontSize: 13,
  color: 'var(--text-primary)',
  marginBottom: 8,
};

const inputStyle = {
  width: '100%',
  padding: '14px 14px',
  borderRadius: 14,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.03)',
  color: 'var(--text-primary)',
  outline: 'none',
};

const socialStyle = {
  padding: '10px 12px',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.03)',
  color: 'var(--text-primary)',
  fontWeight: 900,
  fontSize: 13,
};

const contactInfoItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 16,
};

const contactIconStyle = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  flexShrink: 0,
  background: 'rgba(232, 106, 23, 0.10)',
  border: '1px solid rgba(232, 106, 23, 0.20)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
};

const contactLabelStyle = {
  fontSize: 12,
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontWeight: 600,
};

const contactValueStyle = {
  fontSize: 15,
  color: 'var(--text-primary)',
  fontWeight: 500,
  marginTop: 4,
};

