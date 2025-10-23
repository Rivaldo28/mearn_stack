const express = require('express');
const { mongoose } = require('mongoose');
const User = mongoose.model("User")
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWt_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.post('/signup', (req, res) => {
  const { name, email, password } = req.body
  if (!email || !password || !name) {
    res.status(422).json({ error: "Por favor adicione todos os campos!" })
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "o úsuario não existe!" })
      }
      bcrypt.hash(password, 12)
        .then(hashedpassword => {
          const user = new User({
            email,
            password: hashedpassword,
            name
          })
          user.save()
            .then(user => {
              res.json({ message: "Salvo com sucesso!!" })
            })
            .catch(err => {
              console.log(err)
            })
        })
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/signin', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ error: "Por favor digite email e senha!" })
  }
  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser) {
        return res.status(422).json({ error: "E-mail ou senha está inválido!" })
      }
      bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            /*  res.json({ message: "Logado com sucesso" }) */
            const token = jwt.sign({ _id: savedUser._id }, JWt_SECRET)
            const { _id, name, email } = savedUser
            res.json({ token, user: { _id, name, email } })
          } else {
            return res.status(422).json({ error: "Senha inválida" })
          }
        })
        .catch(err => {
          console.log(err)
        })
    })
})

module.exports = router