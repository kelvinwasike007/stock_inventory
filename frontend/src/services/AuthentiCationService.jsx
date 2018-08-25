var store = localStorage;
var axios = require('axios');
const url = "/api";
export { getSession, authCheck, addOrganization, getOrganizations, loginResponse, saveSession, getAccountType }

function authCheck()
{
    if (store.getItem("user_data") === null)
    {
        return false;
    } else {
        return true;
    }
}

function getSession()
{
    var session = store.getItem("user_data");
    session = JSON.parse(session);
    return session;
}

function getAccountType()
{
    var data = store.getItem("user_data");
    data = JSON.parse(data);
    return data.account_type;  
}

function addOrganization(OrgData)
{
    return axios({
        method: "POST",
        url: `${url}/clients/register`,
        data: OrgData,
    }).then( response => response.data );
}


function getOrganizations()
{
    return axios({
        method: "GET",
        url: `${url}/clients/read`
    }).then(
        response => response.data
        );
}

function loginResponse(creds)
{
    return axios({
        method: "POST",
        url: `${url}/users/clients/login`,
        data: creds
    }).then(response => response.data);
}

function saveSession(user_data)
{
    localStorage.setItem("user_data", JSON.stringify(user_data));
}