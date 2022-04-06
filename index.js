var dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet')
const multer = require('multer')
//const host = req.host;
//const filePath = req.protocol + "://" + host + '/' + req.file.path;
const router = require('./multer/routes')
const dbConnection = require('./db')
const AvatarStorage = require('./helpers/AvatarStorage')
const upload = multer({dest: 'uploads/'})
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/src/my-images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/public', express.static("public"));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))

app.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});
app.get('/', (req, res) => {
    res.send('Zefingee!!!')
})
PORT= 3000
app.listen(PORT, () => {
    console.log(`Our app is listening on port ${PORT}`)
})