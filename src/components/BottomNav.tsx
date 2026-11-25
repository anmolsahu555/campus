import React from 'react';
import { Home, Calendar, Search, ClipboardList, User, PlusCircle, BookmarkCheck } from 'lucide-react';
import { Role } from '../types';

interface BottomNavProps {
  currentRole: Role;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRole, activeTab, onTabChange }) => {
  if (currentRole === 'student') {
    const studentTabs = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'search', label: 'Search', icon: Search },
      { id: 'registrations', label: 'My Registration', icon: BookmarkCheck },
      { id: 'profile', label: 'Profile', icon: User },
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-lg pb-safe">
        <div className="max-w-2xl mx-auto px-2 flex justify-around items-center h-16">
          {studentTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
                  isActive ? 'text-purple-600 font-bold scale-105' : 'text-gray-400 hover:text-gray-600 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                <span className="text-[11px] tracking-tight">{tab.label}</span>
                {isActive && <span className="w-1 h-1 bg-purple-600 rounded-full mt-0.5"></span>}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Organizer tabs
  const organizerTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-events', label: 'My Event', icon: ClipboardList },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'organise-new', label: 'Organise New', icon: PlusCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-lg pb-safe">
      <div className="max-w-2xl mx-auto px-2 flex justify-around items-center h-16">
        {organizerTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full py-1 transition-all ${
                isActive ? 'text-purple-600 font-bold scale-105' : 'text-gray-400 hover:text-gray-600 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[11px] tracking-tight">{tab.label}</span>
              {isActive && <span className="w-1 h-1 bg-purple-600 rounded-full mt-0.5"></span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
