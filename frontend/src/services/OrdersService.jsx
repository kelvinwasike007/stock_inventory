const url = "./webservice/api";
const axios = require('axios');
export { getOrderRequest,updateApprovalStatus }

function getOrderRequest(creds) {
    return axios({
        method: "POST",
        url: `${url}/orders/read`,
        data: creds
    }).then(response => response.data)
}

function updateApprovalStatus(update_data)
{
    return axios({
        method: "PUT",
        url: `${url}/orders/update`,
        data: update_data
    }).then(response => response.data)
}