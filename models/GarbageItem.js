const mongoose = require('mongoose');

const garbageItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  /**
   * 1: 可回收垃圾
   * 2: 有害垃圾
   * 3: 厨余垃圾
   * 4: 其他垃圾
   */
  category: { 
    type: Number, 
    required: true,
    enum: [1, 2, 3, 4]
  },
  categoryId: String,
  description: String,
  tips: String,
  commonItems: [String],
  createdAt: { type: Date, default: Date.now }
});

// 添加虚拟 id 字段
garbageItemSchema.virtual('id').get(function() {
  return this._id.toHexString(); // 如果是 ObjectId
});

// 确保虚拟字段包含在 toJSON 输出中
garbageItemSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('GarbageItem', garbageItemSchema);