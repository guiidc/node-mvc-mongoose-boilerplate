function checkCsrfToken(err, req, res, next) {
  if (err && err.code === 'EBADCSRFTOKEN') {
    console.log(err);
    return res.send('BAD CSRF Token');
  }
  next();
}

function generateCsrf(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports = {
  checkCsrfToken,
  generateCsrf,
};
