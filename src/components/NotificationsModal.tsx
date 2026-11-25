import React from 'react';
import { X, Bell, CheckCircle2, Clock } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onMarkAllRead,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-purple-100 animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-300" />
            <h2 className="text-lg font-black tracking-tight">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-xs text-gray-500 py-6">No new notifications.</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all ${
                  notif.read ? 'bg-gray-50 border-gray-100 opacity-80' : 'bg-purple-50/75 border-purple-100 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-bold text-gray-900">{notif.title}</h4>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {notif.time}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={onMarkAllRead}
            className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark all as read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
