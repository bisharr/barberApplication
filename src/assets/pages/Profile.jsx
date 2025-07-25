// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
// import { auth, db, storage } from "../firebase/config";
import { auth, db, storage } from "../../firebase/config";
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(true);

  // Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
        await fetchBookings(currentUser.email);
      } else {
        navigate("/signin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch user info from Firestore
  const fetchUserData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserData(data);
      setForm({ name: data.name || "", phone: data.phone || "" });
    }
  };

  // Fetch bookings
  const fetchBookings = async (email) => {
    const q = query(collection(db, "bookings"), where("email", "==", email));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
    setLoading(false);
  };

  // Handle form updates
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save updated user data
  const handleSave = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: form.name,
        phone: form.phone,
      });
      setEditMode(false);
      setUserData({ ...userData, name: form.name, phone: form.phone });
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Failed to update profile", err);
    }
  };

  // Upload profile picture
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `profiles/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "users", user.uid), { photoURL: url });
    setUserData({ ...userData, photoURL: url });
    toast.success("Profile picture updated");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 my-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Profile</h2>

          <div className="flex flex-col items-center">
            <img
              src={userData.photoURL || "/default-avatar.jpeg"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-3 object-cover"
            />
            <input type="file" onChange={handleImageChange} className="mb-4" />

            <div className="w-full space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={!editMode}
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                value={user?.email}
                disabled
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
              <p className="text-sm text-gray-500">
                Role: {userData.role || "User"}
              </p>

              <div className="flex gap-4 mt-4">
                {editMode ? (
                  <button
                    onClick={handleSave}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    signOut(auth);
                    toast.info("Logged out");
                    navigate("/signin");
                  }}
                  className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Bookings</h2>
          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p>
                    <strong>Service:</strong> {b.service}
                  </p>
                  <p>
                    <strong>Date:</strong> {b.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {b.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
