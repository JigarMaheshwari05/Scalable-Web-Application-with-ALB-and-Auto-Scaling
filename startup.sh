#!/bin/bash

# Update system packages
sudo yum update -y

# Install Node.js and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 18
nvm use 18

# Install PM2 globally
sudo npm install -g pm2

# Install git
sudo yum install -y git

# Create application directory
mkdir -p /home/ec2-user/app
cd /home/ec2-user/app

# Clone the repository
git clone https://github.com/JigarMaheshwari05/Scalable-Web-Application-with-ALB-and-Auto-Scaling.git .

# Install dependencies
npm install

# Start the application with PM2
pm2 start app.js --name "instance-info" -- start

# Save PM2 process list and configure PM2 to start on system startup
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user
