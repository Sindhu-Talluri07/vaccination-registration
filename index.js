const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 
const adminRoutes = require('./routes/adminRoutes'); 

const app = express();
app.use(express.json()); 


const url = 'mongodb+srv://sindhu:sindhu@cluster0.cixvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = 5000; 


async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); 
    }
}

//  connect to the database
connectToDatabase();


app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
    res.send('Vaccine Registration API is working');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});


const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});