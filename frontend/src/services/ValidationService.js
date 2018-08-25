
export { emailValidate, emptyFieldValidate }

function emailValidate(Email)
{
    // eslint-disable-next-line
    var runValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return runValidation.test(Email);
}

function emptyFieldValidate(Field)
{
    if (Field === "")
    {
        return false
    } else {
        return true
    }    
}