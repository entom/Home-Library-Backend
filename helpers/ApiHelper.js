let ApiHelper = {
  validationErrors: (err) => {
    let errors = []
    for (let error in err.errors) {
      errors.push({field: error, message: err.errors[error].message})
    }

    return errors
  }
}

module.exports = ApiHelper
