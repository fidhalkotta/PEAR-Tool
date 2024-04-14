import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
        colors: {
        'nhs-blue': '#005EB8',
        'nhs-dark-blue': '#003087',
        'nhs-bright-blue': '#0072CE',
        'nhs-light-blue': '#41B6E6',
        'nhs-aqua-blue': '#00A9CE',
          'nhs-pale-grey': '#E8EDEE',
        }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
export default config
