import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.yampi.me" },
      { protocol: "https", hostname: "king-assets.yampi.me" },
    ],
  },
  async redirects() {
    return [
      { source: "/artistas", destination: "/talentos", permanent: true },
      { source: "/pessoas/sergio-carvalho", destination: "/talentos/sergio-carvalho", permanent: true },
      { source: "/livro-guetos", destination: "/guetos/o-apartheid-urbano", permanent: true },
    ];
  },
};

export default nextConfig;
