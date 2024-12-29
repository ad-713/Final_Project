import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movies';

const app = express();
const PORT = process.env.PORT || 4200;

app.get('/', (req, res) => {
    res.send('Movie API is running');
});

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/movies', movieRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
