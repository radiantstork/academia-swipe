"use client";

// 1. Import the Provider from your new context file
import { ProfileProvider } from '../context/ProfileContext'; // Adjust path if needed

// 2. Import the UI component from your new components file
import StudentProfile from '../components/StudentProfile'; // Adjust path if needed

// This is the entire page.
export default function ProfilePage() {
  return (
    // 3. Wrap the UI component with the Provider.
    //    Now, StudentProfile (and any component inside it)
    //    can use the useProfile() hook to get data.
    <ProfileProvider>
      <StudentProfile />
    </ProfileProvider>
  );
}