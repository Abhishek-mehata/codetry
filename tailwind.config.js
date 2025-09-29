/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9d63df",
        "light-primary": "#9C59DF9E",
        "fade-purple": "#f4eff6",
        "dark-purple": "#3F3D56",
        "dark-blue": "#172B4D",
        midnight: "#121721",
        "light-gray": "#C1C7D0",
        "dark-gray": "#434859",
        gray: "#8B9199",
        white: "#ffffff",
        "fade-white": "#E5E5E5",
        success: "#4DDA63",
        warning: "#F4DE19",
        danger: "#E2445C",
        para: "#434859"
      },
      screens: {
        'xss': '300px',
        'sms': '380px',   // Small devices (default)
        'mds': '445px',   // Medium devices (default)
        'xs': '480px',   // Extra small devices
        'mds2': '520px',   // Medium devices (default)
        'sm': '640px',   // Small devices (default)
        'smm': '768px',   // Small devices (default)
        'md': '786px',   // Medium devices (default)
        'scs': '850px',
        'scc':"900px",
        'sc': '970px',
        'lg': '1024px',  // Large devices (default)
        'xl': '1280px',  // Extra large devices (default)
        '2xl': '1536px', // 2x large devices (default)
        '3xl': '1800px', // Custom extra large breakpoint
      },
      spacing: {
        'section-padding': '50px',
        'sm-section-padding': '25px'
      },
      fontFamily: {
        popins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
