import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Upload, 
  CheckCircle2, 
  FileCheck, 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  FileText,
  Lock,
  X
} from 'lucide-react';
import { ActivityType, ActivityReport } from '../types';
import { api } from '../services/api';

export const ReportActivity: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    city: '',
    state: '',
    dateOfActivity: '',
    approximateTime: '',
    activityType: 'Apparition' as ActivityType,
    description: '',
    witnessCount: 1,
    hasPreviousInvestigation: false,
    additionalInfo: ''
  });

  const [attachments, setAttachments] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCase, setSubmittedCase] = useState<{ caseId: string; report: ActivityReport } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activityTypes: ActivityType[] = [
    'Apparition',
    'Unexplained Sounds',
    'Object Movement',
    'Unexplained Lights',
    'Shadow Figure',
    'Electronic Disturbance',
    'Temperature Anomaly',
    'Unusual Smell',
    'Physical Interaction',
    'Other'
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await api.uploadFile(file);
        setAttachments((prev) => [...prev, res.url]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to upload one or more files. Please try again or submit without attachments.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.location || !formData.description) {
      setErrorMessage('Please fill in all required fields marked with *');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        ...formData,
        witnessCount: Number(formData.witnessCount) || 1,
        attachments
      };

      const result = await api.submitReport(payload);
      setSubmittedCase({
        caseId: result.caseId,
        report: result.report
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
            <ShieldAlert size={14} className="animate-pulse" />
            <span>CONFIDENTIAL INTAKE DESK</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-100 uppercase">
            REPORT UNEXPLAINED ACTIVITY
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans">
            If you or your family are experiencing anomalous physical events, apparitions, or electronic disturbances, provide details below. All submissions are treated with complete scientific confidentiality.
          </p>
        </div>

        {/* Success Screen with generated Case ID */}
        {submittedCase ? (
          <div className="bg-black/40 backdrop-blur-md border border-red-800/80 rounded-xl p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(220,38,38,0.25)] space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-950/70 border border-red-600 flex items-center justify-center text-red-500 mx-auto box-glow-red">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="font-mono-tech text-xs tracking-[0.25em] text-red-400 uppercase font-semibold block mb-2">
                ACTIVITY REPORT LOGGED SUCCESSFULLY
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-gray-100 uppercase">
                CASE IDENTIFIER ASSIGNED
              </h2>
            </div>

            <div className="py-5 px-8 rounded-lg bg-black/80 border-2 border-red-600/80 inline-block font-mono-tech shadow-[0_0_25px_rgba(220,38,38,0.3)]">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">YOUR OFFICIAL DOS CASE ID</div>
              <div className="text-2xl sm:text-3xl font-black text-red-500 tracking-[0.2em] uppercase">
                {submittedCase.caseId}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed font-sans">
              Please save this Case ID for your records. Our scientific triage team is reviewing the telemetric details and witness statements provided. A lead investigator will contact you via email or phone within 24 to 48 hours.
            </p>

            <div className="pt-4 border-t border-neutral-800 flex justify-center">
              <button
                onClick={() => {
                  setSubmittedCase(null);
                  setAttachments([]);
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    location: '',
                    city: '',
                    state: '',
                    dateOfActivity: '',
                    approximateTime: '',
                    activityType: 'Apparition',
                    description: '',
                    witnessCount: 1,
                    hasPreviousInvestigation: false,
                    additionalInfo: ''
                  });
                }}
                className="px-6 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono-tech tracking-wider text-gray-200 uppercase transition-colors"
              >
                SUBMIT ANOTHER REPORT
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md border border-neutral-800/80 rounded-xl p-6 sm:p-10 space-y-8 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            
            {errorMessage && (
              <div className="p-4 rounded bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center space-x-2 font-mono-tech">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Section 1: Witness & Contact Information */}
            <div>
              <h3 className="font-mono-tech text-xs tracking-[0.2em] text-red-500 font-bold uppercase mb-4 flex items-center space-x-2">
                <User size={14} />
                <span>1. WITNESS INFORMATION</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tech text-xs">
                <div>
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sen"
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
              </div>
            </div>

            {/* Section 2: Location Information */}
            <div>
              <h3 className="font-mono-tech text-xs tracking-[0.2em] text-red-500 font-bold uppercase mb-4 flex items-center space-x-2">
                <MapPin size={14} />
                <span>2. INCIDENT LOCATION</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tech text-xs">
                <div className="sm:col-span-1">
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    Premises / Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Ancestral Home, Baranagar"
                    className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Kolkata"
                    className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="West Bengal"
                    className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Incident Chronology & Classification */}
            <div>
              <h3 className="font-mono-tech text-xs tracking-[0.2em] text-red-500 font-bold uppercase mb-4 flex items-center space-x-2">
                <FileText size={14} />
                <span>3. INCIDENT CLASSIFICATION & DETAILS</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-tech text-xs mb-4">
                <div>
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    Date of Activity
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfActivity}
                    onChange={(e) => setFormData({ ...formData, dateOfActivity: e.target.value })}
                    className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    Approximate Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 02:30 AM"
                    value={formData.approximateTime}
                    onChange={(e) => setFormData({ ...formData, approximateTime: e.target.value })}
                    className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    Primary Activity Type
                  </label>
                  <select
                    value={formData.activityType}
                    onChange={(e) => setFormData({ ...formData, activityType: e.target.value as ActivityType })}
                    className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                  >
                    {activityTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-tech text-xs mb-4">
                <div>
                  <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                    Number of Eyewitnesses
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.witnessCount}
                    onChange={(e) => setFormData({ ...formData, witnessCount: parseInt(e.target.value) || 1 })}
                    className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-gray-200 focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-6">
                  <input
                    type="checkbox"
                    id="prevInv"
                    checked={formData.hasPreviousInvestigation}
                    onChange={(e) => setFormData({ ...formData, hasPreviousInvestigation: e.target.checked })}
                    className="w-4 h-4 rounded bg-black border-neutral-700 text-red-600 focus:ring-0"
                  />
                  <label htmlFor="prevInv" className="text-gray-300 text-xs cursor-pointer">
                    Has any previous investigation been conducted at this location?
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="font-mono-tech text-xs">
                <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                  Detailed Description of Experience *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what occurred with as much objective detail as possible: sounds heard, visual observations, physical feelings, electronic disruptions, duration..."
                  className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded p-3 text-gray-200 font-sans focus:outline-none"
                />
              </div>
            </div>

            {/* Section 4: File & Media Uploads */}
            <div>
              <h3 className="font-mono-tech text-xs tracking-[0.2em] text-red-500 font-bold uppercase mb-2 flex items-center space-x-2">
                <Upload size={14} />
                <span>4. ATTACH EVIDENCE (PHOTOS, VIDEO CLIPS, AUDIO EVP)</span>
              </h3>
              <p className="text-[11px] text-gray-400 font-sans mb-3">
                Upload raw unedited files if available. Max file size: 25MB each.
              </p>

              <div className="border-2 border-dashed border-neutral-800 hover:border-red-700 rounded-lg p-6 text-center bg-black/40 transition-colors">
                <input
                  type="file"
                  id="evidenceUpload"
                  multiple
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="evidenceUpload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                  <Upload size={24} className="text-red-500" />
                  <span className="text-xs font-mono-tech text-gray-300">
                    {isUploading ? 'UPLOADING EVIDENCE TO ARCHIVE...' : 'DRAG & DROP EVIDENCE FILES OR CLICK TO BROWSE'}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono-tech">
                    SUPPORTED: JPG, PNG, MP3, WAV, MP4, MOV
                  </span>
                </label>
              </div>

              {/* Uploaded attachments pills */}
              {attachments.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {attachments.map((url, i) => (
                    <div key={i} className="flex items-center space-x-2 px-3 py-1.5 rounded bg-black border border-neutral-800 text-xs font-mono-tech text-gray-300">
                      <FileCheck size={13} className="text-emerald-500" />
                      <span className="truncate max-w-[180px]">{url.split('/').pop()}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(i)}
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 5: Additional Info */}
            <div className="font-mono-tech text-xs">
              <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                Additional Historical or Environmental Notes
              </label>
              <textarea
                rows={2}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Any known historical incidents, deaths, structural age, electromagnetic proximity..."
                className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded p-3 text-gray-200 font-sans focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-[11px] font-mono-tech text-neutral-500">
                <Lock size={12} className="text-red-500" />
                <span>CONFIDENTIALITY PROTOCOL STRICTLY ENFORCED</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(220,38,38,0.5)] border border-red-500 transition-all flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? 'PROCESSING DOSSIER...' : 'SUBMIT REPORT'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
