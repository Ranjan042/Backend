import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.send("Hello Users!");
});

app.get("/sum",(req,res)=>{
    let sum=0;

    for(let i=0;i<1000000;i++){
        sum+=i;
    }
    res.send("Sum: "+sum);
})



export default app;