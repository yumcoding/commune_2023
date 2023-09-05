/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				destination: "https://openapi.naver.com/:path*",
				source: "/openapi/:path*",
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "shopping-phinf.pstatic.net",
				// port: '',
				// pathname: '/account123/**',
			},
		],
	},
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
