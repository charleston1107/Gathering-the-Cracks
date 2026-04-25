
/** 
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globSync } from 'glob'

const pages = Object.fromEntries(
  globSync('**/
  /*.html', { ignore: ['node_modules/**', 'dist/**'] })
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
*/

import { defineConfig } from "vite"
import { resolve } from "path"
import fs from "fs"

function getHtmlEntries(dir) {
  const entries = {}

  function scan(folder) {
    const files = fs.readdirSync(folder)

    files.forEach(file => {
      const fullPath = folder + "/" + file
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        scan(fullPath)
      } else if (file.endsWith(".html")) {
        entries[fullPath] = resolve(__dirname, fullPath)
      }
    })
  }

  scan(dir)
  return entries
}

export default defineConfig({
  base: "/Gathering-the-Cracks/",
  build: {
    rollupOptions: {
      input: getHtmlEntries(".")
    }
  }
})