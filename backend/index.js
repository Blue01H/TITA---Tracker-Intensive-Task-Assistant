const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const auth = require('./routes/auth');
const client = require('./routes/client');
const contractor = require('./routes/contractor');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
})
.then(() => console.log('Database Connected'))
.catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); 
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(cors())

require('./config/passport')(passport);

app.use('/api/auth', auth);
app.use('/api/client', client);
app.use('/api/contractor', contractor);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Serving on ${port}`);
});