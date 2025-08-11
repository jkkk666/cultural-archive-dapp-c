/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // 支持 JSON 模块导入
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    
    return config;
  },
}

module.exports = nextConfig 