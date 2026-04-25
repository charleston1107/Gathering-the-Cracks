import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globSync } from 'glob'

const pages = Object.fromEntries(
  globSync('**/*.html', { ignore: ['node_modules/**', 'dist/**'] })
    .map(file => [
      file.replace(/\.html$/, ''), 
      resolve(__dirname, file)
    ])
)

export default defineConfig({
  build: {
    rollupOptions: {
      input: pages
    }
  },
  base: "/Gathering-the-Cracks/"
})