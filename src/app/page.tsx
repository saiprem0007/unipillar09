"use client";
import MissionBanner from "@/components/home/MissionBanner";
import WelcomeSection from "@/components/home/WelcomeSection";
import PremiumCard from "@/components/home/PremiumCard";
import ToolboxGrid from "@/components/home/ToolboxGrid";
import LiveUpdates from "@/components/home/LiveUpdates";
import Footer from "@/components/home/Footer";
export default function HomePage() {

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        .brutal-border {
          border: 2px solid #0A0A0A;
        }
        .brutal-card {
          background-color: #FFFFFF;
          border: 2px solid #0A0A0A;
          border-radius: 12px;
          box-shadow: 4px 4px 0px #0A0A0A;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }
        .brutal-card:hover {
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
          transform: translateY(-4px);
        }
        .brutal-button {
          background-color: #10B981;
          color: #FFFFFF;
          border: 2px solid #0A0A0A;
          border-radius: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          padding: 10px 20px;
          box-shadow: 2px 2px 0px #0A0A0A;
          transition: all 0.2s ease-in-out;
          position: relative;
        }
        .brutal-button:hover {
          box-shadow: 4px 4px 0px #0A0A0A;
          transform: translate(-2px, -2px);
          filter: brightness(1.1);
        }
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #10B981;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px #10B981;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        .glass-nav {
          background: linear-gradient(to bottom, #0A0A0A, #171717);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .footer-glow-top-left {
          background: radial-gradient(circle at top left, rgba(16, 185, 129, 0.15), transparent 40%);
        }
        .footer-glow-bottom-right {
          background: radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.15), transparent 40%);
        }
        .font-heading {
          font-family: 'Space Grotesk', sans-serif;
        }
        .font-body {
          font-family: 'DM Sans', sans-serif;
        }
      `}} />

      <div className="min-h-screen bg-[#F5F7FA] font-body text-[#0A0A0A] overflow-x-hidden">

        {/* Main Content Area */}
        <main className="w-full bg-[#F5F7FA] py-12 px-6 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            {/* Mission Statement Banner */}
            <MissionBanner />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
              {/* Left/Center Column */}
              <div className="xl:col-span-2 flex flex-col gap-16">
                {/* Hero & Premium Spotlight */}
                <WelcomeSection />
                <PremiumCard />

                {/* Feature Grid */}
                <ToolboxGrid />
              </div>

              {/* Right Column */}
              <div className="xl:col-span-1 border-l-0 xl:border-l-2 border-black/5 xl:pl-12 flex flex-col pt-4">
                <LiveUpdates />
              </div>



            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}