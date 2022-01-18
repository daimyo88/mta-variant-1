const axios = require('axios');

module.exports = axios.create({
    headers : {
        'accept': 'application/json',
        'api-key': process.env.EMAIL_API,
        'content-type': 'application/json'
    }
});