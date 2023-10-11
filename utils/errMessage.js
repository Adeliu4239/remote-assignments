module.exports = {
  contentTypeError: () => {
    return [400, "Content Type is not Correct"];
  },

  emptyInput: () => {
    return [400, "Input Field should not be Empty"];
  },

  invalidEmailFormat: () => {
    return [400, "Invalid Email Format"];
  },

  invalidNameFormat: () => {
    return [400, 'Invalid Name Format'];
  },

  invalidPasswordFormat: () => {
    return [400, "Invalid Password Format"];
  },

  emailAlreadyExist: () => {
    return [409, "Email Already Existed"];
  },

  userNotFound: () => {
    return [403, "Signin Failed - User not Found"];
  },
};
