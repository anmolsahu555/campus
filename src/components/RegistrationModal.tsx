import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2, QrCode, Download, Sparkles } from 'lucide-react';
import { EventItem, StudentRegistration } from '../types';

interface RegistrationModalProps {
  event: EventItem;
  existingRegistration?: StudentRegistration;
  onClose: () => void;
  onSubmitRegistration: (data: { studentName: string; rollNo: string; department: string; email: string; phone: string }) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  existingRegistration,
  onClose,
  onSubmitRegistration,
}) => {
  const [studentName, setStudentName] = useState(existingRegistration?.studentName || 'Anmol Sharma');
  const [rollNo, setRollNo] = useState(existingRegistration?.rollNo || 'CS-101');
  const [department, setDepartment] = useState(existingRegistration?.department || 'Computer Science');
  const [email, setEmail] = useState(existingRegistration?.email || 'anmol.sharma@campus.edu');
  const [phone, setPhone] = useState(existingRegistration?.phone || '+91 98765 43210');
  const [isSuccess, setIsSuccess] = useState(!!existingRegistration);
  const [ticketCode, setTicketCode] = useState(existingRegistration?.qrCode || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRegistration({ studentName, rollNo, department, email, phone });
    setTicketCode(`CC-TICKET-${event.title.toUpperCase().replace(/\s+/g, '-')}-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-purple-100 animate-in fade-in zoom-in duration-200">
        {/* Header Banner */}
        <div className="relative h-36 bg-gradient-to-r from-purple-700 to-indigo-800 p-6 text-white flex flex-col justify-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-200">
            {event.category}
          </span>
          <h2 className="text-xl font-black tracking-tight">{event.title}</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-2 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Registration Successful!</h3>
                <p className="text-xs text-gray-500 mt-1">Your digital entry pass has been generated.</p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-gradient-to-br from-purple-900 to-indigo-950 rounded-2xl p-4 text-white text-left space-y-3 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">Campus Connect Pass</span>
                    <h4 className="font-bold text-sm text-white mt-0.5">{event.title}</h4>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                  <div>
                    <span className="text-purple-300 text-[10px]">Name</span>
                    <p className="font-semibold">{studentName}</p>
                  </div>
                  <div>
                    <span className="text-purple-300 text-[10px]">Roll No</span>
                    <p className="font-semibold">{rollNo}</p>
                  </div>
                  <div>
                    <span className="text-purple-300 text-[10px]">Date & Time</span>
                    <p className="font-semibold">{event.date}</p>
                  </div>
                  <div>
                    <span className="text-purple-300 text-[10px]">Ticket ID</span>
                    <p className="font-mono text-purple-200 text-[11px]">{ticketCode || 'CC-PASS-8821'}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => alert('Digital Pass downloaded successfully as PDF!')}
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" /> Download Pass
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-purple-50 p-3 rounded-xl border border-purple-100">
                <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{event.date} • {event.timing}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-purple-50 p-3 rounded-xl border border-purple-100">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{event.venue}</span>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Roll Number</label>
                    <input
                      type="text"
                      required
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">College Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Confirm & Register Now
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
