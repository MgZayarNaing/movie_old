// next.config.mjs
export default {
    reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://movie.kanpetletfreedomfund.site/api/:path*' // Proxy to external API
        }
      ];
    }
  };
  