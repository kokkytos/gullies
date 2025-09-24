import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // Enable SPA mode
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/gullies' : ''
    }
  }
};

export default config;