function panelSessionChecker (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/panel/login')
  }
}

module.exports = panelSessionChecker
