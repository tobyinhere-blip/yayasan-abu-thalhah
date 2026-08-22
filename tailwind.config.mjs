/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'smanti-red': '#107163',
        'smanti-orange': '#168f7d',
        'smanti-yellow': '#f59e0b',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
