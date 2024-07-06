/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// Images 설정 추가
module.exports = {
    ...module.exports,
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core'],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "xxx.xxx.com",
            },
        ],
        domains: [
            "localhost",
            "strapi.chanhong.pro",
            "chanhong.pro",
            "velog.velcdn.com",
        ], // 허용할 호스트네임을 추가
    },
};
