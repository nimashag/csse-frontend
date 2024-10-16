// LoginSignup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailSignIn, emailSignUp, googleSignIn } from "../firebase/auth"; // Firebase functions
import { useAuthStore } from "@/store/AuthStore"; // Zustand for global state
import { db } from "../firebase/firebase"; // Firestore database import
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles

const LoginSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignup, setIsSignup] = useState<boolean>(false); // Toggle between login/signup
  const { setUser, setUserProfile } = useAuthStore(); // Zustand store to set user
  const navigate = useNavigate(); // Navigation hook to redirect

  // State for additional fields for profile during signup
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emergencyDial, setEmergencyDial] = useState<string>("");
  const userType = "patient"; // UserType set as 'patient' by default
  const profileImage = "/dummy-profile.png"; // Default profile image

  // Handle Email Sign Up or Sign In
  const handleEmailAuth = async () => {
    const result = isSignup ? await emailSignUp(email, password) : await emailSignIn(email, password);
    if (result?.user) {
      setUser(result.user); // Store user info in Zustand store
      setUserProfile({ name, address, age, gender, email: result.user.email, contactNumber, emergencyDial, userType, profileImage }); // Save profile to Zustand

      if (isSignup) {
        // Prepare patient profile data to store in Firestore
        const patientProfile = {
          name,
          address,
          age,
          gender,
          email: result.user.email,
          contactNumber,
          emergencyDial,
          type: userType, // User type is 'patient'
          profileImage, // Default dummy image
        };

        // Save profile to Firestore in 'users' collection
        await setDoc(doc(db, "users", result.user.uid), patientProfile);
        setIsSignup(false); // Reset to login form after successful signup
        toast.success("Signed up successfully! Please log in.");
      } else {
        // Successful login flow
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
      }
    } else {
      toast.error(result.error?.message || "An error occurred");
    }
  };

  // Handle Google Sign-In
  const handleGoogleAuth = async () => {
    const result = await googleSignIn();
    if (result?.user) {
      setUser(result.user); // Set user info in Zustand store
      setUserProfile({ email: result.user.email }); // Set user profile data if needed
      toast.success("Logged in with Google successfully!");
      setTimeout(() => navigate("/dashboard"), 2000); // Redirect after 2 seconds
    } else {
      toast.error(result.error?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image and Branding */}
      <div className="hidden md:flex w-1/2 bg-blue-800 justify-center items-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">MEDILINK</h1>
          <p className="text-xl">Sign in to Patient Account</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 p-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>

          <div className="space-y-6">
            {/* Email Field */}
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />

            {/* Password Field */}
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {/* Additional Fields for Sign Up */}
            {isSignup && (
              <div className="space-y-4">
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
              </div>
            )}

            {/* Submit Button */}
            <button
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={handleEmailAuth}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            {/* Google Sign-In */}
            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="border-t border-gray-300 w-1/3"></div>
              <span className="text-gray-500 text-sm">or continue with</span>
              <div className="border-t border-gray-300 w-1/3"></div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-gray-100 p-3 rounded-full hover:bg-gray-200"
                onClick={handleGoogleAuth}
              >
                <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
              </button>
            </div>

            {/* Toggle between Sign Up and Sign In */}
            <p className="mt-6 text-center text-gray-600">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-indigo-500 hover:underline cursor-pointer"
                    onClick={() => setIsSignup(false)}
                  >
                    Sign In
                  </span>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <span
                    className="text-indigo-500 hover:underline cursor-pointer"
                    onClick={() => setIsSignup(true)}
                  >
                    Register here
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
