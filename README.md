# EC2 Instance Information Service

A scalable Node.js application that displays EC2 instance private IP and instance ID. This application is designed to work with AWS Auto Scaling Groups and Application Load Balancer.

## Features

- Displays EC2 instance private IP
- Shows instance ID
- Auto-scales with AWS ASG
- Uses PM2 for process management
- Runs on port 3000

## Prerequisites

- AWS Account
- EC2 instances running Amazon Linux
- Auto Scaling Group
- Application Load Balancer

## Installation

The application is automatically installed and configured using the startup script when launching EC2 instances in the Auto Scaling Group.

### Startup Script Features

- Updates system packages
- Installs Node.js via NVM
- Installs PM2 for process management
- Clones the repository
- Sets up automatic startup with systemd

## API Endpoint

### GET /

Returns JSON with instance information:

```json
{
    "instanceId": "i-xxxxxxxxxxxxxxxxx",
    "privateIp": "172.xx.xx.xx",
    "message": "Instance Information"
}
```

## Development

To run locally:

```bash
npm install
node app.js
```

The application will be available at `http://localhost:3000`

## License

MIT
