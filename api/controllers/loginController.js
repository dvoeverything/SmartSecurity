const superAdmin = require('../models/SuperAdmin.js');
const seComp = require('../models/securityCompany.js');
const user= require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const login = (req,res)=>{
    console.log(process.env.USER)
    console.log('insider login controller');
    const { email, password,role } = req.body;
    console.log('email is :'+ email)
    console.log('role :'+ role)
    if (!email || !password || !role) return res.status(400).json({ 'message': 'Username and password are required.' });
    console.log(email+ password)

    switch (role) {
        case process.env.S_ADMIN:
          console.log('super admin')
          superAdmin.findOne({email:email})
          .then(_user=>{
            if(_user){
                //check password
                console.log(_user)
                bcrypt.compare(password, _user.password).then(function(result) {
                    if(result){
                        console.log(result)
                       //using jwt to authontenticate
                       const role = _user.Role;
                       const accessToken = jwt.sign({
                           userInfo:{
                            "userEmail" : _user.Email,
                            "role":role  
                           }
                       },
                       process.env.ACCESS_TOKEN_SECRET,
                       {expiresIn:'30s'} 
                       )
                       const refreshToken = jwt.sign({
                         "userEmail" : _user.Email  
                       },
                       process.env.REFRESH_TOKEN_SECRET,
                       {expiresIn:'1d'} 
                       )
                       console.log(accessToken)
                       _user.refreshToken=refreshToken;
                       _user.save()
                       .then(response=>{
                            console.log('successful login')
                            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',secure:true ,  maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
                            res.json({role, accessToken });
                       })
                       .catch(error=>{
                           console.log(error);
                            res.status(401).json({
                            message :'Cannot authenticate'
                        })     
                       })
                    }else{
                        res.status(401).json({
                            message :'invalid credentials'
                        })                   
                    }
                });
                
            }else{
                console.log('invalid credentials')
                res.status(401).json({
                    message :'invalid credentials'
                })
            }
    
        })
        .catch(err=>{
            console.log(err)
                res.status(500).json({
                    message : 'server error'
                })
            })
          break;
        case process.env.SEC_COMP:
          console.log('security company')
          seComp.findOne({email:email})
          .then(_user=>{
            if(_user){
                //check password
                console.log(_user)
                bcrypt.compare(password, _user.password).then(function(result) {
                    if(result){
                        console.log(result)
                       //using jwt to authontenticate
                       const role = _user.Role;
                       const accessToken = jwt.sign({
                           userInfo:{
                            "userEmail" : _user.Email,
                            "role":role  
                           }
                       },
                       process.env.ACCESS_TOKEN_SECRET,
                       {expiresIn:'30s'} 
                       )
                       const refreshToken = jwt.sign({
                         "userEmail" : _user.Email  
                       },
                       process.env.REFRESH_TOKEN_SECRET,
                       {expiresIn:'1d'} 
                       )
                       console.log(accessToken)
                       _user.refreshToken=refreshToken;
                       _user.save()
                       .then(response=>{
                            console.log('successful login')
                            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',secure:true ,  maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
                            res.json({role, accessToken });
                       })
                       .catch(error=>{
                           console.log(error);
                            res.status(401).json({
                            message :'Cannot authenticate'
                        })     
                       })
                    }else{
                        res.status(401).json({
                            message :'invalid credentials'
                        })                   
                    }
                });
                
            }else{
                console.log('invalid credentials')
                res.status(401).json({
                    message :'invalid credentials'
                })
            }
    
        })
        .catch(err=>{
            console.log(err)
                res.status(500).json({
                    message : 'server error'
                })
            })
          break;
        case process.env.USER:
            user.findOne({email:email})
          .then(_user=>{
            if(_user){
                //check password
                console.log(_user)
                bcrypt.compare(password, _user.password).then(function(result) {
                    if(result){
                        console.log(result)
                       //using jwt to authontenticate
                       const role = _user.Role;
                       const accessToken = jwt.sign({
                           userInfo:{
                            "userEmail" : _user.Email,
                            "role":role  
                           }
                       },
                       process.env.ACCESS_TOKEN_SECRET,
                       {expiresIn:'30s'} 
                       )
                       const refreshToken = jwt.sign({
                         "userEmail" : _user.Email  
                       },
                       process.env.REFRESH_TOKEN_SECRET,
                       {expiresIn:'1d'} 
                       )
                       console.log(accessToken)
                       _user.refreshToken=refreshToken;
                       _user.save()
                       .then(response=>{
                            console.log('successful login')
                            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',secure:true ,  maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
                            res.json({role, accessToken });
                       })
                       .catch(error=>{
                           console.log(error);
                            res.status(401).json({
                            message :'Cannot authenticate'
                        })     
                       })
                    }else{
                        res.status(401).json({
                            message :'invalid credentials'
                        })                   
                    }
                });
                
            }else{
                console.log('invalid credentials')
                res.status(401).json({
                    message :'invalid credentials'
                })
            }
    
        })
        .catch(err=>{
            console.log(err)
                res.status(500).json({
                    message : 'server error'
                })
            })
          console.log('user')
      }
}


module.exports = {login};