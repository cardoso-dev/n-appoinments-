const express = require('express');
const bodyParser = require('body-parser');

const {connectDb, getDb} = require('./database/db');
const routesClient = require('./routes/client');
const routesAppoinment = require('./routes/appoinment');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routesClient);
app.use('/api', routesAppoinment);

connectDb((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Successfully connected to MongoDB.");
    app.locals.appoinmentDb = getDb();
});

app.listen(
    port,
    () => console.log(`Listening on port ${port}!`)
);
