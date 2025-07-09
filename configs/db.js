module.exports = {
  mongodb: {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DATABASE || 'waste',
    username: process.env.MONGODB_USERNAME || 'root',
    password: process.env.MONGODB_PASSWORD || '123456',
  },
  // 其他配置...
};