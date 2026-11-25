export type Role = 'student' | 'organizer';

export interface EventItem {
  id: string;
  title: string;
  category: string; // e.g. "Code • Innovate • Win"
  date: string;
  timing: string;
  lastDate: string;
  venue: string;
  capacity: number;
  registeredCount: number;
  description: string;
  bannerImage: string;
  organizerName: string;
  status: 'Active' | 'Completed' | 'Upcoming';
  tags: string[];
}

export interface StudentRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  studentName: string;
  rollNo: string;
  department: string;
  email: string;
  phone: string;
  registrationDate: string;
  qrCode: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'event' | 'reminder' | 'system';
}
