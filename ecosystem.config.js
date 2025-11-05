/**
 * PM2 Ecosystem Configuration for Thai Hajj Health System
 * This file is used by PM2 to manage the Node.js application on Plesk hosting
 * 
 * To use this configuration:
 * 1. Install PM2: npm install -g pm2
 * 2. Start application: pm2 start ecosystem.config.js --env production
 * 3. Save PM2 process list: pm2 save
 * 4. Setup PM2 startup: pm2 startup
 */

module.exports = {
  apps: [
    {
      name: 'thai-hajj-health',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
