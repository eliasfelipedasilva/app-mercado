const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser')
require('dotenv').config()

require('./database/index');

const app = express();
app.use(express.json());

app.use(routes);


app.listen(8080);
