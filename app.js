const express = require('express');
const metadata = require('ec2-metadata');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        let instanceId = 'local-development';
        let privateIp = '127.0.0.1';

        // Only try to get EC2 metadata if we're running on EC2
        try {
            instanceId = await metadata.getInstanceId();
            privateIp = await metadata.getInstancePrivateIpv4();
        } catch (metadataError) {
            console.log('Not running on EC2, using default values');
        }
        
        res.json({
            instanceId: instanceId,
            privateIp: privateIp,
            message: 'Instance Information'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error fetching instance metadata',
            details: error.message
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port} on all interfaces`);
    console.log(`Try accessing: http://localhost:${port}`);
});
