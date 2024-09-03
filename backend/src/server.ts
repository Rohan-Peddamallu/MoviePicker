import app from './app';
import mongoose from 'mongoose';
import "dotenv/config";

const port = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_CONN!).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(console.error);
