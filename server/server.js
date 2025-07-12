import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./configs/db.js";
import adminRoutes from "./routes/admin.routes.js";
import blogRoutes from "./routes/blog.routes.js";

const app = express();

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("API Working"));
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);
app.use('/ai-blog', express.static(path.join(__dirname, '../client/dist')));
app.get('/ai-blog/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
export default app;