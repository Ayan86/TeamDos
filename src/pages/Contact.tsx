import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  AlertCircle 
} from 'lucide-react';
import { SiteSettings } from '../types';
import { api } from '../services/api';

interface ContactProps {
  settings: SiteSettings;
  onNavigate: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ settings, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await api.sendContactMessage(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
            <Mail size={14} />
            <span>COMMUNICATIONS & INTAKE HEADQUARTERS</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-100 uppercase">
            CONTACT DOS
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400">
            For press inquiries, documentary collaborations, academic consultations, or general investigative correspondence with the Detectives of Supernatural command team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Organization Details & Quick Dispatch Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-black/40 backdrop-blur-md border border-red-950/70 rounded-xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded bg-black border border-red-600 flex items-center justify-center">
                  <span className="font-cinzel text-red-500 font-bold text-lg">DOS</span>
                </div>
                <div>
                  <h2 className="font-cinzel text-base font-bold text-gray-100 uppercase tracking-wider">
                    {settings.siteName || "DETECTIVES OF SUPERNATURAL"}
                  </h2>
                  <p className="font-mono-tech text-[10px] text-red-500 tracking-widest uppercase">
                    {settings.heroTagline || "RISE ABOVE FEAR"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                Founded in 2010. Operating active mobile investigation units across West Bengal and all Indian states.
              </p>

              <div className="space-y-4 text-xs font-mono-tech">
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Central Command:</span>
                    <span>{settings.contactAddress || "Kolkata, West Bengal, India"}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <Mail size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Communications Desk:</span>
                    <span>{settings.contactEmail || "contact@detectivesofsupernatural.com"}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <Phone size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Intake Telephone:</span>
                    <span>{settings.contactPhone || "+91 98300 00000"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Activity Report Quickbox */}
            <div className="bg-black/40 backdrop-blur-md border border-red-900/60 rounded-xl p-6">
              <div className="flex items-center space-x-2 text-red-400 text-xs font-mono-tech font-bold uppercase mb-2">
                <ShieldAlert size={16} />
                <span>EXPERIENCING ACTIVE PHENOMENA?</span>
              </div>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-sans">
                If your inquiry concerns an urgent suspected haunting or poltergeist incident requiring technical investigation, use our official activity report intake form.
              </p>
              <button
                onClick={() => onNavigate('report')}
                className="w-full py-2.5 px-4 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs font-bold tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                GO TO REPORT ACTIVITY FORM
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-black/40 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
              
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-red-950/70 border border-red-600 flex items-center justify-center text-red-500 mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-gray-100 uppercase tracking-wide">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    Your correspondence has reached the DOS communications desk. We will respond to your inquiry promptly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2 rounded bg-neutral-900 text-xs font-mono-tech text-gray-300 border border-neutral-800 hover:text-white"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono-tech text-xs">
                  <h3 className="font-cinzel text-lg font-bold text-gray-100 tracking-wider uppercase mb-4">
                    TRANSMIT INQUIRY
                  </h3>

                  {errorMessage && (
                    <div className="p-3 rounded bg-red-950/40 border border-red-800 text-red-300 flex items-center space-x-2">
                      <AlertCircle size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98000 00000"
                        className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Media Inquiry / Archival Question"
                        className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded p-3 text-gray-200 font-sans focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'SENDING...' : 'TRANSMIT MESSAGE'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
