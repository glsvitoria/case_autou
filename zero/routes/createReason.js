const express = require('express')
const router  = express.Router()
const Reason  = require('../models/Reason')

// Add reason
router.post('/add', (req, res) => {
   let{ numberID, register, name, like, proud, work, organization } = req.body

   // insert
   Reason.create({
      numberID,
      register,
      name,
      like,
      proud,
      work,
      organization
   })
   .then(() => res.redirect('/reasons'))
   .catch(err => console.log(err))
})

module.exports = router