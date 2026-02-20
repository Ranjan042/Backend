const UserModel = require("../Models/UserModel");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");

// async function registerController (req,res){
//     console.log("Register route hited");
//     const {email,username,password,bio,profileImage}=req.body;

//     const isUserAlreadyExists=await UserModel.findOne({
//         $or:[
//             {username},
//             {email}
//         ]
//     })

    

//     if(isUserAlreadyExists){
//         return res.status(409)
//         .json({
//             message:"User already exists"+
//             (isUserAlreadyExists.email===email ? "Email Already Exists" : "UserName Already Exists")
//         })
//     }

//     const hash=await bcrypt.hash(password,10)

//     const User=await UserModel.create({
//         username,
//         email,
//         bio,
//         profileImage,
//         password:hash
//     })

//     const token=jwt.sign({
//         id:User._id
//     },process.env.JWT_SECRET,
//          { expiresIn:"1d"}
//     )

//     res.cookie("token",token)

//     res.status(201).json({
//         message:"User Registered Successfully",
//         user:{
//             email:User.email,
//             username:User.username,
//             bio:User.bio,
//             profileImage:User.profileImage
//         }
//     })
// }

async function registerController(req,res) {
    console.log("Register Route hitted")

    const{email,username,password,bio,profileImage}=req.body;

    const isUserAlreadyExists=await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User Aldready Exists "+
            (isUserAlreadyExists.email===email ? "with this email" : "with this username")
        })
    }

    const hash= await bcrypt.hash(password,10);

    const user= await UserModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash

    })

    const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered SuccessFully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

// async function loginController (req,res){
//     const {username,email,password}=req.body;

//     const user=await UserModel.findOne({
//         $or:[{username:username},{email:email}]
//     })
   
//     if(!user){
//         return res.status(404).json({
//             message:"User not found"
//         })
//     }

//     const isPasswordValid=await bcrypt.compare(password,user.password);

//     if(!isPasswordValid){
//         return res.status(401).json({
//             message:"password Invalid"
//         })
//     }

//     const token=jwt.sign(
//         {id:user._id},
//         process.env.JWT_SECRET,
//         {expiresIn:"1d"}
//     )

//     res.cookie("token",token)

//     res.status(200).json({
//         message:"User LoggedIn Successfully",
//         user:{
//             username:user.username,
//             email:user.email,
//             bio:user.bio,
//             profileImage:user.profileImage
//         }
//     })
// }

async function loginController(req,res) {
    const{username,email,password}=req.body;

    const isUserRegistered= await UserModel.findOne({
        $or:[{username},{email}]
    })

    if(!isUserRegistered){
       return res.status(401).json({
            message:"User is Not Registered"
        })
    }

    const isPassWordvalid= await bcrypt.compare(password,isUserRegistered.password);

    if(!isPassWordvalid){
        return res.status(401).json({
            message:"PassWord is Incorrect"
        })
    }

    const token=jwt.sign({id:isUserRegistered._id,username:isUserRegistered.username},process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"User LoggedIn Successfully",
        user:{
            username:isUserRegistered.username,
            email:isUserRegistered.email,
            bio:isUserRegistered.bio,
            profileImage:isUserRegistered.profileImage
        }
    })

}

module.exports={registerController,loginController};