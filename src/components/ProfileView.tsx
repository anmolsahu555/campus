import React from 'react';
import { User, ShieldCheck, GraduationCap, Mail, Phone, BookOpen, Award, LogOut, ArrowRight } from 'lucide-react';
import { Role } from '../types';

interface ProfileViewProps {
  currentRole: Role;
  onSwitchRole: (role: Role) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ currentRole, onSwitchRole }) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-950 rounded-3xl p-6 text-white shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl mb-3 bg-purple-100">
            {currentRole === 'student' ? (
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="Anmol Sharma"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                alt="Organizer"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h2 className="text-xl font-black tracking-tight">
            {currentRole === 'student' ? 'Anmol Sharma' : 'Prof. Vikram Aditya'}
          </h2>
          <p className="text-xs text-purple-200 mt-0.5">
            {currentRole === 'student' ? 'Computer Science Department • Roll No: CS-101' : 'Lead Faculty Coordinator & Organizer'}
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-inner">
            {currentRole === 'student' ? <GraduationCap className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            Role: {currentRole === 'student' ? 'Student Participant' : 'Event Organizer'}
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-purple-100 space-y-4">
        <h3 className="text-sm font-black text-gray-900">Personal & Academic Details</h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
            <Mail className="w-4 h-4 text-purple-600" />
            <div>
              <span className="text-gray-400 text-[10px] block font-semibold">Email Address</span>
              <span className="font-bold text-gray-800">
                {currentRole === 'student' ? 'anmol.sharma@campus.edu' : 'vikram.aditya@campus.edu'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
            <Phone className="w-4 h-4 text-purple-600" />
            <div>
              <span className="text-gray-400 text-[10px] block font-semibold">Phone Number</span>
              <span className="font-bold text-gray-800">+91 98765 43210</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <div>
              <span className="text-gray-400 text-[10px] block font-semibold">Department / School</span>
              <span className="font-bold text-gray-800">School of Engineering & Technology</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
            <Award className="w-4 h-4 text-purple-600" />
            <div>
              <span className="text-gray-400 text-[10px] block font-semibold">Activity Points / Badges</span>
              <span className="font-bold text-purple-900">120 Points (Gold Tier Member)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Switch Role Card */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-6 border border-purple-200 shadow-sm flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-gray-900">Switch Application Mode</h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Currently viewing as {currentRole === 'student' ? 'Student' : 'Organizer'}. Switch to test both perspectives.
          </p>
        </div>
        <button
          onClick={() => onSwitchRole(currentRole === 'student' ? 'organizer' : 'student')}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
        >
          Switch to {currentRole === 'student' ? 'Organizer' : 'Student'} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => alert('Logged out successfully.')}
          className="text-xs font-bold text-red-500 hover:text-red-700 inline-flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Log out of Campus Connect
        </button>
      </div>
    </div>
  );
};
