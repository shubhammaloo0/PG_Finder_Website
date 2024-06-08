const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

const uri = "mongodb+srv://shubham:shubham0@cluster0.1uve84x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const pgDetailSchema = new mongoose.Schema({
    pgName: String,
    accommodation: String,
    preferred: String,
    food: String,
    amenities: [String],
    price: Number,
    roomno: Number,
    location: String,
    images: [String] 
});

const PgDetail = mongoose.model('PgDetail', pgDetailSchema);




const bookingschema = new mongoose.Schema({
    pgName: String,
    accommodation: String,
    preferred: String,
    food: String,
    amenities: [String],
    price: Number,
    roomno: Number,
    location: String,
    images: [String], 
    email: String
});


const Booking = mongoose.model('Booking', bookingschema);



const ownerSchema = new mongoose.Schema({
    username: String,
    password: String,
    
});

const Owner = mongoose.model('Owner', ownerSchema);

const studentSchema = new mongoose.Schema({
    username: String,
    password: String,
    
});

const Student = mongoose.model('Student', studentSchema);


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

// Create a Mongoose model
const Contact = mongoose.model('Contact', contactSchema);



const htmlPath = path.join(__dirname, 'afterownerlogin.html');

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.sendFile(htmlPath);
});



app.post('/booking', async (req, res) => {
    const pgData = req.body;

    try {
        const result = await Booking.create(pgData);
        console.log(`PG data inserted with _id: ${result._id}`);
        res.status(200).send('PG data stored successfully.');
    } catch (error) {
        console.error('Error storing PG data:', error);
        res.status(500).send('Internal Server Error');
    }
});





app.post('/storeFormData', async (req, res) => {
    const formData = req.body;

    try {
        const result = await PgDetail.create(formData);
        console.log(`Form data inserted with _id: ${result._id}`);
        res.status(200).send('Form data stored successfully.');
    } catch (error) {
        console.error('Error storing form data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/registerowner', async (req, res) => {
    const userData = req.body;

    try {
        const owner = await Owner.create(userData);
        res.status(200).send('Registration successful');
    } catch (error) {
        console.error('Error registering owner:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/ownerlogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const owner = await Owner.findOne({ username, password });
        if (owner) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/registerstudent', async (req, res) => {
    const userData = req.body;

    try {
        const student = await Student.create(userData);
        res.status(200).send('Registration successful');
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/studentlogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const student = await Student.findOne({ username, password });
        if (student) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.post('/contact', async (req, res) => {
    try {
        
        const { name, email, message } = req.body;

       
        const contact = new Contact({
            name,
            email,
            message,
        });

        
        await contact.save();

       
        res.status(201).json({ message: 'Form data saved successfully!' });
    } catch (error) {
       
        console.error('Error saving form data:', error);
        res.status(500).json({ error: 'Failed to save form data.' });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Closed MongoDB connection');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    } finally {
        process.exit();
    }
});
