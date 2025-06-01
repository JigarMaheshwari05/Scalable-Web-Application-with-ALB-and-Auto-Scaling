const express = require('express');
const metadata = require('aws-ec2-instance-metadata');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const instanceId = await metadata.getInstanceId();
        const privateIp = await metadata.getInstancePrivateIp();
        
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
