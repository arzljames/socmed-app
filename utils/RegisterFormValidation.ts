import { Dispatch, SetStateAction } from "react";
import { AccountRegisterProps, RegisterValidationErrors } from "../interface";

const containsNumbers = (word: string): Boolean => {
  return /[0-9]/.test(word);
};

const isValidEmail = (email: string): Boolean => {
  const validEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validEmailRegex)) return true;

  return false;
};

const registerFormValidation = (
  data: AccountRegisterProps,
  errors: RegisterValidationErrors,
  setErrors: Dispatch<SetStateAction<RegisterValidationErrors>>
): Boolean | void | null => {
  // first name validation
  if (containsNumbers(data.first_name))
    return setErrors({
      ...errors,
      fname_error: true,
      fname_error_msg: "First name must not include numbers",
    });
  if (!data.first_name)
    return setErrors({
      ...errors,
      fname_error: true,
      fname_error_msg: "First name field is required",
    });
  // -------------------------------------------

  // last name validation
  if (containsNumbers(data.last_name))
    return setErrors({
      ...errors,
      lname_error: true,
      lname_error_msg: "Last name must not include numbers",
    });
  if (!data.last_name)
    return setErrors({
      ...errors,
      lname_error: true,
      lname_error_msg: "Last name field is required",
    });
  // -------------------------------------------

  // email validation
  if (!data.email)
    return setErrors({
      ...errors,
      email_error: true,
      email_error_msg: "Email field is required",
    });
  if (isValidEmail(data.email) === false)
    return setErrors({
      ...errors,
      email_error: true,
      email_error_msg: "Invalid email",
    });

  // -------------------------------------------

  // username validation ----------------------
  if (!data.username)
    return setErrors({
      ...errors,
      username_error: true,
      username_error_msg: "Username field is required",
    });
  if (data.username.length < 6)
    return setErrors({
      ...errors,
      username_error: true,
      username_error_msg: "Username must be at least 6 characters",
    });
  // -------------------------------------------

  // password validation ----------------------
  if (!data.password)
    return setErrors({
      ...errors,
      password_error: true,
      password_error_msg: "Password field is required",
    });
  if (data.password.length < 6)
    return setErrors({
      ...errors,
      password_error: true,
      password_error_msg: "Password must be at least 6 characters",
    });

  if (data.password.length > 20)
    return setErrors({
      ...errors,
      password_error: true,
      password_error_msg: "Password must not be greater than 20 characters",
    });
  // -------------------------------------------

  // confirm password validation ----------------------
  if (!data.confirm_password)
    return setErrors({
      ...errors,
      confirm_password_error: true,
      confirm_password_error_msg: "Please confirm  your password",
    });
  if (data.confirm_password !== data.password)
    return setErrors({
      ...errors,
      confirm_password_error: true,
      confirm_password_error_msg: "Password did not match",
    });
  // -------------------------------------------

  // safe to say it passed the validation
  // returning true
  return true;
};

export default registerFormValidation;
