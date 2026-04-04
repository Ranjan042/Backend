const followModel = require("../Models/FollowModel");
const UserModel = require("../Models/UserModel");

async function FollowUserController(req,res) {
    const followerUsername=req.user.username;
    const followingUsername=req.params.username;
    const {status}=req.body;

    if(!(status=="accepted"||status=="pending"||status=="rejected")){
        return res.status(400).json({message:"invalid status"});
    }
    const isFolloweeExists=await UserModel.findOne({
        username:followingUsername
    })

    if(!isFolloweeExists){
        return res.status(401).json({
            message:"User you are trying to follow does not exists"
        })
    }

    if(followerUsername==followingUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }
    const isAlreadyFollowing=await followModel.findOne({
       follower:followerUsername,
       followee:followingUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message:`You have aldready followed ${followingUsername}`
            ,follow:isAlreadyFollowing,
            status:status
        })
    }
    const followRecord=await followModel.create({
        follower:followerUsername,
        followee:followingUsername,
        status:status
    })


    res.status(201).json({
        message:`you are now following ${followingUsername}`,
        follow:followRecord,
        status:status
    })
}

async function unfollowuserController(req,res) {
    const followerUsername=req.user.username
    const followeeUsername=req.params.username


    const isuserFollowing=await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(!isuserFollowing){
        return res.status(200).json({
            message:`you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isuserFollowing._id)

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
}

module.exports={
    FollowUserController,
    unfollowuserController
}