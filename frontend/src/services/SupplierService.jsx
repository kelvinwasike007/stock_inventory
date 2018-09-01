const url = "./webservice/api";
const axios = require('axios');

export { getSuppliers, addSupplier, updateSupplier, deleteSupplier }

function getSuppliers(creds)
{
    return axios({
        method: "POST",
        url: `${url}/supplier/read`,
        data: creds
    }).then(response => response.data);
}

function addSupplier(supplier_data)
{
    return axios({
        method: "POST",
        url: `${url}/supplier/add`,
        data: supplier_data
    }).then(response => response.data);
}

function updateSupplier(update_info)
{
    return axios({
        method: "PUT",
        url: `${url}/supplier/update`,
        data: update_info
    }).then(response => response.data);
}

function deleteSupplier(delete_data)
{
    return axios({
        method: "Delete",
        url: `${url}/supplier/delete`,
        data: delete_data
    }).then(response => response.data);
}