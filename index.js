// Importing modules
const express = require('express');
const mongoose = require('mongoose');

// Importing schema
const shortU = require('./models/shortUrl');

// Initializing express
const app = express();

// Connecting to MongoDB
// localhost:27017/urlShortener
// mongodb+srv://urlshrinker:tTGsJca4OOEse8Ii@urlshrinker.og4lrcz.mongodb.net/
mongoose.connect('mongodb+srv://urlshrinker:tTGsJca4OOEse8Ii@urlshrinker.og4lrcz.mongodb.net/', {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Setting up view engine for ejs
app.set('view engine', 'ejs');

// Setting up body parser
app.use(express.urlencoded({ extended: false }));

// Get route to render index.ejs and send data
app.get('/', async (req, res) => {
    const shortUrls = await shortU.find()
    res.render('index', { shortUrls: shortUrls });
});

// Post route to add data to the schema
app.post('/shortUrls', async(req, res) => {
    await shortU.create({ full: req.body.fullUrl });
    res.redirect('/');
});

// Redirect route for short url
app.get('/:shortUrl', async (req, res) => {
    const s = await shortU.findOne({ short: req.params.shortUrl });
    if (s == null) return res.sendStatus(404);
    s.clicks++;
    s.save();
    res.redirect(s.full);
});    

// Post route to delete data from the schema
app.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await shortU.findByIdAndDelete(id);
    res.redirect('/');
});

// localhost:5000
app.listen(process.env.PORT || 5000);