type Props = {
  handleLogout: () => void;
};

export default function AccountSettings({
  handleLogout,
}: Props) {
  return (
    <section className="bg-white border-2 border-[#0A0A0A] p-6 flex flex-col gap-6 xl:col-span-2">

      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-[#059669]">
          settings
        </span>

        <h2 className="text-xl font-bold uppercase tracking-tight">
          Account Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        <button className="flex items-center justify-between p-4 bg-[#f8f6f6] border-2 border-[#0A0A0A] hover:bg-white transition-all group">

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined">
              notifications
            </span>

            <div className="text-left">
              <p className="font-bold text-sm">
                Notifications
              </p>

              <p className="text-[10px] opacity-60 italic">
                Email & WhatsApp alerts
              </p>
            </div>
          </div>

        </button>

        <button className="flex items-center justify-between p-4 bg-[#f8f6f6] border-2 border-[#0A0A0A] hover:bg-white transition-all group">

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined">
              security
            </span>

            <div className="text-left">
              <p className="font-bold text-sm">
                Security
              </p>

              <p className="text-[10px] opacity-60 italic">
                2FA and Sessions
              </p>
            </div>
          </div>

        </button>

        <button
          onClick={handleLogout}
          className="flex items-center justify-between p-4 bg-red-50 border-2 border-[#0A0A0A] hover:bg-red-100 transition-all group"
        >

          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-red-600">
              logout
            </span>

            <div className="text-left">
              <p className="font-bold text-sm text-red-600">
                Logout
              </p>

              <p className="text-[10px] opacity-60 italic">
                Sign out from your account
              </p>
            </div>
          </div>

        </button>

      </div>

      <div className="mt-4 pt-4 border-t-2 border-[#0A0A0A] flex justify-between items-center">

        <p className="text-xs font-medium uppercase opacity-50">
          Member since 2024
        </p>

        <button className="text-xs font-bold text-red-600 hover:underline">
          DEACTIVATE ACCOUNT
        </button>

      </div>

    </section>
  );
}