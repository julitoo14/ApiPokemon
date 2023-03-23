const express = require('express');
const bodyParser = require('body-parser');

// Routes 
const authRoutes = require('./routers/auth').router;
const teamsRoutes = require('./routers/teams').router;

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);



app.listen(port, () => {
    console.log('server listening on port 3000');
});

exports.app = app;