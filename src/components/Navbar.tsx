import React from 'react';
import { Bell, GraduationCap, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Role } from '../types';

interface NavbarProps {
  currentRole: Role;
  onSwitchRole: (role: Role) => void;
  notificationCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSwitchRole,
  notificationCount,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-xs px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-200">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
            College Event <span className="text-purple-600">Organiser</span>
          </h1>
          <p className="text-[11px] text-gray-500 font-medium">Campus Connect Portal</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Role Switcher Pill */}
        <div className="bg-purple-50 p-1 rounded-full border border-purple-200 flex items-center shadow-xs">
          <button
            onClick={() => onSwitchRole('student')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
              currentRole === 'student'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-700 hover:text-purple-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student
          </button>
          <button
            onClick={() => onSwitchRole('organizer')}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
              currentRole === 'organizer'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-700 hover:text-purple-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Organizer
          </button>
        </div>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-100 flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          {currentRole === 'student' ? (
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Anmol Sharma"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
              alt="Organizer"
              className="w-full h-full object-cover"
            />
          )}
        </button>
      </div>
    </header>
  );
};
