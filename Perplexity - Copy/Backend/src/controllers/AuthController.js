import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken"; 
import { sendEmail } from "../services/MailService.js";


export async function RegisterController(req,res) {
    const {username,email,password}=req.body;

    const isUserAlreadyExists=await UserModel.findOne({$or:[{username},{email}]});
    
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists",
            success:false,
            err:"User already exists"
        });
    }

    const user=await UserModel.create({username,email,password});
    
    const emailVerificationToken=jwt.sign({email:user.email},process.env.JWT_SECRET);   

      await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>To verify your email address,  please click the link below to verify your email address:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(201).json({
        message:"User registered successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    });
}


export async function LoginController(req, res) {

  try {
    const { email, password } = req.body;

    console.log("email:",email)
    console.log("password",password)

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        err: "Missing credentials",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
        err: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
        err: "Invalid credentials",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Email not verified",
        success: false,
        err: "Email not verified",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      err: error.message,
    });
  }
}

export async function getmeController(req,res) {
   const userid=req.user.id;

   const user=await UserModel.findById(userid).select("-password");

   if(!user){
    return res.status(400).json({
        message:"User not found",
        success:false,
        err:"User not found"
    });
   }
   
   res.status(200).json({
    message:"User fetched successfully",
    success:true,
    user
   });

}

export async function VerifyEmailController(req,res) {
  try {
        const {token}=req.query;
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
    const {email}=decodedToken;

    const user=await UserModel.findOne({email});
    console.log(user)

    if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false,
            err:"User not found"
        });
    }

    if(user.verified){
       return res.redirect("http://localhost:5173/login");
    }

    user.verified=true;
     
    await user.save();

    const html =
            `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
         <a href="http://localhost:5173/login">Go to Login</a>
    `

        return res.send(html);
    } catch (err) {
         return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
    
}

