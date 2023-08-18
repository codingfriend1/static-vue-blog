import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import markdownify from 'vite-plugin-markdownify';

const env_vars = loadEnv('', process.cwd())

const cssPlugin = () => {
  return {
    name: 'css-transform',
    transform(src, id) {
      if (/\.(scss)$/.test(id) || /\.(txt)$/.test(id)) {
        return src.replace(/%([a-zA-Z_]*?)%/g, (match, p1) => env_vars[p1]);
      }
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),
    cssPlugin(),
    markdownify({
      htmlTemplate: './dist/index.html',
      input: './markdown',
      output: './dist/',
      words_per_minute: 275,
      defaults: {
        title: env_vars.VITE_TITLE,
        author: env_vars.VITE_AUTHOR,
        description: env_vars.VITE_DESCRIPTION,
        baseUrl: env_vars.VITE_URL,
        "og:type": `article`
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // your stylus options here
      }
    },
  },
})

