let ApiHelper = {
  validationErrors: (err) => {
    let errors = []
    for (let error in err.errors) {
      errors.push({field: error, message: err.errors[error].message})
    }

    return errors
  },
  uploadFile: (fileName, folderName, fileContent) => {
    require('fs').writeFile('uploader/' + folderName + '/' + fileName, fileContent, 'base64', (err) => {
      console.log(err)
    })
  }
}

module.exports = ApiHelper
