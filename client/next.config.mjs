import path from "path";
import webpack from "webpack";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import ("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "/src/(FSD)/shareds/styles")],
    },
    i18n: {
        locales: ["ko-KR"],
        defaultLocale: "ko-KR",
    },
    images: {
        domains: ['xenoimages12341234.s3.ap-northeast-2.amazonaws.com'],
    },
    eslint: {
        // Ignore ESLint errors during builds
        ignoreDuringBuilds: true,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            // 서버 빌드 시 localStorage와 같은 브라우저 전용 API 호출 무시
            config.resolve.alias['localStorage'] = false;
        }

        // DefinePlugin을 사용하여 클라이언트와 서버 환경 구분
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.browser': JSON.stringify(!isServer),
            })
        );

        return config;
    },
};

export default nextConfig;
