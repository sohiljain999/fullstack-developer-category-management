const config = {
  development: {
    secret: 'dev_secret',
    DATABASE_URL: 'mongodb://localhost:27017/fashion',
    port: 3000,
  },
};

const getConfig = env => config[env] || config.development;

module.exports = {
    getConfig
}
