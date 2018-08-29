var axios = require('axios')
const url = "/api";

export { getUsers, Validate, addUser, updateUser, deleteUserAccount }

function getUsers(creds)
{
    return axios({
        method: "POST",
        url: `${url}/users/clients/read`,
        data: creds
    }).then(response => response.data);
}

function Validate(value, row)
{
    const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
    if (!value)
    {
        response.isValid = false;
        response.notification.type = 'error';
        response.notification.msg = 'Please Fill In All Fields';
        response.notification.title = 'Empty Fields !';
    }

    return response;
}

function addUser(user_data)
{
    return axios({
        method: "POST",
        url: `${url}/users/clients/add`,
        data: user_data
    }).then(response => response.data);
}

function updateUser(user_data)
{
    return axios({
        method: "PUT",
        url: `${url}/users/clients/update`,
        data: user_data
    }).then(response => response.data);
}

function deleteUserAccount(delete_data)
{
    return axios({
        method: "DELETE",
        url: `${url}/users/clients/delete`,
        data: delete_data
    }).then(response => response.data);
}