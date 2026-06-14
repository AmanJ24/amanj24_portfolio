/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#09080A',
        surface:   '#1C1A17',
        surface2:  '#2A2820',
        text:      '#E6DDD0',
        muted:     '#8C8378',
        accent:    '#BFA98A',
        sage:      '#3D5C3A',
        border:    '#2E2B26',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero':    ['clamp(3rem, 9vw, 8rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display': ['clamp(2.2rem, 5.5vw, 5rem)',  { lineHeight: '1.08',  letterSpacing: '-0.02em' }],
        'xl3':     ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3' }],
        'xl2':     ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.4' }],
        'body-lg': ['clamp(1.05rem, 1.5vw, 1.25rem)', { lineHeight: '1.7' }],
      },
    },
  },
  plugins: [],
}
