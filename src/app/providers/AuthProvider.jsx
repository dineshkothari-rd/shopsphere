import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/services/firebase/auth";

import { useAuthStore } from "@/features/auth/store/useAuthStore";

import {
  createUserInFirestore,
  getUserData,
} from "@/features/auth/services/user.service";

const AuthProvider = ({ children }) => {
  const setUser = useAuthStore((state) => state.setUser);

  const setUserData = useAuthStore((state) => state.setUserData);

  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          await createUserInFirestore(user);

          const userData = await getUserData(user.uid);

          queueMicrotask(() => {
            setUser(user);
            setUserData(userData);
            setLoading(false);
          });
        } else {
          queueMicrotask(() => {
            setUser(null);
            setUserData(null);
            setLoading(false);
          });
        }
      } catch (error) {
        console.log(error);

        queueMicrotask(() => {
          setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, [setLoading, setUser, setUserData]);

  return children;
};

export default AuthProvider;
