// Configuration settings that will be shared
// between environments.
const sharedConfig = {
  port: process.env.PORT || 5000,
  socketHost: 'http://50ef36ee.ngrok.io'
};

// Configuration applied during production.
let productionConfig = {
  port: process.env.PORT || 5000,
  socketHost: 'http://50ef36ee.ngrok.io',
  database: 'porfiry'
};

let developmentConfig = {
  port: process.env.PORT || 5000,
  socketHost: 'http://50ef36ee.ngrok.io',
  database: 'porfiryTest'
};

export default process.env.ENVIRONMENT === 'production' ? productionConfig : developmentConfig;
