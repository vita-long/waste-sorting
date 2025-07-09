const mongoose = require('mongoose');
const config = require('../configs/db.js');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    const { host, port, database, username, password } = config.mongodb;
    
    let connectionUri = `mongodb://${host}:${port}/${database}`;
    
    // 如果有用户名和密码
    if (username && password) {
      connectionUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
    }

    mongoose.connect(connectionUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    })
    .then(() => {
      console.log('✅ 数据库连接成功');
    })
    .catch(err => {
      console.error('❌ 数据库连接失败:', err);
      // 生产环境可以考虑退出进程
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    });

    // 监听连接事件
    mongoose.connection.on('connected', () => {
      console.log('Mongoose 已连接到 MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose 连接错误:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose 已断开连接');
    });

    // 进程终止时关闭连接
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('Mongoose 连接已断开 (应用终止)');
      process.exit(0);
    });
  }

  // 获取原生 Mongoose 实例
  getMongoose() {
    return mongoose;
  }

  // 获取连接状态
  getConnectionStatus() {
    return mongoose.connection.readyState;
  }

  // 关闭连接 (测试时使用)
  async closeConnection() {
    await mongoose.connection.close();
  }
}

module.exports = new Database();