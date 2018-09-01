const url = './webservice/api'
const axios = require('axios');
export {getWorkSpaceInfo}

function getWorkSpaceInfo(creds)
{
    return axios({
        method: "POST",
        url: `${url}/settings/workspace`,
        data: creds
    }).then(response => response.data)
}