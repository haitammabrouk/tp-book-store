import express from 'express';
import connectDB from './db';
import bookRoutes from './routes/book';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json()); 
app.use(cors())

app.use('/api/books', bookRoutes); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
