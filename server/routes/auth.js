'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const flash = require('flash');
const createAvatar = require('../public/js/octodex_avatar');

let onCreateSession = (user, callback)=>{
  bcrypt.hash(user.username, 10, function(err, hash) {
    let _session={
      session_id: hash,
      user_id: user.id,
      active: 1
    };

    knex('sessions')
      .insert(_session)
      .then((data) => {
        callback(true,user, _session);
      })
      .catch((err) => {
        console.log("ERROR sessions", err);
        callback(false,err,{});
      });

  });
};

let getUser = (username) => {
    return new Promise((resolve, reject)=>{
    let query ={
      'username': username
    };
    
    knex('users')
      .select('*')
      .innerJoin('roles', 'users.role_id', 'roles.id')
      .where(query)
      .first()
      .then((data)=>{
        resolve(data);
      })
      .then((err)=>{
        reject(err);
      });
  });
};

router.get('/', function(req, res) {
  console.log(req.user);
  if (req.user)
    res.json({user: req.user});
  else
    res.status(413).send();
})

router.post('/signup', function(req, res, next) {

  let rolePromise = new Promise((resolve, reject)=>{
    let query = {
      role:req.body.role.toLowerCase()
    };
    knex('roles')
      .where(query)
      .first()
      .then((data)=>{
        resolve(data);
      })
      .catch((err)=>{
        console.log(err)
        console.log('error')
        reject(err);
      });
  });

  let userProimse = new Promise((resolve, reject) => {
    
    let query ={
      username:req.body.username
    };
    
    let saveUser = (user) => {
      if(!user){
        createAvatar
          .generateAvatar((created_avatar)=>{
            rolePromise
              .then((data)=>{
                let hash = bcrypt.hashSync(req.body.password, 12);

                let obj = {
                  username : req.body.username,
                  hashed_password : hash,
                  first_name : req.body.first_name,
                  last_name : req.body.last_name,
                  email : req.body.username,
                  admin : req.body.admin||false,
                  avatar : created_avatar,
                  role_id : data.id
                };

                console.log(obj);
      
                knex('users')
                  .insert(obj)
                  .returning('*')
                  .then((d) => {
                    console.log(d);
                    getUser(req.body.username).then((u)=>{
                      console.log('after insert')
                      console.log(u)
                      onCreateSession(u,(err, data, _session)=>{
                        req.session.id = _session.session_id;
                        res.cookie("loggedin", true);
                        resolve([err, data])
                      })
                    });
                  })
                  .catch((err) => {
                    console.log("ERROR creating user", err);
                    reject([false,err]);
                  });
              });
        });
        
      } else{
        resolve([false,'User unknow']);
      } 
      };
  
    getUser(req.body.username).then(saveUser).catch((err)=>{reject(err);});

  });

  userProimse.then((data) => {
    if(data[0]==true){
      res.json({user: data[1]});
    }else{
      res.status(401).send();
    }
  }).catch((err) => {
    console.log('ERROR');
    res.status(401).send();
  });

});

router.post('/login', function(req, res, next) {

  let userPromise = new Promise((resolve, reject) => {
    let onLogin = (user) => {
      if(user){
        bcrypt.compare(req.body.password, user.hashed_password, function(err, _data) {
          if (_data) {
            
            onCreateSession(user,(err, data, _session)=>{
              req.session.id = _session.session_id;
              res.cookie("loggedin", true);
                resolve([err, data])
            });
          }
          else {
            reject([false,'User or Password is wrong!']);
          }
        })
      }
      else{
        reject([false,'User or Password is wrong!']);
      }
    };

    getUser(req.body.username).then(onLogin);

  });

  userPromise
    .then( data => {
      res.json({user: data[1]});
    })
    .catch((err) => {
      console.log('ERROR ', err);
      res.status(413).json({});
    });

});

router.get('/logout', function(req, res) {

  let query = {
    session_id:req.session.id
  };

  let update = {
    active:0        
  };
  
  knex('sessions')
    .where(query)
    .first()
    .update(update)
    .then((data)=>{
      req.session = null;
      res.clearCookie('loggedin');
      res.json({});
    });
});

module.exports = router
