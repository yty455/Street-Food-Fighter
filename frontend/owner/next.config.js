/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true, // Next에게 styled-component도 처리해달라고 옵션을 설정해줌
  },
};
module.exports = nextConfig;
