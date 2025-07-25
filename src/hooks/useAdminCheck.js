import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/config";

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(null); // null = loading
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAdmin, checking };
};

export default useAdminCheck;
