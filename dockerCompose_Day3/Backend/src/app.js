import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("hello world,The backend is on Correct path")
})

app.get("/users", (req, res) => {

    console.log("Kisi ne user manga")
   let users = [
        {
            id: 1,
            name: "John Doe"
        },
        {
            id: 2,
            name: "Jane bhuiya"
        },
        {
            id: 3,
            name: "John Roe"
        }
    ]
    res.send(users)
})

export default app