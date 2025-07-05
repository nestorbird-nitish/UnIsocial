import express from 'express'
import userRouter from './routers/user.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    return res.json({
        message:"Hello"
    })
});


app.use("/api/users", userRouter);


app.listen(3000);