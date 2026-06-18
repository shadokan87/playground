import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "500mb",
		},
	},
	turbopack: {
		root: process.cwd(),
	},
}

export default nextConfig
