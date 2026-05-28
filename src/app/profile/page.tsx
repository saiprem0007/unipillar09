"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";

import ProfileCard from "@/components/profile/ProfileCard";
import AccountDetails from "@/components/profile/AccountDetails";
import SavedColleges from "@/components/profile/SavedColleges";
import AccountSettings from "@/components/profile/AccountSettings";

export default function ProfilePage() {
  const [mounted, setMounted] =
    useState(false);

  const user = useAuthStore(
    (state) => state.user,
  );

  const token = useAuthStore(
    (state) => state.token,
  );

  const logout = useAuthStore(
    (state) => state.logout,
  );

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const router = useRouter();

  // hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // protect route
  useEffect(() => {
    if (mounted && !token) {
      router.push("/auth");
    }
  }, [token, router, mounted]);

  // fetch profile
  useEffect(() => {
    if (!mounted || !token) return;

    const fetchProfile = async () => {
      try {
        const response =
          await api.get(
            "/user/profile",
          );

        setUser(response.data.user);
      } catch (error) {
        console.log(error);

        logout();
        router.push("/auth");
      }
    };

    fetchProfile();
  }, [
    mounted,
    token,
    router,
    setUser,
    logout,
  ]);

  // prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  // loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <main className="min-h-screen bg-[#f8f6f6] text-[#0A0A0A]">
      <div className="flex min-h-screen">
        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">

          <ProfileCard user={user} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <AccountDetails user={user} />

            <SavedColleges />

            <AccountSettings
              handleLogout={
                handleLogout
              }
            />
          </div>

        </div>
      </div>
    </main>
  );
}