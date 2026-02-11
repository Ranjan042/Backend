// server ko start karna aur database se connect karna

require("dotenv").config();
const app = require("./src/app");
const connecttodb=require("./src/config/database");
connecttodb();


app.listen(5173, () => {
    console.log("Server is running on port 5173");
});
