import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';
import { EventItem } from '../types';

interface OrganiseEventModalProps {
  onClose: () => void;
  onCreateEvent: (eventData: Omit<EventItem, 'id' | 'registeredCount'>) => void;
}

export const OrganiseEventModal: React.FC<OrganiseEventModalProps> = ({ onClose, onCreateEvent }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Code • Innovate • Win');
  const [date, setDate] = useState('15 Dec 2026');
  const [timing, setTiming] = useState('10:00 AM - 04:00 PM');
  const [lastDate, setLastDate] = useState('12 Dec 2026');
  const [venue, setVenue] = useState('Main Auditorium');
  const [capacity, setCapacity] = useState(300);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Coding, AI, Hackathon');
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80');

  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiBrainstorm = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setTitle('Quantum AI & Web3 Hackfest 2026');
      setCategory('Code • Blockchain • AI');
      setDescription('An intensive 24-hour hackathon focused on decentralized intelligence, quantum algorithms, and next-gen web applications.');
      setTags('AI, Web3, Hackathon, Quantum');
      setIsAiLoading(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateEvent({
      title,
      category,
      date,
      timing,
      lastDate,
      venue,
      capacity: Number(capacity),
      description: description || 'Join this exciting campus event organized by student leadership.',
      bannerImage,
      organizerName: 'College Event Organiser Council',
      status: 'Active',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-purple-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">Organizer Studio</span>
              <h2 className="text-xl font-black tracking-tight mt-0.5">Organise New Campus Event</h2>
            </div>
            <button
              type="button"
              onClick={handleAiBrainstorm}
              disabled={isAiLoading}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              {isAiLoading ? 'AI Generating...' : 'Gemini AI Idea'}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Event Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Annual Tech Symposium 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category / Tagline</label>
              <input
                type="text"
                required
                placeholder="Code • Innovate • Win"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Max Capacity</label>
              <input
                type="number"
                required
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Event Date</label>
              <input
                type="text"
                required
                placeholder="15 Dec 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Timing</label>
              <input
                type="text"
                required
                placeholder="09:00 AM - 05:00 PM"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Last Date to Register</label>
              <input
                type="text"
                required
                placeholder="12 Dec 2026"
                value={lastDate}
                onChange={(e) => setLastDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Venue / Location</label>
              <input
                type="text"
                required
                placeholder="Main Auditorium"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="Coding, AI, Hackathon"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Event Description</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the event objectives, rules, and highlights..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" /> Publish & Launch Event
          </button>
        </form>
      </div>
    </div>
  );
};
