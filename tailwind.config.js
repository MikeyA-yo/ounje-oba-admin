/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        white: "#FCFCFC",
        black: {
          DEFAULT: "#2E2E2E",
          100: "#D5D5D5",
          200: "#B9B9B9",
          300: "#979797",
          400: "#747474",
          500: "#515151",
          600: "#262626",
          700: "#1F1F1F",
          800: "#171717",
          900: "#0F0F0F",
          1000: "#090909",
        },
        primary: {
          DEFAULT: "#5C1978",
          100: "#DED1E4",
          200: "#C9B2D2",
          300: "#AD8CBB",
          400: "#9266A5",
          500: "#773F8E",
          600: "#4D1564",
          700: "#3D1150",
          800: "#2E0C3C",
          900: "#1F0828",
          1000: "#120518",
        },
        "secondary-one": {
          DEFAULT: "#F29B4C",
          100: "#FCEBDB",
          200: "#FBDEC3",
          300: "#F8CDA5",
          400: "#F6BC88",
          500: "#F4AC6A",
          600: "#CA813F",
          700: "#A16733",
          800: "#794D26",
          900: "#513419",
          1000: "#301F0F",
        },
        "secondary-two": {},
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
