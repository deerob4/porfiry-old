// Configuration settings that will be shared
// between environments.
const sharedConfig = {
  port: process.env.PORT || 5000
};

// Configuration applied during production.
let productionConfig = {
  port: process.env.PORT || 5000,
  database: 'porfiry'
};

let developmentConfig = {
  port: process.env.PORT || 5000,
  database: 'porfiryTest'
};

export default process.env.ENVIRONMENT === 'production' ? productionConfig : developmentConfig;
