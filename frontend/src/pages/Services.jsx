import React, { useMemo, useState } from 'react';
import SERVICES from '../utils/services.js';
import ServiceCard from '../components/ServiceCard.jsx';
import { motion } from 'framer-motion';
import Modal from '../components/Modal.jsx';
import Button from '../components/Button.jsx';
import api from '../utils/api.js';
import Loader from '../components/Loader.jsx';

const budgetOptions = ['<$1,000', '$1,000-$3,000', '$3,000-$7,500', '$7,500-$15,000', '$15,000+'];

export default function Services() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // {type:'success'|'error', message}

  const serviceOptions = useMemo(() => SERVICES.map((s) => s.serviceValue), []);

  const openQuote = (serviceName) => {
    setSelected(serviceName);
    setForm((f) => ({ ...f, service: serviceName }));
    setResult(null);
    setOpen(true);
  };

  const validate = () => {
    const errs = [];
    if (!form.fullName.trim()) errs.push('Full Name is required.');
    if (!form.email.trim()) errs.push('Email is required.');
    if (!form.phone.trim()) errs.push('Phone is required.');
    if (!form.service.trim()) errs.push('Please select a service.');
    if (!form.budget.trim()) errs.push('Please select a budget range.');
    if (!form.message.trim()) errs.push('Message is required.');
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    const errs = validate();
    if (errs.length) {
      setResult({ type: 'error', message: errs[0] });
      return;
    }
    setLoading(true);
    try {
      await api.post('/quote.php', {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company || '',
        service: form.service,
        budget: form.budget,
        message: form.message,
      });
      setResult({ type: 'success', message: 'Quote request sent successfully!' });
      setTimeout(() => {
        setOpen(false);
        setLoading(false);
        setResult(null);
        setForm({ fullName: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
      }, 3000);
    } catch (err) {
      setResult({ type: 'error', message: err?.response?.data?.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ paddingTop: 86 }}>
      <section className="container" style={{ padding: '34px 0 22px' }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h1 className="page-title" style={{ fontSize: 40, margin: 0 }}>
            Professional Digital Services
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 10, lineHeight: 1.7 }}>
            We don't just teach it — we deliver it.
          </p>
        </motion.div>
      </section>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              icon={s.icon}
              name={s.name}
              description={s.description}
              deliverables={s.deliverables}
              image={s.image}
              onQuote={() => openQuote(s.serviceValue)}
            />
          ))}
        </div>
      </section>

      <Modal open={open} title="Request a Quote" onClose={() => (!loading ? setOpen(false) : null)}>
        <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 800 }}>
              We reply within 1 business day.
            </div>
          </div>

          <Field label="Full Name" required value={form.fullName} onChange={(v) => setForm((f) => ({ ...f, fullName: v }))} />
          <Field label="Email" required value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          <Field label="Phone" required value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
          <Field label="Company (optional)" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} />

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>
              Service<span style={{ color: 'var(--primary)' }}> *</span>
            </label>
            <select
              value={form.service}
              onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
              style={selectStyle}
              required
            >
              <option value="">Select a service</option>
              {serviceOptions.map((o) => (
                <option value={o} key={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>
              Budget Range<span style={{ color: 'var(--primary)' }}> *</span>
            </label>
            <select
              value={form.budget}
              onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
              style={selectStyle}
              required
            >
              <option value="">Select budget</option>
              {budgetOptions.map((o) => (
                <option value={o} key={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>
              Message<span style={{ color: 'var(--primary)' }}> *</span>
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              style={{
                ...inputStyle,
                minHeight: 110,
                resize: 'vertical',
                padding: '14px 14px',
              }}
              required
              placeholder="Tell us what you need..."
            />
          </div>

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: 12, alignItems: 'center' }}>
            <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1, padding: '12px 16px' }}>
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <Loader size={16} /> Submitting...
                </span>
              ) : (
                'Submit Request'
              )}
            </Button>
            <Button type="button" variant="outline" disabled={loading} style={{ padding: '12px 16px' }} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>

          {result ? (
            <div style={{ gridColumn: 'span 2', color: result.type === 'success' ? 'var(--primary)' : '#ff6b6b', fontWeight: 900 }}>
              {result.message}
            </div>
          ) : null}
        </form>
      </Modal>
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

const selectStyle = { ...inputStyle, WebkitAppearance: 'none', appearance: 'none' };

function Field({ label, required, value, onChange }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required ? <span style={{ color: 'var(--primary)' }}> *</span> : null}
      </label>
      <input value={value} required={required} onChange={(e) => onChange(e.target.value)} style={inputStyle} placeholder={label} />
    </div>
  );
}

