// middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'your_jwt_secret');
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authMiddleware;

const jwt=require("jsonwebtoken");

const authMiddleware= (req, res, next)=>{
  try{
    const token= req.headers.authorization;
    if(!token){
      return res.status(401).send("Access Denied");
    }
    const decode= jwt.verify(token, "secret");

    req.userId=decode.userId;
    next();

  }
  catch(err){
    res.statua(400).send("Invalid token")
  }
}

module.exports=authMiddleware;
