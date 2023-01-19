/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // future: {
  //   webpack5: true,
  // },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // load worker files as a urls with `file-loader`
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    });
    // config.resolve.fallback = { fs: false, path: false };

    return config;
  },
};

module.exports = nextConfig;
