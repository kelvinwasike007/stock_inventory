var axios = require('axios')
var url = '/api'
export { addStock, getStocks }

function addStock(stock_info)
{
    return axios({
        method: "POST",
        url: `${url}/stock/add`,
        data: stock_info
    }).then(response => response.data);
}

function getStocks(creds)
{
    return axios({
        method: "POST",
        url: `${url}/stock/read`,
        data: creds
    }).then(response => response.data);
}