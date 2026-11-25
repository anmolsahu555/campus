import React, { useState, useEffect } from 'react';
import { Role, EventItem, StudentRegistration, NotificationItem } from './types';
import { initialEvents, initialRegistrations, initialNotifications } from './mockData';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { StudentHome } from './components/StudentHome';
import { StudentRegistrations } from './components/StudentRegistrations';
import { OrganizerHome } from './components/OrganizerHome';
import { OrganizerEventDetail } from './components/OrganizerEventDetail';
import { RegistrationModal } from './components/RegistrationModal';
import { OrganiseEventModal } from './components/OrganiseEventModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ProfileView } from './components/ProfileView';
import { EventCard } from './components/EventCard';
import { Search, Calendar, Database } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [activeTab, setActiveTab] = useState<string>('home');

  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [registrations, setRegistrations] = useState<StudentRegistration[]>(initialRegistrations);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [dbStatus, setDbStatus] = useState<string>(isSupabaseConfigured ? 'Syncing with Supabase...' : 'Running in Local Mode (Supabase Not Configured)');

  // Modals & Sub-states
  const [selectedEventForReg, setSelectedEventForReg] = useState<EventItem | null>(null);
  const [isOrganiseModalOpen, setIsOrganiseModalOpen] = useState(false);
  const [selectedOrganizerEventId, setSelectedOrganizerEventId] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Fetch from Supabase on mount if configured
  useEffect(() => {
    async function fetchSupabaseData() {
      if (!isSupabaseConfigured || !supabase) {
        setDbStatus('Local Mode (Configure VITE_SUPABASE_URL in .env to connect Supabase)');
        return;
      }

      try {
        const { data: eventsData, error: eventsError } = await supabase.from('events').select('*');
        if (!eventsError && eventsData && eventsData.length > 0) {
          setEvents(eventsData);
        }

        const { data: regsData, error: regsError } = await supabase.from('registrations').select('*');
        if (!regsError && regsData && regsData.length > 0) {
          setRegistrations(regsData);
        }

        setDbStatus('Connected to Supabase PostgreSQL Database');
      } catch (err) {
        console.error('Supabase fetch error:', err);
        setDbStatus('Supabase connection fallback to local state');
      }
    }

    fetchSupabaseData();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSwitchRole = (role: Role) => {
    setCurrentRole(role);
    setActiveTab('home');
    setSelectedOrganizerEventId(null);
  };

  const handleRegisterEvent = (event: EventItem) => {
    setSelectedEventForReg(event);
  };

  const handleSubmitRegistration = async (data: {
    studentName: string;
    rollNo: string;
    department: string;
    email: string;
    phone: string;
  }) => {
    if (!selectedEventForReg) return;

    const newReg: StudentRegistration = {
      id: `reg-${Date.now()}`,
      eventId: selectedEventForReg.id,
      eventTitle: selectedEventForReg.title,
      eventDate: selectedEventForReg.date,
      venue: selectedEventForReg.venue,
      studentName: data.studentName,
      rollNo: data.rollNo,
      department: data.department,
      email: data.email,
      phone: data.phone,
      registrationDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      qrCode: `CC-PASS-${selectedEventForReg.title.toUpperCase().replace(/\s+/g, '-')}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
    };

    setRegistrations([newReg, ...registrations]);
    const updatedCount = selectedEventForReg.registeredCount + 1;

    setEvents(
      events.map((e) =>
        e.id === selectedEventForReg.id ? { ...e, registeredCount: updatedCount } : e
      )
    );

    // Sync to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('registrations').insert([newReg]);
        await supabase
          .from('events')
          .update({ registered_count: updatedCount })
          .eq('id', selectedEventForReg.id);
      } catch (err) {
        console.error('Supabase sync registration error:', err);
      }
    }

    setNotifications([
      {
        id: `notif-${Date.now()}`,
        title: 'Registration Confirmed!',
        message: `Successfully registered for ${selectedEventForReg.title}. Pass generated.`,
        time: 'Just now',
        read: false,
        type: 'event',
      },
      ...notifications,
    ]);
  };

  const handleCancelRegistration = async (regId: string) => {
    const reg = registrations.find((r) => r.id === regId);
    if (reg) {
      setRegistrations(registrations.filter((r) => r.id !== regId));
      const targetEvent = events.find((e) => e.id === reg.eventId);
      const newCount = targetEvent ? Math.max(0, targetEvent.registeredCount - 1) : 0;

      setEvents(
        events.map((e) =>
          e.id === reg.eventId ? { ...e, registeredCount: newCount } : e
        )
      );

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('registrations').delete().eq('id', regId);
          if (targetEvent) {
            await supabase
              .from('events')
              .update({ registered_count: newCount })
              .eq('id', targetEvent.id);
          }
        } catch (err) {
          console.error('Supabase cancel registration error:', err);
        }
      }
    }
  };

  const handleCreateEvent = async (eventData: Omit<EventItem, 'id' | 'registeredCount'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-${Date.now()}`,
      registeredCount: 0,
    };

    setEvents([newEvent, ...events]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('events').insert([newEvent]);
      } catch (err) {
        console.error('Supabase create event error:', err);
      }
    }

    setNotifications([
      {
        id: `notif-${Date.now()}`,
        title: 'Event Published Successfully',
        message: `Your event "${newEvent.title}" is now live for student registrations.`,
        time: 'Just now',
        read: false,
        type: 'event',
      },
      ...notifications,
    ]);
  };

  const handleDeleteEvent = async (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setSelectedOrganizerEventId(null);
    setActiveTab('home');

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('events').delete().eq('id', eventId);
      } catch (err) {
        console.error('Supabase delete event error:', err);
      }
    }
  };

  const selectedOrganizerEvent = events.find((e) => e.id === selectedOrganizerEventId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-indigo-50/30 to-violet-50/50 text-gray-900 font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onSwitchRole={handleSwitchRole}
        notificationCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
      />

      {/* Database Status Banner */}
      <div className="bg-purple-900 text-purple-200 px-4 py-1.5 text-center text-[11px] font-medium flex items-center justify-center gap-1.5 shadow-inner">
        <Database className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
        <span>{dbStatus}</span>
      </div>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {currentRole === 'student' ? (
          <>
            {activeTab === 'home' && (
              <StudentHome
                events={events}
                registrations={registrations}
                onSelectEventForRegistration={handleRegisterEvent}
                onNavigateTab={setActiveTab}
              />
            )}
            {activeTab === 'events' && (
              <div className="space-y-6 pb-24">
                <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl">
                  <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <Calendar className="w-7 h-7 text-purple-300" /> All Campus Events
                  </h2>
                  <p className="text-purple-200 text-xs font-medium mt-1">
                    Browse all active and upcoming college fests, hackathons, and seminars.
                  </p>
                </div>

                <div className="space-y-3">
                  {events.map((evt) => (
                    <EventCard
                      key={evt.id}
                      event={evt}
                      isRegistered={registrations.some((r) => r.eventId === evt.id)}
                      onRegister={() => handleRegisterEvent(evt)}
                    />
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'search' && (
              <div className="space-y-6 pb-24">
                <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl space-y-4">
                  <h2 className="text-2xl font-black tracking-tight">Search Campus Events</h2>
                  <div className="relative">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by event title, category, venue..."
                      value={globalSearchQuery}
                      onChange={(e) => setGlobalSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-400 text-sm font-medium rounded-2xl shadow-lg outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {events
                    .filter(
                      (e) =>
                        e.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                        e.category.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                        e.venue.toLowerCase().includes(globalSearchQuery.toLowerCase())
                    )
                    .map((evt) => (
                      <EventCard
                        key={evt.id}
                        event={evt}
                        isRegistered={registrations.some((r) => r.eventId === evt.id)}
                        onRegister={() => handleRegisterEvent(evt)}
                      />
                    ))}
                </div>
              </div>
            )}
            {activeTab === 'registrations' && (
              <StudentRegistrations
                registrations={registrations}
                events={events}
                onCancelRegistration={handleCancelRegistration}
                onExploreEvents={() => setActiveTab('events')}
              />
            )}
            {activeTab === 'profile' && (
              <ProfileView currentRole={currentRole} onSwitchRole={handleSwitchRole} />
            )}
          </>
        ) : (
          <>
            {selectedOrganizerEvent ? (
              <OrganizerEventDetail
                event={selectedOrganizerEvent}
                registrations={registrations}
                onBack={() => setSelectedOrganizerEventId(null)}
                onDeleteEvent={handleDeleteEvent}
              />
            ) : (
              <>
                {activeTab === 'home' && (
                  <OrganizerHome
                    events={events}
                    registrations={registrations}
                    onOpenOrganiseModal={() => setIsOrganiseModalOpen(true)}
                    onSelectEventForDetail={(evt) => setSelectedOrganizerEventId(evt.id)}
                    onNavigateTab={(tab) => {
                      if (tab === 'organise-new') setIsOrganiseModalOpen(true);
                      else setActiveTab(tab);
                    }}
                  />
                )}
                {activeTab === 'my-events' && (
                  <div className="space-y-6 pb-24">
                    <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-black tracking-tight">My Organised Events</h2>
                        <p className="text-purple-200 text-xs font-medium mt-1">
                          Manage event details, student registrations, and analytics.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsOrganiseModalOpen(true)}
                        className="px-4 py-2.5 bg-white text-purple-900 hover:bg-purple-50 font-bold rounded-xl text-xs shadow-md transition-all"
                      >
                        + Organise New
                      </button>
                    </div>

                    <div className="space-y-3">
                      {events.map((evt) => (
                        <OrganizerHome
                          key={evt.id}
                          events={[evt]}
                          registrations={registrations}
                          onOpenOrganiseModal={() => setIsOrganiseModalOpen(true)}
                          onSelectEventForDetail={(e) => setSelectedOrganizerEventId(e.id)}
                          onNavigateTab={setActiveTab}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'search' && (
                  <div className="space-y-6 pb-24">
                    <div className="bg-gradient-to-r from-purple-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl space-y-4">
                      <h2 className="text-2xl font-black tracking-tight">Search All Campus Events</h2>
                      <div className="relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search events..."
                          value={globalSearchQuery}
                          onChange={(e) => setGlobalSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-400 text-sm font-medium rounded-2xl shadow-lg outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      {events
                        .filter(
                          (e) =>
                            e.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                            e.category.toLowerCase().includes(globalSearchQuery.toLowerCase())
                        )
                        .map((evt) => (
                          <div
                            key={evt.id}
                            className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100 flex items-center justify-between"
                          >
                            <div>
                              <h4 className="font-bold text-gray-900">{evt.title}</h4>
                              <p className="text-xs text-purple-600">{evt.date} • {evt.venue}</p>
                            </div>
                            <button
                              onClick={() => setSelectedOrganizerEventId(evt.id)}
                              className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-xl"
                            >
                              Manage
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {activeTab === 'organise-new' && (
                  <div className="text-center py-12">
                    <button
                      onClick={() => setIsOrganiseModalOpen(true)}
                      className="px-6 py-3 bg-purple-600 text-white font-bold rounded-2xl shadow-lg"
                    >
                      Open Organise Event Studio
                    </button>
                  </div>
                )}
                {activeTab === 'profile' && (
                  <ProfileView currentRole={currentRole} onSwitchRole={handleSwitchRole} />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Bottom Nav Bar */}
      <BottomNav
        currentRole={currentRole}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'organise-new') {
            setIsOrganiseModalOpen(true);
          } else {
            setSelectedOrganizerEventId(null);
            setActiveTab(tab);
          }
        }}
      />

      {/* Modals */}
      {selectedEventForReg && (
        <RegistrationModal
          event={selectedEventForReg}
          onClose={() => setSelectedEventForReg(null)}
          onSubmitRegistration={handleSubmitRegistration}
        />
      )}

      {isOrganiseModalOpen && (
        <OrganiseEventModal
          onClose={() => setIsOrganiseModalOpen(false)}
          onCreateEvent={handleCreateEvent}
        />
      )}

      {isNotificationsOpen && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setIsNotificationsOpen(false)}
          onMarkAllRead={() =>
            setNotifications(notifications.map((n) => ({ ...n, read: true })))
          }
        />
      )}
    </div>
  );
}
