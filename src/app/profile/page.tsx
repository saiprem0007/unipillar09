'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import ProfileCard from '@/components/profile/ProfileCard';
import AccountDetails from '@/components/profile/AccountDetails';
import AccountSettings from '@/components/profile/AccountSettings';
import Csab from '@/components/profile/Csab';

import { useProfileStore } from '@/store/profileStore';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const router = useRouter();

  const { fetchAll } = useProfileStore();
  const user = useAuthStore((state) => state.user);

  const [ready, setReady] = useState(false);

  // 🔥 FIX: prevent Strict Mode double fetch (DEV)
  const hasFetched = useRef(false);

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth');
      return;
    }

    setReady(true);
  }, [router]);

  // 📦 FETCH ONLY ONCE (STRICT MODE SAFE)
  useEffect(() => {
    if (!ready) return;
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchAll();
  }, [ready, fetchAll]); 

  // Re-fetch profile when user premium status changes
  useEffect(() => {
    if (user && hasFetched.current) {
      fetchAll();
    }
  }, [user?.isPremium]);

  // ⛔ prevent UI flash before auth check
  if (!ready) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        body { font-family: 'DM Sans', sans-serif; background-color: #f8f6f6; }
        h1,h2,h3,h4 { font-family: 'Space+Grotesk', sans-serif; }
        .brutalist-border { border: 2px solid #0A0A0A; }
        .brutalist-shadow { box-shadow: 4px 4px 0px #0A0A0A; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      <div className="min-h-screen bg-[#f8f6f6] text-[#0A0A0A]">
        <main className="p-4 md:p-8 lg:p-12 overflow-y-auto">

          <ProfileCard />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <AccountDetails />
            <Csab />
            <AccountSettings />
          </div>

        </main>
      </div>
    </>
  );
}