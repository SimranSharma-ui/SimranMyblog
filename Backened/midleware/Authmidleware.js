const usermodel = require('../model/userModel');
const jwt = require('jsonwebtoken');



exports.isAuthenticated = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;
    console.log('Middleware:', token);

    if (!token) {
      return res.status(401).json({ error: "User not Authenticated" });
    }
    const decoded = jwt.verify(token, process.env.jwt_token); 

  
    const user = await usermodel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }

   
    req.user = user;

  
    next();
  } catch (err) {
    console.log("Error Occurring in Authentication: " + err);
    return res.status(401).json({ error: "User not authenticated" });
  }
};


exports.isAdmin =  (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return  res.status(403).json({error:`User with given role ${req.user.role} not allowed`});
        }
        next()
    }
}