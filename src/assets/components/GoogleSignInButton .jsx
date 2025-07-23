import { FcGoogle } from "react-icons/fc";
import React from "react";
import { auth } from "../../firebase/config";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "",
          phone: user.phoneNumber || "",
          email: user.email,
          uid: user.uid,
          createdAt: new Date(),
        });
      }

      toast.success(`Welcome ${user.displayName || "User"}!`);
      navigate("/booking");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:shadow transition"
    >
      <FcGoogle className="text-xl" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
