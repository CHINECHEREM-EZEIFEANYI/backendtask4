const mongoose = require('mongoose')
 const dbConnection=  () =>
 {
   return  mongoose.connect (process.env.DB_URL, {useNewUrlParser: true})
 }
module.exports = dbConnection