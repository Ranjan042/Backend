export async function registerUser(req,res,next) {
// try {
//         // throw new Error("Password is too weak")
//         console.log(user)
//     } catch (err) {
//     err.status=400
//     next(err)
// }
res.status(201).json({
    message:"user registered Successfully"
})
}