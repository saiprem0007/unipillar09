type Props = {
  user: any;
};

export default function ProfileCard({ user }: Props) {
  return (
    <section className="mb-10 p-6 bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

      <div className="flex gap-6 items-center">

        <div className="size-24 md:size-32 border-2 border-[#0A0A0A] bg-[#10B981] flex items-center justify-center text-white text-5xl font-bold">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {user?.name}
          </h1>

          <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm font-medium uppercase tracking-wider">

            <span className="flex items-center gap-1">
              <span className="text-[#059669] font-bold">
                Email
              </span>

              {user?.email}
            </span>

            <span className="flex items-center gap-1">
              <span className="text-[#059669] font-bold">
                Mobile
              </span>

              {user?.mobile || "Not Added"}
            </span>

          </div>
        </div>
      </div>

      <button className="px-6 py-3 bg-[#059669] text-white font-bold border-2 border-[#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] transition-all">
        Edit Profile
      </button>

    </section>
  );
}