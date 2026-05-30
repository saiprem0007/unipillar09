'use client';

import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/store/profileStore';

// ─── Constants ────────────────────────────────────────────────

const ACCOUNT_SETTINGS = [
  {
    icon: 'notifications',
    label: 'Notifications',
    sub: 'Email & WhatsApp alerts',
  },
  {
    icon: 'security',
    label: 'Security',
    sub: '2FA and Sessions',
  },
];

// ─── Component ────────────────────────────────────────────────

export default function AccountSettings() {
  const router = useRouter();

  // 🔥 FIXED LOGOUT
  const handleLogout = () => {
    // 1. Clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // 2. Reset Zustand store
    useProfileStore.getState().reset();

    // 3. Redirect safely
    router.replace('/auth');
  };

  return (
    <section className="bg-white brutalist-border p-6 flex flex-col gap-6 xl:col-span-2">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-[#059669]">
          settings
        </span>
        <h2 className="text-xl font-bold uppercase tracking-tight">
          Account Settings
        </h2>
      </div>

      {/* SETTINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {ACCOUNT_SETTINGS.map((setting) => (
          <div
            key={setting.label}
            className="flex items-center justify-between p-4 bg-[#f8f6f6] brutalist-border hover:bg-white transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined">
                {setting.icon}
              </span>

              <div>
                <p className="font-bold text-sm">{setting.label}</p>
                <p className="text-[10px] opacity-60 italic">
                  {setting.sub}
                </p>
              </div>
            </div>

            <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">
              arrow_forward
            </span>
          </div>
        ))}

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-between p-4 bg-red-500 text-white brutalist-border hover:bg-red-600 transition-colors"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined">logout</span>

            <div>
              <p className="font-bold text-sm">Logout</p>
              <p className="text-[10px] opacity-80 italic">
                Sign out of your account
              </p>
            </div>
          </div>

          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </button>

      </div>
    </section>
  );
}