const Validator = require('validator');
const validText = require('./valid-text');

module.exports = validRegisterInput = data => {
  let errors = {};

  data.handle = validText(data.handle) ? data.handle : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";
  
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }
  
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = "Password must be between 6-30 chars"
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirmation is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}