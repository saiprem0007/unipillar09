'use client';

import { useProfileStore } from "@/store/profileStore";
import { useAuthStore } from "@/store/authStore";
import { UserRound } from "lucide-react";

interface ProfileCardProps {
  onEditClick?: () => void;
}

export default function ProfileCard({ onEditClick }: ProfileCardProps) {
  const { profile, loaded } = useProfileStore();
  const user = useAuthStore((state) => state.user);

  // 🔥 LOADING STATE HANDLING
  if (!loaded) {
    return (
      <div className="mb-10 p-6 bg-white brutalist-border brutalist-shadow">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="mb-10 p-6 bg-white brutalist-border brutalist-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

      <div className="flex gap-6 items-center">

        <div className="size-24 md:size-32 brutalist-border rounded-full flex items-center justify-center bg-gray-100">
          <UserRound className="size-16 md:size-20" />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl md:text-4xl font-bold">
              {profile?.name || 'Loading...'}
            </h1>
            {user?.isPremium && (
              <span className="material-symbols-outlined text-[#D4AF37]" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm font-medium uppercase tracking-wider">

            <span className="flex items-center gap-1">
              <span className="text-[#059669] font-bold">Email</span>
              {profile?.email || '-'}
            </span>

            <span className="flex items-center gap-1">
              <span className="text-[#059669] font-bold">Mobile</span>
              {profile?.mobile || '-'}
            </span>

            <span className={`flex items-center gap-1 px-2 py-1 rounded ${user?.isPremium ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-[#10B981]/10 text-[#10B981]'}`}>
              <span className="font-bold">{user?.isPremium ? 'Premium' : 'Free Tier'}</span>
            </span>
          </div>
        </div>

      </div>

      <button
        onClick={onEditClick}
        className="px-6 py-3 bg-[#059669] text-white font-bold brutalist-border hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0A0A0A] transition-all"
      >
        Edit Profile
      </button>

    </section>
  );
}