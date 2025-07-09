const express = require('express');
const router = express.Router();
const {GarbageItem, garbageCateGory } = require('../models');
// 查询所有分类信息
router.get('/garbage/categories', async function(req, res, next) {
  try {
    const items = await garbageCateGory.find();
    res.success(items);
  } catch (err) {
    res.error(err.message, 500);
  }
});

// 根据垃圾类型搜索垃圾
router.get('/garbage/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    const items = await GarbageItem.find({
      name: { $regex: keyword, $options: 'i' }
    });
    res.success(items);
  } catch (err) {
    res.error(err.message, 500);
  }
});

// 添加新的垃圾分类项
router.post('/garbage/create', async (req, res) => {
  const { name, category, description, tips, commonItems } = req.body;
  
  const item = new GarbageItem({
    name,
    category,
    description,
    tips,
    commonItems
  });

  try {
    const newItem = await item.save();
    res.success(newItem);
  } catch (err) {
    res.error(err.message, 500);
  }
});

// 添加新的分类
router.post('/garbage/category/create', async (req, res) => {
  const { name, description } = req.body;
  
  const item = new garbageCateGory({
    name,
    description
  });

  try {
    const newItem = await item.save();
    res.success(newItem);
  } catch (err) {
    res.error(err.message, 500);
  }
});

module.exports = router;
