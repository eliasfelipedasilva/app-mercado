const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser')
require('dotenv').config()

require('./database/index');

const app = express();
app.use(express.json());

app.use(routes);

let port = porcess.env.PORT || 8080;
app.listen(8080);
