"use client";

import { useEffect, useRef } from "react";

export default function TermsPage() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -30px 0px" }
    );

    const els = sectionsRef.current?.querySelectorAll(".animate-in");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        :root {
          --ink: #0f1623;
          --ink-secondary: #3a3f52;
          --ink-muted: #7a8099;
          --accent: #0a5c3e;
          --accent-light: #e8f5f0;
          --accent-mid: #c1dfd4;
          --rule: #dde1ed;
          --paper: #fdfcf9;
          --paper-warm: #f7f4ef;
          --surface: #ffffff;
        }

        .terms-body {
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          background-color: var(--paper);
          color: var(--ink);
          font-size: 16px;
          line-height: 1.7;
          min-height: 100vh;
          position: relative;
        }

        .terms-body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .page-wrap {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
          padding: 80px 32px 120px;
        }

        /* Header */
        .doc-header {
          text-align: center;
          padding-bottom: 60px;
          border-bottom: 1px solid var(--rule);
          margin-bottom: 64px;
        }

        .brand-name {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          display: block;
          margin-bottom: 28px;
        }

        .doc-header h1 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(42px, 6vw, 68px);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 28px;
        }

        .doc-header h1 em {
          font-style: italic;
          color: var(--accent);
        }

        .meta-row {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .meta-item {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        .meta-item span {
          color: var(--ink-secondary);
          font-weight: 600;
        }

        .ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 36px;
        }

        .ornament-line { width: 60px; height: 1px; background: var(--rule); }
        .ornament-diamond {
          width: 8px; height: 8px;
          background: var(--accent);
          transform: rotate(45deg);
        }

        /* TOC */
        .toc {
          background: var(--paper-warm);
          border: 1px solid var(--rule);
          border-radius: 4px;
          padding: 36px 40px;
          margin-bottom: 64px;
        }

        .toc-title {
          font-family: Georgia, serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 20px;
        }

        .toc-list {
          list-style: none;
          columns: 2;
          column-gap: 32px;
          padding: 0;
          margin: 0;
        }

        .toc-list li {
          margin-bottom: 8px;
          break-inside: avoid;
        }

        .toc-list a {
          text-decoration: none;
          color: var(--ink-secondary);
          font-size: 14px;
          font-weight: 400;
          display: flex;
          align-items: baseline;
          gap: 10px;
          transition: color 0.2s;
        }

        .toc-list a:hover { color: var(--accent); }

        .toc-num {
          font-family: Georgia, serif;
          font-size: 12px;
          color: var(--ink-muted);
          min-width: 20px;
        }

        /* Preamble */
        .preamble {
          background: var(--accent-light);
          border-left: 3px solid var(--accent);
          padding: 28px 32px;
          border-radius: 0 4px 4px 0;
          margin-bottom: 64px;
        }

        .preamble p {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 20px;
          font-style: italic;
          color: var(--ink-secondary);
          line-height: 1.65;
          margin: 0;
        }

        /* Sections */
        .section {
          margin-bottom: 56px;
          padding-bottom: 56px;
          border-bottom: 1px solid var(--rule);
        }

        .section:last-of-type { border-bottom: none; }

        .section-number {
          font-family: Georgia, serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          display: block;
          margin-bottom: 12px;
        }

        .section h2 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        .section p {
          color: var(--ink-secondary);
          font-size: 15.5px;
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .section p:last-child { margin-bottom: 0; }

        .clause-list {
          list-style: none;
          margin: 16px 0;
          padding: 0;
        }

        .clause-list li {
          position: relative;
          padding-left: 24px;
          color: var(--ink-secondary);
          font-size: 15.5px;
          line-height: 1.8;
          margin-bottom: 10px;
        }

        .clause-list li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 700;
        }

        .callout {
          background: var(--paper-warm);
          border: 1px solid var(--rule);
          border-radius: 4px;
          padding: 20px 24px;
          margin: 20px 0;
          font-size: 14px;
          color: var(--ink-muted);
          line-height: 1.7;
        }

        .callout strong { color: var(--ink-secondary); }

        /* Acceptance */
        .acceptance {
          text-align: center;
          padding: 72px 40px;
          background: var(--ink);
          border-radius: 4px;
          margin-top: 80px;
          position: relative;
          overflow: hidden;
        }

        .acceptance::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(10,92,62,0.4) 0%, transparent 70%);
          pointer-events: none;
        }

        .acceptance-inner { position: relative; z-index: 1; }

        .acceptance h3 {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .acceptance p {
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          max-width: 480px;
          margin: 0 auto 40px;
          line-height: 1.75;
        }

        .accept-btn {
          display: inline-block;
          background: var(--accent);
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          padding: 16px 48px;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .accept-btn:hover { background: #0c6e4a; transform: translateY(-1px); }
        .accept-btn:active { transform: translateY(0); }
        .accept-btn:disabled { background: #1a8c62; cursor: default; transform: none; }

        .decline-link {
          display: block;
          margin-top: 16px;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          text-decoration: underline;
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.2s;
        }

        .decline-link:hover { color: rgba(255,255,255,0.55); }

        /* Doc footer */
        .doc-footer {
          margin-top: 80px;
          padding-top: 40px;
          border-top: 1px solid var(--rule);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .doc-footer-brand {
          font-family: Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
        }

        .doc-footer-meta {
          font-size: 12px;
          color: var(--ink-muted);
          text-align: right;
          line-height: 1.7;
        }

        /* Scroll animations */
        .animate-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .page-wrap { padding: 48px 20px 80px; }
          .toc { padding: 24px; }
          .toc-list { columns: 1; }
          .acceptance { padding: 48px 24px; }
          .meta-row { gap: 16px; }
        }
      `}</style>

      <div className="terms-body">
        <div className="page-wrap" ref={sectionsRef}>

          {/* Header */}
          <header className="doc-header">
            <span className="brand-name">Unipillar Platform</span>
            <h1>Terms &amp; <em>Conditions</em></h1>
            <div className="meta-row">
              <div className="meta-item">Version <span>2.1</span></div>
              <div className="meta-item">Effective <span>January 1, 2026</span></div>
              <div className="meta-item">Jurisdiction <span>India</span></div>
              <div className="meta-item">Last Revised <span>May 2026</span></div>
            </div>
            <div className="ornament">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line" />
            </div>
          </header>

          {/* TOC */}
          <nav className="toc animate-in">
            <div className="toc-title">Table of Contents</div>
            <ul className="toc-list">
              {[
                ["#s1", "01", "Platform Purpose & Scope"],
                ["#s2", "02", "Eligibility & Registration"],
                ["#s3", "03", "Guidance Disclaimer"],
                ["#s4", "04", "User Conduct & Community Standards"],
                ["#s5", "05", "Payments & Refund Policy"],
                ["#s6", "06", "Confidentiality & Privacy"],
                ["#s7", "07", "Intellectual Property"],
                ["#s8", "08", "Mentor Responsibilities"],
                ["#s9", "09", "Limitation of Liability"],
                ["#s10", "10", "Termination of Access"],
                ["#s11", "11", "Dispute Resolution"],
                ["#s12", "12", "Amendments to Terms"],
              ].map(([href, num, label]) => (
                <li key={num}>
                  <a href={href}>
                    <span className="toc-num">{num}</span> {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Preamble */}
          <div className="preamble animate-in">
            <p>
              Please read these Terms and Conditions carefully before using the Unipillar platform.
              By accessing or using any part of the service, you acknowledge that you have read,
              understood, and agree to be bound by these terms in their entirety.
            </p>
          </div>

          {/* Sections */}
          <article>

            <section className="section animate-in" id="s1">
              <span className="section-number">Section 01</span>
              <h2>Platform Purpose &amp; Scope</h2>
              <p>
                Unipillar is a student-led mentorship and academic counselling platform designed to facilitate
                peer-to-peer guidance, helping students navigate higher education decisions, application processes,
                career pathways, and academic challenges.
              </p>
              <p>
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the Unipillar website,
                mobile applications, and all associated services (collectively, the &ldquo;Platform&rdquo;), operated by
                Unipillar Technologies Private Limited (&ldquo;Unipillar&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
              </p>
              <p>
                The Platform serves as a neutral facilitator connecting students seeking guidance
                (&ldquo;Mentees&rdquo;) with experienced peers and alumni (&ldquo;Mentors&rdquo;). Unipillar does not represent,
                warrant, or guarantee the accuracy, completeness, or suitability of any information shared
                through the Platform.
              </p>
            </section>

            <section className="section animate-in" id="s2">
              <span className="section-number">Section 02</span>
              <h2>Eligibility &amp; Registration</h2>
              <p>
                To access the Platform, you must be at least 13 years of age. Users under the age of 18 must
                have verifiable consent from a parent or legal guardian prior to registration. By creating an
                account, you represent that all information provided is accurate, current, and complete.
              </p>
              <ul className="clause-list">
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You must not create multiple accounts or impersonate any person or entity.</li>
                <li>Unipillar reserves the right to verify your identity and academic credentials at any time.</li>
                <li>Any fraudulent registration will result in immediate suspension and potential legal action.</li>
              </ul>
              <p>
                You agree to promptly notify Unipillar of any unauthorised use of your account or any other
                security breach.
              </p>
            </section>

            <section className="section animate-in" id="s3">
              <span className="section-number">Section 03</span>
              <h2>Guidance Disclaimer</h2>
              <p>
                All mentorship, advice, and information provided through the Platform is based solely on the
                personal experiences, perspectives, and opinions of individual Mentors. It is shared for
                informational and educational purposes only.
              </p>
              <div className="callout">
                <strong>Important Notice:</strong> Unipillar does not provide official academic, legal, financial,
                psychological, or professional advice of any kind. Nothing communicated on this Platform should
                be construed as a substitute for formal consultation with a qualified professional.
              </div>
              <p>
                Admission decisions, scholarship outcomes, career results, and all other academic consequences
                remain the sole responsibility of the Mentee. Unipillar expressly disclaims any liability
                arising from actions taken in reliance on mentor-provided guidance.
              </p>
            </section>

            <section className="section animate-in" id="s4">
              <span className="section-number">Section 04</span>
              <h2>User Conduct &amp; Community Standards</h2>
              <p>
                The integrity, safety, and inclusivity of the Unipillar community are foundational to our
                platform. All users — Mentors and Mentees alike — are required to uphold the following
                standards at all times:
              </p>
              <ul className="clause-list">
                <li>Engage in respectful, professional, and constructive communication.</li>
                <li>Refrain from sharing false, misleading, or unverified information about institutions, programmes, or admission processes.</li>
                <li>Do not engage in harassment, bullying, discrimination, hate speech, or any conduct that may cause harm to another user.</li>
                <li>Do not solicit or accept payments outside the Platform for services facilitated through it.</li>
                <li>Do not use the Platform for commercial advertising, spam, or unsolicited promotions.</li>
                <li>Do not attempt to gain unauthorised access to other accounts, systems, or data.</li>
                <li>Comply with all applicable local, national, and international laws while using the Platform.</li>
              </ul>
              <p>
                Violations of these standards will result in immediate account suspension or permanent
                termination, at Unipillar&apos;s sole discretion. We reserve the right to report serious violations
                to relevant legal authorities.
              </p>
            </section>

            <section className="section animate-in" id="s5">
              <span className="section-number">Section 05</span>
              <h2>Payments &amp; Refund Policy</h2>
              <p>
                Certain features and services on the Platform are available exclusively to Premium subscribers.
                All payments are processed through secure, PCI-DSS compliant third-party payment gateways. By
                completing a transaction, you agree to the applicable pricing, billing cycle, and payment terms
                displayed at the time of purchase.
              </p>
              <ul className="clause-list">
                <li><strong>Subscription Renewals:</strong> Premium subscriptions automatically renew unless cancelled at least 48 hours prior to the end of the current billing period.</li>
                <li><strong>Refunds:</strong> Refund requests will be considered within 7 days of purchase, subject to review. Refunds will not be issued for services already rendered or sessions already conducted.</li>
                <li><strong>Chargebacks:</strong> Initiating an unjustified chargeback may result in account suspension. Disputes should first be directed to our support team.</li>
                <li><strong>Taxes:</strong> Applicable taxes, including GST where required, will be added to all transactions and are the user&apos;s responsibility.</li>
              </ul>
            </section>

            <section className="section animate-in" id="s6">
              <span className="section-number">Section 06</span>
              <h2>Confidentiality &amp; Privacy</h2>
              <p>
                Unipillar is committed to protecting the privacy of its users. All data collected is handled
                in accordance with our Privacy Policy, which forms an integral part of these Terms and is
                incorporated herein by reference.
              </p>
              <p>
                Users agree to maintain strict confidentiality regarding all private communications conducted
                through the Platform. Specifically:
              </p>
              <ul className="clause-list">
                <li>Private conversation transcripts, session recordings, or mentor contact information must not be shared, published, or distributed outside the Platform without explicit written consent.</li>
                <li>Proprietary resources, session notes, or materials shared during mentorship sessions remain confidential and may not be reproduced for commercial purposes.</li>
                <li>Any breach of confidentiality may result in legal action under applicable data protection and privacy laws.</li>
              </ul>
            </section>

            <section className="section animate-in" id="s7">
              <span className="section-number">Section 07</span>
              <h2>Intellectual Property</h2>
              <p>
                All content on the Platform, including but not limited to text, graphics, logos, interface
                design, software, and curated educational resources, is the exclusive intellectual property of
                Unipillar or its licensors and is protected under applicable copyright, trademark, and
                intellectual property laws.
              </p>
              <p>
                Users are granted a limited, non-exclusive, non-transferable licence to access and use the
                Platform solely for its intended personal, non-commercial purposes. Any reproduction,
                redistribution, modification, or commercial exploitation of Platform content without prior
                written authorisation from Unipillar is strictly prohibited.
              </p>
              <div className="callout">
                User-generated content (such as reviews, posts, and shared materials) remains the intellectual
                property of the respective user; however, by submitting such content, the user grants Unipillar
                a royalty-free licence to display, distribute, and use it to improve and promote the Platform.
              </div>
            </section>

            <section className="section animate-in" id="s8">
              <span className="section-number">Section 08</span>
              <h2>Mentor Responsibilities</h2>
              <p>
                Mentors are registered users who voluntarily offer guidance based on their personal academic
                and professional experiences. By accepting a Mentor role on the Platform, you agree to the
                following obligations:
              </p>
              <ul className="clause-list">
                <li>Provide guidance that is honest, accurate to the best of your knowledge, and clearly presented as personal experience.</li>
                <li>Disclose any conflicts of interest that may affect the objectivity of your advice.</li>
                <li>Maintain professional boundaries and avoid any form of personal solicitation or exploitation of Mentees.</li>
                <li>Not make guarantees regarding admission outcomes, scholarship awards, or academic results.</li>
                <li>Respond to Mentee queries in a timely and constructive manner consistent with your stated availability.</li>
                <li>Abide by all Platform content guidelines and community standards at all times.</li>
              </ul>
              <p>
                Unipillar reserves the right to remove any Mentor from the Platform for non-compliance,
                repeated complaints, or conduct unbecoming of the Platform&apos;s values.
              </p>
            </section>

            <section className="section animate-in" id="s9">
              <span className="section-number">Section 09</span>
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Unipillar, its directors, employees,
                contractors, and affiliates shall not be liable for any indirect, incidental, consequential,
                special, or punitive damages arising out of or related to your use of the Platform, including
                but not limited to:
              </p>
              <ul className="clause-list">
                <li>Adverse admission outcomes, academic rejections, or career consequences resulting from mentor-provided guidance.</li>
                <li>Loss of data, service interruptions, or platform unavailability due to technical failures.</li>
                <li>Unauthorised access to your account resulting from your failure to maintain credential security.</li>
                <li>Any actions taken by third-party mentors, users, or service providers connected through the Platform.</li>
              </ul>
              <p>
                In all cases, Unipillar&apos;s total aggregate liability shall not exceed the amount paid by you
                to Unipillar in the three (3) months preceding the event giving rise to the claim.
              </p>
            </section>

            <section className="section animate-in" id="s10">
              <span className="section-number">Section 10</span>
              <h2>Termination of Access</h2>
              <p>
                Unipillar reserves the right, at its sole discretion, to suspend, restrict, or permanently
                terminate your access to the Platform at any time, with or without notice, for reasons
                including but not limited to:
              </p>
              <ul className="clause-list">
                <li>Violation of any provision of these Terms.</li>
                <li>Conduct deemed harmful, fraudulent, or disruptive to the community.</li>
                <li>Failure to pay applicable fees for premium services.</li>
                <li>Inactivity exceeding twenty-four (24) consecutive months.</li>
              </ul>
              <p>
                Upon termination, your right to access the Platform ceases immediately. Provisions of these
                Terms that by their nature should survive termination (including confidentiality, intellectual
                property, and limitation of liability) shall continue to apply.
              </p>
            </section>

            <section className="section animate-in" id="s11">
              <span className="section-number">Section 11</span>
              <h2>Dispute Resolution</h2>
              <p>
                In the event of any dispute, claim, or controversy arising out of or relating to these Terms
                or the Platform, the parties agree to first attempt resolution through good-faith negotiation
                within thirty (30) days of written notice of the dispute.
              </p>
              <p>
                If negotiation fails, the matter shall be referred to binding arbitration in accordance with
                the Arbitration and Conciliation Act, 1996 (India). The arbitration shall be conducted in
                English, and the seat of arbitration shall be Hyderabad, Telangana, India.
              </p>
              <div className="callout">
                These Terms shall be governed by and construed in accordance with the laws of India. Subject
                to the arbitration clause above, the courts of Hyderabad, Telangana shall have exclusive
                jurisdiction over any legal proceedings.
              </div>
            </section>

            <section className="section animate-in" id="s12">
              <span className="section-number">Section 12</span>
              <h2>Amendments to Terms</h2>
              <p>
                Unipillar reserves the right to modify, update, or replace these Terms at any time at its
                sole discretion. Material changes will be communicated to users via email notification or a
                prominent in-platform notice at least fourteen (14) days prior to taking effect.
              </p>
              <p>
                Continued use of the Platform following the effective date of any revised Terms constitutes
                your acceptance of those changes. We encourage you to review these Terms periodically. The
                most current version will always be available on this page.
              </p>
              <p>
                If you do not agree to revised Terms, you must discontinue use of the Platform and may
                request account deletion by contacting our support team.
              </p>
            </section>

          </article>

          {/* Acceptance */}
          <div className="acceptance">
            <div className="acceptance-inner">
              <h3>Acknowledge &amp; Accept</h3>
              <p>
                By clicking &ldquo;I Accept&rdquo;, you confirm that you are at least 13 years of age, have read these
                Terms in full, and agree to be legally bound by them.
              </p>
              <button
                className="accept-btn"
                onClick={(e) => {
                  const btn = e.currentTarget;
                  btn.textContent = "✓ Accepted";
                  btn.disabled = true;
                }}
              >
                I Accept the Terms
              </button>
              <button className="decline-link">Decline and exit</button>
            </div>
          </div>

          {/* Footer */}
          <footer className="doc-footer">
            <div className="doc-footer-brand">Unipillar</div>
            <div className="doc-footer-meta">
              © 2024 Unipillar Technologies Private Limited<br />
              All rights reserved. Students helping students.
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}