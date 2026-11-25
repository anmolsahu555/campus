import React from 'react';
import { Calendar, Clock, Bell, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  isRegistered?: boolean;
  onRegister: (event: EventItem) => void;
  onViewDetails?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isRegistered = false,
  onRegister,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-center">
      {/* Event Thumbnail */}
      <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden relative shrink-0">
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-white rounded-md">
          {event.status}
        </span>
      </div>

      {/* Event Details */}
      <div className="flex-1 w-full">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 tracking-tight">{event.title}</h3>
            <p className="text-xs font-semibold text-purple-600 mt-0.5">{event.category}</p>
          </div>
          <button className="text-purple-400 hover:text-purple-600 transition-colors p-1">
            <Bell className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2.5 space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-purple-500" />
            <span>Event Date: <strong className="text-gray-800">{event.date}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span>Timing: <strong className="text-gray-800">{event.timing}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            <span className="text-red-600 font-medium">Last Date: {event.lastDate}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-[11px] text-gray-500 font-medium">
            {event.registeredCount} students registered
          </span>
          <div className="flex items-center gap-2">
            {onViewDetails && (
              <button
                onClick={() => onViewDetails(event)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors"
              >
                Details
              </button>
            )}
            <button
              onClick={() => onRegister(event)}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1 ${
                isRegistered
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isRegistered ? 'View Pass' : 'Register'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
