const jwt = require("jsonwebtoken")
const { JWt_SECRET } = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  //authorization == Bearer efdfdfefdsa
  if (!authorization) {
    return res.status(401).json({ error: "Você deve estar logado" })
  }
  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, JWt_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Você deve estar logado2" })
    }
    const { _id } = payload
    User.findById(_id).then(userdata => {
      req.user = userdata
      next()
    })
  })
}