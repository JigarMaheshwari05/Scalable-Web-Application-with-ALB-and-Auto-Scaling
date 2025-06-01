#!/bin/bash

# Update system packages
sudo yum update -y

# Install Node.js directly from NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install git
sudo yum install -y git

# Install PM2 globally with sudo
sudo npm install pm2 -g

# Set proper permissions for npm global directory
sudo chown -R $USER:$(id -gn $USER) ~/.config
sudo chown -R $USER:$(id -gn $USER) ~/.npm

# Create application directory
mkdir -p /home/ec2-user/app
cd /home/ec2-user/app

# Clone the repository
git clone https://github.com/JigarMaheshwari05/Scalable-Web-Application-with-ALB-and-Auto-Scaling.git .

# Install dependencies
npm install

# Setup PM2 to start on boot with sudo
sudo pm2 startup amazon

# Start the application with PM2 with port 80 (requires root)
sudo pm2 start app.js --name "instance-info" --port 80 -- 80

# Save the PM2 process list
sudo pm2 save

# Ensure PM2 is running
sudo systemctl start pm2-root


