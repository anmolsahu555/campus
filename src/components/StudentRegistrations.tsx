import React from 'react';
import { BookmarkCheck, Calendar, MapPin, QrCode, Download, Trash2, ArrowRight } from 'lucide-react';
import { StudentRegistration, EventItem } from '../types';

interface StudentRegistrationsProps {
  registrations: StudentRegistration[];
  events: EventItem[];
  onCancelRegistration: (regId: string) => void;
  onExploreEvents: () => void;
}

export const StudentRegistrations: React.FC<StudentRegistrationsProps> = ({
  registrations,
  events,
  onCancelRegistration,
  onExploreEvents,
}) => {
  return (
    <div className="space-y-6 pb-24">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <BookmarkCheck className="w-7 h-7 text-purple-400" /> My Registrations
        </h2>
        <p className="text-purple-200 text-xs font-medium mt-1">
          Access your digital passes, QR entry codes, and event schedules.
        </p>
      </div>

      <div className="space-y-4">
        {registrations.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-purple-100 shadow-sm space-y-4">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">No Registrations Yet</h3>
              <p className="text-xs text-gray-500 mt-1">
                Explore campus events and register to participate!
              </p>
            </div>
            <button
              onClick={onExploreEvents}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
            >
              Explore Events <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          registrations.map((reg) => {
            const event = events.find((e) => e.id === reg.eventId);
            return (
              <div
                key={reg.id}
                className="bg-white rounded-3xl p-6 shadow-md border border-purple-100 space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl -z-0"></div>

                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                      Confirmed Pass
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-2">{reg.eventTitle}</h3>
                  </div>
                  <button
                    onClick={() => onCancelRegistration(reg.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Cancel Registration"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 bg-purple-50/50 p-4 rounded-2xl border border-purple-100/60 relative z-10">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Date: <strong className="text-gray-900">{reg.eventDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Venue: <strong className="text-gray-900">{reg.venue || event?.venue}</strong></span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Participant</span>
                    <span className="font-bold text-gray-900">{reg.studentName} ({reg.rollNo})</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Department</span>
                    <span className="font-bold text-gray-900">{reg.department}</span>
                  </div>
                </div>

                {/* Digital Ticket Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-gray-100 gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-900 p-2.5 rounded-2xl text-white shadow-md">
                      <QrCode className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Entry Ticket ID</span>
                      <p className="font-mono font-bold text-purple-900 text-sm">{reg.qrCode}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading pass ${reg.qrCode} as PDF...`)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Pass
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
