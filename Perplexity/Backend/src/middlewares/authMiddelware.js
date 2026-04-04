import jwt from "jsonwebtoken";

export function authUser(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized",success:false,err:"No token found"});
    }

    try {
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decodedToken);
        req.user=decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({message:"Unauthorized",success:false,err:"Invalid token"});
    }
}