type Props = {
  user: any;
};

export default function AccountDetails({ user }: Props) {
  return (
    <section className="bg-white border-2 border-[#0A0A0A] p-6 flex flex-col gap-6">

      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-[#059669]">
          badge
        </span>

        <h2 className="text-xl font-bold uppercase tracking-tight">
          Account Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">
            Full Name
          </label>

          <div className="w-full p-4 border-2 border-[#0A0A0A] bg-[#f8f6f6] font-medium">
            {user?.name}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">
            Email Address
          </label>

          <div className="w-full p-4 border-2 border-[#0A0A0A] bg-[#f8f6f6] font-medium">
            {user?.email}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">
            Phone Number
          </label>

          <div className="w-full p-4 border-2 border-[#0A0A0A] bg-[#f8f6f6] font-medium">
            {user?.mobile || "Not Added"}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase">
            Account Type
          </label>

          <div className="w-full p-4 border-2 border-[#0A0A0A] bg-[#f8f6f6] font-medium">
            {user?.isPremium ? "Premium User" : "Standard User"}
          </div>
        </div>

      </div>

      <p className="text-sm italic opacity-60">
        * Your account information is securely stored.
      </p>

    </section>
  );
}