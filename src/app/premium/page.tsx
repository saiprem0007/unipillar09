"use client";
import Footer from "@/components/home/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

// ─── Razorpay types ────────────────────────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}
interface RazorpayInstance { open(): void; }
interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });
}

async function apiFetch<T>(
  url: string,
  body: object,
  token: string,
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message ?? "Request failed");
  }
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type UpgradeState =
  | "idle"
  | "loading-sdk"
  | "creating-order"
  | "checkout-open"
  | "verifying"
  | "success"
  | "error";

const stateLabel: Record<UpgradeState, string> = {
  idle: "Upgrade Now",
  "loading-sdk": "Loading...",
  "creating-order": "Preparing order...",
  "checkout-open": "Complete payment",
  verifying: "Verifying...",
  success: "Activated! ✓",
  error: "Try Again",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function PremiumPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [state, setState] = useState<UpgradeState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    setIsClient(true);
    if (!token) {
      setErrorMsg("You must be logged in to upgrade.");
      setTimeout(() => router.push("/auth"), 1500);
    }
  }, [token, router]);

  const handleUpgrade = async () => {
    setErrorMsg(null);

    if (!token) {
      setErrorMsg("Authentication required. Redirecting to login...");
      setTimeout(() => router.push("/auth"), 1500);
      return;
    }

    try {
      // Step 1: Load Razorpay SDK
      setState("loading-sdk");
      await loadRazorpayScript();

      // Step 2: Create backend order
      setState("creating-order");
      const { orderId, amount, currency, keyId } = await apiFetch<{
        orderId: string;
        amount: number;
        currency: string;
        keyId: string;
      }>(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/create-order`,
        { plan: "ELITE" },
        token,
      );

      // Step 3: Open Razorpay checkout
      setState("checkout-open");
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: keyId,
          amount,
          currency,
          name: "Unipillar",
          description: "Unipillar Elite — Full counselling access",
          image: "/logo.png", // update path as needed
          order_id: orderId,
          theme: { color: "#06c689" },
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled")),
          },
          handler: async (response: RazorpaySuccessResponse) => {
            // Step 4: Verify on backend
            setState("verifying");
            try {
              await apiFetch(
                `${process.env.NEXT_PUBLIC_API_URL}/payments/verify`,
                {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                },
                token,
              );
              resolve();
            } catch (err) {
              reject(err);
            }
          },
        });
        rzp.open();
      });

      setState("success");
      // Redirect to dashboard after short delay
      setTimeout(() => router.push("/predictor"), 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg === "Payment cancelled") {
        setState("idle");
      } else {
        setErrorMsg(msg);
        setState("error");
      }
    }
  };

  const isLoading = !["idle", "success", "error"].includes(state);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <p className="text-[#0A0A0A] font-semibold">Loading...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <div className="text-center">
          <p className="text-[#0A0A0A] font-semibold mb-2">Authentication Required</p>
          <p className="text-[#878787] text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        .brutal-premium-body {
          font-family: "DM Sans", sans-serif;
          background-color: #f9f9f9;
          color: #0a0a0a;
        }
        .brutal-premium-body h1,
        .brutal-premium-body h2,
        .brutal-premium-body h3,
        .brutal-premium-body h4,
        .brutal-premium-body h5,
        .brutal-premium-body h6,
        .brutal-premium-body .font-display {
          font-family: "Space Grotesk", sans-serif;
        }
      `}</style>

      <div className="brutal-premium-body min-h-screen antialiased flex flex-col">
        <main className="flex-grow py-16 px-6 bg-[#F9F9F9]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column: Value Props */}
            <div className="space-y-12">
              <div>
                <h1 className="font-display font-bold text-5xl lg:text-7xl leading-[1.1] mb-6 text-[#0A0A0A]">
                  Absolute
                  <br />
                  Clarity.
                </h1>
                <p className="text-xl text-[#878787] max-w-md">
                  Upgrade to Unipillar Elite to strip away the noise and get
                  direct access to the data and mentors you need to win.
                </p>
              </div>

              <ul className="space-y-8">
                {[
                  {
                    icon: "check_circle",
                    title: "Unlimited Rank Predictions",
                    desc: "Run your profile against every college in our database without daily limits or cooling periods.",
                  },
                  {
                    icon: "check_circle",
                    title: "Historical Trend Analytics (5+ Years)",
                    desc: "Visualize shifts in opening and closing ranks across half a decade to spot emerging patterns.",
                  },
                  {
                    icon: "check_circle",
                    title: "Priority Chat with Mentors",
                    desc: "Direct line to IIT/NIT alumni. Skip the support queue and get your specific doubts resolved instantly.",
                  },
                  {
                    icon: "check_circle",
                    title: "One-click Preference List Export",
                    desc: "Generate your optimized JoSAA choice filling list in PDF/Excel format ready for submission.",
                  },
                  {
                    icon: "check_circle",
                    title: "Real-time Seat Vacancy Alerts",
                    desc: "Instant notifications on CSAB and spot round vacancies before they become public knowledge.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span
                      className="material-symbols-outlined text-[#06c689] text-4xl font-bold flex-shrink-0 mt-1"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-1 text-[#0A0A0A]">
                        {item.title}
                      </h3>
                      <p className="text-[#878787] text-base">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Pricing Card */}
            <div className="space-y-12 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] bg-[#0A0A0A] text-[#FFFFFF] rounded-lg border-[2px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] p-10 flex flex-col relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 bg-[#FFFFFF] text-[#0A0A0A] font-display font-bold text-sm tracking-wider uppercase rounded-full mb-6">
                      Unipillar Elite
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-display font-bold text-[100px] leading-none tracking-tighter">
                        ₹999
                      </span>
                    </div>
                    <span className="text-[#878787] font-medium text-lg uppercase tracking-wider">
                      For whole counselling
                    </span>
                  </div>

                  <div className="mt-8">
                    {/* Error message */}
                    {errorMsg && (
                      <p className="text-red-400 text-sm mb-3 text-center font-medium">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      onClick={handleUpgrade}
                      disabled={isLoading || state === "success"}
                      className={`w-full py-4 bg-[#06c689] text-[#FFFFFF] font-display font-bold text-xl rounded-lg border-[2px] border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] transition-all duration-200 hover:bg-[#047857] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-y-0.5 active:translate-y-1 active:translate-x-1 active:shadow-none flex items-center justify-center gap-2 ${
                        isLoading || state === "success"
                          ? "pointer-events-none opacity-90"
                          : ""
                      }`}
                    >
                      <span className="relative z-10">
                        {stateLabel[state]}
                      </span>
                      <span
                        className={`material-symbols-outlined font-bold relative z-10 ${
                          isLoading ? "animate-spin" : ""
                        }`}
                      >
                        {state === "success"
                          ? "verified"
                          : isLoading
                          ? "autorenew"
                          : "arrow_forward"}
                      </span>
                    </button>
                    <p className="text-center text-sm text-[#878787] mt-4 font-medium">
                      One-time payment. Secure checkout via Razorpay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <section className="max-w-[1200px] mx-auto mt-24 pt-24 border-t-2 border-dashed border-[#0A0A0A]/20">
            <h2 className="font-display font-bold text-4xl mb-12 text-center text-[#0A0A0A]">
              Why Students Choose Unipillar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  avatar: "R",
                  color: "bg-orange-500",
                  name: "u/jeeadspirant_23",
                  meta: "• 2 months ago",
                  text: "I almost missed my dream college because of a simple form error in choice filling. Unipillar's Elite mentor caught it in 10 minutes. Saved my entire year.",
                  votes: "428",
                  italic: true,
                },
                {
                  avatar: "S",
                  color: "bg-blue-500",
                  name: "Sahil Verma, NIT Trichy",
                  meta: "• 2023 Batch",
                  text: "The historical trends tool is the real deal. Everyone told me I wouldn't get Trichy with my rank, but the Unipillar data showed a downward trend for EEE. I trusted the data, and here I am. 100% worth the ₹999.",
                  votes: null,
                  italic: false,
                },
                {
                  avatar: "M",
                  color: "bg-purple-500",
                  name: "Meghna S., IIT Kharagpur",
                  meta: "• 2023 Batch",
                  text: "Counselling is so stressful when you're doing it alone. Having a mentor from an actual IIT to chat with at 11 PM during choice filling was the sanity check I needed.",
                  votes: null,
                  italic: true,
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-[#FFFFFF] border-[2px] border-[#0A0A0A] p-6 rounded-lg shadow-[4px_4px_0px_#0A0A0A]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-[#FFFFFF] font-bold text-xs`}
                    >
                      {t.avatar}
                    </div>
                    <span className="text-sm font-bold text-[#0A0A0A]">
                      {t.name}
                    </span>
                    <span className="text-xs text-[#878787]">{t.meta}</span>
                  </div>
                  <p
                    className={`text-base leading-relaxed text-[#0A0A0A] ${
                      t.italic ? "italic" : ""
                    }`}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                  {t.votes && (
                    <div className="mt-4 flex items-center gap-4 text-[#878787]">
                      <span className="material-symbols-outlined text-sm">
                        arrow_upward
                      </span>
                      <span className="text-xs font-bold text-[#0A0A0A]">
                        {t.votes}
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        arrow_downward
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}