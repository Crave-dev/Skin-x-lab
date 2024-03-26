/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    webpack: (config, { nextRuntime }) => {
        if (nextRuntime !== "nodejs") return config;
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    },
};

export default nextConfig;
