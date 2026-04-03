export interface Grievance {
  id: string;
  _id?: string;
  studentEmail: string;
  studentName: string;
  content: string;
  department: string;
  concernedStaffEmail?: string;
  staffId?: string;
  status: "Not Solved" | "In Progress" | "Solved";
  upvotes: number;
  createdAt: string;
}

export const mockGrievances: Grievance[] = [
  {
    id: "1",
    studentEmail: "user1@example.com",
    studentName: "Arjun Mehta",
    content: "I am yet to receive my grade sheets. When will I receive it?",
    department: "IT",
    concernedStaffEmail: "teacher@example.com",
    status: "Not Solved",
    upvotes: 0,
    createdAt: "11/03/2025 11:29:33 AM",
  },
  {
    id: "2",
    studentEmail: "user1@example.com",
    studentName: "Arjun Mehta",
    content: "My Periodic test marks are not updated",
    department: "CSE",
    concernedStaffEmail: "teacher@example.com",
    status: "Solved",
    upvotes: 1,
    createdAt: "11/03/2025 11:24:56 AM",
  },
  {
    id: "3",
    studentEmail: "user2@example.com",
    studentName: "Priya Sharma",
    content: "Library access card is not working since last week. I have reported this multiple times.",
    department: "Admin",
    concernedStaffEmail: "librarian@example.com",
    status: "In Progress",
    upvotes: 5,
    createdAt: "10/03/2025 09:15:00 AM",
  },
  {
    id: "4",
    studentEmail: "user3@example.com",
    studentName: "Rahul Kumar",
    content: "The projector in Room 301 has been broken for 2 weeks. Lectures are getting affected.",
    department: "ECE",
    concernedStaffEmail: "hod_ece@example.com",
    status: "Not Solved",
    upvotes: 12,
    createdAt: "09/03/2025 02:45:00 PM",
  },
  {
    id: "5",
    studentEmail: "user4@example.com",
    studentName: "Sneha Reddy",
    content: "Scholarship amount has not been credited for the last semester.",
    department: "Finance",
    concernedStaffEmail: "accounts@example.com",
    status: "In Progress",
    upvotes: 8,
    createdAt: "08/03/2025 10:30:00 AM",
  },
];

export const departments = ["IT", "CSE", "ECE", "EEE", "Mech", "Civil", "Admin", "Finance"];
