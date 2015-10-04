// Configuration settings that will be shared
// between environments.
const sharedConfig = {
  defaultPort: process.env.PORT || 5000
};

// Configuration applied during production.
let productionConfig = {
  ...sharedConfig,
  database: 'porfiry'
};

let developmentConfig = {
  ...sharedConfig,
  database: 'porfiryTest'
};

export default process.env.ENVIRONMENT === 'production' ? productionConfig : developmentConfig;
