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
};

module.exports = nextConfig;
