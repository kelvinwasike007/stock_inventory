const url = "./webservice/api";
const axios = require('axios');

export { getShipments }

function getShipments(creds) {
    return axios({
        method: "POST",
        url: `${url}/manifest/read`,
        data: creds
    }).then(response => response.data);
}