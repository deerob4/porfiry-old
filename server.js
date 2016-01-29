import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import config from './config';
import apiRoutes from './src/api/index';
import quizSockets from './src/sockets/quizSockets';

// Begin connection to database.
mongoose.connect(`mongodb://localhost:27017/${config.database}`);

let app = express();
let compiler = webpack(webpackConfig);

// Initialise essential middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Begin the server; listen on the defined port.
let server = app.listen(config.port, '0.0.0.0', err => {
  if (err) throw err;
  console.log('Listening on port ' + config.port);
});

// Set up development middleware.
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Set root route (pun!) to serve static index.html file.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Fix the bloody annoying error message when refreshing.
app.get('/create', (req, res) => res.redirect('/'));
app.get('/play', (req, res) => res.redirect('/'));

// Set the /api endpoint to the route logic in apiRoutes.
app.use('/api', apiRoutes);

// Start the socket processes.
quizSockets(server);
