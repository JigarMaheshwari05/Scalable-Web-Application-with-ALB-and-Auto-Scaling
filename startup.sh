#!/bin/bash

# Update system packages
sudo yum update -y

# Install Node.js directly from NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install git
sudo yum install -y git

# Install PM2 globally
npm install pm2 -g

# Create application directory
mkdir -p /home/ec2-user/app
cd /home/ec2-user/app

# Clone the repository
git clone https://github.com/JigarMaheshwari05/Scalable-Web-Application-with-ALB-and-Auto-Scaling.git .

# Install dependencies
npm install

# Setup PM2 to start on boot
pm2 startup

# Start the application with PM2
pm2 start app.js --name "instance-info"

# Save the PM2 process list
pm2 save
