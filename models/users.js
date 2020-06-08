const mongoose = require('mongoose');

require('dotenv').config();

const dbUrl = process.env.MONGO_DB_URL;

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error' , (error) => {
     console.log(error);
});

db.once('open' , () => {
    console.log('connnected to mongodb');
});

const userSchema = new mongoose.Schema({
  username : {
       type : String,
       required : true
  },
  Email_address : {
     type : String,
     required : true
  },
  Mobile_number : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  } ,
  createdAt : {
       type : Date,
       default : new Date()
  }
}); 

const users = mongoose.model('user' , userSchema);

module.exports = users;