import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI).then(() => {

    console.log("MongoDB connected");

}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


app.use('/', taskRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is running successfully!');
}); 


export default app;
