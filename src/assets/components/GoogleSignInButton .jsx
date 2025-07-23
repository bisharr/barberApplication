import { FcGoogle } from "react-icons/fc";
import React from "react";

const GoogleSignInButton = () => {
  return (
    <button
      type="button"
      className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:shadow transition"
    >
      <FcGoogle className="text-xl" />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
