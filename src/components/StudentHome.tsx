import React, { useState } from 'react';
import { Search, Calendar, BookmarkCheck, User, Sparkles, ArrowRight, Trophy } from 'lucide-react';
import { EventItem, StudentRegistration } from '../types';
import { EventCard } from './EventCard';

interface StudentHomeProps {
  events: EventItem[];
  registrations: StudentRegistration[];
  onSelectEventForRegistration: (event: EventItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  events,
  registrations,
  onSelectEventForRegistration,
  onNavigateTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Coding', 'Dance', 'Robotics', 'Startup'];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || evt.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const registeredEventIds = new Set(registrations.map((r) => r.eventId));

  return (
    <div className="space-y-6 pb-24">
      {/* Welcome Greeting */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-violet-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                Hello Anmol! <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-purple-200 text-xs font-medium mt-1">Discover. Participate. Grow.</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Trophy className="w-6 h-6 text-yellow-300" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-5 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for events, tech fests, workshops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-400 text-sm font-medium rounded-2xl shadow-lg outline-none focus:ring-4 focus:ring-purple-400/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Hero Banner (from ref image 1) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-violet-950 p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-3 z-10 max-w-sm">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
            College Events
          </span>
          <h3 className="text-xl font-black tracking-tight leading-snug">
            Explore the Excitement!
          </h3>
          <p className="text-xs text-purple-200 font-medium">
            Be a part of amazing events and make memories that last a lifetime.
          </p>
          <button
            onClick={() => onNavigateTab('events')}
            className="px-5 py-2.5 bg-white text-purple-900 hover:bg-purple-50 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            Explore Events <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="mt-4 md:mt-0 relative z-10">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80"
            alt="College Fest"
            className="w-48 h-32 object-cover rounded-2xl shadow-xl border border-white/20"
          />
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" /> Quick Access
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onNavigateTab('events')}
            className="p-4 bg-white hover:bg-purple-50/50 border border-purple-100 rounded-2xl shadow-xs flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gray-800">Events</span>
          </button>

          <button
            onClick={() => onNavigateTab('registrations')}
            className="p-4 bg-white hover:bg-purple-50/50 border border-purple-100 rounded-2xl shadow-xs flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gray-800">My Registration</span>
          </button>

          <button
            onClick={() => onNavigateTab('profile')}
            className="p-4 bg-white hover:bg-purple-50/50 border border-purple-100 rounded-2xl shadow-xs flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-gray-800">Profile</span>
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                : 'bg-white text-gray-600 border border-purple-100 hover:bg-purple-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Upcoming Events Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" /> Upcoming Events
          </h3>
          <button
            onClick={() => onNavigateTab('events')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-purple-100 text-gray-500">
              <p className="text-sm font-semibold">No events found matching your search.</p>
            </div>
          ) : (
            filteredEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                isRegistered={registeredEventIds.has(evt.id)}
                onRegister={() => onSelectEventForRegistration(evt)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
