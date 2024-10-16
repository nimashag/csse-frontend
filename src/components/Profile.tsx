// Profile.tsx
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore"; // Zustand store
import { db } from "../firebase/firebase"; // Firestore database import
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles

const Profile: React.FC = () => {
  const { user, userProfile, setUserProfile } = useAuthStore();
  const [name, setName] = useState(userProfile.name || "");
  const [address, setAddress] = useState(userProfile.address || "");
  const [age, setAge] = useState(userProfile.age || 0);
  const [gender, setGender] = useState(userProfile.gender || "");
  const [contactNumber, setContactNumber] = useState(userProfile.contactNumber || "");
  const [emergencyDial, setEmergencyDial] = useState(userProfile.emergencyDial || "");
  const [profileImage, setProfileImage] = useState(userProfile.profileImage || "");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserProfile(data); // Set profile data to Zustand store
          setName(data.name);
          setAddress(data.address);
          setAge(data.age);
          setGender(data.gender);
          setContactNumber(data.contactNumber);
          setEmergencyDial(data.emergencyDial);
          setProfileImage(data.profileImage);
        }
      }
    };
    fetchUserProfile();
  }, [user, setUserProfile]);

  const handleProfileUpdate = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name, address, age, gender, contactNumber, emergencyDial, profileImage });
      setUserProfile({ ...userProfile, name, address, age, gender, contactNumber, emergencyDial, profileImage });
      toast.success("Profile updated successfully!");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would normally upload the image to your storage (Firebase Storage or similar)
      // For now, we will just simulate the process with a placeholder image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Preview uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <div className="space-y-4">
        <div className="flex items-center mb-4">
          <img
            src={profileImage || "/dummy-profile.png"} // Fallback image
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="ml-4" />
        </div>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Enter your age"
        />
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Enter contact number"
        />
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          value={emergencyDial}
          onChange={(e) => setEmergencyDial(e.target.value)}
          placeholder="Enter emergency dial number"
        />
        <button
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          onClick={handleProfileUpdate}
        >
          Update Profile
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
