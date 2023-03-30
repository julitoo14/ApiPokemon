const express = require('express');
const middlewares = require('./middlewares');
require('./database');

// Routes 
const authRoutes = require('./auth/auth.routes').router;
const teamsRoutes = require('./teams/teams.routes').router;

const app = express();

const port = 3000;

middlewares.setupMiddlewares(app);
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);



app.listen(port, () => {
    console.log('listening on port ' + port);
});

exports.app = app;