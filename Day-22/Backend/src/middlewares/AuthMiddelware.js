const jwt=require("jsonwebtoken");
async function identifyUser(req,res,next) {
    const token=req.cookies.token
     if(!token){
        return res.status(401).json({
            message: "unauthorized Access"
        })
    }

    let decoded=null; //docedd me user ki id aati hai jiski token ho
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }catch(err){
        return res.json(401).json({
            message:"Invalid Token !"
        })
    }

    req.user=decoded;   
    next()                 
}
module.exports=identifyUser;