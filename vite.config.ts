import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * The shop owner's original photos live in `/assets` and have names that
 * contain spaces and parentheses (WhatsApp export names). Those characters
 * are fragile inside import specifiers, dev-server URLs and production
 * asset URLs, which is what caused some images to fail to load.
 *
 * This tiny plugin publishes clean, URL-safe copies into `/public/products`
 * the moment the dev server or a production build starts, so the app can
 * reference plain `/products/rc-01.jpg` paths. Nothing about the photos
 * themselves is altered — they are copied byte-for-byte.
 */
const PHOTO_FILES = [
  'WhatsApp Image 2026-11-03 at 12.20.26 AM (1).jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.26 AM.jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.27 AM.jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.29 AM.jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.31 AM.jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.32 AM.jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.35 AM.jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.36 AM (1).jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.36 AM.jpeg',
  'WhatsApp Image 2026-11-03 at 12.20.37 AM.jpeg',
]

function publishProductPhotos(): Plugin {
  let root = process.cwd()

  return {
    name: 'rimis:publish-product-photos',
    configResolved(config) {
      root = config.root
    },
    buildStart() {
      const sourceDir = path.resolve(root, 'assets')
      const targetDir = path.resolve(root, 'public', 'products')

      try {
        fs.mkdirSync(targetDir, { recursive: true })
      } catch {
        return
      }

      PHOTO_FILES.forEach((file, index) => {
        const from = path.join(sourceDir, file)
        const to = path.join(targetDir, `rc-${String(index + 1).padStart(2, '0')}.jpg`)
        try {
          if (fs.existsSync(from)) {
            fs.copyFileSync(from, to)
          }
        } catch {
          /* A missing photo must never break the dev server or the build. */
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), publishProductPhotos()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
