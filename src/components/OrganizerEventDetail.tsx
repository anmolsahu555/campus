import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Target, Search, Download, Trash2, BarChart3, FileText, CheckCircle2 } from 'lucide-react';
import { EventItem, StudentRegistration } from '../types';

interface OrganizerEventDetailProps {
  event: EventItem;
  registrations: StudentRegistration[];
  onBack: () => void;
  onDeleteEvent: (eventId: string) => void;
}

export const OrganizerEventDetail: React.FC<OrganizerEventDetailProps> = ({
  event,
  registrations,
  onBack,
  onDeleteEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'registrations' | 'details' | 'analytics'>('registrations');
  const [searchStudentQuery, setSearchStudentQuery] = useState('');

  const eventRegistrations = registrations.filter((r) => r.eventId === event.id);

  const filteredRegistrations = eventRegistrations.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchStudentQuery.toLowerCase())
  );

  const targetPercentage = Math.min(100, Math.round((eventRegistrations.length / event.capacity) * 100));

  return (
    <div className="space-y-6 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Events
        </button>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this event?')) {
              onDeleteEvent(event.id);
            }
          }}
          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          title="Delete Event"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Event Header Card */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-purple-100 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shadow-sm relative shrink-0">
            <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
            <span className="absolute top-2 right-2 px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-extrabold rounded-lg shadow-sm">
              {event.status}
            </span>
          </div>

          <div className="flex-1 space-y-2 w-full">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">{event.category}</span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{event.title}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 pt-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>{event.timing}</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Total Registered</span>
              <span className="text-xl font-black text-purple-900">{eventRegistrations.length} Students</span>
            </div>
          </div>

          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-bold block">Target Achieved</span>
              <span className="text-xl font-black text-indigo-900">{targetPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-purple-100/60 p-1.5 rounded-2xl">
        <button
          onClick={() => setActiveTab('registrations')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'registrations'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-900 hover:bg-purple-200/50'
          }`}
        >
          <Users className="w-4 h-4" /> Registrations ({eventRegistrations.length})
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'details'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-900 hover:bg-purple-200/50'
          }`}
        >
          <FileText className="w-4 h-4" /> Event Details
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-900 hover:bg-purple-200/50'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Analytics
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'registrations' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-purple-100 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="text-base font-black text-gray-900">
              Registered Students ({eventRegistrations.length})
            </h3>
            
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name or Roll No."
                value={searchStudentQuery}
                onChange={(e) => setSearchStudentQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-purple-50/80 text-[11px] font-extrabold text-purple-900 border-b border-purple-100">
                  <th className="p-3 rounded-l-xl">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Roll No.</th>
                  <th className="p-3">Department</th>
                  <th className="p-3 rounded-r-xl">Registration Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 font-medium">
                      No registered students found.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg, index) => (
                    <tr key={reg.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="p-3 font-bold text-gray-500">{index + 1}</td>
                      <td className="p-3 font-bold text-gray-900">{reg.studentName}</td>
                      <td className="p-3 font-mono text-purple-700">{reg.rollNo}</td>
                      <td className="p-3 text-gray-600">{reg.department}</td>
                      <td className="p-3 text-gray-500">{reg.registrationDate}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => alert('Student registration list exported to CSV successfully!')}
              className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" /> Export CSV List
            </button>
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-purple-100 space-y-4">
          <h3 className="text-base font-black text-gray-900">Event Description & Information</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block font-semibold">Organizer</span>
              <span className="font-bold text-gray-800">{event.organizerName}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-semibold">Maximum Capacity</span>
              <span className="font-bold text-gray-800">{event.capacity} Students</span>
            </div>
            <div>
              <span className="text-gray-400 block font-semibold">Registration Deadline</span>
              <span className="font-bold text-red-600">{event.lastDate}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-semibold">Event Status</span>
              <span className="font-bold text-emerald-600">{event.status}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white rounded-3xl p-6 shadow-md border border-purple-100 space-y-6">
          <h3 className="text-base font-black text-gray-900">Registration Analytics</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center">
              <span className="text-xs text-gray-500 font-bold block">Total Capacity</span>
              <span className="text-2xl font-black text-purple-900 mt-1 block">{event.capacity}</span>
            </div>
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 text-center">
              <span className="text-xs text-gray-500 font-bold block">Registrations</span>
              <span className="text-2xl font-black text-indigo-900 mt-1 block">{eventRegistrations.length}</span>
            </div>
            <div className="bg-violet-50 p-4 rounded-2xl border border-violet-100 text-center">
              <span className="text-xs text-gray-500 font-bold block">Available Seats</span>
              <span className="text-2xl font-black text-violet-900 mt-1 block">{Math.max(0, event.capacity - eventRegistrations.length)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>Capacity Filled</span>
              <span>{targetPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${targetPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <p className="text-xs text-purple-900 font-medium">
              Event interest is high! 85% of registrations were completed through the mobile quick-access portal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
