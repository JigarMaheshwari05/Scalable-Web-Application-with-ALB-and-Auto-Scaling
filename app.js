const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

async function getMetadataToken() {
    try {
        const response = await axios.put(
            'http://169.254.169.254/latest/api/token',
            '',
            {
                headers: {
                    'X-aws-ec2-metadata-token-ttl-seconds': '21600'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('Not running on EC2 or unable to get token');
        return null;
    }
}

async function getMetadata(token, path) {
    try {
        const response = await axios.get(
            `http://169.254.169.254/latest/meta-data/${path}`,
            {
                headers: {
                    'X-aws-ec2-metadata-token': token
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(`Unable to get metadata for ${path}`);
        return null;
    }
}

app.get('/', async (req, res) => {
    try {
        let instanceId = 'local-development';
        let privateIp = '127.0.0.1';

        // Try to get EC2 metadata
        const token = await getMetadataToken();
        if (token) {
            const fetchedInstanceId = await getMetadata(token, 'instance-id');
            const fetchedPrivateIp = await getMetadata(token, 'local-ipv4');
            
            if (fetchedInstanceId && fetchedPrivateIp) {
                instanceId = fetchedInstanceId;
                privateIp = fetchedPrivateIp;
            }
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
