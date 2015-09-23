import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpack from 'webpack';
import config from './webpack.config';
import apiRoutes from './src/api/index';

// Begin connection to database.
mongoose.connect('mongodb://localhost:27017/porfiry');

let app = express();
let compiler = webpack(config);

// Initialise essential middleware.
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up development middleware.
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Set root route (pun!) to serve static index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Set the /api endpoint to the route logic in apiRoutes.
app.use('/api', apiRoutes);

// Begin the server; listen on the defined port.
app.listen(app.get('port'), 'localhost', err => {
  if (err) throw err;
  console.log('Listening on port ' + app.get('port'));
});

