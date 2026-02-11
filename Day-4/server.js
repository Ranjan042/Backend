// Server ko start karna

const app=require('./src/app'); //no need to of same name

app.listen(5173,()=>{
    console.log("Server Started")
})