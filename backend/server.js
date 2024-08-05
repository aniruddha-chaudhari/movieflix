import express from 'express';


import authRoutes from './routes/authroute.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';


const app = express();
const port = ENV_VARS.PORT;

app.use(express.json());

app.use("/api/v1/auth",authRoutes)

app.listen(port, () => {
    console.log('Server started on port http://localhost:'+port);
    connectDB();
});



