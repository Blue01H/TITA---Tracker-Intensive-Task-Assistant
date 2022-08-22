const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function registerValidation(data) {
    
    let errors = {};

    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.country = !isEmpty(data.country) ? data.country : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    

    if(Validator.isEmpty(data.firstname)) {
        errors.firstname = 'Firstname Field is Required';
    }

    if(Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Lastname Field is Required';
    }

    if(Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender Field is Required';
    }

    if(Validator.isEmpty(data.birthday)) {
        errors.birthday = 'Birthday Field is Required';
    }

    if(Validator.isEmpty(data.country)) {
        errors.country = 'Country Field is Required';
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
        errors.password = 'Password must be at least 6 characters';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must Match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}