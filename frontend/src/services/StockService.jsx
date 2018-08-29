var axios = require('axios')
const url = "/api";
export { addStock, getStocks, updateStock, deleteStock }

function addStock(stock_info)
{
    return axios({
        method: "POST",
        url: `${url}/stock/add`,
        data: stock_info
    }).then(response => response.data);
}

function deleteStock(delete_data)
{
    return axios({
        method: "DELETE",
        url: `${url}/stock/delete`,
        data: delete_data
    }).then(response => response.data);
}

function updateStock(update_data)
{
    return axios({
        method: "PUT",
        url: `${url}/stock/update`,
        data: update_data
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