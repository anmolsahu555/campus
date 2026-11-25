import { EventItem, StudentRegistration, NotificationItem } from './types';

export const initialEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Tech Hackathon 2026',
    category: 'Code • Innovate • Win',
    date: '28 Nov 2026',
    timing: '09:00 AM - 05:00 PM',
    lastDate: '25 Nov 2026',
    venue: 'Auditorium, Main Campus',
    capacity: 500,
    registeredCount: 243,
    description: 'Join the ultimate 8-hour coding showdown. Build revolutionary software solutions, compete with top innovators, and win exciting cash prizes!',
    bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    organizerName: 'Computer Science Department & Coding Club',
    status: 'Active',
    tags: ['Coding', 'AI', 'Innovation']
  },
  {
    id: 'evt-2',
    title: 'Cultural Fest - Rangmanch',
    category: 'Dance • Drama • Music',
    date: '30 Nov 2026',
    timing: '04:00 PM - 08:00 PM',
    lastDate: '27 Nov 2026',
    venue: 'Open Air Theatre',
    capacity: 800,
    registeredCount: 412,
    description: 'Experience the vibrancy of arts, classical and contemporary dance performances, theatrical plays, and electrifying musical acts.',
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    organizerName: 'Cultural Committee & Student Council',
    status: 'Active',
    tags: ['Dance', 'Music', 'Theatre']
  },
  {
    id: 'evt-3',
    title: 'AI Robofest & Autonomous Battle',
    category: 'Robotics • AI • Hardware',
    date: '05 Dec 2026',
    timing: '10:00 AM - 04:00 PM',
    lastDate: '01 Dec 2026',
    venue: 'Robotics Innovation Lab',
    capacity: 200,
    registeredCount: 120,
    description: 'Showcase autonomous bots navigating complex obstacle courses and competing in line-following and arena battles.',
    bannerImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    organizerName: 'Department of Electronics & Robotics Club',
    status: 'Upcoming',
    tags: ['Robotics', 'IoT', 'Hardware']
  },
  {
    id: 'evt-4',
    title: 'Startup Pitch & Venture Summit',
    category: 'Business • Pitch • Funding',
    date: '10 Dec 2026',
    timing: '11:00 AM - 03:00 PM',
    lastDate: '05 Dec 2026',
    venue: 'Management Seminar Hall',
    capacity: 300,
    registeredCount: 185,
    description: 'Pitch your entrepreneurial ideas to industry venture capitalists and angel investors. Mentorship and seed grants up for grabs.',
    bannerImage: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    organizerName: 'Entrepreneurship Cell (E-Cell)',
    status: 'Upcoming',
    tags: ['Startup', 'Business', 'Pitching']
  }
];

export const initialRegistrations: StudentRegistration[] = [
  {
    id: 'reg-101',
    eventId: 'evt-1',
    eventTitle: 'Tech Hackathon 2026',
    eventDate: '28 Nov 2026',
    venue: 'Auditorium, Main Campus',
    studentName: 'Anmol Sharma',
    rollNo: 'CS-101',
    department: 'Computer Science',
    email: 'anmol.sharma@campus.edu',
    phone: '+91 98765 43210',
    registrationDate: '21 Nov 2026',
    qrCode: 'CC-TICKET-TECH-2026-9871'
  },
  {
    id: 'reg-102',
    eventId: 'evt-2',
    eventTitle: 'Cultural Fest - Rangmanch',
    eventDate: '30 Nov 2026',
    venue: 'Open Air Theatre',
    studentName: 'Anmol Sharma',
    rollNo: 'CS-101',
    department: 'Computer Science',
    email: 'anmol.sharma@campus.edu',
    phone: '+91 98765 43210',
    registrationDate: '22 Nov 2026',
    qrCode: 'CC-TICKET-CULT-2026-4412'
  },
  {
    id: 'reg-103',
    eventId: 'evt-1',
    eventTitle: 'Tech Hackathon 2026',
    eventDate: '28 Nov 2026',
    venue: 'Auditorium, Main Campus',
    studentName: 'Priya Singh',
    rollNo: 'EC-112',
    department: 'Electronics',
    email: 'priya.singh@campus.edu',
    phone: '+91 91234 56789',
    registrationDate: '21 Nov 2026',
    qrCode: 'CC-TICKET-TECH-2026-1102'
  },
  {
    id: 'reg-104',
    eventId: 'evt-1',
    eventTitle: 'Tech Hackathon 2026',
    eventDate: '28 Nov 2026',
    venue: 'Auditorium, Main Campus',
    studentName: 'Rahul Verma',
    rollNo: 'ME-089',
    department: 'Mechanical',
    email: 'rahul.verma@campus.edu',
    phone: '+91 99887 76655',
    registrationDate: '22 Nov 2026',
    qrCode: 'CC-TICKET-TECH-2026-3394'
  },
  {
    id: 'reg-105',
    eventId: 'evt-1',
    eventTitle: 'Tech Hackathon 2026',
    eventDate: '28 Nov 2026',
    venue: 'Auditorium, Main Campus',
    studentName: 'Sneha Patel',
    rollNo: 'IT-204',
    department: 'Information Technology',
    email: 'sneha.patel@campus.edu',
    phone: '+91 94433 22110',
    registrationDate: '23 Nov 2026',
    qrCode: 'CC-TICKET-TECH-2026-5510'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Registration Confirmed!',
    message: 'Your registration for Tech Hackathon 2026 is successfully confirmed. Check your digital pass.',
    time: '10 mins ago',
    read: false,
    type: 'event'
  },
  {
    id: 'notif-2',
    title: 'New Event Alert',
    message: 'AI Robofest & Autonomous Battle registration is now live.',
    time: '2 hours ago',
    read: false,
    type: 'event'
  },
  {
    id: 'notif-3',
    title: 'Reminder',
    message: 'Cultural Fest auditions start tomorrow at 4 PM in Open Air Theatre.',
    time: '1 day ago',
    read: true,
    type: 'reminder'
  }
];
