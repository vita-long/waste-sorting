const mongoose = require('mongoose');

const garbageItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true,
    enum: ['可回收物', '有害垃圾', '厨余垃圾', '其他垃圾']
  },
  description: String,
  tips: String,
  commonItems: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GarbageItem', garbageItemSchema);