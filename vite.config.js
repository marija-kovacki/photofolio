import { resolve } from 'path'
import fs from 'fs'

const textPages = {}

fs.readdirSync('./texts').forEach((file) => {
  if (file.endsWith('.html')) {
    const name = file.replace('.html', '')
    textPages[name] = resolve(__dirname, 'texts', file)
  }
})

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blogPage: resolve(__dirname, 'blog.html'),
        about: resolve(__dirname, 'about.html'),
        ...textPages,
      },
    },
  },
}
