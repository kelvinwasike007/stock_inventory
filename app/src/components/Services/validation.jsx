const validateService = {
    checkIfEmpty: (field) => {
        if (field === "")
        {
            return false
        } else {
            return true
        }
    },

    emailValidate: (email) => {
        var validate = /^(([^<>()[].,;:@"]+(.[^<>()[].,;:@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        return validate.test(email);
    }
}

export default validateService;