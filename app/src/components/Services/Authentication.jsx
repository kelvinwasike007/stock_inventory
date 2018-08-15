
//local storage

const storeDriver = localStorage
const Authentication = {

    logout: () => {

    },

    clearSession: () => {
        storeDriver.clear();
    },

    setSession: (user_data) => {
        //set User Id
        storeDriver.setItem("userdata", JSON.stringify(user_data));
    },

    testAuth: () => {
        var appSession = storeDriver.getItem('userdata');
        if (appSession === null)
        {
            return false;
        } else {
            return true;
        }
    },

    getToken: () => {
        var appSession = storeDriver.getItem('userdata');
        return appSession;
    }
}

export default Authentication;