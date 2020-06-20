export default function apiValidationErrorHandler(error) {
  let validationErrors = {};

  const { response: { data: { errors } }} = error;

  (errors || []).forEach(error => {
    validationErrors[error.name] = error.message;
  });

  return validationErrors;
}
