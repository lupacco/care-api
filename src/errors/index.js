function conflictError(message) {
  return {
    name: "ConflictError",
    message,
  };
}

function duplicatedEmailError(email) {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user using this email",
    email,
  };
}

function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError() {
  return {
    name: "NotFoundError",
    message: "The requested resource could not be found",
  };
}

function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are not valid",
  };
}

export default {
  conflictError,
  duplicatedEmailError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
};
