let ApiHelper = {
  validationErrors: (err) => {
    let errors = []
    for (let error in err.errors) {
      errors.push({field: error, message: err.errors[error].message})
    }

    return errors
  },
  uploadFile: (fileName, folderName, fileContent) => {
    let path = 'uploader/' + folderName + '/'
    let fs = require('fs')
    let makeDir = require('mkdirp')

    makeDir(path, (err) => {
      console.log(err)
      fs.writeFile(path + fileName, fileContent, 'base64', (err) => {
        console.log(err)
      })
    })
  }
}

module.exports = ApiHelper
