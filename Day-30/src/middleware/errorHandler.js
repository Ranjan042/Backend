import dotenv from "dotenv"
dotenv.config()

export function handleError(err,req,res,next){

    const response={
        message:err.message
    }

    console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV==="development"){
        response.stack=err.stack
    }

    
    res.status(err.status).json(response)
}