//server ko start aur database se connect karna

const app=require('./src/app');
const mongoose=require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://chauhanranjan8978_db_user:NHevWenW0xQCI5cE@cluster0.sxo7hik.mongodb.net/Demo")
    .then(()=>{
        console.log("Connected ")
    }).catch(()=>{
        console.log("Not working");
    })
}
connectToDb();
app.listen(5173,()=>{
    console.log("Server is running !")
})