const Validator = require('Validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.state = !isEmpty(data.state) ? data.state : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name Field is Required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is Required';
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is Invalid";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is Required';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password = 'Password Field is Required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        console.log('break');
        errors.password = 'Password must be at least 6 characters';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must Match';
    }

    if(Validator.isEmpty(data.city)) {
        errors.city = 'Name Field is Required';
    }

    if(Validator.isEmpty(data.state)) {
        errors.state = 'state Field is Required';
    }

    if(Validator.isEmpty(data.country)) {
        errors.country = 'country Field is Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}