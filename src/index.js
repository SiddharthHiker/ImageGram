import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import ip from 'ip';
import {rateLimit} from 'express-rate-limit';

const PORT = 3000; // Port Number

const app = express(); // create express app server instance


const limiter = rateLimit ({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max:5 // Limit each IP to 5 requests per windowMs
});

app.use(limiter); // apply rate limiter to all requests 

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


app.use('/api',apiRouter); // If the url starts with /api then the request is forwarded to the apiRouter


app.get('/ping',(req,res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    const ipaddr = ip.address();

return res.json({message: 'Pong' + ipaddr});
})





async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exitCode = 1;
    }
}

startServer();
