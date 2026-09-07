import express from "express"

const app = express()


app.get("/health", (req, res) => {
    res.send("I am OK👌 ! Keep Working")
})

app.get("/check",(req, res) => {
    let sum = 0
    for(let i = 0; i < 1000; i++) {
        sum+=i;
    }
    res.send("The sum is "+sum)
})


app.get("/", (req, res) => {
    res.send("Hello World")
})

export default app