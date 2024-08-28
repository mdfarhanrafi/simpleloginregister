import express from "express";
import cors from "cors"
import "dotenv/config.js"


const app = express()
const port = process.env.PORT || 5001;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: '*',
    credentials: true,
}))


import ApiRoutes from "./routes/api.js"

app.use("/api", ApiRoutes)


app.listen(port, () => {
    console.log(`i am running on ${port}`)
}
)