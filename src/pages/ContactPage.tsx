import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { faqs } from '../data/storeInfo';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { storeSettings, showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.message) return;
    setSubmitted(true);
    showToast('Your message has been sent to Bril\'s Mart support!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-16">
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          We’d Love To Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Have an inquiry about product availability, wholesale purchases, or delivery? Reach out to us anytime.
        </p>
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Phone,
            title: 'Call Us Directly',
            detail: storeSettings.phone,
            sub: 'Mon - Sat: 7am - 9pm',
            action: () => (window.location.href = `tel:${storeSettings.phone}`),
            label: 'Call Now',
          },
          {
            icon: MessageSquare,
            title: 'WhatsApp Chat',
            detail: storeSettings.whatsapp,
            sub: 'Instant reply in minutes',
            action: () =>
              window.open(`https://wa.me/${storeSettings.whatsapp.replace(/\D/g, '')}`, '_blank'),
            label: 'Chat on WhatsApp',
          },
          {
            icon: Mail,
            title: 'Email Inquiries',
            detail: storeSettings.email,
            sub: 'Replies within 24 hours',
            action: () => (window.location.href = `mailto:${storeSettings.email}`),
            label: 'Send Email',
          },
          {
            icon: MapPin,
            title: 'Physical Supermarket',
            detail: 'Lekki Phase 1, Lagos',
            sub: '122 Supermart Road',
            action: () => window.open('https://maps.google.com', '_blank'),
            label: 'Get Directions',
          },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="p-5 bg-white rounded-3xl border border-slate-200/80 space-y-3 shadow-2xs hover:border-brand-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>
                <p className="text-xs font-semibold text-slate-700 mt-1">{c.detail}</p>
                <span className="text-[11px] text-slate-400 block">{c.sub}</span>
              </div>
              <button
                onClick={c.action}
                className="w-full py-2 bg-slate-50 hover:bg-brand-50 text-brand-700 text-xs font-bold rounded-xl border border-slate-100 transition-colors"
              >
                {c.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Form & FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill out the form below and our supermarket customer care desk will contact you promptly.
          </p>

          {submitted ? (
            <div className="text-center py-8 space-y-3 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Thank you, {formData.fullName}. A Bril's Mart customer representative will respond shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', phone: '', email: '', message: '' });
                }}
                className="mt-4 px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Fashola"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 0802 345 6789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you today? (e.g. inquiry about bulk rice prices or delivery times)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-brand-600/20 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQs Accordion */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 mt-1">Quick answers regarding shopping at Bril's Mart</p>
          </div>

          <div className="space-y-2 text-xs">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left font-bold text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'transform rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};