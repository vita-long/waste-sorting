const mongoose = require('mongoose');

const garbageCateGorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: Number,
  icon: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

// 添加虚拟 id 字段
garbageCateGorySchema.virtual('id').get(function() {
  return this._id.toHexString(); // 如果是 ObjectId
});

// 确保虚拟字段包含在 toJSON 输出中
garbageCateGorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('garbageCateGory', garbageCateGorySchema);