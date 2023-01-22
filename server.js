//   bare bones for our basic server
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());    // its ok to except cors request for this server


// Serve up environment variables for deployment (usually on heroku)
const PORT = process.env.PORT || 8000;

const seriesRouter = require('./routes/series');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewURLParser: true });
mongoose.set('strictQuery', false);
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connected established'))


app.use(express.json()); // expect json on all routes after this
app.use('/api/v1/series', seriesRouter);

// static react build exists in the react build dir
app.use(express.static(path.join(__dirname, '../reactjs/build')));

app.get('/', (req, res) => { res.send('Hello from Express!') })

// if route undefined by API then its a direct request to client-side route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

