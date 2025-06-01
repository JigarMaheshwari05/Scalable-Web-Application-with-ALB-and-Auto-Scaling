const express = require('express');
const { EC2MetadataClient } = require('aws-ec2-metadata');
const app = express();
const port = 3000;

const client = new EC2MetadataClient();

app.get('/', async (req, res) => {
    try {
        const instanceId = await client.getInstanceId();
        const privateIp = await client.getPrivateIpAddress();
        
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
    console.log(`Server running on port ${port}`);
});
