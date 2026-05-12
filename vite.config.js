
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


/* 这个配置文件的作用是告诉 Vite 在构建时应该将哪些 HTML 文件作为入口点。它使用了 Node.js 的 fs 模块来递归扫描项目目录中的所有 HTML 文件，并将它们添加到 Rollup 的输入配置中。这样，Vite 就能够正确地处理这些 HTML 文件，并生成相应的输出。 */
/* Ver 2: gave errors. I replaced them with ver 3 written by chatGPT. 

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

*/

/* Ver 3: 3D Map worked after changing this I think. */
import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import path from "path";

function getHtmlEntries(dir, entries = {}) {
  const excluded = ["node_modules", "dist", ".git"];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    if (excluded.includes(item)) continue;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getHtmlEntries(fullPath, entries);
    } else if (item.endsWith(".html")) {
      const relativePath = path.relative(__dirname, fullPath);

      const entryName = relativePath
        .replace(/\.html$/, "")
        .replace(/[\/\\]/g, "_");

      entries[entryName] = resolve(__dirname, relativePath);
    }
  }

  return entries;
}

export default defineConfig({
  base: "/Gathering-the-Cracks/",
  build: {
    rollupOptions: {
      input: getHtmlEntries(__dirname)
    }
  }
});