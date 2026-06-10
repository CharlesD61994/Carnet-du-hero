import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#070b0c',
        obsidian: '#0b1113',
        panel: '#101414',
        panel2: '#17130d',
        line: '#3d301b',
        gold: '#d9a441',
        gold2: '#f2d58a',
        parchment: '#f7e6bd',
        muted: '#a99a7a',
        ember: '#9f5b24',
        danger: '#b85b4b',
        mana: '#54b2ce'
      },
      boxShadow: {
        glow: '0 0 28px rgba(217,164,65,.20)',
        card: 'inset 0 1px 0 rgba(255,255,255,.05), 0 18px 40px rgba(0,0,0,.32)'
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};

export default config;
