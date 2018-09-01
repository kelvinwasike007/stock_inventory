const url = "./webservice/api"
const axios = require('axios')

export { getDashboardWidgets }

function getDashboardWidgets(creds)
{
    return axios({
        method: "POST",
        url: `${url}/checkpoint/dashboard`,
        data: creds
    }).then(response => response.data)
}

