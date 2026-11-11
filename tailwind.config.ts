import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const rgb = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;

// Fluid type: clamp(min, preferred, max) between 360px and 1440px viewports.
const fluid = (min: number, max: number) => {
  const slope = (max - min) / (1440 - 360);
  const base = min - slope * 360;
  return `clamp(${min / 16}rem, ${(base / 16).toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${max / 16}rem)`;
};

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      tablet: "810px",
      lg: "1024px",
      desktop: "1200px",
      wide: "1600px",
    },
    extend: {
      colors: {
        paper: rgb("paper"),
        white: rgb("white"),
        mist: rgb("mist"),
        ink: { DEFAULT: rgb("ink"), 2: rgb("ink-2") },
        body: rgb("body"),
        quiet: rgb("quiet"),
        muted: { DEFAULT: rgb("muted"), foreground: "hsl(var(--muted-foreground))" },
        faint: rgb("faint"),
        line: { DEFAULT: rgb("line"), strong: rgb("line-strong") },
        night: { DEFAULT: rgb("night"), 2: rgb("night-2"), line: rgb("night-line") },
        signal: rgb("signal"),
        "on-night": rgb("on-night"),
        accent: { DEFAULT: rgb("accent"), 2: rgb("accent-2"), foreground: "hsl(var(--accent-foreground))" },
        success: rgb("success"),
        danger: rgb("danger"),
        // shadcn primitives
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      fontFamily: {
        sans: ['"Satoshi"', '"Satoshi Placeholder"', '"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [fluid(26, 36), { lineHeight: "1.1", letterSpacing: "-0.022em" }],
        display: [fluid(34, 56), { lineHeight: "1.03", letterSpacing: "-0.03em" }],
        h1: [fluid(30, 44), { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        h2: [fluid(26, 36), { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h3: [fluid(21, 26), { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h4: [fluid(18, 21), { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        lead: [fluid(18, 22), { lineHeight: "1.45", letterSpacing: "-0.01em" }],
        stat: [fluid(36, 52), { lineHeight: "1", letterSpacing: "-0.03em" }],
        body: [fluid(16, 18), { lineHeight: "1.6" }],
        small: ["0.9375rem", { lineHeight: "1.5" }],
        label: ["0.9375rem", { lineHeight: "1.35", letterSpacing: "0" }],
        micro: ["0.8125rem", { lineHeight: "1.35", letterSpacing: "0.01em" }],
      },
      spacing: {
        gutter: "var(--gutter)",
        header: "var(--header-h)",
        section: fluid(44, 64),
        "section-sm": fluid(32, 44),
      },
      maxWidth: {
        page: "1440px",
        prose: "68ch",
      },
      borderRadius: {
        none: "0",
        xs: "2px",
        sm: "3px",
        DEFAULT: "4px",
        md: "4px",
        lg: "4px",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-out-soft": "var(--ease-in-out)",
        out: "var(--ease-out)",
      },
      transitionDuration: {
        1: "150ms",
        2: "250ms",
        3: "450ms",
        4: "900ms",
        5: "1200ms",
        6: "1400ms",
      },
      zIndex: {
        header: "40",
        overlay: "50",
        toast: "60",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.35s var(--ease-out)",
        "accordion-up": "accordion-up 0.3s var(--ease-out)",
        shimmer: "shimmer 1.6s infinite",
        "fade-in": "fade-in 0.45s var(--ease-out) both",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
