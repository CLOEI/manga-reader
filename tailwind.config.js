module.exports = {
	darkMode: 'class',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		gridTemplateAreas: {
			layout: [
				'cover title',
				'tool tool',
				'desc desc',
				'tags tags',
				'chapter chapter',
			],
		},
		extend: {
			gridTemplateColumns: {
				layout: '7rem 1fr',
			},
			colors: {
				'dark-00dp': '#121212',
				'dark-01dp': '#232323',
				'dark-02dp': '#262626',
				'dark-03dp': '#292929',
				'dark-04dp': '#2a2a2a',
				'dark-06dp': '#303030',
			},
		},
	},
	plugins: [
		require('@savvywombat/tailwindcss-grid-areas'),
		require('@tailwindcss/line-clamp'),
	],
};
