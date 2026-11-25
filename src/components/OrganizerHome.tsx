import React from 'react';
import { PlusCircle, ClipboardList, User, Calendar, Clock, ArrowRight, ShieldCheck, Bell } from 'lucide-react';
import { EventItem, StudentRegistration } from '../types';

interface OrganizerHomeProps {
  events: EventItem[];
  registrations: StudentRegistration[];
  onOpenOrganiseModal: () => void;
  onSelectEventForDetail: (event: EventItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const OrganizerHome: React.FC<OrganizerHomeProps> = ({
  events,
  registrations,
  onOpenOrganiseModal,
  onSelectEventForDetail,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Greeting */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-violet-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                Hello Organizer! <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-purple-200 text-xs font-medium mt-1">Plan. Organise. Inspire.</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-purple-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Cards (from reference image 2) */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onOpenOrganiseModal}
          className="p-4 bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <PlusCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-bold leading-tight">Organise New Event</span>
        </button>

        <button
          onClick={() => onNavigateTab('my-events')}
          className="p-4 bg-white hover:bg-purple-50 border border-purple-100 rounded-2xl shadow-xs flex flex-col items-center justify-center text-center transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <ClipboardList className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-gray-800">My Event</span>
        </button>

        <button
          onClick={() => onNavigateTab('profile')}
          className="p-4 bg-white hover:bg-purple-50 border border-purple-100 rounded-2xl shadow-xs flex flex-col items-center justify-center text-center transition-all group"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <User className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-gray-800">Profile</span>
        </button>
      </div>

      {/* Upcoming Events (You Organised) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" /> Upcoming Events (You Organised)
          </h3>
          <button
            onClick={() => onNavigateTab('my-events')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {events.map((evt) => {
            const count = registrations.filter((r) => r.eventId === evt.id).length;
            return (
              <div
                key={evt.id}
                className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center"
              >
                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden relative shrink-0">
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-purple-600 text-white text-[9px] font-extrabold rounded-md shadow-xs">
                    Your Event
                  </span>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-black text-gray-900 tracking-tight">{evt.title}</h4>
                      <p className="text-xs font-semibold text-purple-600">{evt.category}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      <span>Event Date: <strong className="text-gray-800">{evt.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      <span>Timing: <strong className="text-gray-800">{evt.timing}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:col-span-2">
                      <span className="font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                        Registered: {Math.max(evt.registeredCount, count)} Students
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onSelectEventForDetail(evt)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
