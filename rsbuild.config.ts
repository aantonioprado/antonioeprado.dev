import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './index.html',
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  output: {
    assetPrefix: '/',
    distPath: {
      root: 'dist',
      js: 'assets',
      jsAsync: 'assets',
      css: 'assets',
      cssAsync: 'assets',
      image: 'assets',
      font: 'assets',
      svg: 'assets',
      media: 'assets',
      assets: 'assets',
    },
  },
})
