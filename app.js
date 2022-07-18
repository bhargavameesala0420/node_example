import express from 'express';
import { db } from './config/db.js';
import { router } from './routes/routes.js';

import bodyParser from 'body-parser';
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/', router);
app.get('/', function (req, res) {
res.send("Welocme to articles!");
});
app.listen(5000);