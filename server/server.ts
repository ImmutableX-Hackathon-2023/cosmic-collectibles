
import express from 'express';
import fs from 'fs'
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))


http.createServer({}, app).listen(4000, async () => {
    console.log("Server is running")
})