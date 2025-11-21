import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://apis.data.go.kr/:path*', // 실제 요청을 보낼 백엔드 주소
      },
      {
        source: '/kobisopenapi/:path*',
        destination: 'https://kobis.or.kr/kobisopenapi/:path*', // 실제 요청을 보낼 백엔드 주소
      },
    ];
  },
};

export default nextConfig;
