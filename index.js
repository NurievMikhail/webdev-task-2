'use strict';

const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');

const Place = require('./models/place');
const routes = require('./routes');
const places = require('./storage/places');

for (const place of places) {
    new Place(place).save();
}

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});
routes(app);

const port = config.get('port') || 8080;
app.listen(port, () => {
    console.info(`Open http://localhost:${port}`);
});
