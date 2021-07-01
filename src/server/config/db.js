var mongoose = require('mongoose');

var {
  getConfig
} = require('./config');

const config = getConfig(process.env.NODE_ENV);
mongoose.Promise = global.Promise;

const dbConnect = () => mongoose.connect(config.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = {
  dbConnect
}
