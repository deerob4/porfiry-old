import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpack from 'webpack';
import config from './webpack.config';
import apiRoutes from './src/api/index';

mongoose.connect('mongodb://localhost:27017/porfiry');

let app = express();
let compiler = webpack(config);

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', apiRoutes);

app.listen(app.get('port'), 'localhost', err => {
  if (err) throw err;
  console.log('Listening on port ' + app.get('port'));
});

