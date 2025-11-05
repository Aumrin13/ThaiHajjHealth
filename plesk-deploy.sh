#!/bin/bash

###############################################################################
# Plesk Git Deployment Script for Thai Hajj Health System
# This script automates the deployment process on Plesk hosting
###############################################################################

set -e  # Exit on error

echo "========================================="
echo "Thai Hajj Health System - Deployment"
echo "========================================="

# Configuration
APP_NAME="thai-hajj-health"
NODE_VERSION="20"
LOG_DIR="./logs"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Step 1: Check Node.js version
print_status "Checking Node.js version..."
node --version || print_error "Node.js is not installed!"

# Step 2: Create logs directory if it doesn't exist
print_status "Creating logs directory..."
mkdir -p "$LOG_DIR"

# Step 3: Install dependencies
print_status "Installing dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci --production=false
else
    npm install
fi

# Step 4: Build the application
print_status "Building Next.js application..."
npm run build

# Step 5: Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_warning "PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Step 6: Stop existing PM2 process if running
print_status "Stopping existing application..."
pm2 stop "$APP_NAME" 2>/dev/null || true
pm2 delete "$APP_NAME" 2>/dev/null || true

# Step 7: Start the application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Step 8: Save PM2 process list
print_status "Saving PM2 process list..."
pm2 save

# Step 9: Display status
print_status "Deployment completed successfully!"
echo ""
pm2 status

echo ""
print_status "========================================="
print_status "Application is now running!"
print_status "To view logs: pm2 logs $APP_NAME"
print_status "To monitor: pm2 monit"
print_status "To restart: pm2 restart $APP_NAME"
print_status "========================================="
