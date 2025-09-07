/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* muted gray with transparency */
        input: "var(--color-input)", /* elevated dark gray */
        ring: "var(--color-ring)", /* deep navy blue */
        background: "var(--color-background)", /* near-black */
        foreground: "var(--color-foreground)", /* high-contrast white-blue */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep navy blue */
          foreground: "var(--color-primary-foreground)", /* high-contrast white-blue */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* military green */
          foreground: "var(--color-secondary-foreground)", /* high-contrast white-blue */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* alert red */
          foreground: "var(--color-destructive-foreground)", /* high-contrast white-blue */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* elevated dark gray */
          foreground: "var(--color-muted-foreground)", /* muted gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* warning amber */
          foreground: "var(--color-accent-foreground)", /* near-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* elevated dark gray */
          foreground: "var(--color-popover-foreground)", /* high-contrast white-blue */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated dark gray */
          foreground: "var(--color-card-foreground)", /* high-contrast white-blue */
        },
        success: {
          DEFAULT: "var(--color-success)", /* confirmation green */
          foreground: "var(--color-success-foreground)", /* high-contrast white-blue */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warning amber */
          foreground: "var(--color-warning-foreground)", /* near-black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* critical red */
          foreground: "var(--color-error-foreground)", /* high-contrast white-blue */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-alert": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-alert": "pulse-alert 2s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}