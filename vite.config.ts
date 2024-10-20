import { defineConfig } from 'vite'

import solid from 'vite-plugin-solid'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\/(.+)/, replacement: '/src/$1' },
    ],
  },
  plugins: [
    devtools({
      autoname: true,
    }),
    solid(),
  ],
})
