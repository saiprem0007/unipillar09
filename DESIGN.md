# Design System: Unipillar Digital Cockpit (Glaido Language)

## 1. Visual Theme & Atmosphere
The Unipillar counseling cockpit rejects standard, generic white-label software interfaces. Instead, it adopts the **Glaido Design Language** — a premium, clinical, dark digital terminal that places technical control directly in the user's hands. The atmosphere feels like a high-end aviation interface or security command terminal. We prioritize:
- **Tonal Stratification**: Elevation is defined exclusively by shifting shades of rich, desaturated slate and deep teal-blended graphite — never using arbitrary borders.
- **Intentional Asymmetry**: Grid rows and details are balanced with high-density sidebars and technical telemetry feeds.
- **Atmospheric Glows**: Subtle, physical-feeling soft glows around primary interactive nodes, simulating physical display panels.

---

## 2. Color Palette & Roles
We use a unified dark system that avoids heavy contrast but maintains absolute legibility.

- **Canvas Void** (`#0A0D10`) — Primary deep page background.
- **System Surface** (`#11161D`) — Nested main content cards and panels.
- **Active Surface** (`#17202B`) — Elevated active cards and selectable buttons.
- **Telemetry Gray** (`#6B7A8D`) — Muted descriptive copy, hashes, timestamps, and secondary captions.
- **Laser Green** (`#10B981`) — Single primary accent. Used for verified status dots, active highlights, and critical CTAs.
- **Electric Cyan`** (`#06B6D4`) — Secondary highlight. Used strictly for data comparisons, probability thresholds, and numerical accents.
- **Solar Gold** (`#D4AF37`) — Exclusively reserved for Elite/Premium upgrade elements.
- **Ghost Border** (`rgba(255, 255, 255, 0.05)`) — Ultra-subtle border guidelines.

---

## 3. Typography Rules
- **Display & Headlines**: `Space Grotesk` — Geometric, blueprint-like, set track-tight (`tracking-tight` / `-0.03em`).
- **Body & Captions**: `Outfit` — Exceptionally clean, round sans-serif that balances the raw geometry of headlines.
- **Telemetry / Figures**: `JetBrains Mono` or similar monospace — Used for rank statistics, percentages, and cutoff values.
- **Anti-patterns**: The generic font `Inter` is banned. Standard Serif fonts are banned. Pure white text is banned (use `#E2E8F0` for primary typography).

---

## 4. Component Stylings
* **Tactile Glassmorphism**: Cards use `backdrop-filter: blur(12px)` and a subtle diagonal linear gradient overlay `bg-gradient-to-br from-white/5 to-white/[0.01]`.
* **Interactive Glowing CTAs**: Primary buttons have no heavy drop shadows. Instead, hovering triggers an organic emerald backdrop-glow (`box-shadow: 0 0 15px rgba(16, 185, 129, 0.4)`) and a slight upward lift.
* **Micro-Telemetry Inputs**: Active inputs do not get a heavy focus ring. The bottom edge lights up in **Laser Green** and the label floats directly above.
* **Integrity Chips**: Status labels are small-caps, flat colored badges with transparent fills and matching colored outlines (e.g., `text-emerald-400 bg-emerald-500/10 border-emerald-500/20`).

---

## 5. Layout & Spacing
- Centered heroes are BANNED. Every screen layout starts with a crisp, asymmetric 2-column or 3-column dashboard block.
- CSS Grid handles layout architecture to enforce alignment with surgical precision.
- Section spacing uses dynamic values (`py-12 md:py-24`) to give high-density technical modules breathing room.

---

## 6. Motion & Perpetual Telemetry
- All visual transitions utilize smooth spring physics (`transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`).
- Perpetual micro-animations exist on active statuses: the live updates dot pulses slowly; active telemetry panels feature a soft gradient shimmer.
- Animated elements use `transform` and `opacity` to maintain 60 FPS hardware acceleration.

---

## 7. Anti-Patterns (Strictly Forbidden)
- No emojis anywhere (use precise SVGs or Lucide icons instead).
- No pure black `#000000` (causes harsh visual vibration).
- No arbitrary white card outlines or drop shadows.
- No standard SaaS copy ("Seamless", "Elevate", "Next-Gen").
- No fabricated random metrics (use desaturated text indicating "Estimated / Live data").
