/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // modularizeImports: {
  //   "@tabler/icons-react": {
  //     transform: "@tabler/icons-react/dist/esm/icons/{{member}}",
  //   },
  //   "@mantine/core": {
  //     transform: "@mantine/core/esm/{{member}}/{{member}}.js",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  //   "@mantine/core/lib/AppShell": {
  //     transform: "@mantine/core/esm/AppShell/{{member}}/{{member}}.js",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  //   "@mantine/core/lib/Grid": {
  //     transform: "@mantine/core/esm/Grid/{{member}}/{{member}}.js",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  //   "@mantine/core/lib/Timeline": {
  //     transform: "@mantine/core/esm/Timeline/{{member}}/{{member}}.js",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  //   "@mantine/core/lib/Burger": {
  //     transform: "@mantine/core/esm/Burger/Burger.js",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  //   "@mantine/core/lib/Menu/MenuDivider/MenuDivider": {
  //     transform: "@mantine/core/esm/Menu/MenuDivider/MenuDivider.js",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  //   "@mantine/core/lib/Menu/MenuItem/MenuItem": {
  //     transform: "@mantine/core/esm/Menu/MenuItem/MenuItem.js",
  //     skipDefaultConversion: true,
  //     preventFullImport: true,
  //   },
  //   "@mantine/core/lib/Menu/MenuTarget/MenuTarget": {
  //     transform: "@mantine/core/esm/Menu/MenuTarget/MenuTarget.js",
  //     skipDefaultConversion: true,
  //   },
  //   "@mantine/core/lib/Menu/MenuDropdown/MenuDropdown": {
  //     transform: "@mantine/core/esm/Menu/MenuDropdown/MenuDropdown.js",
  //     skipDefaultConversion: true,
  //   },
  // },
};

module.exports = nextConfig;
