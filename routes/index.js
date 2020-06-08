var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userModel = require('../models/users');
var session = require('express-session');
var app = express();

//localstorage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


// check email midielwear function
function checkEmail(req,res,next) {
  var Email  = req.body.email;
  var checkExistEmail = userModel.findOne({Email_address : Email});
  checkExistEmail.exec((err,data) => {
     if(err) throw err;
     if(data) {
      return  res.render('signup' , {msg : 'Email Address Already exist' , className : 'bg-danger' , className2 : 'show'});
     } 
     next();
  });
}


//check login user middelwear




/* GET home page. */
router.get('/', function(req, res, next) {
  var userLogin =  req.session.userName;
  if(req.session.userName) {
     res.redirect('/dashboard');
  } else {
    res.render('index' , { msg : ''});
  }
 
});


////////////////-------signup-------///////////////////
// signup get method
router.get('/signup' , (req,res,next) =>  {
  res.render('signup' , { msg : ''  , className  : '' , className2 : '' });
});

// get client js




//sigmup post 
 router.post('/signup' , checkEmail,  (req,res, next) => {
    var username  = req.body.uname;
    var Email = req.body.email;
    var mobile_number = req.body.number;
    var password = req.body.pwd;

    bcrypt.hash(password, 10, function(err, hash) {
      // Store hash in your password DB.
      const usersDetails = new userModel({
        username : username,
        Email_address : Email,
        Mobile_number : mobile_number,
        password : hash
      });
      usersDetails.save(err => {
        if(err) throw err;
        res.render('signup' , {msg : 'You have successfully registered' , className :'bg-success' , className2 : 'show'});
     });
  });
   
 });
////////////////-------signup-------///////////////////

function checkUserLogin(req,res, next) {
  
  var userToken =   localStorage.getItem('userToken');
  try {
   if(req.session.userName) {
      var decoded = jwt.verify(userToken, 'loginToken');
    } else {
       res.redirect('/');
    }
  } catch(err) {
    res.redirect('/');
  }
  next();
}



///////////////-----login------//////////

router.post('/' , (req,res,next) => {
  var Email = req.body.email;
  var password = req.body.pwd;
  
  var checkUser = userModel.findOne({Email_address : Email });
  

  checkUser.exec((err , data) => {
    var getId = data._id;
    var getPwd = data.password;
    
    if(bcrypt.compare(password , getPwd )) {
      var token = jwt.sign({ userId: getId }, 'loginToken');
      localStorage.setItem('userToken' , token);
      localStorage.setItem('userLogin' , Email);
     
      req.session.userName = Email;
      res.redirect('/dashboard');
    } else {  
       res.render('index' ,  {msg : 'Invalid Email and password'});
    }
   
  });
});

//logout 
router.get('/logout' , (req,res,next) => {
  req.session.destroy(function(err) {
   if(err) throw err;
   res.redirect('/');
  })
});

// html page

router.get('/index' , checkUserLogin, (req,res,next) =>  {
  res.render('index.html');
});

//dashboard page
router.get('/dashboard', checkUserLogin, (req,res ,next) =>  {
  var userLogin =  req.session.userName;
  res.render('dashboard' , {userLogin : req.session.userName});

});



module.exports = router;
