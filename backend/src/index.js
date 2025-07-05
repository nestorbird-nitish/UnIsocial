import express from 'express'
import userRouter from './routers/user.routes.js';
import cors from 'cors';
import postRouter from './routers/post.routes.js';

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    return res.json({
        message:"Hello"
    })
});


app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);


app.listen(process.env.PORT || 3000);