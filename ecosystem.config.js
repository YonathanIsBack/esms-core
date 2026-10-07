module.exports = {
  apps: [
    {
      name: 'esms-core',
      script: 'dist/main.js',
      error_file: './pm2/err.log',
      out_file: './pm2/out.log',
      instances: 1,
      autorestart: true,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
      },
      watch: true,
      watch_delay: 5000,
      ignore_watch: ['node_modules', 'node_modules', 'logs', 'public', 'test', '.git', 'pm2']
    },
  ],
};
