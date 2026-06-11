const jwt=require("jsonwebtoken");
const verifyAuth=(req,res,next)=>{
const authHeader=req.headers.authorization


  console.log("AUTH HEADER:", req.headers.authorization);
const token=authHeader && authHeader.split(' ')[1];
console.log("TOKEN:", token);

  if(!token){
   return res.status(401).json({
   message: "Access denied"
});
  }
  try {
   const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
   
    console.log("DECODED:", decodedToken);
   req.user=decodedToken;
  } catch (error) {
     return res.status(401).json({
   message: "Access denied"
});
    
  }
  return next();
}

module.exports = verifyAuth;